import "server-only";

import type { VercelKV } from "@vercel/kv";
import moment from "moment";

import { kvStore } from "@/server/lib/kv/Persistence";

type ResponseTPRC = {
  code: number;
  message: string;
  result?: object | string | number | boolean | undefined;
};

enum Difficulty {
  MATCH = "MATCH",
  CLOSE = "CLOSE",
}

/**
 * 抽奖的参数
 * 名称，难度系数，周期（多少个区块）
 */
type LotteryPoolProps = {
  poolCode: string;
  name: string;
  difficulty: Difficulty;
  period: string;
  price: number;
  lastResult?: PhaseResult;
  currentPhase?: string;
  lastPhase?: string;
};

type PhaseResult = {
  lotteryResult: string;
  hitTx: Array<string>;
  hitAddr: Array<string>;
  hitTicket: string;
};

type TicketProps = {
  poolCode: string;
  address: string;
  txHash: string;
  txTime: number;
  tickets: Array<string>;
  currentPhase?: string;
};

type LotteryPhaseProps = {
  lotteryResult: string;
  hitTx: string | undefined;
  hitAddr: (string | undefined)[] | undefined;
};

enum Namespace {
  //当前期
  LOTTERY_CURRENT_PHASE = "LOTTERY_CURRENT_PHASE",
  //开奖期
  LOTTERY_PROCESSING_PHASE = "LOTTERY_PROCESSING_PHASE",
  //每期开奖结果
  LOTTERY_PHASE_RESULT = "LOTTERY_PHASE_RESULT",
  //所有池信息
  LOTTERY_POOLS = "LOTTERY_POOLS",
}

class LotteryService {
  kv: VercelKV;

  constructor() {
    this.kv = kvStore.getClient();
  }

  async phaseLottery(poolCode: string, lotteryResult: string) {
    await this.__startNewPhase(poolCode);
    const lastPhase = await this.kv.hget(Namespace.LOTTERY_PROCESSING_PHASE, poolCode);

    // 摇奖对比,获取池信息
    const pool: LotteryPoolProps | null = await this.kv.hget(Namespace.LOTTERY_POOLS, poolCode);
    //获取当前所有用户信息<txHash:
    const tickets: Record<string, TicketProps> | null = await this.kv.hgetall(lastPhase as string);

    //准备数据
    const ticketAndTxMap: Map<string, Array<string>> = new Map<string, Array<string>>();
    const txAndAddressMap: Map<string, string> = new Map<string, string>();
    if (!pool || !tickets) {
      return;
    }
    Object.keys(tickets).map((txHash) => {
      txAndAddressMap.set(txHash, tickets[txHash].address);
      tickets[txHash].tickets.map((ticket) => {
        const txHashArray = ticketAndTxMap.get(ticket) ?? [];
        ticketAndTxMap.set(ticket, [txHash, ...txHashArray]);
      });
    });
    const hitTicket: string =
      pool.difficulty == Difficulty.MATCH
        ? lotteryResult
        : this.__findClosestHexNumber([...ticketAndTxMap.keys()], lotteryResult);
    const hitTx = ticketAndTxMap.get(hitTicket);
    const hitAddr = hitTx?.map((tx) => txAndAddressMap.get(tx));
    //开奖号码
    await this.kv.hsetnx(lastPhase as string, Namespace.LOTTERY_PHASE_RESULT, {
      lotteryResult,
      hitTx,
      hitAddr,
      hitTicket,
    } as LotteryPhaseProps);
    return lastPhase as string;
  }

  async createTicket(props: TicketProps) {
    let currentPhase = await this.kv.hget(Namespace.LOTTERY_CURRENT_PHASE, props.poolCode);
    if (!currentPhase) {
      currentPhase = await this.__startNewPhase(props.poolCode);
    }
    //归入某期
    await this.kv.hsetnx(currentPhase as string, props.txHash, { ...props });
    //归入用户
    const result = await this.kv.hsetnx(`LOTTERY_ADDR_${props.address}`, props.txHash, {
      currentPhase,
      ...props,
    });
    return result == 1;
  }

  private async __startNewPhase(poolCode: string) {
    const newPhash = `LOTTERY_PHASE_${moment().format("YYYYMMDDHHmmss")}`;
    //当前池新的周期
    const lastPhase = await this.kv.hget(Namespace.LOTTERY_CURRENT_PHASE, poolCode);
    await this.kv.hset(Namespace.LOTTERY_CURRENT_PHASE, { [poolCode]: newPhash });
    if (lastPhase) {
      await this.kv.hset(Namespace.LOTTERY_PROCESSING_PHASE, { [poolCode]: lastPhase });
    }
    return newPhash;
  }

  private __findClosestHexNumber(hexNumbers: string[], targetHex: string): string {
    const targetDec: number = parseInt(targetHex, 16);
    let closestHex: string = hexNumbers[0];
    let minDifference: number = Math.abs(parseInt(closestHex, 16) - targetDec);

    for (let i = 1; i < hexNumbers.length; i++) {
      const currentHex: string = hexNumbers[i];
      const currentDec: number = parseInt(currentHex, 16);
      const difference: number = Math.abs(currentDec - targetDec);

      if (difference < minDifference) {
        minDifference = difference;
        closestHex = currentHex;
      }
    }
    return closestHex;
  }

  randomHex() {
    return Number(Math.floor(Math.random() * 10000000) + 1).toString(16);
  }
}

const lottery = new LotteryService();

export { lottery, Difficulty, Namespace };
export type { ResponseTPRC, LotteryPoolProps, TicketProps, LotteryPhaseProps, PhaseResult };

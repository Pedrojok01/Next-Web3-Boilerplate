export type ResponseTPRC = {
  code: number;
  message: string;
  result?: object | string | number | boolean | undefined;
};

export enum Difficulty {
  MATCH = "MATCH",
  CLOSE = "CLOSE",
}

/**
 * 抽奖的参数
 * 名称，难度系数，周期（多少个区块）
 */
export type Lottery = {
  poolHash: string;
  name: string;
  difficulty: Difficulty;
  period: number;
};

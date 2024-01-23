import { Difficulty, type PoolType } from "@/server/lib/LotteryService";

const InitPoolConfig: Record<string, { prop: PoolType; wallet: [string, string] }> = {
  "System-PowerBlast-0001": {
    prop: {
      name: "PowerBlast",
      poolCode: "System-PowerBlast-0001",
      difficulty: Difficulty.MATCH,
      period: "*/30 * * * *",
      price: 0.001,
    },
    wallet: ["", ""],
  },
  "System-DailyLotto-0002": {
    prop: {
      name: "DailyLotto",
      poolCode: "System-DailyLotto-0002",
      difficulty: Difficulty.CLOSEST,
      period: "* * */1 * *",
      price: 0.001,
    },
    wallet: ["", ""],
  },
  "System-BigBang-0003": {
    prop: {
      name: "BigBang",
      poolCode: "System-BigBang-0003",
      difficulty: Difficulty.CLOSEST,
      period: "*/5 * * * *",
      price: 0.001,
    },
    wallet: ["", ""],
  },
};
export default InitPoolConfig;

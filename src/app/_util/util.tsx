import parser from "cron-parser";

const nextTime = (cronExpression: string) => {
  const interval = parser.parseExpression(cronExpression);
  return interval.next().toDate();
};
export { nextTime };

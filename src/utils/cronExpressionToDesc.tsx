export function cronExpressionToDescription(cronExpression: string): string {
  // 解析 Cron 表达式的各个字段
  const [minute, hour, dayOfMonth, month, dayOfWeek] = cronExpression.split(" ");

  // 解析分钟字段
  const minuteDescription = parseCronField(minute, 0, 59, "minute");

  // 解析小时字段
  const hourDescription = parseCronField(hour, 0, 23, "hour");

  // 解析日期字段
  const dayOfMonthDescription = parseCronField(dayOfMonth, 1, 31, "day of month");

  // 解析月份字段
  const monthDescription = parseCronField(month, 1, 12, "month");

  // 解析星期字段
  const dayOfWeekDescription = parseCronField(dayOfWeek, 0, 6, "day of week", [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

  // 构建描述字符串
  const description = `Runs every ${minuteDescription} past the hour, every ${hourDescription} on ${dayOfMonthDescription} of ${monthDescription}, and on ${dayOfWeekDescription}`;

  return description;
}

function parseCronField(
  field: string,
  minValue: number,
  maxValue: number,
  fieldName: string,
  dayNames?: string[],
): string {
  const values = field.split(",");

  if (values.length === 1 && values[0] === "*") {
    return `every ${fieldName}`;
  }

  const parsedValues = values.map((value) => {
    if (value.includes("/")) {
      const [start, increment] = value.split("/");
      return `every ${increment} ${fieldName} starting from ${start}`;
    }

    if (value.includes("-")) {
      const [start, end] = value.split("-");
      return `every ${fieldName} from ${start} to ${end}`;
    }

    if (value.includes("*")) {
      return `every ${fieldName}`;
    }

    const parsedValue = dayNames ? dayNames[parseInt(value)] : value;
    if (parseInt(value) < minValue || parseInt(value) > maxValue) {
      throw new Error(`Invalid ${fieldName} value: ${value}`);
    }
    return parsedValue;
  });

  return parsedValues.join(", ");
}

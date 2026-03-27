import { get } from "../utils/request";

export const getStatistic = async () => {
  const result = await get(`dashboard/statistic`);
  return result;
}
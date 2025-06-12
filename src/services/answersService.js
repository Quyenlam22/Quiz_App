import { get } from "../utils/request";

export const getListAnswersByUserId = async (userId) => {
    const result = await get(`answers?userId=${userId}`);
    return result;
}

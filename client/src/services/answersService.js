import { get } from "../utils/request";

export const getListAnswersByUserId = async (userId) => {
    const result = await get(`answers?userId=${userId}`);
    return result;
}

export const getAnswer = async (id) => {
    const result = await get(`answers/${id}`);
    return result;
}

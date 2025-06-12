import { post } from "../utils/request";

export const createAnswer = async (options) => {
    const result = await post(options, `answers`);
    return result;
}
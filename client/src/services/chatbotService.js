import { post } from "../utils/request";

export const sendMessage = async (options) => {
    const result = await post(options, `chatbot`);
    return result;
}
import { get } from "../utils/request";

export const getListTopic = async () => {
    const result = await get(`topics`);
    return result;
}

export const getTopic = async (slug) => {
    const result = await get(`topics/${slug}`);
    return result;
}

import { get, post } from "../utils/request";

export const login = async (options) => {
    const result = await post(options, `users/login`);
    return result;
}

export const createNewUser = async (options) => {
    const result = await post(options, `users/create`);
    return result;
}
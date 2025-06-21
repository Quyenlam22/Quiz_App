import { get, patch, post } from "../utils/request";

export const login = async (options) => {
    const result = await post(options, `users/login`);
    return result;
}

export const createNewUser = async (options) => {
    const result = await post(options, `users/create`);
    return result;
}

export const infoUser = async (id) => {
    const result = await get(`users/info/${id}`);
    return result;
}

export const updateInfoUser = async (options) => {
    const result = await patch(options, `users/info`);
    return result;
}

export const forgotPassword = async (options) => {
    const result = await post(options, 'users/password/forgot');
    return result;
}

export const otpPassword = async (options) => {
    const result = await post(options, 'users/password/otp');
    return result;
}

export const resetPassword = async (options) => {
    const result = await post(options, 'users/password/reset');
    return result;
}
import { get, patch, post, del } from "../utils/request";

// LOGIN
export const login = async (options) => {
  return await post(options, `users/login`);
};

// CREATE
export const createUser = async (options) => {
  return await post(options, `users/create`);
};

// LIST (🔥 QUAN TRỌNG)
export const getUsers = async (params = "") => {
  return await get(`users${params}`);
  // ví dụ: ?keyword=a&role=admin&page=1
};

// GET DETAIL
export const infoUser = async (id) => {
  return await get(`users/info/${id}`);
};

// UPDATE
export const updateUser = async (options) => {
  return await patch(options, `users/info`);
};

// DELETE 1
export const deleteUser = async (id) => {
  return await del(`users/delete/${id}`);
};

// DELETE MANY
export const deleteManyUsers = async (ids) => {
  return await patch({ ids }, `users/delete-many`);
};

// PASSWORD
export const forgotPassword = async (options) => {
  return await post(options, 'users/password/forgot');
};

export const otpPassword = async (options) => {
  return await post(options, 'users/password/otp');
};

export const resetPassword = async (options) => {
  return await post(options, 'users/password/reset');
};
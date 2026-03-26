import { get, post, patch, del } from "../utils/request";

// Lấy danh sách (Có thể truyền thêm query tìm kiếm)
export const getListTopic = async (params = "") => {
    return await get(`topics${params}`);
}

export const getTopic = async (slug) => {
    return await get(`topics/${slug}`);
}

export const getTopicById = async (id) => {
    return await get(`topics/info/${id}`);
}

// Thêm mới
export const createTopic = async (data) => {
    return await post(data, `topics/create`);
};

// Cập nhật
export const updateTopic = async (id, data) => {
    return await patch(data, `topics/update/${id}`);
};

// Xóa đơn
export const deleteTopic = async (id) => {
    return await del(`topics/delete/${id}`);
};

// Xóa nhiều
export const deleteManyTopics = async (ids) => {
    return await patch({ ids }, `topics/delete-many`);
};
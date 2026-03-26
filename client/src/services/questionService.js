import { get, post, patch, del } from "../utils/request";

// Lấy danh sách câu hỏi theo Topic ID
export const getListQuestion = async (topicId) => {
    return await get(`questions/${topicId}`);
}

// Lấy chi tiết 1 câu hỏi
export const getQuestionDetail = async (id) => {
    return await get(`questions/info/${id}`);
}

// Tạo mới câu hỏi
export const createQuestion = async (data) => {
    return await post(data, `questions/create`);
};

// Cập nhật câu hỏi
export const updateQuestion = async (id, data) => {
    return await patch(data, `questions/update/${id}`);
};

// Xóa câu hỏi
export const deleteQuestion = async (id) => {
    return await del(`questions/delete/${id}`);
};
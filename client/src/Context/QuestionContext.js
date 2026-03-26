import { createContext, useState, useCallback } from "react";
import { deleteQuestion, getListQuestion } from "../services/questionService";

export const QuestionContext = createContext();

export default function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshQuestions = useCallback(async (topicId) => {
    // Nếu không có topicId, xóa sạch danh sách để tránh lộ dữ liệu cũ
    if (!topicId) {
      setQuestions([]);
      return;
    }
    
    setLoading(true);
    try {
      const res = await getListQuestion(topicId);
      if (res?.code === 200) {
        // 🔥 Gán mới hoàn toàn mảng từ server để tránh trùng lặp
        setQuestions(res.data.map(q => ({ ...q, key: q._id })));
      } else {
        setQuestions([]);
      }
    } catch (error) {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearQuestions = useCallback(() => {
    setQuestions([]);
  }, []);

  const removeQuestion = useCallback(async (id, topicId) => {
    const res = await deleteQuestion(id);
    if (res?.code === 200) await refreshQuestions(topicId);
    return res;
  }, [refreshQuestions]);

  return (
    <QuestionContext.Provider value={{ questions, loading, refreshQuestions, removeQuestion, clearQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
}
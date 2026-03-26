import { createContext, useState, useEffect, useCallback } from "react";
import { getListTopic, deleteTopic, deleteManyTopics } from "../services/topicService";

export const TopicContext = createContext();

export default function TopicProvider({ children }) {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);

    // Lấy dữ liệu thật từ Backend
    const refreshTopics = useCallback(async (params = "", silent = false) => {
        if (!silent) setLoading(true);
        try {
            const res = await getListTopic(params);
            if (res?.code === 200) {
                // Thêm key để Ant Design Table không báo lỗi
                const data = res.data.map(item => ({ ...item, key: item._id }));
                setTopics(data);
            }
            return res;
        } finally {
            setLoading(false);
        }
    }, []);

    // Xóa sạch dữ liệu (Dùng khi logout)
    const clearTopics = useCallback(() => {
        setTopics([]);
    }, []);

    // Các hàm xử lý xóa nhanh
    const removeTopic = useCallback(async (id) => {
        const res = await deleteTopic(id);
        if (res?.code === 200) await refreshTopics("", true);
        return res;
    }, [refreshTopics]);

    const removeManyTopics = useCallback(async (ids) => {
        const res = await deleteManyTopics(ids);
        if (res?.code === 200) await refreshTopics("", true);
        return res;
    }, [refreshTopics]);

    // Load dữ liệu lần đầu
    useEffect(() => {
        refreshTopics();
    }, [refreshTopics]);

    return (
        <TopicContext.Provider value={{ 
            topics, 
            loading, 
            refreshTopics, 
            removeTopic, 
            removeManyTopics, 
            clearTopics 
        }}>
            {children}
        </TopicContext.Provider>
    );
}
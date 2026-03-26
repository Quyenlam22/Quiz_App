import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './Context/AppProvider';
import AuthProvider from "./Context/AuthProvider";
import UserProvider from './Context/UserContext';
import TopicProvider from './Context/TopicContext';
import QuestionProvider from './Context/QuestionContext'; // 🔥 Import mới

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider>
            <UserProvider>
                <TopicProvider>
                <QuestionProvider>
                    <AppProvider>
                    <App />
                    </AppProvider>
                </QuestionProvider>
                </TopicProvider>
            </UserProvider>
        </AuthProvider>
    </BrowserRouter>
);
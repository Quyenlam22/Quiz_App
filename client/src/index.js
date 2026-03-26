import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './Context/AppProvider';
import AuthProvider from "./Context/AuthProvider";
import UserProvider from './Context/UserContext';
import TopicProvider from './Context/TopicContext'; // 🔥 Import mới

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider>
            <UserProvider>
                <TopicProvider>
                    <AppProvider>
                        <App />
                    </AppProvider>
                </TopicProvider>
            </UserProvider>
        </AuthProvider>
    </BrowserRouter>
);

reportWebVitals();
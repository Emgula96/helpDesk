import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import { AuthProvider } from './ContextLayers/AuthContext';

function App() {
    return (
        <AuthProvider>
            <div>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;

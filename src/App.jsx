import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/TicketForm';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import MyTickets from './components/MyTickets';
import { AuthProvider } from './ContextLayers/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <div>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/ticketform" element={<MainPage />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/mytickets" element={<MyTickets/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        <ToastContainer />
        </AuthProvider>
    );
}

export default App;

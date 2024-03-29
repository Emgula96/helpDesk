import { Link } from 'react-router-dom';
import { useAuth } from '../ContextLayers/AuthContext';
import { supabase } from '../supabase/supabaseClient';

function Navbar() {
    const { user, setUser, isAdmin, setIsAdmin } = useAuth()
    const handleLogout = async () => {
        try {
            setUser(null)
            setIsAdmin(null)
            await supabase.auth.signOut()
        } catch (error) {
            console.error('Error logging out:', error.message)
        }
    }
    if (!user) {
        return (
            <nav className="bg-blue-700 p-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-shrink-0 text-white mr-6">
                            <span className="font-semibold text-xl tracking-tight">Support App</span>
                        </div>
                        <div>
                            <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 ml-4">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    if (isAdmin) {
        return (
            <nav className="bg-blue-700 p-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-shrink-0 text-white mr-6">
                            <span className="font-semibold text-xl tracking-tight">Support App</span>
                        </div>
                        <div>
                            <div className="flex">
                                <Link to="/admin" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">
                                    Admin Panel
                                </Link>
                                <Link onClick={handleLogout} className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 ml-4" to="/login">
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <nav className="bg-blue-700 p-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <span className="font-semibold text-xl tracking-tight">Support App</span>
                    </div>
                    <div>
                        <div className="flex">
                            <Link to="/ticketform" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">
                                Ticket Form
                            </Link>
                            <Link to="/mytickets" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">
                                My Tickets
                            </Link>
                            <Link onClick={handleLogout} className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 ml-4" to="/login">
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

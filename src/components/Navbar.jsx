import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../ContextLayers/AuthContext';
import { supabase } from '../supabase/supabaseClient';
import { useState } from 'react';

function Navbar() {
    const { user, setUser } = useAuth();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

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
                                Home
                            </Link>
                            <Link to="/admin" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300">
                                Admin Panel
                            </Link>
                            {user ? (
                                <Link onClick={handleLogout} className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 ml-4" to="/login">
                                    Logout
                                </Link>
                            ) : (
                                <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 ml-4">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

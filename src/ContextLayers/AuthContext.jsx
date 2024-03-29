import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (user) {
                try {
                    const { data: userData, error } = await supabase
                        .from('users')
                        .select('*')
                        .eq('email', user.email)
                        .single();
                    
                    if (error) {
                        console.error('Error fetching user data:', error.message);
                        setUserData(null);
                    } else {
                        setUserData(userData);
                    }
                    const { data: adminData, error: adminError } = await supabase
                        .from('users')
                        .select('admin')
                        .eq('email', user.email)
                        .single();
                    
                    if (adminError) {
                        console.error('Error checking admin:', adminError.message);
                        setIsAdmin(false);
                    } else {
                        setIsAdmin(adminData.admin);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
            }
        }

        fetchData();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser, isAdmin, setIsAdmin, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin]= useState(null)
        
        useEffect(() => {
        async function checkAdmin() {
            if (user) {
                try {
                    const { data, error } = await supabase
                        .from('users')
                        .select('admin')
                        .eq('email', user.email)
                        .single()
                    
                    if (error) {
                        console.error('Error checking admin:', error.message)
                        setIsAdmin(false)
                    } else {
                        setIsAdmin(data.admin)
                    }
                } catch (error) {
                    console.error('Error checking admin:', error.message)
                }
            }
        }

        checkAdmin()
        }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

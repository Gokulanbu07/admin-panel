import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// KEYS FOR LOCALSTORAGE
const USERS_KEY = 'gohome_users';
const CURRENT_USER_KEY = 'gohome_current_user';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // --- 1. On mount, check if user is already logged in (from localStorage) ---
    useEffect(() => {
        const savedUserJson = localStorage.getItem(CURRENT_USER_KEY);
        if (savedUserJson) {
            try {
                const savedUser = JSON.parse(savedUserJson);
                setUser(savedUser);
            } catch (e) {
                console.error('Error parsing saved user:', e);
            }
        }
        setIsLoading(false);
    }, []);

    // Helper: get all stored users from localStorage
    const getStoredUsers = () => {
        const data = localStorage.getItem(USERS_KEY);
        if (!data) return [];
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error('Error parsing stored users:', e);
            return [];
        }
    };

    // Helper: save users back to localStorage
    const saveUsers = (users) => {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    };

    // Hard-coded admin user (for demo)
    const ADMIN_USER = {
        id: 'admin-1',
        email: 'admin@gmail.com',
        password: 'Admin@123', // plain just for frontend demo
        full_name: 'Admin User',
        role: 'admin',
    };

    // --- 2. Login Function (NO API) ---
    const login = async (email, password) => {
        try {
            // simulate async call
            await new Promise((resolve) => setTimeout(resolve, 500));

            const storedUsers = getStoredUsers();

            // include admin user + registered users
            const allUsers = [ADMIN_USER, ...storedUsers];

            const foundUser = allUsers.find(
                (u) => u.email === email && u.password === password
            );

            if (!foundUser) {
                return { success: false, message: 'Invalid email or password.' };
            }

            const { password: _pw, ...safeUser } = foundUser; // don't keep password in state
            setUser(safeUser);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

            return { success: true, user: safeUser };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Something went wrong during login.' };
        }
    };

    // --- 3. Register Function (NO API) ---
    // email, password, userData: { full_name, phone_number, role }
    const register = async (email, password, userData) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));

            const users = getStoredUsers();

            // check if email already exists
            const existing = users.find((u) => u.email === email);
            if (existing) {
                return { success: false, message: 'This email is already registered.' };
            }

            const newUser = {
                id: Date.now(),
                email,
                password, // plain for demo
                full_name: userData.full_name,
                phone_number: userData.phone_number,
                role: userData.role || 'user',
            };

            const updatedUsers = [...users, newUser];
            saveUsers(updatedUsers);

            // NOTE: we do NOT log them in automatically now
            // They will be redirected to /login from Register.jsx

            const { password: _pw, ...safeUser } = newUser;
            return { success: true, user: safeUser };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Something went wrong during registration.' };
        }
    };

    // --- 4. Logout Function (NO API) ---
    const logout = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 200));
        } catch (e) {
            // ignore
        } finally {
            setUser(null);
            localStorage.removeItem(CURRENT_USER_KEY);
        }
    };

     const upgradeToOwner = () => {
        if (!user) return;
        setUser(prev =>
            prev
                ? { ...prev, role: 'houseowner' } // your app already uses 'houseowner'
                : prev
        );
    };

    const value = useMemo(
        () => ({
            user,
            isLoading,
            login,
            register,
            logout,
            isAuthenticated: !!user,
            upgradeToOwner,
        }),
        [user, isLoading]
    );

    if (isLoading) {
        // Themed loading indicator while checking the initial session
        const ACCENT_COLOR = '#D4AF37';
        const BACKGROUND_DARK_COLOR = '#050508';
        const TEXT_LIGHT = '#F5F5F5';

        return (
            <>
                <style jsx="true">{`
                    .auth-loading-wrap {
                        height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: radial-gradient(
                            circle at top left,
                            rgba(212, 175, 55, 0.15),
                            ${BACKGROUND_DARK_COLOR}
                        );
                        color: ${TEXT_LIGHT};
                    }
                    .auth-loading-card {
                        padding: 1.6rem 2rem;
                        border-radius: 18px;
                        background: #0b0b10;
                        border: 1px solid rgba(212, 175, 55, 0.4);
                        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.85);
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                    }
                    .auth-loading-icon {
                        width: 42px;
                        height: 42px;
                        border-radius: 999px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: radial-gradient(circle, ${ACCENT_COLOR}, transparent 60%);
                        color: #050508;
                    }
                    .auth-loading-title {
                        font-size: 1rem;
                        font-weight: 600;
                    }
                    .auth-loading-sub {
                        font-size: 0.85rem;
                        color: #c2c2c2;
                    }
                `}</style>

                <div className="auth-loading-wrap">
                    <div className="auth-loading-card">
                        <div className="auth-loading-icon">
                            <i className="fas fa-home"></i>
                        </div>
                        <div>
                            <div className="auth-loading-title">Loading GoHome...</div>
                            <div className="auth-loading-sub">
                                Checking your session and preferences.
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

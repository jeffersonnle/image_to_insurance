import React, { useEffect, useState } from "react";

const SessionContext = React.createContext();

export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) return;

            try {
                const response = await fetch("http://127.0.0.1:8000/users/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.error("Error fetching session data:", error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <SessionContext.Provider value={{ user, setUser }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => React.useContext(SessionContext);

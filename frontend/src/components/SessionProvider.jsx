import React, { useEffect, useState } from "react";

const SessionContext = React.createContext();

export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("refresh_token");
            if (!token) return;
        
            try {
                const response = await fetch("http://127.0.0.1:8000/token/refresh", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refresh_token: token })
                });
        
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                    
                    setUser(data); 
                } else {
                    console.error("Failed to refresh token:", response.statusText);
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching session data:", error);
                setUser(null);
            }
        };
        fetchUser(); 

        const intervalId = setInterval(() => {
            fetchUser(); 
        }, 5 * 60 * 1000);

        return () => clearInterval(intervalId); 
    }, []);

    return (
        <SessionContext.Provider value={{ user, setUser }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => React.useContext(SessionContext);

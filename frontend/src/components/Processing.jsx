import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Processing() {
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Simulate processing delay (e.g., 3 seconds)
        const timeout = setTimeout(() => {
            setShowButton(true);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="w-screen h-screen bg-[#ADD8E6] flex flex-col">
            {/* Header Bar */}
            <div className="w-full bg-gray-800 text-white py-4 px-6 text-xl font-bold shadow-md flex justify-between items-center">
                <span>Image to Insurance</span>
                <div className="flex items-center gap-4">
                    <Button variant="contained" color="primary" size="small">
                        Login/Register
                    </Button>
                    <IconButton color="inherit">
                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>

            {/* Processing Screen */}
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Processing...</h2>
                
                {/* Loading Spinner */}
                <CircularProgress size={80} color="primary" />
                
                {/* Button Appears After 3 Seconds */}
                {showButton && (
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="mt-6" 
                        onClick={() => navigate("/results")}
                    >
                        View Results
                    </Button>
                )}
            </div>
        </div>
    );
}

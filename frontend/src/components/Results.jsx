import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Results() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [selectedItem, setSelectedItem] = useState(null);
    const [analysisResults, setAnalysisResults] = useState({});
    const [imageURL, setImageURL] = useState(null);

    // Load analysis results from localStorage and get the selected image URL from navigation state
    useEffect(() => {
        const storedResults = localStorage.getItem("analysis_results");

        if (storedResults) {
            setAnalysisResults(JSON.parse(storedResults));
        }

        // Get the selected image URL passed from Photos.jsx
        if (location.state?.imageURL) {
            setImageURL(location.state.imageURL);
        }
    }, [location]);

    return (
        <div className="w-screen h-screen bg-[#ADD8E6] flex flex-col">
            {/* Header Bar */}
            <div className="w-full bg-gray-800 text-white py-3 px-4 text-lg font-bold shadow-md flex justify-between items-center">
                <span>Image to Insurance</span>
                <div className="flex items-center gap-2">
                    <Button variant="contained" color="primary" size="small">
                        Logout
                    </Button>
                    <IconButton color="inherit">
                        <SettingsIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="flex w-full h-full p-4">
                {/* Scrollable Items List on the Left */}
                <div className="w-1/2 h-full overflow-y-auto p-2 bg-white rounded-lg shadow-md flex flex-col">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">Identified Items</h2>
                    <div className="flex flex-col gap-2">
                        {Object.keys(analysisResults.items || {}).length > 0 ? (
                            Object.keys(analysisResults.items).map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`p-2 rounded-md shadow-sm cursor-pointer text-sm ${
                                        selectedItem === item ? "bg-blue-200" : "bg-gray-100"
                                    }`}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <p className="font-semibold">{item}</p>
                                    <p className="text-gray-600 text-xs">Value: ${analysisResults.items[item]}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-sm">No items found.</p>
                        )}
                    </div>
                </div>

                {/* Right Section with Displayed Image */}
                <div className="w-1/2 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                        {selectedItem || "Select an item to view its image"}
                    </h2>
                    <div className="w-full h-64 flex items-center justify-center text-gray-500 rounded-md">
                        {selectedItem && imageURL ? (
                            <img src={imageURL} alt={selectedItem} className="w-full max-w-sm rounded-lg shadow-md" />
                        ) : (
                            <p className="text-sm">No image selected</p>
                        )}
                    </div>
                    {/* Smaller Button */}
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        size="small" 
                        className="mt-2 px-2 py-1 text-xs" 
                        style={{ minWidth: "50px" }} 
                        onClick={() => navigate("/")}
                    >
                        Back
                    </Button>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Results() {
  const navigate = useNavigate(); // React Router navigation

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
      
      {/* Main Content */}
      <div className="flex w-full h-full p-6">
        {/* Scrollable Forms List on the Left */}
        <div className="w-1/2 h-full overflow-y-auto p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Preview Forms</h2>
          <div className="flex flex-col gap-4">
            {[...Array(10)].map((_, index) => (
              <Button 
                key={index} 
                variant="outlined" 
                color="primary" 
                fullWidth 
                onClick={() => console.log(`Viewing Form ${index + 1}`)}
              >
                Form {index + 1}
              </Button>
            ))}
          </div>
        </div>

        {/* Right Section with Back Button */}
        <div className="w-1/2 flex flex-col items-center justify-center p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Form to View</h2>
          <Button 
            variant="outlined" 
            color="secondary" 
            size="large" 
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

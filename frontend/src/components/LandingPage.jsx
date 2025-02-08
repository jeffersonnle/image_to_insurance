import React from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

export default function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-[#D8F3FF] flex flex-col">
      {/* Header Bar */}
      <div className="w-full bg-gray-800 text-white py-4 px-6 text-xl font-bold shadow-md flex justify-between items-center">
        <span>Image to Insurance</span>
        <div className="flex items-center gap-4">
          <Button variant="contained" color="primary" size="small" onClick={() => navigate("/login")}>
            Login/Register
          </Button>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full h-full px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Image to Insurance
        </h1>

        <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
          <Button variant="contained" color="primary" size="large" className="!px-8 !py-8 rounded-none" onClick={() => navigate("/photos")}  >
            View Photos
          </Button>
          <Button variant="contained" color="primary" size="large" className="!px-8 !py-8 rounded-none">
            Upload
          </Button>
          <Button variant="contained" color="primary" size="large" className="!px-8 !py-8 rounded-none" onClick={() => navigate("/results")}>
            View Forms
          </Button>
        </div>
      </div>
    </div>
  );
}

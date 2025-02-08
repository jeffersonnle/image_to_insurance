import React from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function LandingPage() {
  return (
    <div className="h-screen bg-[#ADD8E6] flex flex-col">
      {/* Header Bar */}
      <div className="w-full bg-gray-800 text-white py-4 px-6 text-xl font-bold shadow-md flex justify-between items-center">
        <span>Image to Insurance</span>
        <h1 className="text-red-500 text-3xl">Tailwind is Working!</h1>

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
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Image to Insurance
        </h1>

        <div className="flex flex-row gap-4">
          <Button variant="contained" color="primary" size="large" className="!px-6 !py-6 rounded-none">
            View Photos
          </Button>
          <Button variant="contained" color="secondary" size="large" className="!px-6 !py-6 rounded-none">
            Upload
          </Button>
          <Button variant="contained" color="success" size="large" className="!px-6 !py-6 rounded-none">
            View Forms
          </Button>
        </div>
      </div>
    </div>
  );
}

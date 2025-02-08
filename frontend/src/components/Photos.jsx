import React from "react";
import Button from "@mui/material/Button";
import { IconButton, Checkbox } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Photos() {
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
        {/* Scrollable Photo Grid on the Left */}
        <div className="w-1/2 h-full overflow-y-auto p-4 bg-white rounded-lg shadow-md flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-4 flex-grow">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="w-full h-32 bg-gray-300 flex items-center justify-center text-gray-600 relative">
                Photo {index + 1}
                <Checkbox className="absolute bottom-2 right-2" color="primary" />
              </div>
            ))}
          </div>
          {/* Photo Gallery Header Moved to Bottom */}
          <div className="text-center py-4 text-2xl font-bold text-gray-800">Photo Gallery</div>
        </div>

        {/* Right Section with Instructions and Submit Button */}
        <div className="w-1/2 flex flex-col items-center justify-center p-6">
          <div className="w-full p-4 bg-white rounded-md shadow-md text-gray-800 text-center mb-4">
            <p className="font-semibold">Select a photo to analyze</p>
          </div>
          <div className="w-full p-4 bg-white rounded-md shadow-md text-gray-800 text-center mb-4">
            <p className="font-semibold">Photo Guidelines:</p>
            <p className="text-sm">Select a clear photo with a clear view of items and/or furniture you would like to scan.</p>
          </div>
          <Button variant="contained" color="primary" size="large" className="mt-4">
            Submit Photos
          </Button>
        </div>
      </div>
    </div>
  );
}

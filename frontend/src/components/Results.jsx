import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function Results() {
  const navigate = useNavigate();
  const [selectedForm, setSelectedForm] = useState(null);

  const formPreviews = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Form 1",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Form 2",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Form 3",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Form 4",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Form 5",
    }
  ];

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
        {/* Scrollable Forms List on the Left with Previews */}
        <div className="w-1/2 h-full overflow-y-auto p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Preview Forms</h2>
          <div className="flex flex-col gap-4">
            {formPreviews.map((form, index) => (
              <div key={index} className="flex items-center gap-4 bg-gray-100 p-2 rounded-md shadow-sm">
                <img src={form.img} alt={form.title} className="w-16 h-16 rounded-md object-cover" />
                <Button 
                  variant="outlined" 
                  color="primary" 
                  fullWidth 
                  onClick={() => setSelectedForm(form.title)}
                >
                  {form.title}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section with Displayed Form */}
        <div className="w-1/2 flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedForm || "Select a Form to View"}</h2>
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
            {selectedForm ? `Displaying ${selectedForm}` : "No form selected"}
          </div>
        </div>
      </div>
    </div>
  );
}

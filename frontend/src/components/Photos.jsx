import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IconButton, Checkbox, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const itemData = [
  { img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e", title: "Breakfast", author: "@bkristastucchio" },
  { img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d", title: "Burger", author: "@rollelflex_graphy726" },
  { img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45", title: "Camera", author: "@helloimnik" },
  { img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c", title: "Coffee", author: "@nolanissac" },
  { img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8", title: "Hats", author: "@hjrc33" },
  { img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62", title: "Honey", author: "@arwinneil" },
  { img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6", title: "Basketball", author: "@tjdragotta" },
  { img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f", title: "Fern", author: "@katie_wasserman" },
  { img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25", title: "Mushrooms", author: "@silverdalex" }
];

export default function Photos() {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const fileInputRef = React.useRef(null);
  
    const handleSelect = (index) => {
      setSelectedIndex(index === selectedIndex ? null : index);
    };
  
    const handleImageUpload = (event) => {
      const files = event.target.files;
      if (files.length > 0) {
        const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
        setUploadedImages((prev) => [...prev, ...newImages]);
      }
    };
  
    const triggerFileInput = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
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
          {/* Scrollable Photo Grid on the Left using ImageList */}
          <div className="w-1/2 h-full overflow-y-auto p-4 bg-white rounded-lg shadow-md">
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleImageUpload} 
              className="hidden" 
              ref={fileInputRef} 
            />
            <Button variant="contained" color="primary" onClick={triggerFileInput} className="mb-4">
              Upload Image
            </Button>
            <div className="text-center py-4 text-2xl font-bold text-gray-800">Photo Gallery</div>
            <ImageList cols={3} gap={8} sx={{ width: "100%", height: "auto" }}>
              {uploadedImages.map((img, index) => (
                <ImageListItem key={img} className="relative">
                  <img
                    src={img}
                    alt={`Uploaded ${index}`}
                    loading="lazy"
                    className="rounded-md"
                  />
                  <div className="absolute bottom-2 right-2">
                    <Checkbox 
                      color="primary" 
                      checked={selectedIndex === index} 
                      onChange={() => handleSelect(index)}
                    />
                  </div>
                </ImageListItem>
              ))}
            </ImageList>
            {/* Photo Gallery Header Moved to Bottom */}
            
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
              Submit Photo
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
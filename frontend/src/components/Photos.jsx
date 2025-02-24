import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Button from "@mui/material/Button";
import { IconButton, Checkbox, ImageList, ImageListItem, CircularProgress } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { jwtDecode } from "jwt-decode";

const analyzeImage = async (imageUrl) => {
    try {
        const response = await axios.get("http://localhost:8000/analyze/", {
            params: { image_url: imageUrl },
        });

        if (response.status === 200) {
            console.log("Analysis Results:", response.data);
            return response.data;
        } else {
            throw new Error("Image analysis failed.");
        }
    } catch (error) {
        console.error("Error analyzing image:", error.response ? error.response.data : error.message);
        return null;
    }
};

export default function Photos() {
    const [selectedURL, setSelectedURL] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = React.useRef(null);
    const navigate = useNavigate();  

    const handleSelect = (url) => {
        setSelectedURL(url === selectedURL ? null : url);
        console.log(url);
    };

    const handleSubmit = async () => {
        if (!selectedURL) {
            alert("Please select a photo first!");
            return;
        }

        setIsLoading(true); // Start loading

        try {
            const analysisResults = await analyzeImage(selectedURL);
            console.log(analysisResults);
            if (analysisResults) {
                localStorage.setItem("analysis_results", JSON.stringify(analysisResults));
                navigate("/results", { state: { imageURL: selectedURL } });            
            } else {
                alert("Failed to analyze image. Please try again.");
            }
        } catch (error) {
            console.error("Error during analysis:", error);
            alert("An error occurred while analyzing the image.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const getUsernameFromToken = () => {
        const token = localStorage.getItem("access_token");
        if (!token) return null;

        try {
            const decodedToken = jwtDecode(token); 
            return decodedToken.sub; 
        } catch (error) {
            console.error("Error decoding the token", error);
            return null;
        }
    };

    const handleImageUpload = async (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append("image", file);
            });

            const username = getUsernameFromToken();
            if (!username) {
                console.error("No username found in the token.");
                return;
            }

            try {
                const response = await axios.post("http://localhost:8000/upload/", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    params: { username },
                });

                if (response.data.image_url) {
                    console.log(response.data.image_url);
                    setUploadedImages((prev) => [...prev, response.data.image_url]);
                }
            } catch (error) {
                console.error("Error uploading image", error);
            }
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const fetchUserImages = async () => {
        const username = getUsernameFromToken();
        if (!username) {
            console.error("No username found in the token.");
            return;
        }

        try {
            const response = await axios.get("http://localhost:8000/images/", {
                params: { username }
            });

            if (response.data.image_urls) {
                setUploadedImages(response.data.image_urls);
            }
        } catch (error) {
            console.error("Error fetching images", error);
        }
    };

    useEffect(() => {
        fetchUserImages();
    }, []);

    return (
        <div className="w-screen h-screen bg-[#ADD8E6] flex flex-col">
            {/* Header Bar */}
            <div className="w-full bg-gray-800 text-white py-4 px-6 text-xl font-bold shadow-md flex justify-between items-center">
                <span>Image to Insurance</span>
                <div className="flex items-center gap-4">
                    <Button variant="contained" color="primary" size="small">
                        Logout
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
                                        checked={selectedURL === img} 
                                        onChange={() => handleSelect(img)}
                                    />
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
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
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        className="mt-4"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit Photo"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

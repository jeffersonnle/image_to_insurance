import React from "react";
import Button from "@mui/material/Button";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to My Landing Page</h1>
      
      <div className="flex gap-6">
        <Button variant="contained" color="primary" size="large" className="!px-8 !py-4">
          Get Started
        </Button>
        <Button variant="contained" color="secondary" size="large" className="!px-8 !py-4">
          Learn More
        </Button>
        <Button variant="contained" color="success" size="large" className="!px-8 !py-4">
          Contact Us
        </Button>
      </div>
    </div>
  );
}

export default LandingPage; // Make sure it's exported

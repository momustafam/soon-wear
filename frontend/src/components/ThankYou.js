import React, { useState, useEffect } from "react";
import { Progress } from "@material-tailwind/react";

function ThankYou() {
  const [isVisible, setIsVisible] = useState(true);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let startTime = Date.now();

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = (elapsedTime / 5000) * 100; // Calculate progress percentage

      // Update progress value, but cap it at 100% to prevent exceeding
      setProgressValue(Math.min(progress, 100));

      // Check if 5 seconds have passed
      if (elapsedTime >= 5000) {
        setIsVisible(false);
        clearInterval(timer);
      }
    }, 100); // Update progress every 100 milliseconds

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []); // Empty dependency array ensures this effect runs only once after mount

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          {/* Blurred Background Overlay */}
          <div className="absolute top-0 left-0 w-full h-ful" />

          {/* ThankYou Content */}
          <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow-lg">
            {/* Progress Bar */}
            <Progress value={progressValue} color="green" />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-green-600 w-28 h-28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-4xl font-bold">شكرًا لك !</h1>
            <p>شكراً لك على اهتمامك وطلبك من موقعنا.</p>
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ThankYou;

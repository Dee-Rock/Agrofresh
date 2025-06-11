
import { useState, useEffect } from "react";

const BackgroundSlideshow = () => {
  const images = [
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // Corn field
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // Tomatoes
    "https://images.unsplash.com/photo-1592395001001-0ad03b2b7c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // Green vegetables
    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // Farm field
    "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // Fresh produce
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-30" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}
      {/* Overlay to ensure content readability */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
    </div>
  );
};

export default BackgroundSlideshow;

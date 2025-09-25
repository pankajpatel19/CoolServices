import React, { useState, useEffect } from "react";
import { Home, RefreshCw, Search, ArrowLeft } from "lucide-react";

function NotFound() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(glitchInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        ></div>
      ))}

      <div
        className="text-center z-10 max-w-4xl mx-auto transform transition-transform duration-100"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        {/* 404 Number with glitch effect */}
        <div className="relative mb-8">
          <h1
            className={`text-8xl md:text-9xl lg:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 leading-none transform transition-all duration-300 hover:scale-105 ${
              glitchActive ? "animate-pulse" : ""
            }`}
            style={{
              textShadow: glitchActive
                ? "2px 0 #ff00ff, -2px 0 #00ffff, 0 2px #ffff00"
                : "0 0 30px rgba(139, 92, 246, 0.5)",
            }}
          >
            404
          </h1>

          {/* Glitch overlay */}
          {glitchActive && (
            <h1 className="absolute inset-0 text-8xl md:text-9xl lg:text-[12rem] font-black text-red-500 opacity-70 transform translate-x-1 -translate-y-1 leading-none">
              404
            </h1>
          )}
        </div>

        {/* Main message */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white animate-bounce">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have vanished into the digital
            void. Don't worry though, even the best explorers sometimes take a
            wrong turn in cyberspace.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-blue-700"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-emerald-700 hover:to-teal-700"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Home
          </button>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default NotFound;

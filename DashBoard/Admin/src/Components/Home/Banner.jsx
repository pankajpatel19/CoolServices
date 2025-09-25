import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
  ArrowRight,
  Play,
  CheckCircle,
  Clock,
  Users,
  Star,
  Wrench,
  Home,
  Phone,
} from "lucide-react";

function Banner() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  const testimonials = [
    {
      text: "Excellent service! Fixed my AC in 30 minutes.",
      author: "Sarah M.",
    },
    { text: "Professional technicians, fair pricing.", author: "John D." },
    { text: "Quick response time and quality work.", author: "Maria L." },
  ];

  const features = [
    { icon: CheckCircle, text: "Certified Technicians" },
    { icon: Clock, text: "24/7 Emergency Service" },
    { icon: Star, text: "5-Star Rating" },
    { icon: Users, text: "1000+ Happy Customers" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleBookService = () => {};

  const handleCallNow = () => {
    console.log("Initiate phone call");
  };

  const handleWatchVideo = () => {
    navigate("/addbooking");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>
      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        ></div>
      ))}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8 animate-in slide-in-from-left duration-700">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                #1 Home Service Provider
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-white">Fast</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Home Appliance
                  </span>
                  <br />
                  <span className="text-white">Service</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                  Get reliable repair & maintenance at your doorstep with
                  trusted technicians and lightning-fast response times. Your
                  satisfaction is guaranteed!
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm font-medium">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleBookService}
                  className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Wrench className="w-5 h-5" />
                  <Link to="/Home/addbooking">
                    <span>Book a Service Now</span>
                  </Link>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button
                  onClick={handleCallNow}
                  className="flex items-center justify-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span>
                    <a href={`tel:${7043912611}`}>Call Now</a>
                  </span>
                </button>
              </div>

              {/* Testimonial */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-white italic mb-2">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <p className="text-gray-300 text-sm">
                  - {testimonials[currentTestimonial].author}
                </p>
              </div>
            </div>

            {/* Right Visual Section */}
            <div className="relative animate-in slide-in-from-right duration-700 delay-300">
              {/* Main Service Card */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-20"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  {/* Service Demo */}
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
                    <div className="relative flex items-center justify-center h-48">
                      <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                        <Home className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    {/* Play button overlay */}
                    <button
                      onClick={handleWatchVideo}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 group">
                        <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        30min
                      </div>
                      <div className="text-xs text-gray-300">Avg Response</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        1000+
                      </div>
                      <div className="text-xs text-gray-300">Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        4.9★
                      </div>
                      <div className="text-xs text-gray-300">Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Service Cards */}
              <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white text-sm font-medium">
                    Available 24/7
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 animate-pulse">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white text-sm font-medium">
                    Certified Experts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-20">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80L1200,75L1200,120L1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>
      {/* CSS for custom animations
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style> */}
    </div>
  );
}

export default Banner;

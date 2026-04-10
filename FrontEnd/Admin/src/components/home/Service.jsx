import React, { useState } from "react";
import {
  ArrowRight,
  Snowflake,
  Wrench,
  Refrigerator,
  Settings,
  CheckCircle,
  Star,
  Clock,
  Shield,
} from "lucide-react";

function Service() {
  const [hoveredService, setHoveredService] = useState(null);

  const handleMoreClick = () => {
    console.log("Navigate to more services");
  };

  const services = [
    {
      icon: Snowflake,
      title: "A/C Service",
      description:
        "Professional air conditioning repair, maintenance, and installation",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Wrench,
      title: "Washing Machine Repair",
      description: "Expert washing machine troubleshooting and repair services",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Refrigerator,
      title: "Refrigerator Services",
      description: "Complete refrigerator repair and maintenance solutions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Settings,
      title: "Others (Microwave, Geyser, etc.)",
      description: "Comprehensive repair services for all home appliances",
      color: "from-orange-500 to-red-500",
    },
  ];

  const features = [
    { icon: CheckCircle, text: "24/7 Emergency Service" },
    { icon: Star, text: "Certified Technicians" },
    { icon: Clock, text: "Quick Response Time" },
    { icon: Shield, text: "100% Satisfaction Guarantee" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative px-4 py-16 sm:px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section: Heading + Image */}
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            {/* Header */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                <Star className="w-4 h-4 mr-2" />
                Premium Home Services
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  We Provide
                </span>
                <br />
                <span className="text-gray-800">All Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional, reliable, and affordable home appliance services
                delivered by certified technicians with years of experience.
              </p>
            </div>

            {/* Service Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
                <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                  <div className="relative text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Wrench className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Professional Service
                    </h3>
                    <p className="text-gray-600">
                      Expert technicians at your service
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={handleMoreClick}
                className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Section: Services List */}
          <div className="space-y-6 animate-in slide-in-from-right duration-700 delay-300">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                Services We Offer
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive solutions for all your home appliance needs
              </p>
            </div>

            <div className="space-y-4">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    className="group relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p
                          className={`text-gray-600 transition-all duration-300 ${
                            hoveredService === index
                              ? "opacity-100 max-h-20"
                              : "opacity-70 max-h-0 lg:max-h-20 lg:opacity-70"
                          }`}
                        >
                          {service.description}
                        </p>
                      </div>
                      <ArrowRight
                        className={`w-5 h-5 text-gray-400 group-hover:text-blue-600 transform transition-all duration-300 ${
                          hoveredService === index ? "translate-x-1" : ""
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  50+
                </div>
                <div className="text-sm text-gray-600">Expert Technicians</div>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  24/7
                </div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;

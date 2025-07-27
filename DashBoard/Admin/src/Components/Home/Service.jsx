import React from "react";

function Service() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start px-4 py-8 sm:px-8 md:px-16 lg:px-24 bg-zinc-200 gap-8 md:gap-12">
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left">We Provide All Services....</h2>
        <div className="w-full flex justify-center md:justify-start mt-6">
          <img
            src="Media/Service.jpg"
            alt="Service"
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-3xl shadow-md"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start mt-8 md:mt-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-zinc-500 font-semibold text-center md:text-left">Services We provide</h2>
        <ul className="mt-6 sm:mt-8 md:mt-10 text-lg sm:text-xl md:text-2xl font-serif text-center md:text-left space-y-2">
          <li>A/c Service</li>
          <li>Washing Machine Repair</li>
          <li>Refrigrator Services</li>
          <li>Other's</li>
        </ul>
      </div>
    </div>
  );
}

export default Service;

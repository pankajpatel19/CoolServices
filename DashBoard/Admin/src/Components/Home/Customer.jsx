import React from "react";

function Customer() {
  return (
    <>
      <div className="Banner px-4 py-8 sm:px-8 md:px-16 lg:px-24 bg-opacity-90">
        <h1 className="text-2xl sm:text-4xl md:text-5xl text-zinc-50 font-serif text-center md:text-left">
          Any Query About Services
        </h1>
        <div className="mt-6">
          <h2 className="text-lg sm:text-2xl md:text-3xl text-zinc-50 font-serif mt-2 md:mt-5 text-center md:text-left">Contact Us</h2>
          <div>
            <h1 className="text-white text-base sm:text-lg md:text-xl">Cool Services</h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-end mt-8 md:mt-0">
          <div className="md:w-80 w-full mx-auto md:mx-0">
            <h2 className="text-lg sm:text-2xl md:text-3xl mb-2 text-zinc-50 font-serif text-center md:text-left">
              Chat With Us
            </h2>
            <img
              src="Media/wp.jpg"
              alt="WhatsApp"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-2xl mx-auto md:mx-0"
            />
            <div className="text-white bg-green-500 w-full p-3 sm:p-4 rounded-2xl mt-2 text-center">
              <a href="">
                <i className="fa-brands fa-whatsapp ml-2"></i>
                <span className="ml-2">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer;

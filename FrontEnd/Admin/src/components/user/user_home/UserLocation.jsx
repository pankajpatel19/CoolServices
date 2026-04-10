import { AlertCircle, MapPin, Wifi, WifiOff } from "lucide-react";

function UserLocation() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main content card */}
        <div className="relative z-10 max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 text-center">
            {/* Icon section */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <WifiOff className="w-12 h-12 text-white animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-900" />
                </div>
              </div>
            </div>

            {/* Main heading */}
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Service is{" "}
                <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  not available
                </span>
                <br />
                in your area
              </h2>

              <div className="flex items-center justify-center gap-2 text-red-300 text-lg md:text-xl font-semibold mt-4">
                <MapPin className="w-5 h-5 animate-bounce" />
                <span className="bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">
                  Sorry
                </span>
              </div>
            </div>

            {/* Decorative line */}
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-6 rounded-full"></div>

            {/* Additional message */}
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-md mx-auto leading-relaxed">
              We're working hard to expand our coverage. Check back soon for
              updates in your location.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Check Coverage
              </button>
              <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm">
                Get Notified
              </button>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-400 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-pink-400 rounded-full opacity-60 animate-ping animation-delay-1000"></div>
          <div className="absolute top-1/2 -left-8 w-4 h-4 bg-yellow-400 rounded-full opacity-40 animate-bounce"></div>
        </div>

        {/* Custom animations */}
        <style>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
        `}</style>
      </div>
    </div>
  );
}

export default UserLocation;

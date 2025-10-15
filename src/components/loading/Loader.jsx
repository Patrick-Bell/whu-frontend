import { RotatingLines } from "react-loader-spinner";

// Loader.jsx
const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center py-8 h-full">
        {/* Animated Dots */}
        <div className="">
        <div className="flex space-x-1 mb-2 items-center justify-center bg-gray-50 border border-gray-200 rounded-lg p-4">
         <RotatingLines strokeColor="black" height={25} width={25} />
        </div>
        </div>
      </div>
    );
  };
  
  export default Loader;
  
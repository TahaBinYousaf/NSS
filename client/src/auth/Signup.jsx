import Image1 from "../assets/logo.png";
import PropTypes from 'prop-types'; // Import PropTypes

export default function Signup({ modalTypeSet }) {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-[400px] shadow-lg relative mx-4">
        <button onClick={() => modalTypeSet("")} className="absolute top-4 font-bold cursor-pointer right-4 text-3xl">
          &times;
        </button>
        
        <div className="flex justify-center mb-4">
          <img src={Image1} alt="Logo" className="w-14 md:w-18 object-contain" />
        </div>
        
        <h2 className="text-center text-xl font-semibold text-gray-800">Create new account</h2>
        <div className="space-y-1 mt-5">
          <input
            type="text"
            id="firstName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter First name"
          />
        </div>
        
        <div className="space-y-1 mt-5">
          <input
            type="text"
            id="lastName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter Last name"
          />
        </div>
        
        <div className="space-y-1 mt-5">
          <input
            type="text"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your email"
          />
        </div>
        
        <div className="space-y-1 mt-5">
          <input
            type="text"
            id="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter phone number"
          />
        </div>
        
        <div className="space-y-1 mt-3">
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your password"
          />
        </div>
        
        <div className="space-y-1 mt-3">
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Confirm your password"
          />
        </div>
          
        <button className="w-full cursor-pointer bg-black text-white mt-5 rounded-full py-2">Create Account</button>
        
        <p onClick={() => modalTypeSet("Login")} className="text-center text-sm mt-4 cursor-pointer hover:underline">
          Already have an account? Login!
        </p>
      </div>
    </div>
  );
}

// Add PropTypes validation
Signup.propTypes = {
  modalTypeSet: PropTypes.func.isRequired
};
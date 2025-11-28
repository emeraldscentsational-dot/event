import React, { useState } from "react";
import eventneeder from "./../../assets/event-needer.png";
import venueowner from "./../../assets/venue-owner.png";
import { useNavigate } from "react-router-dom";

const SelectProfile = () => {
  const [selectedAccountType, setSelectedAccountType] = useState(null);
  const navigate = useNavigate();

  const handleAccountTypeClick = (type: any) => {
    setSelectedAccountType(type);
  };

  const handleProceed = () => {
    if (selectedAccountType) {
      console.log(`Selected Account Type: ${selectedAccountType}`);
      navigate(`/${selectedAccountType}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">Select an Account Type</h1>
        <p className="text-gray-600 mt-2">
          Selecting the right account type helps us tailor your experience to
          meet your specific needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div
          className={`border-2 rounded-lg cursor-pointer  p-12 transition-transform transform hover:scale-105 shadow-sm ${
            selectedAccountType === "service-needers"
              ? "border-green bg-teal-50"
              : "border-gray-300"
          }`}
          onClick={() => handleAccountTypeClick("service-needers")}
        >
          <img
            src={eventneeder}
            alt="Event Service Needer"
            className="mb-4 mx-auto h-28"
          />
          <h2 className="text-lg font-semibold text-center">
            Event Service Needer
          </h2>
          <p className="text-sm text-gray-600 text-center mt-2">
            Suitable for people looking to organize or host an event.
          </p>
        </div>

        <div
          className={`border-2 rounded-lg p-12 cursor-pointer transition-transform transform hover:scale-105 shadow-sm ${
            selectedAccountType === "service-providers"
              ? "border-green bg-teal-50"
              : "border-gray-300"
          }`}
          onClick={() => handleAccountTypeClick("service-providers")}
        >
          <img
            src={venueowner}
            alt="Event Venue Owner"
            className="mb-4 mx-auto h-28"
          />
          <h2 className="text-lg font-semibold text-center">
            Event Venue Owner
          </h2>
          <p className="text-sm text-gray-600 text-center mt-2">
            Suitable for people looking to list their event venues for rent.
          </p>
        </div>
      </div>

      <button
        onClick={handleProceed}
        disabled={!selectedAccountType}
        className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors ${
          selectedAccountType
            ? "bg-green hover:bg-teal-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Proceed →
      </button>
    </div>
  );
};

export default SelectProfile;

import { FaTimes } from "react-icons/fa";

interface QuizModalProps {
  title: string;
  description: string;
  buttonText: string;
  onContinue: (...args: any[]) => any;
  onClose: () => void; // Ensure onClose is a function that can be called without arguments
  icon: React.ReactNode; // Accept any ReactNode (icon) dynamically
}

const ProfileModal = ({
  title,
  description,
  buttonText,
  onContinue,
  onClose,
  icon,
}: QuizModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4 relative">
        {/* Cancel Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
            {icon} {/* Render the dynamic icon */}
          </div>
          <h3 className="text-xl text-black font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>

          <button
            onClick={onContinue}
            className="px-16 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-900"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileModal;

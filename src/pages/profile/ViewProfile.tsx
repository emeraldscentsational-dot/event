import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Edit2, 
  Camera, 
  Trash2, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  HelpCircle
} from 'lucide-react';

interface ProfileData {
  accountType: 'Event Needer' | 'Event Planner';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  residentialAddress: string;
  nin: string;
  cityOfBirth: string;
  favoriteBook: string;
}

interface VerificationStatus {
  email: boolean;
  phone: boolean;
  id: 'verified' | 'pending' | 'failed';
}

const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    accountType: 'Event Needer',
    firstName: 'Oluwatosin',
    lastName: 'Oresanwo',
    dateOfBirth: '01/05/1989',
    email: 'example@domain.com',
    phoneNumber: '08012345678',
    residentialAddress: '1, D EventMatcha Street, Ikoyi, Lagos, Nigeria',
    nin: '01232784835845',
    cityOfBirth: 'Lagos',
    favoriteBook: 'Things Fall Apart'
  });

  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    email: true,
    phone: false,
    id: 'failed'
  });

  const [isEditing, setIsEditing] = useState({
    personalDetails: false,
    securityQuestions: false
  });

  const [profileImage, setProfileImage] = useState<string>('/api/placeholder/150/150');
  const [idDocument, setIdDocument] = useState<string>('/api/placeholder/400/250');

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (type: 'profile' | 'id') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (type === 'profile') {
            setProfileImage(result);
          } else {
            setIdDocument(result);
            setVerificationStatus(prev => ({ ...prev, id: 'pending' }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const StatusBadge: React.FC<{ status: boolean; label: string }> = ({ status, label }) => (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      status 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {status ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
      {label}
    </span>
  );

  const VerificationBadge: React.FC<{ status: 'verified' | 'pending' | 'failed' }> = ({ status }) => {
    const config = {
      verified: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Verified' },
      pending: { bg: 'bg-orange-100', text: 'text-orange-800', icon: Clock, label: 'Pending Verification' },
      failed: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle, label: 'Verification Failed' }
    };

    const { bg, text, icon: Icon, label } = config[status];

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Profile</h1>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-gray-600">Account Type:</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
              <User className="w-4 h-4 mr-1" />
              {profileData.accountType}
            </span>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Change
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Profile Picture */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Picture</h2>
            
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                />
                <button
                  onClick={() => handleImageUpload('profile')}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => setProfileImage('/api/placeholder/150/150')}
                  className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleImageUpload('profile')}
                  className="px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Replace
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Personal Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Details</h2>
              <button
                onClick={() => setIsEditing(prev => ({ ...prev, personalDetails: !prev.personalDetails }))}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                {isEditing.personalDetails ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: 'First Name', field: 'firstName' as keyof ProfileData, icon: User },
                { label: 'Last Name', field: 'lastName' as keyof ProfileData, icon: User },
                { label: 'Date of Birth', field: 'dateOfBirth' as keyof ProfileData, icon: Calendar },
                { label: 'Email Address', field: 'email' as keyof ProfileData, icon: Mail },
                { label: 'Phone Number', field: 'phoneNumber' as keyof ProfileData, icon: Phone },
                { label: 'Residential Address', field: 'residentialAddress' as keyof ProfileData, icon: MapPin },
              ].map(({ label, field, icon: Icon }) => (
                <div key={field} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {isEditing.personalDetails ? (
                      <input
                        type="text"
                        value={profileData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData[field]}</p>
                    )}
                  </div>
                  {field === 'email' && (
                    <StatusBadge status={verificationStatus.email} label="Verified" />
                  )}
                  {field === 'phoneNumber' && (
                    <>
                      <StatusBadge status={verificationStatus.phone} label="Unverified" />
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Verify Phone Number
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NIN Verification */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">NIN Verification</h2>
          
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your NIN</label>
              <input
                type="text"
                value={profileData.nin}
                onChange={(e) => handleInputChange('nin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your NIN"
              />
            </div>
          </div>
        </div>

        {/* Valid Identification Document */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900">Valid Identification Document</h2>
              <VerificationBadge status={verificationStatus.id} />
            </div>
            <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={idDocument}
                alt="ID Document"
                className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
              />
            </div>
            
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => setIdDocument('/api/placeholder/400/250')}
                className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => handleImageUpload('id')}
                className="px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
              >
                Replace
              </button>
            </div>
          </div>

          {/* Error Message */}
          {verificationStatus.id === 'failed' && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">
                    Manual Verification of Identification Document Failed! ⚠️
                  </h3>
                  <p className="text-sm text-red-700">
                    We're sorry, but the manual verification of your identification document has failed. To resolve this issue please 
                    ensure that the uploaded document is clear, legible, and matches the information provided during registration. If 
                    you believe there has been a mistake, you may try uploading the document again. If you continue to experience 
                    difficulties, please reach out to our support team for assistance.
                  </p>
                  <p className="text-sm text-red-700 mt-2">
                    Until this issue is resolved, you won't be able to make bookings on the platform. Thank you for your understanding 
                    and cooperation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security Questions */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Security Questions</h2>
            <button
              onClick={() => setIsEditing(prev => ({ ...prev, securityQuestions: !prev.securityQuestions }))}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              <Edit2 className="w-4 h-4" />
              {isEditing.securityQuestions ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="space-y-4">
            {[
              { question: 'In what city were you born?', field: 'cityOfBirth' as keyof ProfileData },
              { question: 'What is your favorite book?', field: 'favoriteBook' as keyof ProfileData },
            ].map(({ question, field }) => (
              <div key={field} className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{question}</label>
                  {isEditing.securityQuestions ? (
                    <input
                      type="text"
                      value={profileData[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData[field]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
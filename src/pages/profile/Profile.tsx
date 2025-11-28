import React, { Fragment, useCallback, useState } from "react";
import { useForm, FieldValues, useFieldArray } from "react-hook-form";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  FileKey,
  ShieldCheck,
  User,
  Eye,
  Camera,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  HelpCircle,
  Calendar,
  ArrowRight,
  IdCardIcon,
  User2,
  CheckCircle,
  ChevronDown,
  Check,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import { FormInput } from "components/Input/FormInput";
import { FormSection } from "components/Form/FormSection";
import { ProfileFormData } from "types/form";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import ProfileModal from "components/modal/ProfileModal";
import { MdWarning } from "react-icons/md";
import { SecurityQuestion, SecurityQuestionsFormData } from "types/types";
import { securityQuestions } from "data/questions";
import { FaCircleCheck } from "react-icons/fa6";
import { BiCamera } from "react-icons/bi";
import { useCompletevendorprofileMutation, useVerifycacMutation } from "./../../redux/api/vendorApiSlice";
import { useUploadImageMutation, useVerifyninMutation } from "./../../redux/api/customerApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store";
import toast from "react-hot-toast";

function Profile() {
  const [activeStep, setActiveStep] = useState("personal");
  const [image, setImage] = useState<string | null>(null);
  const [isverifySucessfull, SetIsverifySucessfull] = useState(false);
  const [isVerified, SetIsVerfied] = useState(false);
  const [isverifyCACSucessfull, SetIsverifyCACSucessfull] = useState(false);
  const [isCACVerified, SetIsCACVerfied] = useState(false);
  const { id, firstName, lastName, email } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>();
  const [completevendorProfile, { isLoading: isCompletingProfile }] = useCompletevendorprofileMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  const [verifynin, { isLoading: isVerifyingNin, error: ninError }] = useVerifyninMutation();
  const [verifycac, { isLoading: isVerifyingcac, error: cacError }] = useVerifycacMutation();
  const steps = [
    { id: "personal", label: "Personal Details", icon: User, completed: true },
    {
      id: "nin",
      label: "NIN Verification",
      icon: FileKey,
      completed: false,
    },
    {
      id: "company",
      label: "Company Details",
      icon: Building2,
      completed: false,
    },
    {
      id: "cac",
      label: "CAC Verification",
      icon: Building2,
      completed: false,
    },
    {
      id: "security",
      label: "Security Questions",
      icon: ShieldCheck,
      completed: false,
    },
    { id: "preview", label: "Preview", icon: Eye, completed: false },
  ];

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    const currentIndex = steps.findIndex((step) => step.id === activeStep);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
      steps[currentIndex].completed = true;
    }
  };


  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Set preview URL
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      // Prepare optional fields (if needed)
      const fields = {
        ImageOwner: 'Profile Image',
        Name: 'Profile Image',
        description: 'Uploaded via frontend'
      };

      // Upload the image
      try {
        const result = await uploadImage({ file, ...fields }).unwrap();
        console.log('Upload success:', result);
        setValue("profilePictureld", result?.value?.id)
      } catch (error) {
        toast.error("error uploading try again")
        console.error('Upload failed:', error);
      }
    }
  };


  const handleRemove = (): void => {
    setImage(null);
  };
  // const handleNINSubmit = (): void => {
  //   SetIsverifySucessfull(true);
  //   console.log("hfhfehfeh", isverifySucessfull);
  // };
  const handleNINSubmit = useCallback(async () => {

    try {
      const res = await verifynin(watch('nin')).unwrap()
      console.log(res, "ninnin")
      SetIsverifySucessfull((prev) => !prev);
      setValue('firstName', res?.data?.firstName);
      setValue('lastName', res?.data?.lastName);
      setValue('email', res?.data?.email);
      setValue('DateOfBirth', res?.data?.dateOfBirth);
      setValue('nin', res?.data?.nin);
    } catch (error: any) {
      toast.error(error?.data?.message || "try again")
      console.log(error)
    }
  }, []);
  const handleNINVerified = useCallback(() => {
    SetIsverifySucessfull((prev) => !prev);

    SetIsVerfied((prev) => !prev);
    console.log("oepn Modal:", isverifySucessfull); // This might log the previous state due to async updates
  }, []);
  const handleClose = useCallback(() => {
    SetIsverifySucessfull((prev) => !prev);
    console.log("Closing Modal:", isverifySucessfull); // This might log the previous state due to async updates
  }, []);
  const handleCACSubmit = useCallback(async () => {
    try {
      const res = await verifycac(watch('cacRegistrationNumber')).unwrap()
      SetIsverifyCACSucessfull((prev) => !prev);
      setValue('firstName', res?.data?.firstName);
      setValue('registeredName', res?.data?.CompanyName);
      setValue('cacRegistrationNumber', res?.data?.RegNumber);
    } catch (error: any) {
      toast.error(error?.data?.message || "try again")
      console.log(error)
    }
  }, []);
  const handleCACVerified = useCallback(() => {
    SetIsverifyCACSucessfull((prev) => !prev);

    SetIsCACVerfied((prev) => !prev);
  }, []);
  const handleCACClose = useCallback(() => {
    SetIsverifyCACSucessfull((prev) => !prev);
  }, []);

const handlecompleteprofile = () => {
  console.log("iiii");
  handleSubmit(async (data) => {
    try {
      const response = await completevendorProfile({ ...data, UserId: id,CACNumber:data.cacRegistrationNumber }).unwrap();
      toast.success("Profile completed successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error completing profile. Please try again.");
    }
  })(); 
};

  // for question profile

  const [questions, setQuestions] =
    useState<SecurityQuestion[]>(securityQuestions);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  //   watch
  // } = useForm<SecurityQuestionsFormData>({
  //   defaultValues: {
  //     selectedQuestions: []
  //   }
  // });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "selectedQuestions",
  });

  const selectedQuestions = watch("selectedQuestions");

  const handleQuestionSelect = (question: SecurityQuestion) => {
    const index = selectedQuestions.findIndex((q) => q.id === question.id);

    if (index === -1) {
      if (selectedQuestions.length >= 2) return;
      append({ id: question.id, question: question.question, answer: "" });
    } else {
      remove(index);
    }

    setQuestions(
      questions.map((q) =>
        q.id === question.id ? { ...q, isSelected: !q.isSelected } : q
      )
    );
  };

  const onSubmitQestion = async (data: SecurityQuestionsFormData) => {
    if (data.selectedQuestions.length !== 2) {
      return;
    }

    setIsSubmitting(true);
    console.log("Form submitted with data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
  };
  const renderPersonalDetails = () => (
    <FormSection
      title="Personal Details"
      subtitle="Profile Picture (Optional)"
      description="Personalize your account and build trust with potential clients by putting a face to your name. You can edit this anytime"
    >
      <div className="flex flex-col items-start   space-y-4">
        <div className="relative w-32 h-32">
          <label htmlFor="upload-input" className="cursor-pointer">
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-full border border-gray-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full border border-gray-300">
                <BiCamera size={28} />
              </div>
            )}
          </label>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        {image && (
          <div className="flex gap-2">
            <button
              className="border text-red-400 px-3 py-1 rounded-lg"
              onClick={handleRemove}
            >
              Remove
            </button>
            <label
              htmlFor="upload-input"
              className="border text-teal-700 px-3 py-1 rounded-lg cursor-pointer"
            >
              Replace
            </label>
          </div>
        )}
      </div>
      <p>Full Name</p>
      <div className="grid grid-cols-2 gap-6">
        <FormInput
          label="First Name"
          name="firstName"
          register={register}
          error={errors.firstName}
          required
        />
        <FormInput
          label="Last Name"
          name="lastName"
          register={register}
          error={errors.lastName}
          required
        />
      </div>

      <FormInput
        label="Date of Birth"
        name="DateOfBirth"
        type="date"
        register={register}
        error={errors.DateOfBirth}
        icon={Calendar}
        required
      />

      <FormInput
        label="Email Address"
        name="email"
        type="email"
        register={register}
        placeholder="Enter your Email"
        error={errors.email}
        icon={Mail}
        required
      />

      <FormInput
        label="Phone Number"
        name="PhoneNumber"
        type="tel"
        register={register}
        error={errors.PhoneNumber}
        placeholder="Enter your Phone"
        icon={Phone}
        required
      />

      <FormInput
        label="Residential Address"
        name="ResidentialAddress"
        placeholder="Enter your Residential Address"
        register={register}
        error={errors.ResidentialAddress}
        icon={MapPin}
        required
      />

      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
      >
        <span>Save and Proceed</span>
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </FormSection>
  );

  const renderVerification = () => (
    <FormSection
      title="NIN Verification"
    // description="Please enter your NIN verification number to proceed."
    >
      {isVerified ? null : (
        <>
          {" "}
          <FormInput
            label="National Identification Number (NIN)"
            name="nin"
            register={register}
            error={errors.nin}
            placeholder="Enter your NIN number"
            icon={IdCardIcon}
            validation={{
              minLength: { value: 11, message: "Invalid NIN" },
              maxLength: { value: 11, message: "Invalid NIN" },
            }}
            required
          />
          <button
            onClick={handleSubmit(handleNINSubmit)}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
          >
            <span>Verify NIN</span>
          </button>
        </>
      )}
      {isverifySucessfull && (
        <ProfileModal
          buttonText="okay"
          title="NIN Verification Successful!"
          icon={<FaCheckCircle className="w-6 h-6 text-green-500" />} // Pass the icon dynamically
          description="Congratulations, your NIN was verified successfully. Kindly click okay to continue"
          onContinue={handleNINVerified}
          onClose={handleClose}
        />
      )}

      {isVerified && (
        <>
          <FormInput
            label="National Identification Number (NIN)"
            name="nin"
            register={register}
            error={errors.companyName}
            placeholder="12345678"
            icon={IdCardIcon}
            required
            disabled
          />

          <FormInput
            label="First Name"
            name="firstName"
            register={register}
            placeholder="Victor"
            icon={User2}
            error={errors.firstName}
            required
            disabled
          />
          <FormInput
            label="Last Name"
            name="lastName"
            placeholder="David"
            register={register}
            icon={User2}
            error={errors.lastName}
            required
            disabled
          />

          <FormInput
            disabled
            label="Email Address"
            name="email"
            type="email"
            register={register}
            placeholder="davidvcitor297@gmail.com"
            error={errors.email}
            icon={Mail}
            required
          />

          <FormInput
            label="Phone Number"
            name="PhoneNumber"
            type="tel"
            register={register}
            error={errors.PhoneNumber}
            placeholder="+2349087753533"
            icon={Phone}
            required
            disabled
          />

          <FormInput
            label="Residential Address"
            name="ResidentialAddress"
            placeholder="Block 6 Profesors Village Covenant University"
            register={register}
            error={errors.ResidentialAddress}
            icon={MapPin}
            required
            disabled
          />
          <button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
          >
            <span>Proceed</span>
          </button>
        </>
      )}
      {/* is error modal */}
      {/* {isverifySucessfull && (
        <ProfileModal
          buttonText="okay"
          title="NIN API Service Unavailable"
          icon={<MdWarning className="w-6 h-6 text-orange-200" />} // Pass the icon dynamically
          description="We were unable to verify your NIN due to a temporary downtime with the NIN API service.
          Your details have been collected and will be queued for automatic verification as soon as the API Service is available."
          onContinue={onSubmit}
          onClose={handleClose}
        />
      )} */}
    </FormSection>
  );

  const renderCompanyDetails = () => (
    <FormSection
      title="Company Details"
      description="Please provide your company information."
    >
      <FormInput
        label="Company Name"
        name="companyName"
        register={register}
        placeholder="Enter your company name"
        error={errors.companyName}
        icon={Building}
        required
      />

      <FormInput
        label="Registered Name"
        name="registeredName"
        register={register}
        placeholder="Enter your compan registered name"
        error={errors.registeredName}
        icon={FileText}
        required
      />

      <FormInput
        label="Company Address"
        name="companyAddress"
        register={register}
        placeholder="Enter your company ResidentialAddress"
        error={errors.companyAddress}
        icon={MapPin}
        required
      />
      <div>
        <p className="font-bold text-lg">{"Comapny director(s)"}</p>
        <p className="text-xs">
          {
            "Kindly enter the name(s) of thes legally registed director of the company."
          }
        </p>
      </div>
      <FormInput
        label="Director 1"
        name="director1"
        register={register}
        placeholder="Enter full name of director 1"
        error={errors.director1}
        required
      />
      <FormInput
        label="Director 2"
        name="director2"
        placeholder="Enter full name of director2"
        register={register}
        error={errors.director2}
      />
      <p className="font-bold text-lg">{"Comapny Registration Credentilas"}</p>

      <FormInput
        label="CAC Registration Number"
        name="cacRegistrationNumber"
        placeholder="Enter your company CAC Registration Number"
        register={register}
        error={errors.cacRegistrationNumber}
        required
      />
      <FormInput
        label="Company TIN"
        name="tin"
        placeholder="Enter your company TIN"
        register={register}
        error={errors.tin}
        required
      />
      <p className="font-bold text-lg">{"Company Contact Details"}</p>

      <FormInput
        label="Company Email Address"
        name="companyEmailAddress"
        placeholder="dav@gmail.com"
        register={register}
        error={errors.cacRegistrationNumber}
        required
      />
      <FormInput
        label="Company Phone Number"
        name="companyPhoneNumber"
        placeholder="909373536333"
        register={register}
        error={errors.tin}
        required
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
      >
        <span>Save and Proceed</span>
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </FormSection>
  );

  const renderCAC = () => (
    <FormSection title="CAC Verification">
      {isCACVerified ? null : (
        <>
          <FormInput
            label="CAC Number"
            name="cacRegistrationNumber"
            register={register}
            error={errors.cacRegistrationNumber}
            placeholder="e.g RC143533"
            required
          />

          <button
            onClick={handleSubmit(handleCACSubmit)}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
          >
            <span>Verify CAC Number</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </>
      )}
      {isverifyCACSucessfull && (
        <ProfileModal
          buttonText="okay"
          title="CAC Verification Successful!"
          icon={<FaCheckCircle className="w-6 h-6 text-green-500" />} // Pass the icon dynamically
          description="Congratulations, your CAC number was verified successfully. Kindly click okay to continue"
          onContinue={handleCACVerified}
          onClose={handleCACClose}
        />
      )}

      {isCACVerified && (
        <>
          {/* Success Notification */}
          <div className="mt-6 p-4 bg-teal-100 border-l-4 border-teal-600 rounded-md text-green-700 flex items-start space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-semibold">CAC Verification Successful✔️</p>
              <p className="text-sm">
                We have successfully verified the CAC number you provided.
                Please click "proceed" to continue your profile setup.
              </p>
            </div>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
          >
            <span>Proceed</span>
          </button>
        </>
      )}
    </FormSection>
  );
  const renderPreview = () => (
    <FormSection
      title="Profile Preview"
      description="Review your profile information before submission."
    >
      <div className="space-y-8">
        {/* Personal Details Section */}
        <div>
          <h2 className="text-lg font-medium mb-4">Personal Details</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">First Name</p>
                <p className="font-medium">{watch('firstName') || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Name</p>
                <p className="font-medium">{watch('lastName') || 'Not provided'}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{watch('DateOfBirth') || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium">{watch('email') || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{watch('PhoneNumber') || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Residential Address</p>
              <p className="font-medium">{watch('ResidentialAddress') || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* NIN Verification Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium mb-4">NIN Verification</h2>
          <div>
            <p className="text-sm text-gray-500">Your NIN</p>
            <p className="font-medium">{watch('nin') || 'Not provided'}</p>
          </div>
        </div>

        {/* Company Details Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium mb-4">Company Details</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Company Name</p>
              <p className="font-medium">{watch('companyName') || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Registered Name</p>
              <p className="font-medium">{watch('registeredName') || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Company Address</p>
              <p className="font-medium">{watch('companyAddress') || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Company Email</p>
              <p className="font-medium">{watch('companyEmailAddress') || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Company Phone</p>
              <p className="font-medium">{watch('companyPhoneNumber') || 'Not provided'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Director 1</p>
                <p className="font-medium">{watch('director1') || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Director 2</p>
                <p className="font-medium">{watch('director2') || 'Not provided'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">CAC Number</p>
                <p className="font-medium">{watch('cacRegistrationNumber') || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">TIN</p>
                <p className="font-medium">{watch('tin') || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CAC Verification Section */}
        {isCACVerified && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium mb-4">CAC Verification</h2>
            <div className="flex items-center gap-2 text-green-600">
              <FaCircleCheck className="w-5 h-5" />
              <p className="font-medium">CAC Verified</p>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Your CAC number has been successfully verified.
            </p>
          </div>
        )}

        {/* Security Questions Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium mb-4">Security Questions</h2>
          <div className="space-y-4">
            {selectedQuestions?.map((question, index) => (
              <div key={index}>
                <p className="text-sm text-gray-500">{question.question}</p>
                <p className="font-medium">
                  {watch(`selectedQuestions.${index}.answer`) || 'Not provided'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Message */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 text-green-600">
            <FaCircleCheck className="w-5 h-5" />
            <p className="font-medium">Profile Setup Completed ✓</p>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            You may still make changes to some profile details later. We may review such changes before effecting them.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            onClick={handlecompleteprofile}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
            disabled={isCompletingProfile}
          >
            {isCompletingProfile ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Save and Proceed to Venue Listing</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </FormSection>
  );
  const renderSecurityQuestions = () => (
    <FormSection
      title="Security Questions"
      description="For additional security, you are required to select any two (2) from the under listed security questions, and provide the corresponding answers to them."
    >
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <HelpCircle className="h-5 w-5 text-amber-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              Be sure to remember the answers you provide to these questions, as
              you will need them to recover your account if necessary.
            </p>
          </div>
        </div>
      </div>
      {selectedQuestions.length !== 2 && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Please select exactly two security questions
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {questions.map((q) => {
          const isSelected = selectedQuestions.some((sq) => sq.id === q.id);
          const selectedIndex = selectedQuestions.findIndex(
            (sq) => sq.id === q.id
          );

          return (
            <div
              key={q.id}
              className={`rounded-lg border ${isSelected ? "border-teal-600 bg-teal-50" : "border-gray-200"
                } p-4 transition-all duration-200`}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleQuestionSelect(q)}
              >
                <div className="flex items-center">
                  <div
                    className={`h-5 w-5 rounded-full border ${isSelected
                        ? "border-teal-600 bg-teal-600"
                        : "border-gray-300"
                      } flex items-center justify-center`}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {q.question}
                  </span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${isSelected ? "rotate-180" : ""
                    }`}
                />
              </div>

              {isSelected && (
                <div className="mt-4">
                  <FormInput
                    // label="Your Answer"
                    name={`selectedQuestions.${selectedIndex}.answer`}
                    register={register}
                    error={errors.selectedQuestions?.[selectedIndex]?.answer}
                    placeholder="Enter your answer"
                    required
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Saving..." : "Save Security Questions"}
        </button>
      </div> */}
      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
      >
        <span>Save Security Questions</span>
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </FormSection>
  );

  const renderContent = () => {
    switch (activeStep) {
      case "personal":
        return renderPersonalDetails();
      case "nin":
        return renderVerification();
      case "company":
        return renderCompanyDetails();
      case "security":
        return renderSecurityQuestions();
      case "cac":
        return renderCAC();
      case "preview":
        return renderPreview();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 px-4">
      <div className="w-full bg-white rounded-xl  overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-center mb-4 text-gray-900">
            Setup your Profile
          </h1>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center text-sm">
              <span className="text-gray-600">Account Type:</span>
              <span className="ml-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-md font-medium">
                Event Venue Owner
              </span>
              <span className="ml-2 px-3 py-1 flex items-center underline  text-emerald-400  rounded-md font-medium">
                <FaEdit /> Change
              </span>
            </div>
          </div>

          <div className="flex gap-12">
            {/* Sidebar */}
            <div className="w-64 border p-4 rounded-lg">
              <p className="my-2 font-semibold">Profile Setup Progress</p>
              <div className="space-y-0">
                {steps.map((step, index) => (
                  <div key={step.id}>
                    {/* Step Label and Icon */}
                    <div
                      onClick={() => setActiveStep(step.id)}
                      className={`flex items-center cursor-pointer p-3 rounded-lg ${activeStep === step.id
                          ? "bg-teal-50  text-teal-600"
                          : step.completed
                            ? "text-teal-600"
                            : "text-gray-500"
                        }`}
                    >
                      <span className="flex-grow">{step.label}</span>
                      {step.completed ? (
                        <FaCircleCheck className="w-5 h-5 text-teal-600" />
                      ) : (
                        <FiCircle className="w-5 h-5 text-gray-300" />
                      )}
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="h-8 border-l-2 ml-3 border-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="max-w-xl">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React, { Fragment, useCallback, useState, useEffect } from "react";
import { useForm, FieldValues, useFieldArray } from "react-hook-form";
import {
  Building2,
  ChevronRight,
  FileKey,
  ShieldCheck,
  User,
  Eye,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  Calendar,
  ArrowRight,
  IdCardIcon,
  User2,
  ChevronDown,
  Check,
  AlertCircle,
} from "lucide-react";
import { FormInput } from "components/Input/FormInput";
import { FormSection } from "components/Form/FormSection";
import { ProfileFormData } from "types/form";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import ProfileModal from "components/modal/ProfileModal";
import { securityQuestions } from "data/questions";
import { BiCamera, BiUser } from "react-icons/bi";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import { MdOutlineSwapHoriz } from "react-icons/md";
import nintemplate from "./../../assets/nintemplate.png";
import {
  useCompletecustomeronboardingMutation,
  useUploadImageMutation,
  useVerifyninMutation,
  useGetprofileQuery,
  useGetsecurityquestionsQuery,
} from "./../../redux/api/customerApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";

interface OnboardingStage {
  id: string;
  label: string;
  icon: React.ComponentType;
  completed: boolean;
}

interface SecurityQuestion {
  id: string;
  question: string;
  isSelected?: boolean;
}

function ServiceNeederProfile() {
  const [activeStep, setActiveStep] = useState("personal_details");
  const [image, setImage] = useState<string | null>(null);
  const [isverifySucessfull, SetIsverifySucessfull] = useState(false);
  const [isVerified, SetIsVerfied] = useState(false);
  const { id } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  // ID UPLOAD
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any>(securityQuestions);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProfileFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "selectedQuestions",
  });

  // API mutations
  const [onBoard, { isLoading: isOnboarding }] =
    useCompletecustomeronboardingMutation();
  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();
  const [verifynin, { isLoading: isVerifyingNin }] = useVerifyninMutation();
  const { data: profileData } = useGetprofileQuery(id);
  const { data: securityQuestionsData, isLoading: isLoadingQuestions } =
    useGetsecurityquestionsQuery({});

  const stages: OnboardingStage[] = [
    {
      id: "personal_details",
      label: "Personal Details",
      icon: User,
      completed: false,
    },
    {
      id: "nin_verification",
      label: "NIN Verification",
      icon: FileKey,
      completed: false,
    },
    {
      id: "id_document_upload",
      label: "ID Document Upload",
      icon: Building2,
      completed: false,
    },
    {
      id: "security_questions",
      label: "Security Questions",
      icon: ShieldCheck,
      completed: false,
    },
  ];
  useEffect(() => {
    if (securityQuestionsData?.value) {
      setQuestions(
        securityQuestionsData.value.map((q: any) => ({
          id: q.id,
          question: q.question,
          isSelected: false,
        }))
      );
    }
  }, [securityQuestionsData]);

  // Load saved data when component mounts or stage changes
  useEffect(() => {
    if (profileData?.onboarding) {
      const stageData =
        profileData.onboarding[
          activeStep as keyof typeof profileData.onboarding
        ];
      if (stageData) {
        reset(stageData);

        // Handle special cases
        if (activeStep === "personal_details" && stageData.profilePictureUrl) {
          setImage(stageData.profilePictureUrl);
        }

        if (activeStep === "id_document_upload" && stageData.idDocumentUrl) {
          setIsUploaded(true);
        }

        if (activeStep === "nin_verification" && stageData.isNinVerified) {
          SetIsVerfied(true);
        }

        // Handle security questions if they exist in stage data
        if (
          activeStep === "security_questions" &&
          stageData.questionsAndAnswers
        ) {
          const savedQuestions = stageData.questionsAndAnswers.map(
            (qa: any) => ({
              id: qa.id,
              question: qa.question,
              answer: qa.answer,
            })
          );

          // Update form values
          reset({
            selectedQuestions: savedQuestions,
          });

          // Update local questions state to reflect selected status
          setQuestions((prev: any) =>
            prev.map((q: any) => ({
              ...q,
              isSelected: savedQuestions.some((sq: any) => sq.id === q.id),
            }))
          );
        }
      }
    }
  }, [activeStep, profileData, reset]);

  // const handleStageSubmit = async (data: FieldValues) => {
  //   try {
  //     await onBoard({
  //       userId: id,
  //       stageKey: activeStep,
  //       stageData: data,
  //       ModifiedBy: "owner",
  //       completeStage: true,
  //     }).unwrap();

  //     // Move to next stage if not the last one
  //     const currentIndex = stages.findIndex((stage) => stage.id === activeStep);
  //     if (currentIndex < stages.length - 1) {
  //       setActiveStep(stages[currentIndex + 1].id);
  //     } else {
  //       navigate("/");
  //       toast.success("Onboarding completed successfully!");
  //     }
  //   } catch (error: any) {
  //     toast.error(error?.data?.message || "Error saving progress");
  //   }
  // };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleStageSubmit = async (data: FieldValues) => {
    try {
      let stageData: any = {};

      switch (activeStep) {
        case "personal_details":
          stageData = {
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.DateOfBirth,
            middleName: "string",
            phoneNumber: data.PhoneNumber,
            residentialAddress: data.ResidentialAddress,
            profilePictureId: data.profilePictureId,
          };
          break;

        case "nin_verification":
          stageData = {
            nin: data.nin,
            isNinVerified: true,
          };
          break;

        case "id_document_upload":
          stageData = {
            idDocumentId: data.idDocumentId,
            isIdUploaded: true,
          };
          break;

        case "security_questions":
          stageData = {
            questionsAndAnswers: data.selectedQuestions.map((q: any) => ({
              id: q.id,
              question: q.question,
              answer: q.answer,
            })),
            dateAnswered: new Date().toISOString(),
          };
          break;
      }

      await onBoard({
        userId: id,
        stageKey: activeStep,
        stageData: stageData,
        modifiedBy: "owner",
        completeStage: true,
      }).unwrap();

      // Move to next stage if not the last one
      const currentIndex = stages.findIndex((stage) => stage.id === activeStep);
      if (currentIndex < stages.length - 1) {
        setActiveStep(stages[currentIndex + 1].id);
      } else {
        navigate("/");
        toast.success("Onboarding completed successfully!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Error saving progress");
    }
  };
  const handleNINSubmit = useCallback(async () => {
    try {
      const res = await verifynin(watch("nin")).unwrap();
      SetIsverifySucessfull(true);

      const ninData = {
        nin: res?.data?.nin,
        firstName: res?.data?.firstName,
        lastName: res?.data?.lastName,
        email: res?.data?.email,
        DateOfBirth: res?.data?.dateOfBirth,
        isNinVerified: true,
      };

      // Update form values
      Object.entries(ninData).forEach(([key, value]) => {
        setValue(key as keyof ProfileFormData, value);
      });

      // Submit the stage data
      await handleStageSubmit(ninData);
    } catch (error: any) {
      toast.error(error?.data?.message || "NIN verification failed");
    }
  }, [watch, verifynin, setValue, handleStageSubmit]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      try {
        const result = await uploadImage({
          file,
          ImageOwner: "Profile Image",
          Name: "Profile Image",
          description: "Uploaded via frontend",
        }).unwrap();

        setValue("profilePictureId", result?.value?.id);
        // await handleStageSubmit({
        //   profilePictureId: result?.value?.id,
        //   profilePictureUrl: imageUrl,
        // });
      } catch (error) {
        toast.error("Error uploading image");
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setValue("profilePictureId", "");
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const validTypes = ["image/jpeg", "image/png"];

      if (!validTypes.includes(file.type)) {
        setError("Invalid file format. Please upload JPEG or PNG.");
        return;
      }

      try {
        const result = await uploadImage({
          file,
          ImageOwner: "ID Document",
          Name: "ID Document",
          description: "Uploaded via frontend",
        }).unwrap();

        setUploadedFile(file);
        setIsUploaded(true);
        setError(null);
        setValue("idDocumentId", result?.value?.id);

        // await handleStageSubmit({
        //   idDocumentId: result?.value?.id,
        //   idDocumentUrl: URL.createObjectURL(file),
        //   isIdUploaded: true,
        // });
      } catch (error) {
        toast.error("Error uploading document");
      }
    }
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
    setValue("idDocumentId", "");
  };

  const handleQuestionSelect = (question: any) => {
    const selectedQuestions = watch("selectedQuestions") || [];
    const index = selectedQuestions.findIndex((q: any) => q.id === question.id);

    if (index === -1) {
      if (selectedQuestions.length >= 2) return;
      append({ id: question.id, question: question.question, answer: "" });
    } else {
      remove(index);
    }

    setQuestions(
      questions.map((q: any) => ({
        ...q,
        isSelected: q.id === question.id ? !q.isSelected : q.isSelected,
      }))
    );
  };

  const renderPersonalDetails = () => (
    <FormSection
      title="Personal Details"
      subtitle="Profile Picture (Optional)"
      description="Personalize your account by adding a profile picture. You can edit this anytime."
    >
      <div className="flex flex-col items-start space-y-4">
        <div className="relative w-32 h-32">
          <label htmlFor="upload-input" className="cursor-pointer">
            {image ? (
              <img
                src={image}
                alt="Profile"
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
              type="button"
              className="border text-red-400 px-3 py-1 rounded-lg"
              onClick={handleRemoveImage}
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
        onClick={handleSubmit(handleStageSubmit)}
        disabled={isOnboarding}
        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
      >
        {isOnboarding ? (
          <span>Saving...</span>
        ) : (
          <>
            <span>Save and Proceed</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </button>
    </FormSection>
  );

  const renderVerification = () => (
    <FormSection title="NIN Verification">
      {isVerified ? (
        <>
          <FormInput
            label="National Identification Number (NIN)"
            name="nin"
            register={register}
            error={errors.nin}
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

          <button
            onClick={handleSubmit(handleStageSubmit)}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
          >
            <span>Proceed</span>
          </button>
        </>
      ) : (
        <>
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
            disabled={isVerifyingNin}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
          >
            {isVerifyingNin ? "Verifying..." : "Verify NIN"}
          </button>
        </>
      )}

      {isverifySucessfull && (
        <ProfileModal
          buttonText="Okay"
          title="NIN Verification Successful!"
          icon={<FaCheckCircle className="w-6 h-6 text-green-500" />}
          description="Your NIN was verified successfully. Click okay to continue."
          onContinue={() => {
            SetIsverifySucessfull(false);
            SetIsVerfied(true);
          }}
          onClose={() => SetIsverifySucessfull(false)}
        />
      )}
    </FormSection>
  );

  const renderIDUpload = () => (
    <FormSection
      title="Upload an Identification Document"
      description="Please upload a valid identification document."
    >
      <div className="w-full max-w-2xl">
        <p className="text-sm text-gray-600 mb-4">
          Accepted documents: National ID, Passport, Driver's License, Voter's
          Card
        </p>
        <p className="text-sm text-gray-600 mb-4">Formats: JPEG, PNG</p>

        <div className="mb-6">
          <p className="font-semibold text-gray-700 mb-2">
            Document Upload Sample
          </p>
          <img
            src={nintemplate}
            alt="Document Sample"
            className="border rounded-lg shadow-sm"
          />
        </div>

        <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 mb-6 flex flex-col items-center">
          {isUploaded && uploadedFile ? (
            <div className="w-full flex flex-col items-center">
              <img
                src={URL.createObjectURL(uploadedFile)}
                alt="Uploaded Document"
                className="rounded-lg shadow-sm mb-4 max-w-xs"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleDeleteFile}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <AiOutlineDelete className="mr-2" /> Delete
                </button>
                <label
                  htmlFor="file-upload"
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                  <MdOutlineSwapHoriz className="mr-2" /> Replace
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/jpeg, image/png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          ) : (
            <>
              <AiOutlineCloudUpload className="text-4xl text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                Drag and drop image here or
              </p>
              <label
                htmlFor="file-upload"
                className="bg-green text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-green-600"
              >
                Browse
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/jpeg, image/png"
                className="hidden"
                onChange={handleFileChange}
              />
            </>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={handleSubmit(handleStageSubmit)}
          disabled={!isUploaded || isOnboarding}
          className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center ${
            isUploaded
              ? "bg-teal-600 hover:bg-teal-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isOnboarding ? "Saving..." : "Save and Proceed"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </FormSection>
  );

  const renderSecurityQuestions = () => {
    const selectedQuestions = watch("selectedQuestions") || [];

    if (isLoadingQuestions) {
      return (
        <FormSection title="Security Questions">
          <div className="flex justify-center items-center h-32">
            <p>Loading security questions...</p>
          </div>
        </FormSection>
      );
    }

    return (
      <FormSection
        title="Security Questions"
        description="Select any two security questions and provide answers."
      >
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
          <div className="flex">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                Remember your answers as they'll be needed for account recovery.
              </p>
            </div>
          </div>
        </div>

        {selectedQuestions.length !== 2 && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
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
          {questions.map((q: any) => {
            const isSelected = selectedQuestions.some(
              (sq: any) => sq.id === q.id
            );
            const selectedIndex = selectedQuestions.findIndex(
              (sq: any) => sq.id === q.id
            );

            return (
              <div
                key={q.id}
                className={`rounded-lg border ${
                  isSelected ? "border-teal-600 bg-teal-50" : "border-gray-200"
                } p-4 transition-all duration-200`}
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleQuestionSelect(q)}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-5 w-5 rounded-full border ${
                        isSelected
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
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      isSelected ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {isSelected && (
                  <div className="mt-4">
                    <FormInput
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

        <button
          onClick={handleSubmit(handleStageSubmit)}
          disabled={selectedQuestions.length !== 2 || isOnboarding}
          className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center ${
            selectedQuestions.length === 2
              ? "bg-teal-600 hover:bg-teal-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isOnboarding ? "Saving..." : "Complete Onboarding"}
        </button>
      </FormSection>
    );
  };

  const renderContent = () => {
    switch (activeStep) {
      case "personal_details":
        return renderPersonalDetails();
      case "nin_verification":
        return renderVerification();
      case "id_document_upload":
        return renderIDUpload();
      case "security_questions":
        return renderSecurityQuestions();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 px-4">
      <div className="w-full bg-white rounded-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-center mb-4 text-gray-900">
            Complete Your Profile
          </h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center text-sm">
              <span className="text-gray-600">Account Type:</span>
              <span className="ml-2 px-3 py-1 flex items-center gap-1 bg-amber-50 text-amber-700 rounded-md font-medium">
                <BiUser />
                Service Needer
              </span>
            </div>
          </div>

          <div className="flex gap-12">
            {/* Sidebar */}
            <div className="w-64 border p-4 rounded-lg">
              <p className="my-2 font-semibold">Onboarding Progress</p>
              <div className="space-y-0">
                {stages.map((stage, index) => {
                  const isCompleted =
                    !!profileData?.onboarding?.[
                      stage.id as keyof typeof profileData.onboarding
                    ];
                  const isActive = activeStep === stage.id;

                  return (
                    <div key={stage.id}>
                      <div
                        onClick={() => setActiveStep(stage.id)}
                        className={`flex items-center cursor-pointer p-3 rounded-lg ${
                          isActive
                            ? "bg-teal-50 text-teal-600"
                            : isCompleted
                            ? "text-teal-600"
                            : "text-gray-500"
                        }`}
                      >
                        <span className="flex-grow">{stage.label}</span>
                        {isCompleted ? (
                          <FaRegCircleCheck className="w-5 h-5 text-teal-600" />
                        ) : (
                          <FiCircle className="w-5 h-5 text-gray-300" />
                        )}
                      </div>

                      {index < stages.length - 1 && (
                        <div className="h-8 border-l-2 ml-3 border-gray-300"></div>
                      )}
                    </div>
                  );
                })}
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

export default ServiceNeederProfile;

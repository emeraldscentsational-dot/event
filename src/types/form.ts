export interface ProfileFormData {
  profilePictureld?:string;
  profilePictureId?:string;
  idDocumentld?:string;
  idDocumentId?:string;
    firstName: string;
    lastName: string;
    email: string;
    PhoneNumber: string;
    ResidentialAddress: string;
    nin: string;
    cacRegistrationNumber: string;
    companyName: string;
    registeredName: string;
    companyAddress: string;
    companyEmailAddress: string;
    companyPhoneNumber: string;
    director1: string;
    director2?: string;
  tin: string;
  selectedQuestions: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
  DateOfBirth: string;
    securityQuestions: {
      cityBorn: string;
      favoriteBook: string;
    };
  }
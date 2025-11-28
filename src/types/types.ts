// types.ts

export type ImageDetails = {
    id: string;
    imageDataBase64: string;
    imageOwner: string;
  };
  
  export type FeaturedImage = {
    id: string;
    name: string;
    imageId: string;
    description: string;
    path: string;
    avatarUrl: string;
    imageOwner: string;
    approvalStatus: string;
    imageDetails: ImageDetails;
  };
  export interface SecurityQuestion {
    id: number;
    question: string;
    answer?: string;
    isSelected: boolean;
  }
  
  export interface FormErrors {
    questions?: string;
    answers?: string;
  }
  
  export interface SecurityQuestionsFormData {
    selectedQuestions: Array<{
      id: number;
      question: string;
      answer: string;
    }>;
  }
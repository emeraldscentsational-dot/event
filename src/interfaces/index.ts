interface SignUpFormDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  reEnteredPassword: string;
  isAgreedToTerms: boolean;
}

interface SignInFormDTO {
  email?: string;
    emailOrUsername: string;
  password: string;
  remember: boolean;
   firstName: string|null;
  lastName: string|null;
}

interface ForgotPasswordFormDTO {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordFormDTO {
  email: string;
}

export type {
  SignInFormDTO,
  SignUpFormDTO,
  ForgotPasswordFormDTO,
  ResetPasswordFormDTO,
};

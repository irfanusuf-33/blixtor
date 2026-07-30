export interface ContactFormData {
  firstName: string;
  email: string;
  phone: string;
  message: string;
  termsAccepted: boolean;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
}
import axios, { AxiosError } from 'axios';

/**
 * Standard error response interface
 */
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string | number;
    details?: unknown;
  };
  status?: number;
}

/**
 * Handles API errors consistently across the application
 * 
 * @param error - The error caught from the API call
 * @returns Standardized error response object
 */
export const handleApiError = (error: unknown): ErrorResponse => {
  // Default error message
  let message = 'An unexpected error occurred';
  let status: number | undefined = undefined;
  let code: string | number | undefined = undefined;
  let details: unknown = undefined;

  // Handle axios errors
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    status = axiosError.response?.status;
    
    // Extract error details from response
    if (axiosError.response?.data) {
      const errorData = axiosError.response.data as any;
      message = errorData.message || errorData.error || axiosError.message || message;
      code = errorData.code || status;
      details = errorData;
    } else {
      // Network errors, timeouts, etc.
      message = axiosError.message || 'Network error occurred';
      code = 'NETWORK_ERROR';
    }
  } 
  // Handle other types of errors
  else if (error instanceof Error) {
    message = error.message;
    code = error.name;
  } 
  // Handle non-standard errors (like strings)
  else if (typeof error === 'string') {
    message = error;
  }

  return {
    success: false,
    error: {
      message,
      code,
      details
    },
    status
  };
};

/**
 * Logs errors to the console in development environments
 * In production, this could be modified to send errors to a monitoring service
 */
export const logError = (error: unknown, context?: string): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`🔴 Error${context ? ` in ${context}` : ''}:`, error);
  }
  
  // In production, you might want to send this to a monitoring service like Sentry
  // if (process.env.NODE_ENV === 'production') {
  //   // Example: Sentry.captureException(error, { extra: { context } });
  // }
}; 
/**
 * Form Handler Pattern
 * 
 * A reusable pattern for handling forms with validation,
 * error display, and submission handling.
 */

import { useState, FormEvent } from 'react';

// Generic form data type
export interface FormData {
  [key: string]: any;
}

// Form field error type
export interface FormErrors {
  [key: string]: string;
}

// Form handler hook return type
export interface UseFormReturn<T extends FormData> {
  values: T;
  errors: FormErrors;
  loading: boolean;
  handleChange: (name: keyof T, value: any) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  setError: (name: keyof T, error: string) => void;
  clearErrors: () => void;
}

/**
 * Custom hook for form handling
 * 
 * @param initialValues - Initial form values
 * @param onSubmit - Async function to handle form submission
 * @param validate - Optional validation function
 */
export function useForm<T extends FormData>(
  initialValues: T,
  onSubmit: (values: T) => Promise<void>,
  validate?: (values: T) => FormErrors
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as string];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Run validation if provided
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setLoading(true);
    try {
      await onSubmit(values);
      // Clear form on success
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      // Handle submission errors
      if (error instanceof Error) {
        setErrors({ submit: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const setError = (name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name as string]: error }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setError,
    clearErrors,
  };
}

/**
 * Example usage:
 * 
 * function ContactForm() {
 *   const form = useForm(
 *     { name: '', email: '', message: '' },
 *     async (values) => {
 *       // Submit to API
 *       await fetch('/api/contact', {
 *         method: 'POST',
 *         body: JSON.stringify(values),
 *       });
 *     },
 *     (values) => {
 *       const errors: FormErrors = {};
 *       if (!values.name) errors.name = 'Name is required';
 *       if (!values.email) errors.email = 'Email is required';
 *       return errors;
 *     }
 *   );
 * 
 *   return (
 *     <form onSubmit={form.handleSubmit}>
 *       <input
 *         value={form.values.name}
 *         onChange={(e) => form.handleChange('name', e.target.value)}
 *       />
 *       {form.errors.name && <span>{form.errors.name}</span>}
 *       
 *       <button type="submit" disabled={form.loading}>
 *         {form.loading ? 'Submitting...' : 'Submit'}
 *       </button>
 *     </form>
 *   );
 * }
 */
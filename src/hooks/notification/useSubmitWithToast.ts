// hooks/useSubmitWithToast.ts
import { useState } from "react";
import { toast } from "react-toastify";

const useSubmitWithToast = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitTribute = async <T>(submitFn: () => Promise<T>) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting tribute...");

    try {
      const result = await submitFn();
      toast.update(toastId, {
        render: "Tribute submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
      return result;
    } catch (error) {
      toast.update(toastId, {
        render: "Submission failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleSubmitTribute };
};

export default useSubmitWithToast;

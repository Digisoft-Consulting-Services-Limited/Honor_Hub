import { useMutation } from "@tanstack/react-query";
import { createTributeList } from "@/services/Memorial/Tribute/CreateTribute";

export const useCreateTribute = () => {
  return useMutation({
    mutationFn: createTributeList,
  });
};

import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (title: string, status: "success" | "error") => {
    toast({
      title: title,
      status: status,
      isClosable: true,
    });
  };

  return { toast, showToast };
};

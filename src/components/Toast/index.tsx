import { UseToastOptions, useToast } from "@chakra-ui/react";

const CustomToast = () => {
    const toast = useToast();

    const Toast = (option: UseToastOptions) => {
        return toast({
            status: option.status || 'success',
            position: option.position || "top",
            isClosable: true,
            duration: option.duration || 2000,
            variant: option.variant || 'solid',
            title: option.title || 'test'
        })
    }

    return Toast;
}

export default CustomToast
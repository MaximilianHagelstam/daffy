import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { FiPlus } from "react-icons/fi";
import { object, string } from "yup";
import PostService from "../../services/postService";

const CreateButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const createPostValidationSchema = object().shape({
    body: string().max(150).required(),
  });

  return (
    <>
      <Box position="fixed" bottom="24px" right={["16px", "24px"]} zIndex={1}>
        <IconButton
          colorScheme="purple"
          aria-label="Create post"
          size="lg"
          icon={<FiPlus size={24} />}
          rounded="full"
          onClick={onOpen}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create post</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ body: "" }}
            validationSchema={createPostValidationSchema}
            onSubmit={async (formData, { setSubmitting }) => {
              setSubmitting(true);
              const { isError, errorMessage, data } = await PostService.create(
                formData.body
              );
              setSubmitting(false);

              if (isError) {
                toast({
                  title: errorMessage,
                  status: "error",
                  isClosable: true,
                });
                onClose();
              } else {
                toast({
                  title: data,
                  status: "success",
                  isClosable: true,
                });
                window.location.reload();
              }
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form>
                <ModalBody>
                  <Field name="body">
                    {({ field }: { field: unknown }) => (
                      <FormControl isInvalid={errors.body !== undefined}>
                        <Input {...field} id="body" />
                        <FormErrorMessage>{errors.body}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="purple"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateButton;

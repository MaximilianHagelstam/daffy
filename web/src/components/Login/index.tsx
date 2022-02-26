import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Navigate } from "react-router";
import { object, string } from "yup";
import { UserContext } from "../../context/userContext";
import UserService from "../../services/UserService";

const loginValidationSchema = object().shape({
  username: string()
    .required("Required")
    .matches(/^(?!\s+$).*/, "Required"),
  password: string().required("Required"),
});

const Login = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const currentUser = useContext(UserContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Log in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to connect with the world ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginValidationSchema}
            validateOnChange={false}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true);

              const res = await UserService.login(data.username, data.password);

              setSubmitting(false);

              if (res.error) {
                toast({
                  title: res.message,
                  status: "error",
                  isClosable: true,
                });
              } else {
                window.location.reload();
              }
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form>
                <Stack spacing={4}>
                  <Field name="username">
                    {({ field }: { field: unknown }) => (
                      <FormControl isInvalid={errors.username !== undefined}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input {...field} id="username" />
                        <FormErrorMessage>{errors.username}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field }: { field: unknown }) => (
                      <FormControl isInvalid={errors.password !== undefined}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                          />
                          <InputRightElement h={"full"}>
                            <IconButton
                              variant={"ghost"}
                              onClick={() =>
                                setShowPassword(
                                  (showPasswordState) => !showPasswordState
                                )
                              }
                              aria-label="show password toggle"
                              icon={showPassword ? <FiEye /> : <FiEyeOff />}
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10} pt={2}>
                    <Button
                      size="lg"
                      bg={"purple.500"}
                      color={"white"}
                      _hover={{
                        bg: "purple.600",
                      }}
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Login
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Don&apos;t have an account?{" "}
                      <Link color={"purple.400"} href="/register">
                        Register
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;

import { object, string } from "yup";

const loginUserDto = object().shape({
  username: string().required(),
  password: string().required(),
});

export default loginUserDto;

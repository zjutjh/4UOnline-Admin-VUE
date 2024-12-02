import { fetchInstance } from "../fetch";

interface parameters {
  student_id: string,
  password: string
}

const loginByPwd = async (parameters: parameters) => {
  const options = {
    url: "/api/user/login",
    method: "post",
    body: parameters
  };

  const response = await fetchInstance(options);

  return response;
};

export default loginByPwd;

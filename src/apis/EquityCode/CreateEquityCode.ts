import { fetchInstance } from "../fetch";

interface parameters {
  feedback_type: number;
  college: number;
  department: string;
  location: string;
  description?: string
}

const createEquityCode = async (parameters: parameters) => {
  const options = {
    url: "/api/admin/qrcode",
    method: "post",
    body: parameters
  };
  const response = await fetchInstance(options);
  return response;
};

export default createEquityCode;
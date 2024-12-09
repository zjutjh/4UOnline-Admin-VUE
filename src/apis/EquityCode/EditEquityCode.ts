import { fetchInstance } from "../fetch";

interface parameters {
  id: number;
  feedback_type: number;
  college: number;
  department: string;
  location: string;
  description: string;
  status: boolean
}

const editEquityCode = async (parameters: parameters) => {
  const options = {
    url: "/api/admin/qrcode",
    method: "put",
    body: parameters
  };

  const response = await fetchInstance(options);

  return response;
};

export default editEquityCode;
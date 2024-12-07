import { fetchInstance } from "../fetch";

interface parameters {
  keyword: string;
  filter: {
    college: [number],
    feedback_type: [number]
  };
  page: number;
  page_size: number
}

const getCodeList = async (parameters: parameters) => {
  const options = {
    url: "/api/admin/qrcode/list",
    method: "post",
    body: parameters
  };

  const response = await fetchInstance(options);

  return response;
};

export default getCodeList;

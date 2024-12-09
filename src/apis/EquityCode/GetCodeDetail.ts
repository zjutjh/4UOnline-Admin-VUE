import { fetchInstance } from "../fetch";

const getCodeDetail = async (id: number) => {
  const options = {
    url: "/api/admin/qrcode",
    method: "get",
    params: {
      id: id
    }
  };

  const response = await fetchInstance(options);

  return response;
};

export default getCodeDetail;
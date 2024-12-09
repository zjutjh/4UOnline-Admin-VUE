import { fetchInstance } from "../fetch";

const deleteEquityCode = async (id: number) => {
  const options = {
    url: "/api/admin/qrcode",
    method: "delete",
    body: {
      "id": id
    }
  };

  const response = await fetchInstance(options);

  return response;
};

export default deleteEquityCode;
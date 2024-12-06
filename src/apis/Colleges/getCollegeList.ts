import { fetchInstance } from "../fetch";

const getColledgeList = async () => {
  const options = {
    url: "/api/college/list",
    method: "get"
  };

  const response = await fetchInstance(options);

  return response;
};

export default getColledgeList;
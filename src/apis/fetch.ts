const defaultType = {
  "get": "params",
  "post": "body",
  "put": "body",
  "delete": "params"
};
const fetchInstance = async (url: string, method: keyof typeof defaultType, parameterType?: string, data?: any, Authorization?: string) => {
  const parameter = parameterType ? parameterType : defaultType[method];
  let resultPromise = undefined;

  let responseStatus = false;
  let responseData = undefined;

  try {
    if (parameter === "params") {
      const processedData = new URLSearchParams(data).toString();
      resultPromise = await fetch(`${url}?${processedData}`, {
        method: method,
        headers: {
          ...(Authorization ? { Authorization: Authorization } : {})
        }
      });
    } else {
      resultPromise = await fetch(url, {
        method: method,
        headers: {
          ...(Authorization ? { Authorization: Authorization } : {})
        },
        body: JSON.stringify(data)
      });
    }

    if (!resultPromise.ok) {
      throw new Error("网络连接错误,状态码为" + resultPromise.status);
    }

    responseStatus = true;
    responseData = await resultPromise.json();
  } catch (error) {
    console.error(error);
    responseData = null;
  }

  return {
    responseStatus,
    responseData
  };
};

export { fetchInstance };
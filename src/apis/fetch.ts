interface FetchOptions {
  url: string,
  method: string,
  params?: any,
  body?: any,
  Authorization?: string
}

const fetchInstance = async (options: FetchOptions) => {
  const { url, method, params, body, Authorization } = options;
  const response = {
    status: false,
    data: null,
    errorMessage: ""
  };

  try {
    const completeURL = params ? url + "?" + new URLSearchParams(params).toString() : url;
    const resultPromise = await fetch(completeURL, {
      method: method,
      headers: {
        ...(Authorization ? { Authorization: Authorization } : {}),
        "Content-Type": "application/json"
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });

    if (!resultPromise.ok) {
      throw new Error("网络连接错误,状态码为" + resultPromise.status);
    }

    response.status = true;
    response.data = await resultPromise.json();
  } catch (error) {
    if (error instanceof Error) {
      response.errorMessage = error.message;
    }
  }

  return {
    response
  };
};

export { fetchInstance };
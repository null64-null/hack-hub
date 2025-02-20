export type Arg = {
  title: string;
  content: string;
};

export type Debate = {
  motion: string;
  limit: number;
  args: Arg[];
};

export type Process = "before" | "inProcess" | "finish" | "error";

export type GroqApiError = {
  error: {
    message: string;
    type: string;
  };
};

export type ApiError = {
  id?: string;
  message?: string;
  type?: string;
  status?: number;
  statusText?: string;
};

export const getErrorMessage = async (
  response: Response,
  id: string
): Promise<string> => {
  let apiError: ApiError = { id: id };

  if (response.status && response.statusText) {
    apiError = {
      ...apiError,
      status: response.status,
      statusText: response.statusText,
    };
  }

  try {
    if (!response.body) {
      apiError = { ...apiError, message: "response body empty" };
    } else {
      const body = await response.json();

      if (body.error) {
        apiError = {
          ...apiError,
          message: body.error.message,
          type: body.error.type,
        };
      } else {
        apiError = {
          ...apiError,
          message: "response body.error empty",
        };
      }
    }

    return JSON.stringify(apiError);
  } catch {
    apiError = { ...apiError, message: "fail error get process" };
    return JSON.stringify(apiError);
  }
};

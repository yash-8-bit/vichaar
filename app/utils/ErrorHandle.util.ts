import { response } from "./response.util";

export const TryBackend = async (callback: Function) => {
  try {
    return await callback();
  } catch (error) {
    console.log(error);
    return response({
      status: 500,
      message: "Internal Server Error",
      extra: {
        err: error,
      },
    });
  }
};

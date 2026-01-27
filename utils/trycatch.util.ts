export const ApiTryCatch = (callback: Function ) => {
  try {
    return callback();
  } catch (err) {
    return {
      success: false,
      message: "Something is Wrong",
    };
  }
};

module.exports = {
  success(obj) {
    return {
      status: "success",
      ...obj,
    };
  },
  error(errorMessage) {
    return {
      status: "error",
      errorMessage,
    };
  },
};

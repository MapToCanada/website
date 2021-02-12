const logger = () => (next) => (action) => {
  if (NODE_ENV == "dev") {
    console.log(action);
  }
  next(action);
};

export default logger;

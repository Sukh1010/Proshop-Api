const errorHandler = (error, req, res, next) => {
  let errStatus = res.statusCode || 500;
  let errMessage = error.message || "something wrong";

  res.status(errStatus).send({ message: errMessage });
};

export default errorHandler;

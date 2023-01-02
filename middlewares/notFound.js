const notFound = (req, res, next) => {
  try {
    throw new Error(`not found- ${req.path}`);
  } catch (error) {
    next(error);
  }
};

export default notFound;

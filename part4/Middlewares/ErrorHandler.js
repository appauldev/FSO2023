export function errorHandler(err, req, res, next) {
  // console.log('############ERRRORRR HANDLER###############');
  // console.error(err);
  // console.log('############ERRRORRR HANDLER###############');

  if (err.name === 'CastError') {
    return res.status(400).send({
      type: err.name,
      message: err.message,
      method: req.method,
      route: req.url,
    });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({
      type: err.name,
      message: err.message,
      method: req.method,
      route: req.url,
    });
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({
      type: err.name,
      message: err.message,
      method: req.method,
      route: req.url,
    });
  } else {
    next(err);
    return res.status(500).send({
      type: err.name,
      message: err.message,
      method: req.method,
      route: req.url,
    });
  }
}

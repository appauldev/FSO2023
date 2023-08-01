export function errorHandler(err, req, res) {
  console.error(err.message);
  console.log('############ERRRORRR HANDLER###############');

  if (err.name === 'CastError') {
    return res.status(400).send({
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
    return res.status(500).send({
      type: err.name,
      message: err.message,
      method: req.method,
      route: req.url,
    });
  }
}

export function errorHandler(err, req, res, next) {
  console.error(err.message);
  console.log("############ERRRORRR HANDLER###############");

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else {
    return res.status(500).send({
      errorName: err.name,
      message: err.message,
      route: req.url,
    });
  }
}

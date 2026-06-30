const pruebaControllerGet = (req, res) => {
  res.json(" Get Funciona!!!! bien");
};

const pruebaControllerPost = (req, res) => {
  res.json(" Post Funciona!!!!");
};

const pruebaControllerPut = (req, res) => {
  res.json(" Put Funciona!!!!");
};

const pruebaControllerDelete = (req, res) => {
  res.json(" Delete Funciona!!!!");
};

module.exports = {
  pruebaControllerGet,
  pruebaControllerPost,
  pruebaControllerPut,
  pruebaControllerDelete
};

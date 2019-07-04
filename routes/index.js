const auth = require("./auth");
const users = require("./users");
<<<<<<< HEAD
const products = require("./products");
=======
>>>>>>> a7f063955fe3683ccbfe13a68c0280a54e350e87

const root = (app, next) => {
  const pkg = app.get("pkg");
  app.get("/", (req, res) =>
    res.json({ name: pkg.name, version: pkg.version })
  );
  app.all("*", (req, resp, next) => next(404));
  return next();
};

const register = (app, routes, cb) => {
  if (!routes.length) {
    return cb();
  }

  routes[0](app, err => {
    if (err) {
      return cb(err);
    }
    return register(app, routes.slice(1), cb);
  });
};

<<<<<<< HEAD
module.exports = (app, next) =>
  register(app, [auth, users, products, root], next);
=======
module.exports = (app, next) => register(app, [auth, users, root], next);

//
>>>>>>> a7f063955fe3683ccbfe13a68c0280a54e350e87

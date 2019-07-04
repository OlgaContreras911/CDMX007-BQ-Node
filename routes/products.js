const Product = require("../models/Products");
const { requireAuth, requireAdmin, isAdmin } = require("../middleware/auth");

module.exports = (app, next) => {
  app.get("/products", requireAuth, (req, resp) => {
    // console.log(req.query)
    if (!req.query) {
      Product.find().then(data => resp.json(data));
    }
    if (req.query) {
      Product.find(req.query).then(data => resp.json(data));
    }
  });

  app.get("/products/:id", requireAuth, (req, resp) => {
    Product.find({ _id: req.params.id }).then(data => resp.json(data));
  });

  app.post("/products", requireAdmin, (req, resp) => {
    const { name, price } = req.body;

    if (!name || !price) {
      return next(400);
    }

    Product.create({ name, price })
      .then(() => Product.find())
      .then(data => resp.json(data))
      .catch(err =>
        /duplicate key/.test(err.message) ? next(403) : next(500)
      );
  });

  app.put("/products/:id", requireAdmin, (req, resp, next) => {
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .exec()
      .then(doc => {
        Product.findOne({ _id: req.params.id }).then(data => {
          resp.json(data);
        });
      })
      .catch(next);
  });

  app.delete("/products/:id", requireAdmin, (req, resp, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => {
        return Product.findOne({ _id: req.params.id });
      })
      .then(products => resp.send(products))
      .catch(next);
  });

  return next();
};

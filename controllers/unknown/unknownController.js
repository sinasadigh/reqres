const controller = require("../controller");
const { Unknown } = require("../../models/unknown");
class userController extends controller {
  async get_all_unknowns(req, res, next) {
    let limit = 10;
    let offset = 0;
    if (req.query.page) {
      offset = (req.query.page - 1) * limit;
    }
    const unkonown = await Unknown.findAndCountAll({
      limit: limit,
      offset: offset,
    })
      .then(async (result) => {
        return res.status(200).json({
          data: result.rows,
          per_page: limit,
          page: req.query.page,
          total: result.count,
          total_pages: Math.ceil(result.count / limit),
        });
      })
      .catch((err) => {
        return res.json({ message: err });
      });
  }
  async get_unknown(req, res, next) {
    const id = req.params.id;

    const unkonown = await Unknown.findAll({
      where: { id: id },
    })
      .then(async (result) => {
        if (result.length == 0) {
          return res.status(404).json({});
        }
        return res.status(200).json({
          data: result,
        });
      })
      .catch((err) => {
        return res.json({ message: err });
      });
  }
  async unknown_create(req, res, next) {
    const name = req.body.name;
    const year = req.body.year;
    const color = req.body.color;
    const pantone_value = req.body.pantone_value;

    const unknown = await Unknown.create({
      name: name,
      year: year,
      color: color,
      pantone_value: pantone_value,
    })
      .then((result) => {
        return res.status(201).json({
          data: result,
        });
      })
      .catch((err) => {
        return res.json({ message: err });
      });
  }
}

module.exports = new userController();

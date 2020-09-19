const controller = require("../controller");
const { User } = require("../../models/user");
class userController extends controller {
  async get_all_users(req, res, next) {
    let limit = 10;
    let offset = 0 + (req.query.page - 1) * limit;
    const delay = req.query.delay;
    const users = await User.findAndCountAll({
      limit: limit,
      offset: offset,
      attributes: ["id", "first_name", "last_name", "email", "avatar"],
    })
      .then(async (result) => {
        setTimeout(function () {
          return res.status(200).json({
            data: result.rows,
            per_page: limit,
            page: req.query.page,
            total: result.count,
            total_pages: Math.ceil(result.count / limit),
          });
        }, delay * 1000);
      })
      .catch((err) => {
        return res.json({ message: err });
      });
  }
  async get_user(req, res, next) {
    const id = req.params.id;

    const users = await User.findAll({
      where: { id: id },
      attributes: ["id", "first_name", "last_name", "email", "avatar"],
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
  async create_user(req, res, next) {
    const name = req.body.name;
    const job = req.body.job;
    const user = await User.create(
      { name: name, job: job },
      {
        returning: ["name", "job"],
      }
    )
      .then((result) => {
        return res.status(201).json({
          data: result,
        });
      })
      .catch((err) => {
        return res.json({ message: err });
      });
  }
  async update_user(req, res, next) {
    const id = req.params.id;
    const name = req.body.name;
    const job = req.body.job;

    const users = await User.update(
      { name: name, job: job },
      { where: { id: id }, returning: ["name", "job"] }
    )
      .then((result) => {
        return res.status(200).json({
          data: result[1],
        });
      })
      .catch((err) => {
        return res.json({ message: err });
      });
  }
  async delete_user(req, res, next) {
    const id = req.params.id;

    const users = await User.destroy({
      where: { id: id },
    })
      .then(async (result) => {
        return res.status(204).json({ message: "با موفقیت حذف شد" });
      })
      .catch((err) => {
        return res.json({ message: err });
      });
  }
}

module.exports = new userController();

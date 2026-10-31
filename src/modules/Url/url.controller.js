const configs = require("../../../configs/configs");
const Url = require("../../models/Url");
const createShortUrl = require("./../../utils/createShortUrl");

exports.create = async (req, res, next) => {
    try {
        const { user } = req;
        const { mainUrl } = req.body;
        const slug = await createShortUrl();
        const createUrl = await Url.create({
            mainUrl,
            shortUrl: slug,
            user_id: user.id
        });
        return res.status(201).json({
            message: "Your short url generated successfully",
            shortUrl: `${configs.protocol}://${configs.host}:${configs.port}/url/${slug}`
        })
    } catch (err) {
        next(err);
    }
}

exports.remove = async (req, res, next) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const userUrl = await Url.findByPk(id);
        if (!userUrl) {
            return res.status(404).json({
                message: "Url not found"
            })
        }
        const Author = await userUrl.getUser();
        if (Author.id != user.id) {
            return res.status(403).json({
                message: "FORBIDDEN"
            })
        }
        await userUrl.destroy();
        return res.status(200).json({
            message: "Short Url deleted successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.recover = async (req, res, next) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const userUrl = await Url.findByPk(id, {
            paranoid: false
        });
        if (!userUrl) {
            return res.status(404).json({
                message: "Url not found"
            })
        }
        const Author = await userUrl.getUser();
        if (Author.id != user.id) {
            return res.status(403).json({
                message: "FORBIDDEN"
            })
        }
        if (userUrl.dataValues.deletedAt == null) {
            return res.status(200).json({
                message: "This url has not deleted yet"
            })
        }
        await userUrl.restore();
        return res.status(200).json({
            message: "Url recovered successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.useUrl = async (req, res, next) => {
    try {
        const { key } = req.params;
        const mainUrl = await Url.findOne({
            where: {
                shortUrl: key
            },
            paranoid: true,
        });
        if (!mainUrl) {
            return res.status(404).json({
                message: "Short url not found"
            })
        }
        return res.redirect(mainUrl.mainUrl)

    } catch (err) {
        next(err)
    }
}
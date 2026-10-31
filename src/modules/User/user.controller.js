const User = require("./../../models/User");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("./../../utils/createTokens")
const jwt = require("jsonwebtoken")
const { authSecrets } = require("./../../../configs/configs")
const refreshTokenModel = require("../../models/RefreshToken");
const { raw } = require("express");
const Url = require("../../models/Url");

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (user) {
            return res.status(409).json({
                message: "An account with this email address already exists."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser =  User.build({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({
            message: "User registered Successfully , Please login"
        })
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { user } = req;
        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);
        await refreshTokenModel.destroy({
            where: {
                user_id: user.id
            }
        });
        await refreshTokenModel.create({
            user_id: user.id,
            token: refreshToken
        })
        return res.json({ accessToken, refreshToken })
    } catch (err) {
        next(err)
    }
}


exports.refreshToken = async (req, res, next) => {
    try {
        const authHeader = req.header("authorization");
        const refreshToken = authHeader?.split(" ")[1];

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token is required"
            })
        }
        const decode = jwt.verify(refreshToken, authSecrets.refreshTokenSecret);
        const user = await User.findByPk(decode.id);
        if (!user) {
            return res.status(404).json({
                message: "Please login"
            })
        }

        const token = await user.getRefreshToken({
            where: {
                token: refreshToken
            }
        });

        if (!token) {
            return res.status(404).json({
                message: "Please login"
            })
        }
        await token.destroy()
        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        await refreshTokenModel.create({
            user_id: user.id,
            token: newRefreshToken
        });
        return res.status(200).json({
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (err) {
        next(err)
    }
}

exports.me = async (req, res, next) => {
    const { user } = req;
    const Urls = await Url.findAll({
        where: {
            user_id: user.id
        },
        order: [['id', "DESC"]],
        attributes: {
            exclude: ['user_id'],
        },
        raw: true,
        paranoid: false
    });
    let mainUrls = [];
    let deletedUrls = [];
    Urls.forEach((url) => {
        if (url.deletedAt != null) {
            deletedUrls.push(url)
            deletedUrls.forEach((item) => {
                item.notice = "You can recover this url"
            })
        } else {
            mainUrls.push(url);
        }
    })
    deletedUrls.notice = "You can recover this url"
    return res.status(200).json({
        shortUrls: mainUrls,
        deletedUrls: deletedUrls
    })
}
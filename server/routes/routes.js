const express = require("express");
const router = express.Router();
const login = require("../login");
const register = require("../register");
const upload = require("../upload");

/* GET quotes listing. */
router.post("/login", function (req, res, next) {
    try {
        const body = req.body;
        const { resBody, status } = login.loginUser(body);
        res.status(status).json(resBody);
    } catch (err) {
        console.error("Error on log in", err.message);
        next(err);
    }
});

/* POST quote */
router.post("/register", function (req, res, next) {
    try {
        const body = req.body;
        const { resBody, status } = register.registerUser(body);
        res.status(status).json(resBody);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

router.post("/upload", function (req, res, next) {
    try {
        const body = req.body;
        const { resBody, status } = upload.uploadImage(req);
        res.status(status).json(resBody);
    } catch (err) {
        console.error("Error in upload", err.message);
        next(err);
    }
});

module.exports = router;
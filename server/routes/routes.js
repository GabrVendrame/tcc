const express = require("express");
const router = express.Router();
const login = require("../login");
const register = require("../register");
const upload = require("../upload");

router.get("/health", function (req, res, next) {
  res.json("penis");
});

/* GET quotes listing. */
router.post("/login", function (req, res, next) {
    try {
        const body = req.body;
        res.json(login.login());
    } catch (err) {
        console.error("Error on log in", err.message);
        next(err);
    }
});

/* POST quote */
router.post("/register", function (req, res, next) {
    try {
        const body = req.body;
        console.log(body);
        const { resBody, status } = register.register(body);
        res.status(status).json(resBody);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

router.post("/upload", function (req, res, next) {
    try {
        const body = req.body;
        //funcao upload
        res.json(200);
    } catch (err) {
        console.error("Error in upload", err.message);
        next(err);
    }
});

module.exports = router;
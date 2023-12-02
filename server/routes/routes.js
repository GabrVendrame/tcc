const express = require("express");
const multer = require('multer');
const router = express.Router();
const login = require("../login");
const register = require("../register");
// const upload = require("../upload");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './data/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

router.post("/login", function (req, res, next) {
    try {
        const body = req.body;
        console.log('login' + body);
        const { resBody, status } = login.loginUser(body);
        res.status(status).json(resBody);
    } catch (err) {
        console.error("Error on log in", err.message);
        next(err);
    }
});

router.post("/register", function (req, res, next) {
    try {
        const body = req.body;
        console.log('register' + body);
        const { resBody, status } = register.registerUser(body);
        res.status(status).json(resBody);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

router.post("/upload", upload.single('file'), function (req, res, next) {
    try {
        // console.log(req.body);
        // const dir = `./data/${req.body}`
        const body = req.file;
        console.log(body);
        // const { resBody, status } = upload.insertImage();
        // res.status(status).json(resBody);
    } catch (err) {
        console.error("Error in upload", err.message);
        next(err);
    }
});

module.exports = router;
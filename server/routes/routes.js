const express = require("express");
const multer = require('multer');
const router = express.Router();
const login = require("../login");
const register = require("../register");
const upload = require("../upload");
const getFiles = require("../getFiles");
const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

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

router.post("/upload", multerUpload.single('file'), async function (req, res, next) {
    try {

        const { originalname, buffer, mimetype, size } = req.file;

        const newFile = {
            name: originalname,
            file: buffer,
            user_id: "1",
            mimetype: mimetype,
            size: size
        };
        console.log(newFile);
        await upload.insertFile(newFile.name, newFile.file, newFile.user_id, newFile.mimetype, newFile.size);
        res.status(201).json("Upload successful");

    } catch (err) {
        console.error("Error in upload", err.message);
        next(err);
    }
});

router.get("/files/:id", async function (req, res, next) {
    console.log("get files");
    try {
        const id = req.params.id;
        console.log(id);

        const result = await getFiles.getFiles(id);

        if (result) {
            const { status, body } = result;

            // Configurar cabeçalhos da resposta
            res.setHeader('Content-Type', body.mimetype);

            // Enviar o conteúdo do arquivo como resposta
            res.send(body.file);
        }

        res.status(404).send('Arquivo não encontrado');

    } catch (err) {
        console.error("Error in get images", err.message);
        next(err);
    }
});

module.exports = router;
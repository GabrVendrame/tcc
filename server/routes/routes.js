const express = require('express');
const multer = require('multer');
const router = express.Router();
const user = require('../user');
const files = require('../files');
const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

router.post("/login", async function (req, res, next) {
    try {
        const { status, body } = await user.login(req.body);
        res.status(status).json({user_id: body});
    } catch (err) {
        console.error("error", err.message);
        next(err);
    }
});

router.post("/register", async function (req, res, next) {
    try {
        const { status, body } = await user.register(req.body);
        res.status(status).json(body);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

router.post("/upload", multerUpload.single("file"), async function (req, res, next) {
    try {
        const { originalname, buffer, mimetype, size } = req.file;
        const newFile = {
            name: originalname,
            file: buffer,
            user_id: req.body.user_id,
            mimetype: mimetype,
            size: size
        };
        console.log(newFile);
        const { status, body } = await files.insertFile(
            newFile.name, newFile.file, newFile.user_id, newFile.mimetype, newFile.size
        );

        res.status(status).json(body);
    } catch (err) {
        console.error("Error in upload", err);
        next(err);
    }
});

router.get("/files/:id", async function (req, res, next) {
    try {
        const user_id = req.params.id;
        const result = await files.getFiles(user_id);
        if (result) {
            const { status, body } = result;

            // Convertendo buffer para imagem
            const prefix = "data:" + body.mimetype + ";base64,";
            const buffertobase64 = new Buffer.from(body.file).toString("base64");
            const image = prefix + buffertobase64;
            
            // Configurar cabeçalhos da resposta
            res.setHeader("Content-Type", body.mimetype);
            
            // Enviar o conteúdo do arquivo como resposta
            res.send(image);

            return;
        }

        res.status(404).send("File not found");

    } catch (err) {
        console.error("Error getting images", err.message);
        next(err);
    }
});

module.exports = router;
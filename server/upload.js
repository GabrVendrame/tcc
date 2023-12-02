const db = require('./database');
const formidable = require('formidable');
const fs = require('fs')

function uploadImage(req){
    // get the file name
    let form = new formidable.IncomingForm();

    //Process the file upload in Node
    form.parse(req, function (error, fields, file) {
        console.log(file);
        let filepath = file.fileupload.filepath;
        let newpath = 'C:/test/';
        newpath += file.fileupload.originalFilename;

        //Copy the uploaded file to a custom folder
        fs.rename(filepath, newpath);
    });
    // convert file into binary?

    // save file into database

    return { status: 200, body: "" }
}

module.exports = { uploadImage };
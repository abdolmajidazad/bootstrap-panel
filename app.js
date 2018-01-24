const express = require('express');
const app = express();
var formidable = require('formidable');
var fs = require('fs');

app.post('/fileUpload', function(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let iteratorData = (Object.keys(files))[Symbol.iterator]();
        function moveFile(){
            let nextItem = iteratorData.next();
            if(!nextItem.done){
                if(files &&  files[nextItem['value']] && files[nextItem['value']]['path']){
                    let oldpath = files[nextItem['value']]['path'];
                    let newpath = `${__dirname}/files/${new Date().getTime()}_${files[nextItem['value']]['name']}`;
                    // fs.rename(oldpath, newpath, function (err) {
                    //     if (err) {
                    //         console.log("moveFile;", err)
                    //     }else{
                    //         moveFile();
                    //     }
                    //
                    // });

                    fs.readFile(oldpath, function (err, data) {
                        if (err) throw err;
                        console.log('File read!');

                        // Write the file
                        fs.writeFile(newpath, data, function (err) {
                            if (err) throw err;
                            // res.write('File uploaded and moved!');
                            res.end();
                            console.log('File written!');
                        });

                        // Delete the file
                        fs.unlink(oldpath, function (err) {
                            if (err) throw err;
                            console.log('File deleted!');
                        });
                    });
                }
            }else{
                res.end();
            }
        }
        moveFile();
    });
});
app.listen(3000, () => console.log('file upload server on 3000!'));




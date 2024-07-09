const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback)=> {
        const pathStorage = path.join(__dirname, '../../public/img/');
        callback(null, pathStorage)
    },
    filename: (req, file, callback)=> {
        const extencion = file.originalname.split(".").pop()
        const filename = `img-${Date.now()}.${extencion}`
        callback(null, filename)
    }
});

const fileUpload = multer({storage});

module.exports = fileUpload;

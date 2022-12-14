const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const router = express.Router()

fs.readdir('uploads', (err)=>{
    if(err){
        fs.mkdirSync('uploads')
    }
})

const upload = multer({
    storage: multer.memoryStorage({
        destination(req, file, cb){
            cb(null, 'uploads/');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname)
            cb(null, path.basename(file.originalname, ext)+Date.now()+ext)
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
})
router.post('/upload', upload.single('img'), (req, res)=>{
    console.log(req.file)
    res.json({url : `/${req.file.filename}`})
})
module.exports = router;
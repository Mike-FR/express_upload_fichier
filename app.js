var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// pour quete upload : multer
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.png')
    }
})

const uploaded = multer({ storage: storage , limits :{fileSize: 3 * 1000 * 1000}
})
//

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.post('/uploaddufichier', uploaded.array('monfichier', 3), function (req, res, next) {
    console.log(req.files)
    res.send(req.files)
})

module.exports = app;

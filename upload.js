var fs = require('fs');
var busboy = require('connect-busboy');

function handleUpload (app) {
  app.use(busboy());

  app.use(function(req, res, next){
    if (req.busboy){
      req.busboy.on('file', function( fileMoniker, file, fileName, enc, mime ){
        req.fileName = fileName;
        req.file = file;
        next();
      });
      req.pipe(req.busboy);
    } else {
      next();
    }
  });
}

module.exports = handleUpload;


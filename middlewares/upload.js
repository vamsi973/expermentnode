const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");


// var storage = new GridFsStorage({
//   url: dbConfig.url + dbConfig.database,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     const match = ["image/png", "image/jpeg"];

//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-bezkoder-${file.originalname}`;
//       return filename;
//     }

//     return {
//       bucketName: dbConfig.imgBucket,
//       filename: `${Date.now()}-bezkoder-${file.originalname}`
//     };
//   }
// });

// // var uploadFiles = multer({ storage: storage }).array("file", 10);
// var uploadFiles = multer({ storage: storage }).single("file");
// var uploadFilesMiddleware = util.promisify(uploadFiles);
var uploadFilesMiddleware = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(req.body, 29)
      let storage = new GridFsStorage({
        db: req.mongoConnection,
        file: (req, file) => {
          const match = ["image/png", "image/jpeg"];
          console.log(file.mimetype, 33)
          if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-bezkoder-${file.originalname}`;

            return filename;
          }
          return {
            bucketName: "test",
            filename: `${Date.now()}-bezkoder-${file.originalname}`
          };
        }
      });
      //  let abc = multer({ storage: storage }).single("uploadImg");
      multer({ storage: storage }).array(req.body.uploadImg._files, 10);

      resolve('jo');
    } catch (error) {
      reject(error);
    }
  })
}
module.exports = uploadFilesMiddleware;

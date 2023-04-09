const path = require("path");

const Multer = require("koa-multer");
const Jimp = require("jimp");

const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file_path");

/* const avatarUpload = Multer({
  dest: "./uploads/avatar",
}); */

const avatarStorage = Multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(3333333333);
    cb(null, AVATAR_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const avatarUpload = Multer({ storage: avatarStorage });
const avatarHandler = avatarUpload.single("avatar");

const pictureStorage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PICTURE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const pictureUpload = Multer({ storage: pictureStorage });
const pictureHandler = pictureUpload.array("picture", 9);

const pictureResize = async (ctx, next) => {
  const files = ctx.req.files;
  for (let file of files) {
    const fileNameNoEx = path.parse(file.filename).name;
    const ex = path.extname(file.filename);
    const destPath = path.join(file.destination, fileNameNoEx);

    Jimp.read(file.path).then((image) => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large${ex}`);
      image.resize(640, Jimp.AUTO).write(`${destPath}-middel${ex}`);
      image.resize(320, Jimp.AUTO).write(`${destPath}-small${ex}`);
    });
  }

  await next();
};

module.exports = { avatarHandler, pictureHandler, pictureResize };

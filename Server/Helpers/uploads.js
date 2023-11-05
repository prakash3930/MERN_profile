const multer = require('multer');

const uploads = (req, res, next) => {
  multer({
    limits: {
      fileSize: 1500000, // 1.5MB
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        return cb(null, true);
      } else {
        const error = new Error('Only .png, .jpg, or .jpeg format allowed.');
        error.status = 400;
        return cb(error);
      }
    },
  }).single('photo')(req, res, (err) => {
    if (err) {
      // Handle the error by sending it as a response
      return res.status(err.status || 500).json({ error: err.message });
    }
    next(); // No error, continue to the next middleware
  });
};

module.exports = uploads;
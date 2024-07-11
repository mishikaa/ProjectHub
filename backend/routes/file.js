const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const { getFileKeyAndName } = require('../utils/file'); // Utility function to get file key and name

// Download file route
router.get('/download/:fileKey', async (req, res) => {
  const fileKey = req.params.fileKey;

  try {
    const { fileName } = await getFileKeyAndName(fileKey);

    // Set appropriate response headers
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    // Retrieve the file from S3
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
    };

    const fileStream = s3.getObject(params).createReadStream();
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).send('Error downloading file');
  }
});

// Preview file route
router.get('/preview/:fileKey', async (req, res) => {
const fileKey = req.params.fileKey;
try {
  const { fileName, contentType } = await getFileKeyAndName(fileKey);
  // Set appropriate response headers
  res.setHeader('Content-Type', contentType);
  // Retrieve the file from S3
  const params = {
      Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
  };
  const fileStream = s3.getObject(params).createReadStream();
  fileStream.pipe(res);
} catch (error) {
  res.status(500).send('Error previewing file');
}
});
module.exports = router;
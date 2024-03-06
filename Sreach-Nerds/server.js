// server.js

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const FILE_IO_API_KEY ="WHW5K7C.PQKXQTG-KEYMD13-K68VVD2-CJ6D32C";

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Initialize Multer upload object
const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Check if a file was provided
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log("started ");
    // Prepare data for File.io API
    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));

    // Make request to File.io API
    const response = await axios.post('https://file.io', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-API-KEY': FILE_IO_API_KEY
      }
    });

    // Delete temporary file
    fs.unlinkSync(req.file.path);

    // Return the download link to the client
    res.status(200).json({ downloadLink: response.data.link });
  } catch (error) {
    console.error('Error uploading file: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer to use memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Configure Cloudinary
          
cloudinary.config({ 
  cloud_name:process.env.cloud_name, 
  api_key:process.env.api_key, 
  api_secret:process.env.api_secret 
});

// Define upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.buffer);

    // Optionally, you can delete the file from memory after uploading to Cloudinary
    // fs.unlinkSync(req.file.path);
     console.log(result);
    // Send the public URL of the uploaded image back to the client
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

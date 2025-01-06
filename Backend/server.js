const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); // To work with the file system

const app = express();

// Middleware
app.use(cors()); // To allow cross-origin requests
app.use(bodyParser.json()); // To parse JSON bodies

// POST route to save form data to formData.json
app.post('/api/form', (req, res) => {
  const formData = req.body; // The form data received in the request body

  // Read existing data from formData.json
  fs.readFile('formData.json', 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
      // If the file doesn't exist, create a new file with an empty array
      fs.writeFile('formData.json', JSON.stringify([formData]), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving data' });
        }
        res.status(201).json({ message: 'Form data saved' });
      });
    } else if (err) {
      return res.status(500).json({ message: 'Error reading data' });
    } else {
      // Parse existing data and append the new form data
      const existingData = JSON.parse(data);
      existingData.push(formData);

      // Write updated data back to formData.json
      fs.writeFile('formData.json', JSON.stringify(existingData), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving data' });
        }
        res.status(201).json({ message: 'Form data saved' });
      });
    }
  });
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

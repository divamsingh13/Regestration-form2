const express = require('express');
const fs = require('fs');
const router = express.Router();

// Handle POST request to save form data
router.post('/', (req, res) => {
  const formData = req.body;

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

module.exports = router;

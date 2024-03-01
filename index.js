const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const app = express();
const cors = require('cors')

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/curd');

// Enable CORS for all requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const CashflowModel = require('./src/models/CashflowModel')

app.use(cors())
//Route to handle file uploads
app.post('/cashFlow', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);

    // Save the data to MongoDB
    await CashflowModel.insertMany(data);

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.BASE_URL
app.listen(PORT, () => {
  console.log(`Server is running`);

});

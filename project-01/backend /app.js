const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const youtubedl = require('ytdl-core');
const fs = require('fs');



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Route  Serve the HTML form
app.get('/', (req, res) => {

   res.sendFile(__dirname + '/index.html');
});


// Route to handle form submission
// app.post('/submitLink', (req, res) => {
//     // Access the submitted link from req.body
//     const link = req.body.link;
    
//     // Send back the link as it is
//     res.send(`You submitted the link: ${link}`);


// });






const frontendPath = path.join(__dirname, '../frontend');

// Serve static files from the frontend folder

app.use('/link',express.static(frontendPath));


//fronted file html post data

// app.post('/submit', (req, res) => {
//     // Access the submitted link from req.body
//     const url = req.body.data;
    
//     // Send back the link as it is
//     res.send(`You submitted the link: ${url}`);


// });





// Start the server
const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

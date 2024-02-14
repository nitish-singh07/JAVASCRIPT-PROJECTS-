const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ytdl = require('ytdl-core');
const fs = require('fs');



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});
// Route to handle form submission
app.post('/submitLink', (req, res) => {
    // Access the submitted link from req.body
    const link = req.body.link;
    
    // Send back the link as it is
    res.send(`You submitted the link: ${link}`);


});






const frontendPath = path.join(__dirname, '../frontend');

// Serve static files from the frontend folder
app.use(express.static(frontendPath));


//fronted file html post data

// app.post('/submit', (req, res) => {
//     // Access the submitted link from req.body
//     const url = req.body.data;
    
//     // Send back the link as it is
//     res.send(`You submitted the link: ${url}`);


// });

//ytdl-core 
app.get('/submit', async (req, res) => {
    try {
        const { url } = req.body.data;

        if (!url) {
            return res.status(400).send('Missing URL parameter');
        }

        // Validate if the URL is a valid YouTube URL
        if (!ytdl.validateURL(url)) {
            return res.status(400).send('Invalid YouTube URL');
        }

        // Get video information
        const info = await ytdl.getInfo(url);

        // Set response headers
        res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);

        // Pipe video stream to response
        ytdl(url, {
            format: 'mp4'
        }).pipe(res);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error  how t0 ${error} ');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

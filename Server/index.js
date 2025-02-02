const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.get('/', async (req, res) => {
    try {
        const apiResponse = await fetch('https://api.jsonserve.com/Uw5CrX');
        const data = await apiResponse.json();
        res.json(data); // Send the data back to the front-end
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
}
)
const port = 8000;
app.listen(port, () => console.log(`listening on port ${port}`));
const express = require('express');
const monitorRoutes = require('./routes/monitor');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('frontend'));

app.use('/api/monitor', monitorRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

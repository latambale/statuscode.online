const http = require('http');
const https = require('https');
const url = require('url');

const startMonitoring = (req, res) => {
    const { url } = req.body;
    res.json({ message: 'Monitoring started for ' + url });
};

const checkUrl = (req, res) => {
    const { url: urlString } = req.body;
    const parsedUrl = url.parse(urlString);

    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    protocol.get(parsedUrl, (resp) => {
        if (resp.statusCode === 200) {
            res.json({ message: `The URL ${urlString} is up. Status Code: ${resp.statusCode}` });
        } else {
            res.json({ message: `Alert: The URL ${urlString} is down! Status Code: ${resp.statusCode}` });
        }
    }).on("error", (err) => {
        res.json({ message: `Alert: The URL ${urlString} is not reachable!` });
    });
};

module.exports = { startMonitoring, checkUrl };

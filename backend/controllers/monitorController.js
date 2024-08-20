const http = require('http');
const https = require('https');
const url = require('url');
const monitors = [];

let monitorId = 0;

const addMonitor = (req, res) => {
    const { url, frequency } = req.body;
    const id = monitorId++;
    monitors.push({ id, url, frequency });
    res.json({ id, message: 'Monitor added for ' + url });
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

const deleteMonitor = (req, res) => {
    const { id } = req.params;
    const index = monitors.findIndex(monitor => monitor.id == id);
    if (index !== -1) {
        monitors.splice(index, 1);
        res.json({ success: true, message: 'Monitor deleted' });
    } else {
        res.json({ success: false, message: 'Monitor not found' });
    }
};

module.exports = { addMonitor, checkUrl, deleteMonitor };

document.getElementById('monitorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const frequency = document.getElementById('frequency').value;

    fetch('/api/monitor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, frequency })
    })
    .then(response => response.json())
    .then(data => {
        const monitorStatus = document.getElementById('monitorStatus');
        monitorStatus.innerHTML = `<p>Status: Monitoring started for ${url}</p>`;

        const intervalId = setInterval(() => {
            fetch('/api/monitor/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            })
            .then(response => response.json())
            .then(data => {
                const statusMsg = `<p>${data.message}</p>`;
                monitorStatus.innerHTML += statusMsg;
            });
        }, frequency * 1000);
    })
    .catch(error => console.error('Error:', error));
});

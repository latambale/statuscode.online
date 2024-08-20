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
        addMonitorToList(data.id, url, frequency);
    })
    .catch(error => console.error('Error:', error));
});

function addMonitorToList(id, url, frequency) {
    const monitorList = document.getElementById('monitorList');
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    listItem.innerHTML = `
        <div>
            <span>${url} (Every ${frequency} seconds)</span>
            <div id="status-${id}" class="status-message mt-2"></div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteMonitor('${id}')">Delete</button>
    `;
    listItem.id = `monitor-${id}`;
    monitorList.appendChild(listItem);

    // Start monitoring
    setInterval(() => {
        fetch('/api/monitor/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        })
        .then(response => response.json())
        .then(data => {
            const statusElement = document.getElementById(`status-${id}`);
            statusElement.textContent = data.message;
            statusElement.classList.add(data.message.includes('down') ? 'text-danger' : 'text-success');
        });
    }, frequency * 1000);
}

function deleteMonitor(id) {
    fetch(`/api/monitor/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById(`monitor-${id}`).remove();
        }
    })
    .catch(error => console.error('Error:', error));
}

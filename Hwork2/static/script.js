// script.js

function submitApplication() {
    const name = document.getElementById('applicantName').value;
    const zipcode = document.getElementById('zipCode').value;
    
    if (!name || !zipcode) {
        alert('Please fill in all fields');
        return;
    }

    fetch('/api/submit_application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            zipcode: zipcode
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Application submitted successfully!\nYour application number is: ${data.application_number}`);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting application');
    });
}

function checkStatus() {
    const appNumber = document.getElementById('checkAppNumber').value;
    
    if (!appNumber) {
        alert('Please enter an application number');
        return;
    }

    fetch('/api/check_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            application_number: appNumber
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('statusResult').textContent = 
            `Application Status: ${data.status}`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error checking status');
    });
}

function updateStatus() {
    const appNumber = document.getElementById('updateAppNumber').value;
    const newStatus = document.getElementById('newStatus').value;
    
    if (!appNumber || !newStatus) {
        alert('Please fill in all fields');
        return;
    }

    fetch('/api/update_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            application_number: appNumber,
            new_status: newStatus
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating status');
    });
}
# app.py
from flask import Flask, jsonify, render_template, request
import random

app = Flask(__name__)

# Dictionary to store applications
# Format: {app_number: {'name': str, 'zipcode': str, 'status': str}}
applications = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/submit_application', methods=['POST'])
def submit_application():
    data = request.get_json()
    name = data.get('name')
    zipcode = data.get('zipcode')
    
    # Generate a unique application number (simple implementation)
    app_number = str(random.randint(1000, 9999))
    while app_number in applications:
        app_number = str(random.randint(1000, 9999))
    
    # Store the application
    applications[app_number] = {
        'name': name,
        'zipcode': zipcode,
        'status': 'received'
    }
    
    return jsonify({
        'application_number': app_number,
        'message': 'Application submitted successfully'
    })

@app.route('/api/check_status', methods=['POST'])
def check_status():
    data = request.get_json()
    app_number = data.get('application_number')
    
    if app_number in applications:
        return jsonify({
            'status': applications[app_number]['status']
        })
    return jsonify({
        'status': 'not found'
    })

@app.route('/api/update_status', methods=['POST'])
def update_status():
    data = request.get_json()
    app_number = data.get('application_number')
    new_status = data.get('new_status')
    
    if app_number in applications:
        applications[app_number]['status'] = new_status
        return jsonify({
            'message': 'Status updated successfully'
        })
    return jsonify({
        'message': 'Application not found'
    }), 404

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, jsonify, request, session, make_response

from flask_migrate import Migrate
from flask_cors import CORS
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange
from models import db, User, ServiceProvider, ServiceRequest
import os




app = Flask(__name__)
CORS(app)  
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


migrate = Migrate(app, db)

db.init_app(app)

class CreateServiceProviderForm(FlaskForm):
    fullname = StringField('Full Name', validators=[DataRequired()])
    skills = StringField('Skills', validators=[DataRequired(), Length(min=3)])
    experience = IntegerField('Experience (years)', validators=[NumberRange(min=0)])
    availability = StringField('Availability', validators=[DataRequired()])

@app.route('/')
def home():
    return ''

# POST /login
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        # Get user credentials from the request data
        data = request.json
        username = data.get('username')
        password = data.get('password')

        # Query the database to find a user with the provided username
        user = User.query.filter_by(username=username).first()

        if user and user.password == password:
            # Authentication successful, create a session
            session['user_id'] = user.id

            # Return a JSON response indicating successful login
            return jsonify({'message': 'Authentication successful'})

        # Authentication failed, return a JSON response
        return jsonify({'error': 'Invalid credentials'})
#@app.route('/service-provider', methods=['POST'])
def create_service_provider():
    if request.method == 'POST':
        # Get JSON data from the request
        data = request.json

        try:
            # Create a new User object (service provider)
            new_service_provider = ServiceProvider(
                fullname=data.get('fullname'),
                skills=data.get('skills'),
                experience=data.get('experience'),
                availability=data.get('availability')
            )

            # Add the new service provider to the database
            db.session.add(new_service_provider)
            db.session.commit()

            # Return a success message
            return jsonify({'message': 'Service provider created successfully'})
        except Exception as e:
            db.session.rollback()  # Rollback the transaction in case of an error
            return jsonify({'error': str(e)})
    else:
        # Handle invalid HTTP methods with a 405 Method Not Allowed response
        return jsonify({'error': 'Method not allowed'}), 405
    
# POST /service-request
@app.route('/service-request', methods=['POST'])
def create_service_request():
    if request.method == 'POST':
        # Get JSON data from the request
        data = request.json

        # Create a new ServiceRequest object
        new_service_request = ServiceRequest(
            title=data.get('title'),
            description=data.get('description'),
            location=data.get('location'),
            status=data.get('status'),
            user_id=data.get('user_id')
        )

        # Add the new service request to the database
        db.session.add(new_service_request)
        db.session.commit()

        return jsonify({'message': 'Service request created successfully'})



# GET /users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append({
            'id': user.id,
            'username': user.username,
            'email': user.email
        })
    return jsonify(user_list)

# GET /users/:id
@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user is None:
        return make_response(jsonify({'error': 'User not found'}), 404)

    service_requests = []
    for request in user.service_requests:
        service_requests.append({
            'id': request.id,
            'title': request.title,
            'description': request.description,
            'location': request.location,
            'status': request.status,
            'rating': request.rating  
        })

    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'service_requests': service_requests
    }
    return jsonify(user_data)


# GET /service-providers
@app.route('/service-providers', methods=['GET'])
def get_service_providers():
    providers = ServiceProvider.query.all()
    provider_list = []
    for provider in providers:
        provider_list.append({
            'id': provider.id,
            'fullname': provider.fullname,
            'skills': provider.skills,
            'experience': provider.experience,
            'availability': provider.availability
        })
    return jsonify(provider_list)

# GET /service-providers/:id
@app.route('/service-providers/<int:id>', methods=['GET'])
def get_service_provider(id):
    provider = ServiceProvider.query.get(id)
    if provider is None:
        return make_response(jsonify({'error': 'Service Provider not found'}), 404)

    user_data = {
        'id': provider.id,
        'fullname': provider.fullname,
        'skills': provider.skills,
        'experience': provider.experience,
        'availability': provider.availability,
        'user_id': provider.user_id
    }
    return jsonify(user_data)

# GET /service-requests (Fetch a list of service requests)
@app.route('/service_requests', methods=['GET'])
def get_service_requests():
    service_requests = ServiceRequest.query.all()
    service_request_list = []

    for request in service_requests:
        service_request_list.append({
            'id': request.id,
            'title': request.title,
            'description': request.description,
            'location': request.location,
            'status': request.status,
            'user_id': request.user_id
        })

    return jsonify(service_request_list)

@app.route('/service-requests/<int:id>', methods=['PATCH'])
def update_service_request(id):
    if request.method == 'PATCH':
        # Get JSON data from the request
        data = request.json

        # Find the service request by ID
        service_request = ServiceRequest.query.get(id)

        if service_request is None:
            return make_response(jsonify({'error': 'Service Request not found'}), 404)

        # Update the service request attributes
        service_request.title = data.get('title', service_request.title)
        service_request.description = data.get('description', service_request.description)
        service_request.location = data.get('location', service_request.location)
        service_request.status = data.get('status', service_request.status)
        service_request.user_id = data.get('user_id', service_request.user_id)

        # Commit the changes to the database
        db.session.commit()

        return jsonify({'message': 'Service request updated successfully'})

@app.route('/service-requests/<int:id>', methods=['DELETE'])
def delete_service_request(id):
    if request.method == 'DELETE':
        # Find the service request by ID
        service_request = ServiceRequest.query.get(id)

        if service_request is None:
            return make_response(jsonify({'error': 'Service Request not found'}), 404)

        # Delete the service request from the database
        db.session.delete(service_request)
        db.session.commit()

        return jsonify({'message': 'Service request deleted successfully'})

if __name__ == '__main__':
    app.run(port=5555)

from flask_sqlalchemy import SQLAlchemy
from marshmallow import  validates, ValidationError,Schema

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    usertype = db.Column(db.String, default='seeker', nullable=True)

    # Define the one-to-many relationship with ServiceRequest
    service_requests = db.relationship('ServiceRequest', back_populates='user')
    service_provider = db.relationship('ServiceProvider', back_populates='user')
    ratings = db.relationship('Rating', back_populates='user')

    @staticmethod
    def load_user(user_id):
        return User.query.get(int(user_id))

class ServiceRequest(db.Model):
    __tablename__ = 'service_request'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    location = db.Column(db.String)
    status = db.Column(db.String)

    # Define the foreign key relationship to User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Define the one-to-one relationship with Rating
    rating = db.relationship('Rating', uselist=False, back_populates='service_request')
    user = db.relationship('User', back_populates='service_requests')

class ServiceProvider(db.Model):
    __tablename__ = 'service_provider'

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String)
    skills = db.Column(db.String)
    experience = db.Column(db.String)
    availability = db.Column(db.String)

    # Define the many-to-one relationship with User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='service_provider')

class Rating(db.Model):
    __tablename__ = 'rating'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_request_id = db.Column(db.Integer, db.ForeignKey('service_request.id'), nullable=False)

    user = db.relationship('User', back_populates='ratings')
    service_request = db.relationship('ServiceRequest', back_populates='rating')

# Define Marshmallow schemas for serialization
class UserSchema(Schema):
    class Meta:
        model = User

    # Add validation for the 'email' field
    @validates('email')
    def validate_email(self, value):
        if not value:
            raise ValidationError('Email is required')
        # You can add more complex email validation logic if needed

    # Add validation for the 'password' field
    @validates('password')
    def validate_password(self, value):
        if not value:
            raise ValidationError('Password is required')

class ServiceRequestSchema(Schema):
    class Meta:
        model = ServiceRequest

class ServiceProviderSchema(Schema):
    class Meta:
        model = ServiceProvider

class RatingSchema(Schema):
    class Meta:
        model = Rating

# Create instances of the schemas
user_schema = UserSchema()
service_request_schema = ServiceRequestSchema()
service_provider_schema = ServiceProviderSchema()
rating_schema = RatingSchema()

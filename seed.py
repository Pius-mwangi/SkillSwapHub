from app import db , app  # Import your Flask app and db instance
from models import User, ServiceProvider, ServiceRequest, Rating 
from faker import Faker
import random
# from flask import Flask

# Initialize the Faker instance
fake = Faker()

# Function to generate random users
def generate_users(num_users):
    users = []
    for _ in range(num_users):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password=fake.password(),
            usertype=random.choice(['provider', 'seeker'])
        )
        users.append(user)
    return users

# Function to generate random service providers
def generate_service_providers(num_providers, users):
    providers = []
    for _ in range(num_providers):
        # Randomly select a user for the provider
        random_user = random.choice(users)

        # Join the list of skills into a single string
        skills = ', '.join(fake.words(nb=5))

        provider = ServiceProvider(
            fullname=fake.name(),
            skills=skills,  # Use the joined string of skills
            experience=fake.sentence(),
            availability=fake.sentence(),
            user=random_user  # Assign the selected user to the provider
        )
        providers.append(provider)
    return providers
# Function to generate random service requests
def generate_service_requests(num_requests, users):
    requests = []
    for _ in range(num_requests):
        request = ServiceRequest(
            title=fake.sentence(),
            description=fake.paragraph(),
            location=fake.city(),
            status=random.choice(['open', 'in progress', 'completed']),
            user=random.choice(users)
        )
        requests.append(request)
    return requests

# Function to generate random ratings
def generate_ratings(num_ratings, users, requests):
    ratings = []
    for _ in range(num_ratings):
        rating = Rating(
            review=fake.paragraph(),
            user=random.choice(users),
            service_request=random.choice(requests)
        )
        ratings.append(rating)
    return ratings

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create the database tables

        # Generate sample data
        num_users = 10
        num_providers = 5
        num_requests = 20
        num_ratings = 15

        users = generate_users(num_users)
        providers = generate_service_providers(num_providers, users)
        requests = generate_service_requests(num_requests, users)
        ratings = generate_ratings(num_ratings, users, requests)

        # Add data to the database
        db.session.add_all(users)
        db.session.add_all(providers)
        db.session.add_all(requests)
        db.session.add_all(ratings)

        # Commit the changes
        db.session.commit()

        print("Sample data has been seeded successfully.")
        
  
       
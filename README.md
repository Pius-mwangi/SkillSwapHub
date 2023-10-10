# SkillSwap Hub

SkillSwap Hub is a web-based platform that connects skill seekers and skill providers. It enables users to request services, find service providers, and facilitate skill exchanges. This README provides an overview of the project, its functionality, and how to set it up and run it.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

SkillSwap Hub aims to connect individuals looking for specific skills or services with individuals who can provide those skills. The project includes both frontend and backend components.

The frontend is built with React, providing a user-friendly interface for skill seekers to search for service providers, make service requests, and manage their profiles. The backend is implemented with Flask, serving as an API that handles user authentication, skill requests, and service provider profiles.

## Features

- User authentication (login and registration)
- Skill provider profiles with details like skills, experience, and availability
- Skill request creation and management
- Searching for service providers based on various criteria
- Integration with a PostgreSQL database to store user data

## Getting Started

To run SkillSwap Hub locally, CLICK the link on the right side when you ope the repo in github 


## API Endpoints
The backend provides the following API endpoints:

GET /users: Get a list of all users.
GET /users/<int:id>: Get user details by ID.
POST /login: User login.
POST /service-provider: Create a new service provider profile.
POST /service-request: Create a new service request.
GET /service-providers: Get a list of all service providers.
GET /service-providers/<int:id>: Get service provider details by ID.
GET /service-requests: Get a list of all service requests.
PATCH /service-requests/<int:id>: Update a service request.
DELETE /service-requests/<int:id>: Delete a service request.


## Frontend
The frontend is built using React and contains various components and routes to manage user interactions. It provides an intuitive user interface for skill seekers to navigate the platform, search for service providers, and create service requests.

## Technologies Used
Flask: Backend web framework
React: Frontend JavaScript library
SQLAlchemy: Python SQL toolkit and Object-Relational Mapping (ORM)
PostgreSQL: Relational database management system
Flask-WTF: Form handling in Flask
React Router: Client-side routing for React applicati


## License
This project is licensed under the MIT License.
## Author
Piouware 
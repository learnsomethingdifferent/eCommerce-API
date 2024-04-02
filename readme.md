# Node.js eCommerce REST API

A secure and scalable Node.js API for user authentication and authorization, banner, brand with CRUD operation. This project uses popular technologies such as bcrypt, JWT, Mongoose, Express, Nodemailer, cors, multer and Joi to implement robust user registration, login, and access control features.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository.
   git clone https://github.com/learnsomethingdifferent/eCommerce-API.git

2. Install dependencies.
   npm install express mongoose, bcrypt, cors, jsonwebtoken, multer, nodemailer

3. Set up environment variables.
   cp .env

4. Update [.env] with your configuration.

   - PORT =3 000
   - MONGODB_URI = mongodb://localhost:27017/your-databaseName
   - JWT_SECRET = your-jwt-secret
   - SMTP_HOST = smtp.example.com
   - SMTP_PORT= your-smpt-port
   - SMTP_USERNAME = your-smpt-username
   - SMTP_PASSWORD = your-smpt-password
   - BASE_URL = your-base-url

5. Start the server.
   npm start

## User Authenticaiton Usage

1. Register a new user.
   Method POST
   http://localhost:3000/api/auth/register

2. Activate the user account.
   Method POST
   http://localhost:3000/api/auth/activate/:token

3. Log in to get an authentication token.
   Method POST
   http://localhost:3000/api/auth/login

4. Access the user dashboard using the authentication token.
   Method GET
   http://localhost:3000/api/auth/dashboard

5. Log out to invalidate the authentication token.
   Method POST
   http://localhost:3000/api/auth/forgot-password

6. Set New Password
   Method POST
   http://localhost:3000/api/auth/set-new-password

7. Get Access the admin dashboard
   Method GET
   http://localhost:3000/api/auth/admin

## User CRUD Operation Endpoints&Method and This Operation Perform Only For Admin

1. Read All Users.
   Method GET
   http://localhost:3000/api/users

2. Read Users With There ID.
   Method GET
   http://localhost:3000/api/users/:userId

3. Update Users With There ID.
   Method PUT
   http://localhost:3000/api/users/:userId

4. Delete Users With There ID.
   Method DELETE
   http://localhost:3000/api/users/user

5. Create Users.
   Method POST
   http://localhost:3000/api/users

6. Activate Users
   Method GET
   http://localhost:3000/api/users/activate/:token

7. Forgot Password.
   Method POST
   http://localhost:3000/api/users/forgot-password

8. Set New Password
   Method POST
   http://localhost:3000/api/users/set-new-password

## Banner CRUD Operation And This Operation Perform Only For Admin

1. Read All Brands.
   Method GET
   http://localhost:3000/api/brand

2. Read Brands With There ID.
   Method GET
   http://localhost:3000/api/brand/:id

3. Update Brands With There ID.
   Method PUT
   http://localhost:3000/api/brand/:id

4. Delete Brands With There ID.
   Method GET
   http://localhost:3000/api/brand/:id

5. Create Brands.
   Method POST
   http://localhost:3000/api/brand/create

## Banner CRUD Operation And This Operation Perform Only For Admin

1. Read All Brands.
   Method GET
   http://localhost:3000/api/banner

2. Read Brands With There ID.
   Method GET
   http://localhost:3000/api/banner/:id

3. Update Brands With There ID.
   Method PUT
   http://localhost:3000/api/banner/:id

4. Delete Brands With There ID.
   Method GET
   http://localhost:3000/api/banner/:id

5. Create Brands.
   Method POST
   http://localhost:3000/api/banner/create

## Contributing

Welcome🙏🙏 Contributions! Please follow our [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

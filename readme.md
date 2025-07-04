# Authentication Project

A modern, full-stack authentication system built with React, Node.js, Express, and MongoDB. This project provides secure, scalable, and user-friendly authentication flows, including registration, login, password reset via OTP, and profile management.

## Features

- **User Registration**: Sign up with username, email, password, and optional profile image.
- **Login**: Secure login with JWT-based authentication.
- **Protected Routes**: Only authenticated users can access certain pages (e.g., Profile, Password Reset).
- **Password Recovery**: Request a password reset via email with OTP verification.
- **Profile Management**: View and update user profile and avatar.
- **Responsive UI**: Modern, mobile-friendly interface using Tailwind CSS.
- **Email Notifications**: Automated emails for registration and OTP using Nodemailer.
- **State Management**: Uses Zustand for global state in React.
- **API Security**: JWT authentication middleware on the backend.

## Tech Stack

- **Frontend**: React, React Router, Zustand, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Nodemailer
- **Other**: Mailgen for email templates, dotenv for environment variables


## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- Gmail account for sending emails (or configure your own SMTP)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/AuthenticationProject.git
cd AuthenticationProject
```

### 2. Setup Environment Variables

Create a `.env` file in the `server/` directory with the following:

```
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
EMAIL=your_gmail_address
EMAIL_PASSWORD=your_gmail_app_password
```

> **Note:** For Gmail, you may need to use an [App Password](https://support.google.com/accounts/answer/185833?hl=en) if 2FA is enabled.

### 3. Install Dependencies

#### Backend

```bash
cd server
npm install
```
#### Frontend

```bash
cd ../client
npm install
```

### 4. Run the Application

#### Start Backend

```bash
cd server
npm start
```

#### Start Frontend

```bash
cd client
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8080](http://localhost:8080)

## Usage

- **Register**: Create a new account.
- **Login**: Access your account.
- **Forgot Password**: Request an OTP to your email and reset your password.
- **Profile**: View and update your profile and avatar.

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Login and receive JWT
- `POST /api/authenticate` - Authenticate user by username
- `GET /api/generate-otp` - Generate OTP for password recovery
- `GET /api/verify-otp` - Verify OTP
- `GET /api/create-reset-session` - Create password reset session
- `POST /api/send-mail` - Send email (internal use)

## Security Notes

- Passwords are hashed using Bcrypt before storage.
- JWT tokens are used for authentication and route protection.
- Sensitive data is managed via environment variables.



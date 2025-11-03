# Web Security Fundamentals | Auth-System

## Setup Repository
## BACKEND
**Clone the Repository** \
  `git clone [Link]` \
  `cd portfolio_backend` \
**Install dependencies** \
 `npm install` \
**Create .env file**\
  `JWT_SECRET=your_jwt_secret\
  `REFRESH_SECRET=your_refresh_secret\
  `GOOGLE_CLIENT_ID=your_client_id\
  `GOOGLE_CLIENT_SECRET=your_client_secret\
  `EMAIL_USER=your.email@gmail.com\
  `EMAIL_PASS=your_app_password\
**Start MongoDB**\
  `Ensure MongoDB is running locally on mongodb://localhost:27017/portfolioDB \
**Run the backend Server** \
  `node app.js` \
  *Note:* Make sure you have cert/server.key and cert/server.cert for local HTTPS. \

## FRONTEND
**Navigate to the frontend folder**
 `cd portfolio_frontend`
**Install dependencies**
 `npm install`
**Run the backend Server**
  `npm run dev`
**Visit the app**
  `Open https://localhost:5173 in your browser \ 

## AUTHENTICATION
**Local Login:** Users can register and log in using email and password. Passwords are hashed using bcrypt. \
**Google OAuth:** Users can log in with their Google account via Passport.js.. \
**Session Management:** \
    - Access and refresh tokens are issued via JWT.
    - Tokens are stored in HttpOnly cookies with Secure and SameSite=Strict flags.
    - Refresh tokens allow seamless session renewal without re-authentication.
**Password Reset:** Users can request a reset link via email (using Gmail App Passwords and Nodemailer). \

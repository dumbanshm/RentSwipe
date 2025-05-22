# RentSwipe - Property Rental App

A Tinder-like application for property rentals, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- Tinder-like swiping interface for properties
- User authentication (login/register)
- Role-based access (renter/landlord)
- Property listing management
- Like/dislike properties
- View matched properties
- Filter properties by price, location, and amenities

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [<repository-url>](https://github.com/dumbanshm/RentSwipe.git)
cd RentSwipe
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Running the Application

1. Start the server:
```bash
cd server
npm start
```

2. Start the client:
```bash
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Register as either a renter or landlord
2. If you're a landlord, you can add properties
3. If you're a renter, you can:
   - Swipe right to like a property
   - Swipe left to dislike a property
   - View your matched properties
   - Filter properties by various criteria

## Tech Stack

- Frontend:
  - React.js with TypeScript
  - Material-UI for styling
  - React Router for navigation
  - Axios for API calls
  - React Tinder Card for swiping functionality

- Backend:
  - Node.js with Express
  - MongoDB with Mongoose
  - JWT for authentication
  - bcrypt for password hashing

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 

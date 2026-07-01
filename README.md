# 🌍 Smart Travel Itinerary Generator

### A Full-Stack Web Application for Personalized Travel Planning
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-black?logo=socketdotio)
![HTML5](https://img.shields.io/badge/HTML5-Frontend-orange?logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-Styling-blue?logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)

## 📖 About the Project

Smart Travel Itinerary Generator is a full-stack travel planning web application that helps users create personalized travel itineraries based on their destination and travel preferences.

The application provides an interactive platform where users can register, log in securely, generate customized travel plans, explore destinations using integrated maps, view weather information, save their trips, and export itineraries as PDF documents.

The project combines modern web technologies with real-time communication using Socket.IO to deliver a smooth and responsive user experience. All user information and trip data are securely stored in MongoDB, allowing users to access and manage their travel plans anytime.
## 🎯 Problem Statement

Planning a trip often requires using multiple websites for weather updates, destination information, maps, and itinerary organization. Managing these resources separately makes travel planning time-consuming and inconvenient.

This project addresses these challenges by providing a single platform where users can plan trips, manage itineraries, access travel information, and save their travel plans efficiently.
## ✨ Features

- 🔐 User Registration and Login
- 🌍 Personalized Trip Planning
- 📍 Source and Destination Selection
- 📅 Travel Date Scheduling
- 👥 Multi-Traveler Planning
- 💰 Budget-Based Trip Planning
- 🎯 Travel Category Selection (Adventure, Family, etc.)
- 🖼 Destination Images
- 🏨 Hotel Recommendation
- 🌦 Weather Forecast Integration
- 🗺 Interactive Route Map
- 📅 Day-wise Itinerary Generation
- 💾 Save Trips to Database
- 📄 Export Itinerary as PDF
- ⚡ Real-Time Dashboard Updates using Socket.IO
## 🚀 How It Works

1. The user logs into the application.
2. The user enters:
   - Current Location
   - Destination
   - Travel Category
   - Travel Dates
   - Number of Travelers
   - Budget
3. The application processes the provided information.
4. A personalized itinerary is generated.
5. Weather information and destination images are displayed.
6. A travel route map is generated.
7. Users can save the trip to MongoDB.
8. The itinerary can be exported as a PDF document.
## 📂 Project Modules

### Authentication
- User Registration
- User Login
- Session Management

### Trip Planner
- Travel Form
- Personalized Itinerary
- Budget Planning
- Travel Category Selection

### Dashboard
- Saved Trips
- Trip Management

### Weather Module
- Current Weather Forecast

### Maps Module
- Route Visualization

### PDF Module
- Download Itinerary as PDF

### Database
- MongoDB for User and Trip Storage
## 🛠 Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Real-Time Communication

- Socket.IO

### APIs

- Weather API
- Map Integration
## 🌐 API Integration

The application integrates multiple external services to enhance the travel planning experience.

| API | Purpose |
|------|---------|
| Weather API | Retrieves weather information for the selected destination |
| Map API | Displays travel routes and destination locations |
| Destination Images | Displays images of tourist destinations |

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Ananya27290/smart-travel-itinerary-generator.git
```

### Navigate to the Project Folder

```bash
cd smart-travel-itinerary-generator
```

### Install Dependencies

```bash
npm install
```

### Start MongoDB

Make sure MongoDB is running locally.

### Start the Application

```bash
npm start
```

or

```bash
node server.js
```

### Open in Browser

```
http://localhost:3000
```
## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Ananya27290/smart-travel-itinerary-generator.git
```

### Navigate to the Project Folder

```bash
cd smart-travel-itinerary-generator
```

### Install Dependencies

```bash
npm install
```

### Start MongoDB

Make sure MongoDB is running locally.

### Start the Application

```bash
npm start
```

or

```bash
node server.js
```

### Open in Browser

```
http://localhost:3000
```
## 💡 Future Enhancements

- 🤖 AI-based travel recommendations
- 💳 Online hotel and flight booking integration
- 📍 Live GPS navigation
- 💬 Chatbot for travel assistance
- 🌐 Multi-language support
- 📱 Mobile application
- ⭐ User ratings and reviews
- 💸 Expense tracking during trips
- 🎯 Smart destination recommendations based on user preferences
# 🚀 GigFlow - Full-Stack Freelance Marketplace

GigFlow is a full-stack mini freelance marketplace where clients can post gigs and freelancers can bid on them.  
The platform implements secure authentication, complex database relationships, race-condition-safe hiring logic, and real-time notifications.

> This project was built as part of a Full Stack Development Internship assignment.

---

## 🚀 Live Demo
Frontend: https://your-vercel-link.vercel.app  
Backend: https://gigflow-bff7.onrender.com 

📽️ Demo Video (Loom): https://loom.com/share/your-video

---

## 📌 Features

### Core Features
- User authentication (JWT + HttpOnly cookies)
- Create, browse, and search gigs
- Bid on gigs with price and proposal
- Gig owner can view all bids
- Secure hiring flow:
  - Only one freelancer can be hired per gig
  - Others are automatically rejected
- Role-free system: any user can act as client or freelancer

### Bonus Features Implemented
- ✅ Race-condition-safe hiring using MongoDB Transactions  
- ✅ Real-time notifications using Socket.io  
- Responsive UI using Tailwind CSS  
- Protected routes and authorization  
- Clean architecture (controllers, services, models)

---

## 🧠 Technical Architecture

### Tech Stack
- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose
- Auth: JWT with HttpOnly cookies
- State Management: Redux Toolkit
- Real-time: Socket.io

### Architecture Style
- Backend follows Controller → Service → Model separation
- State managed globally using Redux slices
- Socket events emitted only after DB transaction success

---

## 🔐 Race Condition Safe Hiring (Transactional Integrity)

The hiring logic is implemented using MongoDB transactions.

Flow:
1. Start MongoDB session
2. Verify gig is still open
3. Mark gig as assigned
4. Mark selected bid as hired
5. Mark all other bids as rejected
6. Commit transaction

If two users attempt to hire simultaneously:
- One succeeds
- Other fails safely with `"Gig already assigned"` 

This guarantees **atomicity and data consistency**.

---

## ⚡ Real-Time Notifications (Socket.io)

- Each user joins a private socket room using their userId
- After successful hire, backend emits:
```javascript
io.to(userId).emit('hired', {
  message: 'You have been hired for [Gig Title]'
});
```
- Freelancer receives instant notification without refresh

---

## 🧪 Example Test Scenario Covered

- Two users clicking "Hire" simultaneously
- Only one hire succeeds
- Second receives proper error: "Gig already assigned"
- No data corruption occurs

---

## 🛠️ How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=http://localhost:5173
PORT=5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Folder Structure

```
backend/
  config/           # Database configuration
  controllers/      # Request handlers
  middlewares/      # Auth middleware
  models/           # MongoDB schemas
  routes/           # API endpoints
  services/         # Business logic layer
  utils/            # Utilities (JWT, etc.)
  server.js         # Entry point

frontend/
  components/       # Reusable UI components
  pages/            # Route pages
  redux/            # State management
    └── slices/     # Redux slices
  socket.js         # Socket.io client
  utils/            # API & Socket utilities
```

---

## 👤 Author

**Abhinay**
GitHub: [https://github.com/yourusername](https://github.com/yourusername)
LinkedIn: [https://linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

---

## 🏗️ Architecture Overview

```
gigflow/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Auth middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── services/           # Business logic layer
│   ├── utils/              # Utilities (JWT, etc.)
│   └── server.js           # Entry point
│
└── frontend/               # React + Vite SPA
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Route pages
    │   ├── redux/          # State management
    │   │   └── slices/     # Redux slices
    │   └── utils/          # API & Socket utilities
    └── public/             # Static assets
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with Vite for fast development
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Socket.io-client** - Real-time communication
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js + Express** - Server framework
- **MongoDB + Mongoose** - Database & ODM
- **JWT (HttpOnly cookies)** - Secure authentication
- **bcrypt** - Password hashing
- **Socket.io** - Real-time WebSocket server
- **MongoDB Transactions** - ACID-compliant operations

## ✨ Key Features

### Core Functionality
- ✅ User registration and login with JWT authentication
- ✅ Post and browse gigs with search and filtering
- ✅ Submit bids on open gigs
- ✅ Hire freelancers with transaction-safe logic
- ✅ Real-time hiring notifications via Socket.io
- ✅ Dynamic dashboard based on user activity

### Advanced Features
- 🔒 **Security**: HttpOnly JWT cookies, password hashing, auth middleware
- ⚡ **Real-time**: Socket.io for instant hiring notifications
- 🔐 **Transactions**: MongoDB ACID transactions prevent race conditions
- 🎨 **Modern UI**: Professional design with Tailwind CSS
- 📱 **Responsive**: Mobile-friendly interface

## 🗄️ Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Gig
```javascript
{
  title: String,
  description: String,
  budget: Number,
  ownerId: ObjectId (ref: User),
  status: "open" | "assigned",
  createdAt: Date
}
```

### Bid
```javascript
{
  gigId: ObjectId (ref: Gig),
  freelancerId: ObjectId (ref: User),
  message: String,
  price: Number,
  status: "pending" | "hired" | "rejected",
  createdAt: Date
}
```

## 🔐 Hiring Logic (Transaction-Safe)

The hiring process uses MongoDB transactions to ensure data integrity and prevent race conditions:

1. **Start Transaction**: Begin a MongoDB session
2. **Validate State**: Verify gig is still "open"
3. **Update Gig**: Set status to "assigned"
4. **Update Bid**: Mark selected bid as "hired"
5. **Reject Others**: Mark all other bids as "rejected"
6. **Commit Transaction**: Apply all changes atomically

If two users click "Hire" simultaneously, one transaction succeeds and the other fails, preventing double-hiring.

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Gigs
- `GET /api/gigs` - Get all gigs (with search/filter)
- `GET /api/gigs/my` - Get user's posted gigs
- `GET /api/gigs/:id` - Get gig by ID
- `POST /api/gigs` - Create new gig

### Bids
- `POST /api/bids` - Submit bid
- `GET /api/bids/my` - Get user's bids
- `GET /api/bids/gig/:gigId` - Get bids for a gig
- `PATCH /api/bids/:bidId/hire` - Hire freelancer

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd gigflow
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
```

3. **Configure Backend Environment**
Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. **Frontend Setup**
```bash
cd ../frontend
npm install
```

5. **Start MongoDB**
```bash
# Using local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

6. **Run the Application**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

7. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero section with CTAs and features |
| `/login` | Login | User authentication |
| `/register` | Register | New user registration |
| `/dashboard` | Dashboard | User's gigs and bids |
| `/gigs` | Gigs Feed | Browse and search gigs |
| `/create-gig` | Create Gig | Post a new gig |
| `/gig/:id` | Gig Details | View gig and submit/hire bids |

## 🔒 Security Features

1. **JWT Authentication**: Tokens stored in HttpOnly cookies
2. **Password Hashing**: bcrypt with salt rounds
3. **Auth Middleware**: Protected routes require authentication
4. **Input Validation**: Server-side validation on all endpoints
5. **CORS Configured**: Cross-origin requests controlled
6. **Transaction Safety**: ACID-compliant hiring process

## 🔄 Real-Time Notifications

Socket.io enables instant notifications:

1. User connects after login (joins their userId room)
2. When a freelancer is hired:
   - Backend emits `notification` event to freelancer's room
   - Frontend displays toast notification
   - Dashboard updates automatically

## 🧪 Testing the Application

### Manual Testing Flow

1. **Register User A** (Client)
2. **Register User B** (Freelancer)
3. **User A posts a gig**
4. **User B browses gigs and submits a bid**
5. **User A views gig details and hires User B**
6. **User B receives real-time notification**

### Testing Race Conditions

1. Open two browser windows as the gig owner
2. Simultaneously click "Hire" on different bids
3. Only one transaction succeeds (the other fails)

## 📦 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to deployment platform
3. Configure build command: `npm run build`
4. Set API base URL in environment
5. Deploy

### MongoDB Atlas
1. Create free cluster
2. Get connection string
4. Add IP whitelist (0.0.0.0/0 for development)
5. Update `MONGODB_URI` in backend environment

## 🎯 Bonus Features Implemented

- ✅ MongoDB Transactions for race condition prevention
- ✅ Real-time Socket.io notifications
- ✅ Dynamic role-based dashboard
- ✅ Professional UI with Tailwind CSS
- ✅ Redux Toolkit for state management
- ✅ HttpOnly JWT cookies
- ✅ Search and filter functionality

## 📝 Project Structure Highlights

### MVC + Service Layer Pattern
```
Request → Controller → Service → Model → Database
```

This separation of concerns:
- Makes code maintainable and testable
- Follows industry best practices
- Demonstrates architectural understanding

### Redux Slices
- `authSlice` - User authentication state
- `gigSlice` - Gigs data and operations
- `bidSlice` - Bids and hiring logic
- `notificationSlice` - Real-time notifications

## 🤝 Contributing

This is a demonstration project. For improvements:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 👨‍💻 Author

Built as a production-ready freelance marketplace application demonstrating full-stack development skills.

---

**Note**: This project demonstrates professional-level software development practices including clean architecture, security best practices, real-time features, and transaction safety.

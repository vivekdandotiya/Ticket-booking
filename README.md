# CinePass - Premium BookMyShow Clone

CinePass is a production-ready, full-stack movie ticket booking web application designed to clone the core user flows and premium experience of BookMyShow. The project incorporates modern UI/UX design paradigms, interactive seating grids, promotional discount coupons, AI-powered movie recommendations, user profile settings, and full-featured admin dashboards with visual sales charts.

---

## Technical Stack

### Frontend
- **Framework**: React (Vite-powered SPA), TypeScript
- **Styling**: Tailwind CSS (v3), ShadCN UI, Radix UI primitive templates
- **Animations**: Framer Motion
- **Data Visualizations**: Recharts
- **State & Server Client**: Fetch API, TanStack React Query

### Backend
- **Platform**: Node.js, Express.js
- **Database**: MongoDB (Local/Atlas via Mongoose ORM)
- **Auth**: JSON Web Tokens (JWT), bcryptjs hashing

---

## Folder Structure

```text
movie-booking/
├── README.md                          # Global instructions
├── movie-booking-frontend/            # Frontend Client
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                    # ShadCN UI components
│   │   │   ├── Header.tsx             # Navbar with Search, City, Theme toggles
│   │   │   ├── HeroCarousel.tsx       # Auto-sliding banner
│   │   │   ├── MovieCard.tsx          # Movie card with ratings
│   │   │   └── MovieSection.tsx       # Grid with lazy loading skeletons
│   │   ├── context/
│   │   │   └── AuthContext.tsx        # React Auth Context for JWT
│   │   ├── lib/
│   │   │   ├── api.ts                 # Fetch wrapper with Auth header
│   │   │   └── utils.ts               # Classnames helper
│   │   ├── pages/
│   │   │   ├── Index.tsx              # Landing catalog with AI Recs
│   │   │   ├── MovieDetails.tsx       # Descriptions, trailers, cast, reviews
│   │   │   ├── TheaterSelection.tsx   # Grouped timings and calendar
│   │   │   ├── SeatSelection.tsx      # Platinum/Gold/Silver interactive grid
│   │   │   ├── Payment.tsx            # Checkout with 5-minute expiry timer
│   │   │   ├── Ticket.tsx             # Visual pass print layout with QR
│   │   │   ├── Dashboard.tsx          # History, Favorites, Wishlist
│   │   │   └── AdminDashboard.tsx     # Recharts and CRUD admin panels
│   │   ├── App.tsx                    # Router & Query setup
│   │   └── main.tsx                   # Render entry point
│   ├── package.json
│   └── tailwind.config.ts
│
└── movie-booking-backend/             # Express REST API Backend
    ├── config/
    │   └── db.js                      # MongoDB connection script
    ├── controllers/                   # Route handler controllers
    ├── middleware/                    # JWT protect and Admin checks
    ├── models/                        # Mongoose schemas
    ├── routes/                        # Express API route configurations
    ├── utils/                         # GenerateToken and AI helper utilities
    ├── .env                           # Configured environment variables
    ├── seed.js                        # Database seeder
    └── server.js                      # Main entrypoint
```

---

## Setup & Running Instructions

### 1. Database & Backend Setup

1. **Start MongoDB**: Ensure MongoDB is running locally at `mongodb://localhost:27017` or update the `MONGODB_URI` inside `movie-booking-backend/.env`.
2. **Install dependencies**:
   ```bash
   cd movie-booking-backend
   npm install
   ```
3. **Seed the database**:
   ```bash
   npm run seed
   ```
   *This initializes a robust catalog of trending, recommended, upcoming, sports, and live comedy events, sets up showing times, and creates test user accounts.*
4. **Run the server in development**:
   ```bash
   npm run dev
   ```
   *The backend will boot up at `http://localhost:5000`.*

### 2. Frontend Client Setup

1. **Install dependencies**:
   ```bash
   cd ../movie-booking-frontend
   npm install
   ```
2. **Run client development server**:
   ```bash
   npm run dev
   ```
   *The client will boot up at `http://localhost:5173`.*

---

## Default Testing Accounts

Sign in using these seeded credentials to test user dashboards and admin dashboards:

| Account Type | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Normal User** | `user@gmail.com` | `user123` | booking flow, dashboard, reviews, favorites |
| **Administrator** | `admin@gmail.com` | `admin123` | CRUD management, Recharts analytics |

---

## Promo Coupon Codes

Test coupon codes in the Seat Selection step to apply discounts:
- `BMS50` (10% off, max ₹50)
- `WELCOME20` (20% off, max ₹100)
- `SUPERDEAL` (15% off, max ₹150)

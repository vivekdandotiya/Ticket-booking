export interface CastMember {
  name: string;
  role?: string;
  image?: string;
}

export interface Movie {
  _id: string;
  title: string;
  description: string;
  poster: string;
  banner: string;
  trailer?: string;
  genre: string;
  duration: string;
  language: string;
  rating: number;
  director: string;
  cast: CastMember[];
  releaseDate: string;
  category: "trending" | "recommended" | "upcoming" | "stream" | "live" | "sports";
  createdAt: string;
}

export interface Theater {
  _id: string;
  name: string;
  location: string;
  city: string;
  screens: number;
}

export interface Seat {
  id: string;
  category: "silver" | "gold" | "platinum";
  status: "available" | "booked" | "selected";
  bookedBy?: string;
}

export interface Show {
  _id: string;
  movie: string | Movie;
  theater: string | Theater;
  date: string;
  time: string;
  prices: {
    silver: number;
    gold: number;
    platinum: number;
  };
  seats: Seat[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  token?: string;
  favorites?: string[] | Movie[];
  wishlist?: string[] | Movie[];
}

export interface Booking {
  _id: string;
  user: string | User;
  show: Show;
  seats: string[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: "upi" | "card" | "netbanking";
  paymentStatus: "pending" | "completed" | "failed";
  bookingId: string;
  qrCodeData?: string;
  couponApplied?: string;
  createdAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  minPurchase: number;
  expiryDate: string;
  isActive: boolean;
}

export interface Review {
  _id: string;
  user: { _id: string; name: string };
  movie: string;
  rating: number;
  comment: string;
  likes: number;
  createdAt: string;
}

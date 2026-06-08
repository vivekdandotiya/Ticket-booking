import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { Show, Movie, Theater } from "../types";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Skeleton } from "../components/ui/skeleton";
import { Armchair, ChevronLeft, CreditCard, Ticket, BadgePercent } from "lucide-react";
import { toast } from "sonner";

const SeatSelection: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [show, setShow] = useState<Show | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [theater, setTheater] = useState<Theater | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Seat selection states
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Coupon states
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDiscount, setCouponDiscount] = useState<{
    code: string;
    discountPercentage: number;
    maxDiscount: number;
  } | null>(null);
  const [applyingCoupon, setApplyingCoupon] = useState<boolean>(false);

  const [creatingBooking, setCreatingBooking] = useState<boolean>(false);

  const fetchShowDetails = async () => {
    if (!showId) return;
    try {
      setLoading(true);
      const data = await api.get(`/shows/${showId}`);
      setShow(data);
      setMovie(data.movie);
      setTheater(data.theater);
    } catch (error) {
      toast.error("Error loading show seat details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowDetails();
  }, [showId]);

  const handleSeatClick = (seatId: string, status: string) => {
    if (status !== "available") return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        // BookMyShow limit is usually 10 seats per booking
        if (prev.length >= 10) {
          toast.warning("You can select up to 10 seats at once");
          return prev;
        }
        return [...prev, seatId];
      }
    });
  };

  const getSeatCategory = (seatId: string): "silver" | "gold" | "platinum" => {
    const row = seatId.charAt(0);
    if (["A", "B", "C"].includes(row)) return "platinum";
    if (["D", "E", "F", "G"].includes(row)) return "gold";
    return "silver";
  };

  const calculateSubtotal = (): number => {
    if (!show) return 0;
    return selectedSeats.reduce((sum, seatId) => {
      const category = getSeatCategory(seatId);
      return sum + (show.prices[category] || 150);
    }, 0);
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to apply coupons");
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error("Please select seats first");
      return;
    }

    try {
      setApplyingCoupon(true);
      const subtotal = calculateSubtotal();
      const response = await api.post("/coupons/validate", {
        code: couponCode,
        purchaseAmount: subtotal,
      });

      setCouponDiscount({
        code: response.code,
        discountPercentage: response.discountPercentage,
        maxDiscount: response.maxDiscount,
      });
      toast.success(response.message || "Coupon code applied!");
    } catch (error: any) {
      toast.error(error.message || "Invalid coupon code");
      setCouponDiscount(null);
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponDiscount(null);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  const handleProceedToPayment = async () => {
    if (!user) {
      toast.error("Please login to book tickets");
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    try {
      setCreatingBooking(true);
      const bookingData = await api.post("/bookings", {
        showId: show?._id,
        seats: selectedSeats,
        couponCode: couponDiscount?.code,
        paymentMethod: "upi", // default placeholder
      });

      toast.success("Seats held successfully! Complete your payment.");
      navigate(`/payment/${bookingData._id}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to place booking");
    } finally {
      setCreatingBooking(false);
    }
  };

  const subtotal = calculateSubtotal();
  let discount = 0;
  if (couponDiscount) {
    discount = Math.min((subtotal * couponDiscount.discountPercentage) / 100, couponDiscount.maxDiscount);
  }
  const grandTotal = subtotal - discount;

  // Group seats by rows for rendering grid
  const renderSeatGrid = () => {
    if (!show) return null;

    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    return (
      <div className="space-y-3 pt-6 select-none overflow-x-auto pb-4">
        {rows.map((row) => {
          const rowCategory = ["A", "B", "C"].includes(row)
            ? "platinum"
            : ["D", "E", "F", "G"].includes(row)
            ? "gold"
            : "silver";
            
          return (
            <div key={row} className="flex items-center gap-2 justify-center min-w-[500px]">
              {/* Row label */}
              <span className="w-6 text-sm font-bold text-muted-foreground">{row}</span>

              {/* Seats list */}
              <div className="flex gap-2">
                {[...Array(12)].map((_, colIdx) => {
                  const colNum = colIdx + 1;
                  const seatId = `${row}${colNum}`;
                  
                  // Find seat object in show data
                  const seatData = show.seats.find((s) => s.id === seatId) || {
                    id: seatId,
                    status: "available",
                  };

                  const isSelected = selectedSeats.includes(seatId);
                  
                  // Styling colors based on status and categories
                  let colorClass = "bg-secondary text-foreground hover:bg-secondary-foreground/20 border-border";
                  if (seatData.status === "booked") {
                    colorClass = "bg-destructive/30 text-destructive-foreground/40 border-transparent cursor-not-allowed";
                  } else if (isSelected) {
                    colorClass = "bg-primary text-white border-primary hover:bg-primary/95";
                  } else {
                    // Category styles
                    if (rowCategory === "platinum") {
                      colorClass = "bg-yellow-500/10 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/20";
                    } else if (rowCategory === "gold") {
                      colorClass = "bg-blue-500/10 text-blue-500 border-blue-500/30 hover:bg-blue-500/20";
                    }
                  }

                  // Walkway margin
                  const isGap = colNum === 6;

                  return (
                    <React.Fragment key={seatId}>
                      <button
                        onClick={() => handleSeatClick(seatId, seatData.status)}
                        disabled={seatData.status === "booked"}
                        className={`h-8 w-8 rounded-md border text-[10px] font-bold flex items-center justify-center transition ${colorClass}`}
                        title={`${seatId} - ${rowCategory} category`}
                      >
                        {colNum}
                      </button>
                      {isGap && <div className="w-6" />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading || !show) {
    return (
      <div className="min-h-screen bg-background pb-12">
        <Header selectedCity="Mumbai" setSelectedCity={() => {}} />
        <div className="container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-16 w-full rounded" />
          <Skeleton className="h-[400px] w-full rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Header selectedCity="Mumbai" setSelectedCity={() => {}} />

      {/* Mini Breadcrumb Nav details */}
      <div className="bg-secondary/35 border-b border-border py-4">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to={`/booking/${movie?._id}`} className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-bold text-sm sm:text-base">{movie?.title}</h1>
              <p className="text-xs text-muted-foreground">
                {theater?.name} • {show.date} • {show.time}
              </p>
            </div>
          </div>
          <div className="flex gap-4 text-xs font-semibold">
            <span className="text-yellow-500">Platinum: ₹{show.prices.platinum}</span>
            <span className="text-blue-500">Gold: ₹{show.prices.gold}</span>
            <span className="text-muted-foreground">Silver: ₹{show.prices.silver}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column Seat Map */}
        <div className="lg:col-span-2 space-y-8 bg-card p-6 rounded-2xl border border-border shadow-sm">
          {/* Screen curve top representation */}
          <div className="space-y-2 text-center">
            <div className="w-3/4 h-2 mx-auto bg-primary rounded-full shadow-[0_-5px_15px_rgba(239,68,68,0.3)]" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              SCREEN THIS WAY
            </span>
          </div>

          {/* Render seats grid */}
          {renderSeatGrid()}

          {/* Seat legends */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs border-t border-border pt-4 text-muted-foreground font-semibold">
            <div className="flex items-center gap-2">
              <div className="h-4.5 w-4.5 rounded border border-border bg-secondary" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4.5 w-4.5 rounded border border-primary bg-primary" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4.5 w-4.5 rounded bg-destructive/30" />
              <span>Booked</span>
            </div>
          </div>
        </div>

        {/* Right Column Checkout summary panel */}
        <div className="space-y-6">
          <div className="p-6 bg-card border border-border rounded-2xl shadow-lg flex flex-col space-y-5 sticky top-24">
            <h3 className="font-extrabold text-base flex items-center gap-1.5 border-b border-border pb-3">
              <Ticket className="h-5 w-5 text-primary" /> Booking Summary
            </h3>

            {/* Selected Seats Listing */}
            {selectedSeats.length > 0 ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">Selected Seats ({selectedSeats.length})</span>
                  <span className="font-extrabold text-foreground">{selectedSeats.join(", ")}</span>
                </div>
                <div className="border-t border-border pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {couponDiscount && (
                    <div className="flex justify-between text-green-500 font-semibold">
                      <span>Discount ({couponDiscount.code})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="border-t border-border pt-2 flex justify-between font-extrabold text-base text-foreground">
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-muted-foreground italic">
                Select seats from the grid to calculate price.
              </div>
            )}

            {/* Promo coupon form */}
            {selectedSeats.length > 0 && (
              <div className="border-t border-border pt-4">
                {!couponDiscount ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <Input
                      placeholder="Enter Promo Code (e.g. BMS50)"
                      className="bg-secondary/40 border-border text-xs focus:ring-primary uppercase h-9"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      required
                    />
                    <Button type="submit" disabled={applyingCoupon} className="bg-primary hover:bg-primary/95 text-white h-9 text-xs">
                      Apply
                    </Button>
                  </form>
                ) : (
                  <div className="flex justify-between items-center bg-green-500/10 border border-green-500/20 p-2.5 rounded-xl">
                    <div className="flex items-center gap-1 text-xs text-green-500 font-bold">
                      <BadgePercent className="h-4 w-4" />
                      <span>{couponDiscount.code} APPLIED</span>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-xs text-destructive hover:underline font-semibold">
                      Remove
                    </button>
                  </div>
                )}
                <span className="text-[9px] text-muted-foreground block mt-1.5">
                  Try codes: BMS50, WELCOME20, SUPERDEAL
                </span>
              </div>
            )}

            {/* Action Checkout button */}
            <Button
              onClick={handleProceedToPayment}
              disabled={selectedSeats.length === 0 || creatingBooking}
              className="w-full bg-primary hover:bg-primary/90 text-white h-11 font-bold text-sm rounded-xl flex items-center justify-center gap-2 mt-4"
            >
              <CreditCard className="h-4.5 w-4.5" />
              {creatingBooking ? "Reserving Seats..." : "Proceed to Payment"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeatSelection;

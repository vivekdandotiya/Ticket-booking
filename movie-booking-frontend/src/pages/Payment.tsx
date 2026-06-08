import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { Booking } from "../types";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Skeleton } from "../components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CreditCard, QrCode, Building, Timer, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Payment: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paying, setPaying] = useState<boolean>(false);

  // Timer states (5 minutes = 300 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(300);

  // Form states
  const [selectedMethod, setSelectedMethod] = useState<string>("upi");
  const [upiVpa, setUpiVpa] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) return;
      try {
        setLoading(true);
        const data = await api.get(`/bookings/${bookingId}`);
        setBooking(data);
      } catch (err) {
        toast.error("Error loading booking transaction details");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  // Countdown timer effect
  useEffect(() => {
    if (loading || !booking) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, booking]);

  const handleTimeout = async () => {
    toast.error("Booking session expired. The held seats have been released.");
    // Release booking seats (verify with failure status)
    try {
      if (bookingId) {
        await api.post(`/bookings/${bookingId}/verify`, { status: "failed" });
      }
    } catch (err) {}
    navigate("/");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId) return;

    // Validate inputs depending on method
    if (selectedMethod === "upi" && !upiVpa.includes("@")) {
      toast.error("Please enter a valid UPI VPA (e.g. name@upi)");
      return;
    }
    if (selectedMethod === "card") {
      if (cardNumber.length < 15 || cardCvv.length < 3 || !cardExpiry.includes("/")) {
        toast.error("Please fill in card details correctly");
        return;
      }
    }

    try {
      setPaying(true);
      
      // Simulate network request delay for payment gateway authorization
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await api.post(`/bookings/${bookingId}/verify`, {
        status: "success",
      });

      toast.success("Payment completed successfully!");
      navigate(`/ticket/${bookingId}`);
    } catch (error: any) {
      toast.error(error.message || "Payment verification failed");
    } finally {
      setPaying(false);
    }
  };

  if (loading || !booking) {
    return (
      <div className="min-h-screen bg-background pb-12">
        <Header selectedCity="Mumbai" setSelectedCity={() => {}} />
        <div className="container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-12 w-full rounded" />
          <Skeleton className="h-[400px] w-full rounded" />
        </div>
      </div>
    );
  }

  const show = booking.show;
  const movie = show?.movie as any;
  const theater = show?.theater as any;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Header selectedCity="Mumbai" setSelectedCity={() => {}} />

      <main className="container mx-auto px-4 mt-8 max-w-3xl space-y-6">
        {/* Countdown Timer Alert Banner */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Timer className="h-5 w-5 animate-pulse" />
            <span>Complete Booking Within:</span>
          </div>
          <span className="font-mono text-lg font-extrabold">{formatTime(timeLeft)}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Side Billing summary */}
          <div className="space-y-4 bg-card p-5 rounded-2xl border border-border">
            <h3 className="font-bold text-base border-b border-border pb-2">Booking Summary</h3>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-extrabold text-foreground">{movie?.title}</h4>
                <p className="text-xs text-muted-foreground">{movie?.genre}</p>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>📍 {theater?.name}</p>
                <p>🗓️ {show?.date} • {show?.time}</p>
                <p>🎟️ Seats: <span className="font-semibold text-foreground">{booking.seats.join(", ")}</span></p>
              </div>
              <div className="border-t border-border pt-3 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{booking.totalAmount}</span>
                </div>
                {booking.discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-green-500 font-semibold">
                    <span>Discount</span>
                    <span>-₹{booking.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-sm border-t border-border pt-1.5 text-foreground">
                  <span>Amount Payable</span>
                  <span>₹{booking.finalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Payment selection panel */}
          <div className="md:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-md space-y-6">
            <div className="space-y-1">
              <h3 className="font-extrabold text-base">Select Payment Mode</h3>
              <p className="text-xs text-muted-foreground">Choose your preferred safe transaction gateway.</p>
            </div>

            <form onSubmit={handlePaymentSubmit}>
              <Tabs defaultValue="upi" onValueChange={setSelectedMethod} className="w-full space-y-6">
                <TabsList className="grid grid-cols-3 bg-secondary/40 w-full h-11 p-1">
                  <TabsTrigger value="upi" className="flex items-center gap-1.5 text-xs">
                    <QrCode className="h-4 w-4" /> UPI
                  </TabsTrigger>
                  <TabsTrigger value="card" className="flex items-center gap-1.5 text-xs">
                    <CreditCard className="h-4 w-4" /> Card
                  </TabsTrigger>
                  <TabsTrigger value="netbanking" className="flex items-center gap-1.5 text-xs">
                    <Building className="h-4 w-4" /> Net Banking
                  </TabsTrigger>
                </TabsList>

                {/* UPI options */}
                <TabsContent value="upi" className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="vpa" className="text-xs font-semibold">UPI ID (VPA)</Label>
                      <Input
                        id="vpa"
                        placeholder="john@okhdfcbank"
                        value={upiVpa}
                        onChange={(e) => setUpiVpa(e.target.value)}
                        required={selectedMethod === "upi"}
                      />
                    </div>
                    <div className="text-[10px] text-muted-foreground flex items-center gap-1 bg-secondary/30 p-2.5 rounded-xl border border-border">
                      <AlertCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>Scan or accept the payment prompt on your linked UPI app after hitting pay.</span>
                    </div>
                  </div>
                </TabsContent>

                {/* Card input forms */}
                <TabsContent value="card" className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="cardname" className="text-xs font-semibold">Name on Card</Label>
                      <Input
                        id="cardname"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required={selectedMethod === "card"}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="cardnum" className="text-xs font-semibold">Card Number</Label>
                      <Input
                        id="cardnum"
                        placeholder="1111 2222 3333 4444"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required={selectedMethod === "card"}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="cardexp" className="text-xs font-semibold">Expiry Date</Label>
                        <Input
                          id="cardexp"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          required={selectedMethod === "card"}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="cardcvv" className="text-xs font-semibold">CVV</Label>
                        <Input
                          id="cardcvv"
                          type="password"
                          placeholder="123"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          required={selectedMethod === "card"}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Netbanking banks */}
                <TabsContent value="netbanking" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Popular Banks</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button type="button" variant="outline" className="justify-start text-xs h-9 border-border bg-secondary/20">SBI Bank</Button>
                      <Button type="button" variant="outline" className="justify-start text-xs h-9 border-border bg-secondary/20">HDFC Bank</Button>
                      <Button type="button" variant="outline" className="justify-start text-xs h-9 border-border bg-secondary/20">ICICI Bank</Button>
                      <Button type="button" variant="outline" className="justify-start text-xs h-9 border-border bg-secondary/20">Axis Bank</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="border-t border-border pt-6 mt-6 flex flex-col space-y-3">
                <Button
                  type="submit"
                  disabled={paying}
                  className="w-full bg-primary hover:bg-primary/95 text-white h-11 font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="h-5 w-5" />
                  {paying ? "Processing Transaction..." : `Pay ₹${booking.finalAmount}`}
                </Button>

                <div className="text-center text-[10px] text-muted-foreground flex justify-center items-center gap-1">
                  🔒 Payment data is encrypted & secured via standard TLS protocols.
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;

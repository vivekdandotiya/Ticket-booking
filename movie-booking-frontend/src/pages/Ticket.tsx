import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { Booking } from "../types";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { CheckCircle2, Download, Home, Printer, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Ticket: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) return;
      try {
        setLoading(true);
        const data = await api.get(`/bookings/${bookingId}`);
        setBooking(data);
      } catch (err) {
        toast.error("Error loading ticket details");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [bookingId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !booking) {
    return (
      <div className="min-h-screen bg-background pb-12">
        <Header selectedCity="Mumbai" setSelectedCity={() => {}} />
        <div className="container mx-auto px-4 py-8 space-y-6 flex flex-col items-center">
          <Skeleton className="h-10 w-48 rounded" />
          <Skeleton className="h-[450px] w-[350px] rounded-2xl" />
        </div>
      </div>
    );
  }

  const show = booking.show;
  const movie = show?.movie as any;
  const theater = show?.theater as any;

  // Generate QR code using QR Server API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&color=ef4444&bgcolor=ffffff&data=${encodeURIComponent(booking.qrCodeData || "")}`;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 print:bg-white print:pb-0">
      {/* Hide Header during print */}
      <div className="print:hidden">
        <Header selectedCity="Mumbai" setSelectedCity={() => {}} />
      </div>

      <main className="container mx-auto px-4 mt-8 max-w-xl flex flex-col items-center space-y-6">
        
        {/* Confirmed Banner */}
        <div className="text-center space-y-2 print:hidden">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto animate-bounce" />
          <h2 className="text-2xl font-black tracking-tight text-foreground">Booking Confirmed!</h2>
          <p className="text-sm text-muted-foreground">Your seats have been booked. Present this QR code at the screen entry.</p>
        </div>

        {/* Physical Pass Ticket Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-[370px] bg-card text-card-foreground rounded-3xl overflow-hidden border border-border shadow-2xl flex flex-col print:border-none print:shadow-none"
        >
          {/* Top section: Movie details */}
          <div className="p-6 space-y-4">
            <div className="flex gap-4">
              <div className="h-24 w-16 rounded overflow-hidden border border-border bg-muted shrink-0">
                <img src={movie?.poster} alt={movie?.title} className="h-full w-full object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-lg text-foreground line-clamp-1">{movie?.title}</h3>
                <p className="text-xs text-muted-foreground">{movie?.genre}</p>
                <p className="text-xs font-bold text-primary">{movie?.language} • {movie?.duration}</p>
              </div>
            </div>

            <div className="border-t border-dashed border-border pt-4 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">THEATER</span>
                <span className="font-bold text-foreground">{theater?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">DATE & TIME</span>
                <span className="font-bold text-foreground">{show?.date} • {show?.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">SEATS</span>
                <span className="font-bold text-foreground text-primary text-sm">{booking.seats.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">BOOKING ID</span>
                <span className="font-mono font-bold text-foreground">{booking.bookingId}</span>
              </div>
            </div>
          </div>

          {/* Ticket Tear line Divider */}
          <div className="relative w-full flex items-center justify-between px-0 print:hidden">
            {/* Left notch */}
            <div className="h-6 w-3 rounded-r-full bg-background border-r border-t border-b border-border -ml-[1px]" />
            {/* Dashed separator */}
            <div className="w-full border-b border-dashed border-border/80 mx-1" />
            {/* Right notch */}
            <div className="h-6 w-3 rounded-l-full bg-background border-l border-t border-b border-border -mr-[1px]" />
          </div>

          {/* Bottom section: QR code */}
          <div className="p-6 bg-secondary/20 flex flex-col items-center space-y-3 print:bg-transparent">
            <div className="h-36 w-36 bg-white p-2.5 rounded-2xl border border-border shadow-sm flex items-center justify-center">
              <img src={qrUrl} alt="Booking QR Code Ticket" className="h-full w-full object-contain" />
            </div>
            <span className="text-[10px] tracking-widest text-muted-foreground font-bold uppercase">
              SCAN AT THE ENTRANCE
            </span>
          </div>
        </motion.div>

        {/* Print Styles */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body {
              background-color: white !important;
              color: black !important;
            }
            .print\\:hidden {
              display: none !important;
            }
            main {
              margin-top: 2cm !important;
              padding: 0 !important;
              max-width: 100% !important;
            }
          }
        `}} />

        {/* Actions button */}
        <div className="flex gap-3 w-full max-w-[370px] print:hidden">
          <Button
            onClick={handlePrint}
            className="flex-1 bg-primary hover:bg-primary/95 text-white gap-2 h-11 font-semibold rounded-xl"
          >
            <Printer className="h-4.5 w-4.5" /> Print / PDF
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 border-border gap-2 h-11 font-semibold rounded-xl hover:bg-secondary"
          >
            <Link to="/">
              <Home className="h-4.5 w-4.5" /> Back Home
            </Link>
          </Button>
        </div>

      </main>
    </div>
  );
};

export default Ticket;

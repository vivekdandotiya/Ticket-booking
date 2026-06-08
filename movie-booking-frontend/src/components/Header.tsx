import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Search, MapPin, User as UserIcon, Film, LogOut, Sun, Moon, ShieldAlert, Sparkles, Heart } from "lucide-react";
import { toast } from "sonner";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const CITIES = ["Delhi", "Mumbai", "Bengaluru", "Pune"];

const Header: React.FC<HeaderProps> = ({
  searchQuery = "",
  onSearchChange,
  selectedCity,
  setSelectedCity,
}) => {
  const { user, login, register, logout, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Local state for credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleToggleTheme = () => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.remove("dark");
      setTheme("light");
    } else {
      root.classList.add("dark");
      setTheme("dark");
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await register(name, email);
      } else {
        await login(email, password);
      }
      setShowAuthModal(false);
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {}
  };

  const handleGoogleMockLogin = async () => {
    try {
      const mockName = "Google User " + Math.floor(Math.random() * 1000);
      const mockEmail = `googleuser${Math.floor(Math.random() * 10000)}@gmail.com`;
      await googleLogin(mockName, mockEmail);
      setShowAuthModal(false);
    } catch (err) {}
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-wider text-primary">
          <Film className="h-7 w-7 text-primary animate-pulse" />
          <span>Cine<span className="text-foreground">Pass</span></span>
        </Link>

        {/* Search Bar */}
        <div className="relative hidden w-full max-w-md md:block mx-8">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
          <Input
            placeholder="Search for movies, genres or theaters..."
            className="pl-10 pr-4 w-full bg-secondary/50 border-border focus:ring-primary focus-visible:ring-1 focus-visible:ring-primary focus:border-primary"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

        {/* Right Nav Options */}
        <div className="flex items-center gap-4">
          {/* City Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{selectedCity}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Select City</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CITIES.map((city) => (
                <DropdownMenuItem
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    toast.info(`Switched city to ${city}`);
                  }}
                  className={selectedCity === city ? "bg-primary/10 text-primary font-semibold" : ""}
                >
                  {city}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={handleToggleTheme} className="text-foreground">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* User Section */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel className="font-semibold text-sm">
                  Hi, {user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer flex items-center gap-2">
                    <UserIcon className="h-4 w-4" /> My Dashboard
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer flex items-center gap-2 text-primary font-medium">
                      <ShieldAlert className="h-4 w-4 text-primary" /> Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl font-bold tracking-tight">
                    {isSignUp ? "Create Your Account" : "Sign In to CinePass"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAuthSubmit} className="space-y-4 pt-2">
                  {isSignUp && (
                    <div className="space-y-1">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      {!isSignUp && (
                        <button
                          type="button"
                          onClick={() => toast.info("Forgot Password simulation triggered. Check email.")}
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground">
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </Button>
                </form>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleGoogleMockLogin}
                  className="w-full flex items-center justify-center gap-2 border-border hover:bg-secondary"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5.04c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 1.76 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.85 3c.9-2.7 3.4-4.46 6.65-4.46z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.47-1.11 2.72-2.36 3.56l3.66 2.84c2.14-1.98 3.39-4.89 3.39-8.55z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.35 14.5c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3l-3.85-3C.5 8.7 0 10.3 0 12s.5 3.3 1.5 5.1l3.85-3.1.01.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.1.74-2.5 1.18-4.3 1.18-3.25 0-5.75-1.76-6.65-4.46L1.5 17c1.9 3.85 5.85 6 10.5 6z"
                    />
                  </svg>
                  <span>Google Authentication</span>
                </Button>

                <div className="mt-4 text-center text-xs text-muted-foreground">
                  {isSignUp ? (
                    <span>
                      Already have an account?{" "}
                      <button onClick={() => setIsSignUp(false)} className="text-primary hover:underline font-medium">
                        Sign In
                      </button>
                    </span>
                  ) : (
                    <span>
                      New to CinePass?{" "}
                      <button onClick={() => setIsSignUp(true)} className="text-primary hover:underline font-medium">
                        Create Account
                      </button>
                    </span>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

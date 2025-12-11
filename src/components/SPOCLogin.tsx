import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { LogoWithText } from "./Logo";
import { Lock, Mail, AlertCircle, Eye, EyeOff, Building2, User, Phone, MapPin, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";

interface SPOCLoginProps {
  onLogin: (email: string, password: string) => void;
  onBack: () => void;
}

export function SPOCLogin({ onLogin, onBack }: SPOCLoginProps) {
  const { validateSPOCLogin, addCollegeRegistration, getSPOCByEmail } = useAppContext();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Registration form fields
  const [regData, setRegData] = useState({
    collegeName: "",
    spocName: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const spoc = validateSPOCLogin(email, password);

      if (spoc) {
        onLogin(email, password);
      } else {
        setError("Invalid email or password, or account is inactive. Please contact admin.");
      }
      setLoading(false);
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    // Validate all fields
    if (!regData.collegeName || !regData.spocName || !regData.email || !regData.phone || !regData.address) {
      setError("Please fill in all fields");
      return;
    }
    
    // Check if email already exists
    if (getSPOCByEmail(regData.email)) {
      setError("This email is already registered. Please use a different email or try logging in.");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      addCollegeRegistration(regData);
      setSuccess(true);
      toast.success("Registration request submitted successfully!");
      setRegData({
        collegeName: "",
        spocName: "",
        email: "",
        phone: "",
        address: ""
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block">
          <div className="bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl p-12 text-white shadow-2xl">
            <LogoWithText className="mb-8" />
            <h2 className="text-3xl mb-4">SPOC Portal</h2>
            <p className="text-blue-100 text-lg mb-8">
              Single Point of Contact portal for colleges participating in Regional Hackathon 2024
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="mb-1">Submit Project Ideas</h4>
                  <p className="text-blue-200 text-sm">Upload your team's innovative solutions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="mb-1">Manage Team Details</h4>
                  <p className="text-blue-200 text-sm">Update team information and members</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="mb-1">Track Application Status</h4>
                  <p className="text-blue-200 text-sm">Monitor your submission progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Register Form */}
        <Card className="p-8 md:p-12 shadow-2xl border-2">
          <div className="mb-8">
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
            >
              ← Back to Home
            </button>
            <h2 className="text-3xl text-blue-900 mb-2">
              {mode === "login" ? "SPOC Login" : "College Registration"}
            </h2>
            <p className="text-gray-600">
              {mode === "login" 
                ? "Sign in to access your college portal" 
                : "Register your college for Regional Hackathon"}
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Registration request submitted! Your request is pending admin approval. 
                Once approved, login credentials will be sent to your email.
              </AlertDescription>
            </Alert>
          )}

          {mode === "login" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="spoc@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </a>
            </div>

              <Button
                type="submit"
                className="w-full h-12 bg-orange-500 hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="collegeName">College Name *</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="collegeName"
                    type="text"
                    placeholder="e.g., IIT Delhi"
                    value={regData.collegeName}
                    onChange={(e) => setRegData({...regData, collegeName: e.target.value})}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="spocName">SPOC Name (Point of Contact) *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="spocName"
                    type="text"
                    placeholder="e.g., Dr. John Doe"
                    value={regData.spocName}
                    onChange={(e) => setRegData({...regData, spocName: e.target.value})}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="regEmail">Official Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="regEmail"
                    type="email"
                    placeholder="spoc@college.edu"
                    value={regData.email}
                    onChange={(e) => setRegData({...regData, email: e.target.value})}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={regData.phone}
                    onChange={(e) => setRegData({...regData, phone: e.target.value})}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">College Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Textarea
                    id="address"
                    placeholder="Enter complete college address"
                    rows={3}
                    value={regData.address}
                    onChange={(e) => setRegData({...regData, address: e.target.value})}
                    className="pl-10 resize-none"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Registration Request"}
              </Button>
            </form>
          )}

          {mode === "login" && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900 mb-2">Demo Credentials:</p>
              <div className="text-xs text-blue-700 space-y-1">
                <p>Email: <span className="font-mono">spoc@iit.ac.in</span></p>
                <p>Password: <span className="font-mono">sih2024</span></p>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button 
                  onClick={() => {
                    setMode("register");
                    setError("");
                    setSuccess(false);
                  }} 
                  className="text-blue-600 hover:text-blue-800"
                >
                  Register your college
                </button>
              </>
            ) : (
              <>
                Already have credentials?{" "}
                <button 
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setSuccess(false);
                  }} 
                  className="text-blue-600 hover:text-blue-800"
                >
                  Login here
                </button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

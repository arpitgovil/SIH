import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Logo } from "./Logo";
import { Lock, Mail, AlertCircle, Eye, EyeOff, Shield } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface AdminLoginProps {
  onLogin: (username: string, password: string) => void;
  onBack: () => void;
}

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Admin credentials (in production, this should be handled by backend)
  const adminCredentials = [
    { username: "admin", password: "SIH@Admin2024!" },
    { username: "superadmin", password: "SuperSIH#2024" },
    { username: "dev", password: "DevSIH@2024" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const isValid = adminCredentials.some(
        cred => cred.username === username && cred.password === password
      );

      if (isValid) {
        onLogin(username, password);
      } else {
        setError("Invalid credentials. Access denied.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-2xl border-2 border-orange-500/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-full">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl text-gray-900 mb-2">Admin Portal</h2>
            <p className="text-gray-600">Authorized Access Only</p>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-red-600">
              <Lock className="w-3 h-3" />
              <span>Restricted Area</span>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Admin Username</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-12"
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                  autoComplete="off"
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

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Access Admin Panel"}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800 mb-2">⚠️ Demo Credentials:</p>
            <div className="text-xs text-yellow-700 space-y-1 font-mono">
              <p>Username: <span className="font-bold">admin</span></p>
              <p>Password: <span className="font-bold">SIH@Admin2024!</span></p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full mt-6 text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Main Site
          </button>
        </Card>

        <div className="text-center mt-6 text-xs text-gray-400">
          <p>This is a restricted area. Unauthorized access is prohibited.</p>
          <p className="mt-1">All activities are logged and monitored.</p>
        </div>
      </div>
    </div>
  );
}

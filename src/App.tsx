import { useState, useEffect } from "react";
import { AppProvider } from "./context/AppContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Themes } from "./components/Themes";
import { Timeline } from "./components/Timeline";
import { Eligibility } from "./components/Eligibility";
import { Stats } from "./components/Stats";
import { Guidelines } from "./components/Guidelines";
import { Resources } from "./components/Resources";
import { OrganizingCommittee } from "./components/OrganizingCommittee";
import { Footer } from "./components/Footer";
import { SPOCLogin } from "./components/SPOCLogin";
import { SPOCDashboard } from "./components/SPOCDashboard";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";
import { ProblemStatements } from "./components/ProblemStatements";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

type Page = "home" | "login" | "dashboard" | "admin-login" | "admin-dashboard" | "problems";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [userEmail, setUserEmail] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [keySequence, setKeySequence] = useState<string[]>([]);

  const handleRegisterClick = () => {
    setCurrentPage("login");
  };

  const handleLogin = (email: string, password: string) => {
    setUserEmail(email);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUserEmail("");
    setCurrentPage("home");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
  };

  const handleViewProblems = () => {
    setCurrentPage("problems");
  };

  const handleAdminLogin = (username: string, password: string) => {
    setAdminUsername(username);
    setCurrentPage("admin-dashboard");
  };

  const handleAdminLogout = () => {
    setAdminUsername("");
    setCurrentPage("home");
  };

  // Secret key combination to access admin panel (Ctrl+Shift+A pressed 3 times)
  useEffect(() => {
    let pressCount = 0;
    let resetTimer: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        pressCount++;
        
        if (pressCount === 1) {
          toast.info("Admin access detected... (press 2 more times)", {
            duration: 2000,
          });
        } else if (pressCount === 2) {
          toast.info("Almost there... (press 1 more time)", {
            duration: 2000,
          });
        } else if (pressCount === 3) {
          toast.success("Admin panel unlocked!", {
            duration: 2000,
          });
          setCurrentPage("admin-login");
          pressCount = 0;
        }

        // Reset counter after 3 seconds of inactivity
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          pressCount = 0;
        }, 3000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(resetTimer);
    };
  }, []);

  // Render based on current page
  return (
    <AppProvider>
      {currentPage === "admin-login" && (
        <>
          <AdminLogin onLogin={handleAdminLogin} onBack={handleBackToHome} />
          <Toaster />
        </>
      )}

      {currentPage === "admin-dashboard" && (
        <>
          <AdminDashboard username={adminUsername} onLogout={handleAdminLogout} />
          <Toaster />
        </>
      )}

      {currentPage === "login" && (
        <>
          <SPOCLogin onLogin={handleLogin} onBack={handleBackToHome} />
          <Toaster />
        </>
      )}

      {currentPage === "dashboard" && (
        <>
          <SPOCDashboard email={userEmail} onLogout={handleLogout} />
          <Toaster />
        </>
      )}

      {currentPage === "problems" && (
        <>
          <ProblemStatements onBack={handleBackToHome} />
          <Toaster />
        </>
      )}

      {currentPage === "home" && (
        <>
          <div className="min-h-screen bg-white">
            <Header onRegisterClick={handleRegisterClick} onViewProblems={handleViewProblems} />
            <main>
              <Hero onRegisterClick={handleRegisterClick} onViewProblems={handleViewProblems} />
              <About />
              <Themes />
              <Timeline />
              <Eligibility />
              <Stats />
              <Guidelines />
              <Resources />
              <OrganizingCommittee />
            </main>
            <Footer />
          </div>
          <Toaster />
        </>
      )}
    </AppProvider>
  );
}
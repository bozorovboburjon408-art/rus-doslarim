import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./contexts/AuthContext";
import IntroSplash from "./components/IntroSplash";
import Index from "./pages/Index";
import Vocabulary from "./pages/Vocabulary";
import Grammar from "./pages/Grammar";
import Exercises from "./pages/Exercises";
import Tests from "./pages/Tests";
import AdminAuth from "./pages/AdminAuth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("intro_seen");
    if (seen) {
      setShowIntro(false);
      setHasSeenIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    sessionStorage.setItem("intro_seen", "true");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {showIntro && !hasSeenIntro && (
              <IntroSplash onComplete={handleIntroComplete} />
            )}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/vocabulary" element={<Vocabulary />} />
                <Route path="/grammar" element={<Grammar />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/admin" element={<AdminAuth />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

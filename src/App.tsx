import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// The admin area (sign-in, dashboard and the providers only it needs) is opened
// by the site owner alone, so it stays out of the public bundle.
const AdminApp = lazy(() => import("./AdminApp"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="animate-pulse font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Loading</div>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<AdminApp page="login" />} />
        <Route path="/dashboard" element={<AdminApp page="dashboard" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;

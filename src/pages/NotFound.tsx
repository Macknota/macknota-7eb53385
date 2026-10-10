import { ArrowLeft } from "lucide-react";

const NotFound = () => (
  <div className="dot-grid flex min-h-screen items-center justify-center bg-background px-5">
    <div className="text-center">
      <p className="label-mono mb-4">Error 404</p>
      <h1 className="text-6xl text-foreground md:text-7xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-sm text-muted-foreground">
        The page you're looking for doesn't exist or has moved.
      </p>
      <a href="/" className="btn btn-primary mt-8">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </a>
    </div>
  </div>
);

export default NotFound;

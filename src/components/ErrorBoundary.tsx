
// src/components/ErrorBoundary.tsx
import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackRender?: (props: { error: Error }) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("Error caught by ErrorBoundary:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error info:", errorInfo);
    // You can also log this to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallbackRender && this.state.error) {
        return this.props.fallbackRender({ error: this.state.error });
      }
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Something went wrong.</h2>
          <p className="text-muted-foreground">Please try refreshing the page or come back later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

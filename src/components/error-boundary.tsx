
"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackUI: React.ReactNode | ((props: { error: Error }) => React.ReactNode);
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
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

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (typeof this.props.fallbackUI === 'function' && this.state.error) {
        return this.props.fallbackUI({ error: this.state.error });
      }
      return this.props.fallbackUI;
    }

    return this.props.children;
  }
}

// Create a client component wrapper for ErrorBoundary to use in pages
export const ErrorBoundaryClient = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) => {
  return (
    <ErrorBoundary fallbackUI={fallback}>
      {children}
    </ErrorBoundary>
  );
};

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="p-4 text-center">
          <h3 className="text-lg font-medium text-red-600 mb-2">Something went wrong</h3>
          <p className="text-sm text-gray-500 mb-4">We're sorry for the inconvenience</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-[#8c52ff] text-white rounded-md hover:bg-[#7842eb]"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 
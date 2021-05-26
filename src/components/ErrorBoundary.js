import { Component } from "react";
import ErrorMessage from "@/components/ErrorMessage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    //logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <ErrorMessage>
            Computer says no, <a href="/">try again?</a>
          </ErrorMessage>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

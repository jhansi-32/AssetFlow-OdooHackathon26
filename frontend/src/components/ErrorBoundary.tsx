import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Wire this up to your error reporting service (Sentry, Datadog, etc.)
    console.error('AssetFlow ErrorBoundary caught an error:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-danger/10 text-danger">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-heading">Something went wrong</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-text">
              An unexpected error interrupted this view. Reloading usually resolves it — if it
              persists, contact your workspace administrator.
            </p>
          </div>
          <Button variant="primary" onClick={this.handleReset}>
            <RefreshCw className="h-4 w-4" />
            Reload AssetFlow
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

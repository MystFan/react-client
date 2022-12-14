import React from "react"

import { KIND, Toast, ToasterContainer } from "baseui/toast"

type ErrorHandler = (error: Error, info: React.ErrorInfo) => void
type ErrorHandlingComponent<Props> = (props: Props, error?: Error) => React.ReactNode

type ErrorState = { error?: Error }

function Catch<Props extends {}>(component: ErrorHandlingComponent<Props>, errorHandler?: ErrorHandler): React.ComponentType<Props> {
    return class extends React.Component<Props, ErrorState> {
        state: ErrorState = {
            error: undefined
        }

        static getDerivedStateFromError(error: Error) {
            return { error }
        }

        componentDidCatch(error: Error, info: React.ErrorInfo) {
            if (errorHandler) {
                errorHandler(error, info)
            }
        }

        render() {
            return component(this.props, this.state.error)
        }
    }
}

type Props = {
    children: React.ReactNode
}

const ErrorBoundary = Catch(function ErrorBoundary(props: Props, error?: Error) {
    if (error) {
        return (
            <>
                <ToasterContainer>
                    <Toast kind={KIND.negative}>{error.message}</Toast>
                </ToasterContainer>
            </>
        )
    } else {
        return <React.Fragment>{props.children}</React.Fragment>
    }
})

export default ErrorBoundary
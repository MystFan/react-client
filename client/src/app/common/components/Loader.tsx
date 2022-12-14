import { StyledSpinner } from "baseui/spinner/styled-components";
import { styled } from "styletron-react";

type LoaderProps = {
    loading: boolean
}

const Loader = (props: LoaderProps) => {
    if (!props.loading) {
        return <></>;
    } else {
        return (
            <LoadingContainer>
                <LoadingOverlay></LoadingOverlay>
                <SpinnerContainer>
                    <SpinnerWrapper>
                        <StyledSpinner $size={96}></StyledSpinner>
                    </SpinnerWrapper>
                </SpinnerContainer>
            </LoadingContainer>
        );
    }
};

const SpinnerWrapper = styled("div", {
    height: "100px",
    width: "100px",
    position: "absolute",
    top: "calc(50% - 50px)",
    left: "calc(50% - 50px)"
})

const LoadingContainer = styled("div", {
    position: "absolute",
    zIndex: 1010,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: "100%",
    width: "100%",
    minHeight: "2em",
    cursor: "wait",
    overflow: "hidden",
    ":focus": {
        outlineStyle: "none"
    }
})

const LoadingOverlay = styled("div", {
    height: "100%",
    width: "100%",
    opacity: "0.75",
    filter: "alpha(opacity=50)",
    backgroundColor: "rgb(184, 184, 184)"
})

const SpinnerContainer = styled("div", {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    textAlign: "center",
    transform: "translateY(-50%)",
    zIndex: 10001
})

export default Loader;



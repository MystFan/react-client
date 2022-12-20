import { styled } from "baseui";
import { Alert } from "baseui/icon";

const NegativeIconContainer = styled("div", config => ({
    display: 'flex',
    alignItems: 'center',
    paddingRight: config.$theme.sizing.scale500,
    color: config.$theme.colors.negative400
}))

function NegativeIcon() {
    return (
        <NegativeIconContainer>
            <Alert size="18px" />
        </NegativeIconContainer>
    );
}

export default NegativeIcon;

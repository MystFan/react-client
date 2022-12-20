import React from "react";

const useAsyncError = () => {
    const [_, setError] = React.useState();
    return React.useCallback(
        (e: any) => {
            setError(() => {
                throw e;
            });
        },
        [setError],
    );
};

export default useAsyncError;

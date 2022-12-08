import { useEffect } from 'react';

const { REACT_APP_ENV } = process.env;

const Overview = () => {

    useEffect(() => {
    }, [])

    return (
        <>
            <h1>Overview</h1>
            <h4>{REACT_APP_ENV}</h4>
        </>
    )
}

export default Overview;

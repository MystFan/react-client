import { useEffect } from 'react';

import HttpClient from '../../api/ApiClient';
import IProduct from '../../models/product.model';

const { REACT_APP_ENV } = process.env;

const Overview = () => {

    useEffect(() => {
        HttpClient.get<IProduct[]>("product")
            .then(data => console.log(data));
    }, [])

    return (
        <>
            <h1>Overview</h1>
            <h4>{REACT_APP_ENV}</h4>
        </>
    )
}

export default Overview;

import React, { useState, useEffect } from 'react'
import QuickView from './QuickView';
import Card from './Card';
import Pagination from './Pagination';

const Home = (props) => {
    const {render, setRender} = props;
    const [page, setPage] = useState(1);
    const [quickview, setQuickview] = useState({});
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(quickview)
    }, [quickview])
    useEffect(() => {
        setLoading(true);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://api.escuelajs.co/api/v1/products`, requestOptions)
            .then(response => response.text())
            .then(result => setTotal(JSON.parse(result).length))
            .catch(error => console.log('error', error));
    }, [])
    useEffect(() => {
        setLoading(true);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://api.escuelajs.co/api/v1/products?offset=${12 * (page - 1)}&limit=12`, requestOptions)
            .then(response => response.text())
            .then(result => { setProducts(JSON.parse(result)); setLoading(false) })
            .catch(error => console.log('error', error));
    }, [page])
    return (
        <>
            {quickview.id ? <QuickView render={render} setRender={setRender} quickview={quickview} setQuickview={setQuickview} /> : <></>}

            <div className="relative ">
                <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="min-h-screen grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {loading && Array.from({ length: 8 }, (_, index) => (
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7 animate-pulse">
                                <div style={{ minHeight: "300px", justifyContent: 'space-between' }} className="group flex flex-col">

                                    <h3 style={{ minHeight: "250px" }} className="bg-gray-300 rounded-md h-4 w-full"></h3>
                                    <h3 style={{ minHeight: "40px" }} className="bg-gray-300 rounded-md w-full"></h3>

                                </div>
                            </div>
                        ))}
                        {products.map((product) => (
                            <Card key={product.id} product={product} quickview={quickview} setQuickview={setQuickview} />
                        ))}
                    </div>
                </div>
            </div>


            {total&& <Pagination total={total} page={page} setPage={setPage} />}
        </>
    )
}

export default Home
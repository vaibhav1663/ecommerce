import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Done = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const {render, setRender} = props;
    useEffect(() => {
        const stringified = localStorage.getItem('cart') || '[]';
        const snapshot = JSON.parse(stringified);

        const uniqueItems = snapshot.reduce((acc, item) => {
            const key = `${item.id}_${item.title}`;
            acc[key] = acc[key] || { ...item, quantity: 0 };
            acc[key].quantity += 1;
            return acc;
        }, {});

        const uniqueItemsArray = Object.values(uniqueItems);

        setCartItems(uniqueItemsArray);
    }, []);

    useEffect(() => {
        // Clear the local storage only if there are items in the cart
        if (cartItems.length > 0) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
    }, [cartItems]);

    return (
        <div class="mt-10 bg-gray-100 h-screen">
            <div class="bg-white p-6  md:mx-auto">
                <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div class="text-center">
                    <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                    <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                    <p> Order has been placed for : </p>
                    {cartItems.map((item) => (
                        <div class="w-full m-auto flex max-w-96 rounded-lg bg-white sm:flex-row">
                            <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.images[0]} alt="" />
                            <div class="flex w-full flex-col px-4 py-4 items-start">
                                <span class="font-semibold">{item.title}</span>
                                <span class="float-right text-gray-400">Qty  {item.quantity}</span>
                                <p class="text-lg font-bold">${item.price}</p>
                            </div>
                        </div>
                    ))}
                    <div class="py-10 text-center">
                        <Link to="/" class="px-12 bg-indigo-600 rounded hover:bg-indigo-500 text-white font-semibold py-3">
                            GO BACK
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Done
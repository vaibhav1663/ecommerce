import React, { useEffect, useState } from 'react'

const Liked = (props) => {
    const { liked, setLiked } = props;
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const stringified = localStorage.getItem('liked') || '[]';
        const snapshot = JSON.parse(stringified);

        const uniqueItems = snapshot.reduce((acc, item) => {
            const key = `${item.id}_${item.title}`;
            acc[key] = acc[key] || { ...item, quantity: 0 };
            acc[key].quantity += 1;
            return acc;
        }, {});

        // Convert the object values back to an array before setting the state
        const uniqueItemsArray = Object.values(uniqueItems);

        setCartItems(uniqueItemsArray);
    }, [cartItems]);

    const removeFromLocalStorage = (productId) => {
        const stringified = localStorage.getItem('liked') || '[]';
        const cartItems = JSON.parse(stringified);

        // Filter out the item with the specified productId
        const updatedCart = cartItems.filter(item => item.id !== productId);

        // Update local storage with the modified cart
        localStorage.setItem('liked', JSON.stringify(updatedCart));
        setCartItems([]);
    };
    return (
        <div class="relative z-20" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

                        <div class="pointer-events-auto w-screen max-w-md">
                            <div class="flex h-full flex-col bg-white shadow-xl">
                                <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div class="flex items-start justify-between">
                                        <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Liked</h2>
                                        <div class="ml-3 flex h-7 items-center">
                                            <button onClick={() => { setLiked(!liked) }} type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                                <span class="absolute -inset-0.5"></span>
                                                <span class="sr-only">Close panel</span>
                                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="mt-8">
                                        <div class="flow-root">
                                            <ul role="list" class="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((item) => (
                                                    <li key={item.id} class="flex py-6">
                                                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src={item.images[0]} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center" />
                                                        </div>

                                                        <div class="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div class="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href="#">{item.title}</a>
                                                                    </h3>
                                                                    <p class="ml-4">${item.price}</p>
                                                                </div>
                                                            </div>
                                                            <div class="flex flex-1 items-end justify-between text-sm">
                                                                <p class="text-gray-500">Qty {item.quantity}</p>

                                                                <div class="flex">
                                                                    <button type="button" onClick={() => { removeFromLocalStorage(item.id) }} class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Liked
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    const {cart, setCart, liked, setLiked} = props;
    return (
        <nav style={{position: 'sticky', background: 'white', top: 0}} className="z-10 shadow-sm bg-light">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <Link to={'/'} className='text-2xl font-medium text-gray-900'>
                        Company Name
                    </Link>
                    <div className='flex'>
                        <button onClick={()=>{setLiked(!liked)}} className='px-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>

                        </button>
                        <button onClick={()=>{setCart(!cart)}} className='relative px-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            {JSON.parse(localStorage.getItem('cart') || '[]').length > 0 && (
                                <span className="absolute inset-0 object-right-top -mr-6">
                                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-sm font-semibold leading-4 bg-red-500 text-white">
                                        {JSON.parse(localStorage.getItem('cart') || '[]').length}
                                    </div>
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const shipping = 8;
const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [card, setCard] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const stringified = localStorage.getItem('cart') || '[]';
    const snapshot = JSON.parse(stringified);
    
    const uniqueItems = snapshot.reduce((acc, item) => {
      const key = `${item.id}_${item.title}`; // Assuming each item has an 'id' and 'title' property
      acc[key] = acc[key] || { ...item, quantity: 0 };
      acc[key].quantity += 1;
      return acc;
    }, {});

    // Convert the object values back to an array before setting the state
    const uniqueItemsArray = Object.values(uniqueItems);

    setCartItems(uniqueItemsArray);
  }, []);

  const handleCheckout=()=>{
    if(cartItems==0){
      alert("Cart is empty");
      return
    }
    if(!name || !email || !card || !address){
      alert("Fill all Details")
      return
    }
    navigate('/done')
  }
  return (
    <>
      <div class="mt-10 grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
          <p class="text-xl font-medium">Order Summary</p>
          <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-1 py-2 sm:px-2">
          {cartItems.map((item) => (
            <div class="flex flex-col rounded-lg bg-white sm:flex-row">
              <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.images[0]} alt="" />
              <div class="flex w-full flex-col px-4 py-4">
                <span class="font-semibold">{item.title}</span>
                <span class="float-right text-gray-400">Qty  {item.quantity}</span>
                <p class="text-lg font-bold">${item.price}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
        <div class="mt-10 px-4 pt-8 lg:mt-0">
          <p class="text-xl font-medium">Payment Details</p>
          <p class="text-gray-400">Complete your order by providing your payment details.</p>
          <div class="">
            <label for="email" class="mt-4 mb-2 block text-sm font-medium">Email</label>
            <div class="relative">
              <input onChange={(e)=>{setEmail(e.target.value)}} type="text" id="email" name="email" class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
              
            </div>
            <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
            <div class="relative">
              <input type="text"  onChange={(e)=>{setName(e.target.value)}} id="card-holder" name="card-holder" class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
              
            </div>
            <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">Card Details</label>
            <div class="flex">
              <div class="relative w-7/12 flex-shrink-0">
                <input  onChange={(e)=>{setCard(e.target.value)}} type="text" id="card-no" name="card-no" class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
                
              </div>
              <input type="text" name="credit-expiry" class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="MM/YY" />
              <input type="text" name="credit-cvc" class="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" />
            </div>
            <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
            <div class="flex flex-col sm:flex-row">
              <div class="relative flex-shrink-0 sm:w-7/12">
                <input type="text"  onChange={(e)=>{setAddress(e.target.value)}} id="billing-address" name="billing-address" class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
                
              </div>
              <select type="text" name="billing-state" class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                <option value="State">State</option>
              </select>
              <input type="text" name="billing-zip" class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
            </div>

            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                <p class="font-semibold text-gray-900">$ {cartItems.reduce((sum, item) => sum + item.price*item.quantity, 0)}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping</p>
                <p class="font-semibold text-gray-900">${shipping}</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">${cartItems.reduce((sum, item) => sum + item.price*item.quantity, 0) + shipping}</p>
            </div>
          </div>
          <button onClick={handleCheckout} class="block mt-4 mb-8 w-full rounded-md bg-indigo-600 px-6 py-3 font-medium text-white">Place Order</button>
        </div>
      </div>

    </>
  )
}

export default Checkout
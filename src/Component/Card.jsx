import React from 'react'

const Card = (props) => {
    const { quickview, setQuickview, product} = props;
    return (
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
            <div className="group relative flex flex-col-reverse">
                <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                    <h3>
                        <a href="/">{product.title}</a>
                    </h3>
                    <p>${product.price}</p>
                </div>
                <div onClick={() => { setQuickview(product) }} style={{cursor: 'pointer'}} className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                    <img src={product.images[0]} onError={(e)=>{e.target.src = `./img/default${Math.floor(Math.random() * 3)}.jpeg`;}} alt="Model wearing gray t-shirt." className="z-8 object-cover object-center" />
                    <div className="flex items-end p-4" style={{ marginTop: "-100px" }}>
                        <button type="button"  className="relative z-8 w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-sm text-gray-900 opacity-0 focus:opacity-100 group-hover:opacity-100" >Quick View<span className="sr-only">, Basic Tee 6-Pack </span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
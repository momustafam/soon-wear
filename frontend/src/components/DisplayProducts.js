import React from "react";
import Product from "../components/Product";
import { Link } from "react-router-dom";

function DisplayProducts(toggleShoppingCartVisibility, header, products, img) {
    return (
        < div >
            {header && (
                <h1 className="text-center bg-darkWhite text-black font-bold text-3xl p-3 pt-6 pb-6 mt-10 mb-5" >
                    {header}
                </h1>
            )}
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 m-5">
                    {products.map((product) => (
                        <Product
                            key={product.id}
                            product={product}
                            toggleShoppingCartVisibility={
                                toggleShoppingCartVisibility
                            }
                        />
                    ))}
                </div>
                <div className="text-center mb-5">
                    <Link to="#" className="px-5 py-3 mt-3 mb-10 inline-block text-xl shadow-lg shadow-mainColor font-semibold rounded-full border border-mainColor hover:bg-mainColor hover:text-white">
                        مشاهدة المزيد
                    </Link>
                </div>
                {img && (<img
                    className="h-full w-full object-cover"
                    src={require(`../images${img.image}`)}
                    alt="Product"
                />
                )}
            </div>
        </div>
    );
}

export default DisplayProducts;
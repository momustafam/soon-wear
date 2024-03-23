import React from "react";
import { Link } from "react-router-dom";

function SeeMoreButton() {
    return (
        <div className="text-center mb-5">
            <Link to="#" className="px-5 py-3 mt-3 mb-10 inline-block text-xl shadow-lg shadow-mainColor font-semibold rounded-full border border-mainColor hover:bg-mainColor hover:text-white">
                مشاهدة المزيد
            </Link>
        </div>
    );
}

export default SeeMoreButton;
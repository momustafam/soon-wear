import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addMoreProducts } from "../slices/categorySlice";

function SeeMoreButton({ link, seeMore = false }) {
  const dispatch = useDispatch();
  const { next } = useSelector((state) => state.category);

  const handleClick = () => {
    if (seeMore) {
      dispatch(addMoreProducts());
    }
  };

  return (
    next && (
      <div className="text-center mb-5">
        <Link
          to={link || "#"}
          className="px-5 py-3 mt-3 mb-10 inline-block text-xl shadow-lg shadow-mainColor font-semibold rounded-full border border-mainColor hover:bg-mainColor hover:text-white"
          onClick={handleClick}
        >
          مشاهدة المزيد
        </Link>
      </div>
    )
  );
}

export default SeeMoreButton;

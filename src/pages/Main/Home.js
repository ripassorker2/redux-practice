import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { toggleBrand, toggleStock } from "../../redux/actions/filterActions";
import { lodedProductData } from "../../redux/thunk/productThunk/fetchProduct";

const Home = () => {
  const dispatch = useDispatch();

  const { filters } = useSelector((state) => state.filter);
  const { brand, stock } = filters;

  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(lodedProductData());
  }, [dispatch]);

  const activeClass = "text-white  bg-indigo-500 border-white";

  let content;

  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ));
  }

  if (products?.length && (stock || brand.length)) {
    content = products
      .filter((p) => {
        if (stock) {
          return p.status === true;
        }
        return p;
      })
      ?.filter((p) => {
        if (brand.length) {
          return brand.includes(p.brand);
        }
        return p;
      })
      .map((product, i) => <ProductCard key={i} product={product} />);
  }

  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className="mb-10 flex justify-end gap-5">
        <button
          onClick={() => dispatch(toggleStock())}
          className={`border px-3 py-2 rounded-full font-semibold ${
            stock ? activeClass : null
          } `}
        >
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrand("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brand.includes("amd") ? activeClass : null
          } `}
        >
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrand("intel"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brand.includes("intel") ? activeClass : null
          } `}
        >
          Intel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {content}
      </div>
    </div>
  );
};

export default Home;

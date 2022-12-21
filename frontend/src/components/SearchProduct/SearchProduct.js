import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getSearchProductsThunk } from '../../store/product'
import "./SearchProduct.css";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const {keyword} = useParams();

  const products = useSelector(state => state.product.searchProducts);
  const productsArr = Object.values(products);

  useEffect(() => {
    dispatch(getSearchProductsThunk(keyword))
  }, [dispatch, keyword]);


return (
    <>
      {!productsArr.length &&
      <div className="search-products-no-item">
        <div className="search-products-no-item1">We couldn't find any results for {keyword}</div>
        <div className="search-products-no-item2">Try searching for something else instead?</div>
      </div>}
      {productsArr.length && 
        <div className="search-products-title">{productsArr.length} search results for "{keyword}"</div>}
          <div className="search-products-container">
            {productsArr && productsArr.map(product => {
                return (
                    <>
                    <NavLink key={product.id} to={`/products/${product.id}`}>
                    <div>
                    <img
                        className="products-image"
                        src={product.image}
                        alt=""
                        onError={e => {
                          e.currentTarget.src = "https://nckenya.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
                          e.onerror=null;
                        }}
                      />
                    </div>
                    <div className="products-info">
                      <div className="products-name">{product.name}</div>
                        <div className="products-rating-info">
                          {product.avgRating % 1 ? 
                            <div>{[...Array(Math.floor(product.avgRating))].map(star => <i className="fa-solid fa-star fa-xs"></i>)}
                              <i className="fa-solid fa-star-half fa-xs"></i>
                                <span className="products-reviewCount"> ({product.reviewCount})</span>
                            </div>
                            :
                            <div>{[...Array(product.avgRating)].map(star => <i className="fa-solid fa-star fa-xs"></i>)}
                              <span className="products-reviewCount"> ({product.reviewCount})</span>
                            </div>
                          }
                      </div>
                      <div className="products-price">${(product.price).toFixed(2)}</div>
                    </div>
                    </NavLink>
                    </>
                )
            })}
        </div>
    </>
  )

}

export default SearchProduct;

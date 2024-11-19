import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { CgShoppingCart } from 'react-icons/cg';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ products, product }) => {
  const { image, name, details, price, tags, care } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd } = useStateContext();

  // Generate care list safely
  const careList = care?.map((item) => item?.children?.[0]?.text) || [];

  return (
    <div className="products">
      <div className="product-detail-container">
        <div className="product-images">
          <div className="small-images-container">
            {image?.map((item, ind) => (
              <img
                key={ind}
                src={urlFor(item)}
                className={`small-image ${ind === index ? 'active' : ''}`}
                onMouseEnter={() => setIndex(ind)}
                alt={`Product image ${ind + 1}`}
              />
            ))}
          </div>
          <div className="big-image-container">
            <img src={urlFor(image && image[index])} alt="Product preview" />
          </div>
        </div>
        <div className="product-details">
          <div className="name-and-category">
            <h3>{name}</h3>
            <span>{tags}</span>
          </div>
          <div className="size">
            <p>SELECT SIZE</p>
            <ul>
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <li key={size}>{size}</li>
              ))}
            </ul>
          </div>
          <div className="quantity-desc">
            <h4>Quantity: </h4>
            <div>
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </div>
          </div>
          <div className="add-to-cart">
            <button
              className="btn"
              type="button"
              onClick={() => onAdd(product, qty)}
            >
              <CgShoppingCart size={20} />
              Add to Cart
            </button>
            <p className="price">Rs. {price}</p>
          </div>
        </div>
      </div>

      <div className="product-desc-container">
        <div className="desc-title">
          <div className="desc-background">Overview</div>
          <h2>Product Information</h2>
        </div>
        <div className="desc-details">
          <h4>PRODUCT DETAILS</h4>
          <p>{details?.[0]?.children?.[0]?.text}</p>
        </div>
        <div className="desc-care">
          <h4>PRODUCT CARE</h4>
          <ul>
            {careList.map((listItem, idx) => (
              <li key={idx}>{listItem}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

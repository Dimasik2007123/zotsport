import { useState } from "react";

function ProductCard({ product, onAdd }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    onAdd(product.id);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 900);
  };

  return (
    <li className="product">
      <div className="product_block">
        <div className="product_content">
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          {product.sale > 0 ? (
            <>
              <p className="old">Старая цена: {product.old_price} руб.</p>
              <p className="sale">
                SALE {product.sale}% <br />
                Новая цена: {product.price} руб.
              </p>
            </>
          ) : (
            <p>Цена: {product.price} руб.</p>
          )}
          <p>Артикул: {product.id}</p>
        </div>
        <button
          className={`product_button ${isAnimating ? "product_button-active" : ""}`}
          onClick={handleAddToCart}
          disabled={isAnimating}
        >
          Добавить в корзину
        </button>
      </div>
    </li>
  );
}

export default ProductCard;

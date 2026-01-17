import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

function Catalog() {
  const { category: slug } = useParams();
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("Все");
  const [loading, setLoading] = useState(true);

  const categoryMap = {
    balls: "Мячи",
    boots: "Бутсы",
    shirts: "Футболки",
    shorts: "Шорты",
    food: "Спортивное питание",
  };

  const mappedCategory = categoryMap[slug] || null;

  useEffect(() => {
    document.title = "ЗотСпорт. " + mappedCategory;
  }, [mappedCategory]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch("/backend/start.php")
      .then((response) => response.json())
      .then((data) => {
        let filtered = data.filter((product) => product.avalible === 1);
        if (mappedCategory) {
          filtered = filtered.filter(
            (product) => product.category === mappedCategory,
          );
        }
        setProducts(filtered);
        setFilteredProducts(filtered);
        setLoading(false);
      });
  }, [mappedCategory]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);

    if (brand === "Все") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.brand && product.brand.includes(brand),
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading) return <Loading />;

  return (
    <main className="content">
      {mappedCategory === "Бутсы" ? (
        <div className="filters">
          <div className="filter-option">
            <input
              type="radio"
              id="Все"
              name="brands"
              value="Все"
              checked={selectedBrand === "Все"}
              onChange={() => handleBrandChange("Все")}
            />
            <label htmlFor="Все">Все бренды</label>
          </div>

          <div className="filter-option">
            <input
              type="radio"
              id="Adidas"
              name="brands"
              value="Adidas"
              checked={selectedBrand === "Adidas"}
              onChange={() => handleBrandChange("Adidas")}
            />
            <label htmlFor="Adidas">Adidas</label>
          </div>

          <div className="filter-option">
            <input
              type="radio"
              id="Nike"
              name="brands"
              value="Nike"
              checked={selectedBrand === "Nike"}
              onChange={() => handleBrandChange("Nike")}
            />
            <label htmlFor="Nike">Nike</label>
          </div>
        </div>
      ) : null}

      <ol className="catalog">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </ol>
    </main>
  );
}

export default Catalog;

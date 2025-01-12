import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  const [popup, setPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
    setFilterProducts(storedProducts);
  }, []);

  useEffect(() => {
    setFilterProducts(products);
    localStorage.setItem("products", JSON.stringify(products)); 
  }, [products]);

  const hdlSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterProducts(filtered);
      setIsLoading(false);
    }, 3000);
  };

  const hdlClearSearch = () => {
    setSearchQuery("");
    setFilterProducts(products);
  };

  return (
    <>
      <div>
        <h2>ระบบจัดการข้อมูลสินค้า</h2>

        <div>
          <form
            className="search"
            onSubmit={(e) => {
              e.preventDefault();
              hdlSearch();
            }}
          >
            <input
              type="text"
              placeholder="ค้นหาสินค้า.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="searchBtn">
              <i className="fa fa-search"></i>
            </button>

            {searchQuery && (
              <button
                type="button"
                className="clearBtn"
                onClick={hdlClearSearch}
              >
                X
              </button>
            )}
          </form>
        </div>

        <div className="productAdd">
          <h3>รายการสินค้า</h3>

          <button className="addButton" onClick={() => setPopup(true)}>
            เพิ่มสินค้า
          </button>

          {popup && (
            <ProductForm
              currentProduct={currentProduct}
              setCurrentProduct={setCurrentProduct}
              products={products}
              setProducts={setProducts}
              setPopup={setPopup}
            />
          )}
        </div>

        <ProductList
          isLoading={isLoading}
          filterProducts={filterProducts}
          setPopup={setPopup}
          setCurrentProduct={setCurrentProduct}
          setProducts={setProducts}
        />
      </div>
    </>
  );
}

export default App;

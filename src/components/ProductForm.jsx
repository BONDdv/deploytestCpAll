import React, { useEffect, useState } from "react";

const ProductForm = ({
    currentProduct,
    setCurrentProduct,
    products,
    setProducts,
    setPopup,
}) => {
    const [name, setName] = useState(currentProduct ? currentProduct.name : "");
    const [price, setPrice] = useState(currentProduct ? currentProduct.price : "");
    const [stock, setStock] = useState(currentProduct ? currentProduct.stock : "");
    const [error, setError] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;


    useEffect(() => {
        if(currentProduct) {
            setName(currentProduct.name);
            setPrice(currentProduct.price);
            setStock(currentProduct.stock);
        }
    }, [currentProduct]);


    const hdlSubmit = async (e) => {
      e.preventDefault();
  
      
      if (!currentProduct && products.some(product => product.name === name )) {
          setError("สินค้ามีอยู่ในระบบแล้ว");
          return; 
      }
  
      const newProduct = {name, price: parseFloat(price), stock: parseInt(stock) };
      const updateProduct = {name, price: parseFloat(price), stock: parseInt(stock) };
  
      if (currentProduct) {
          try {
              const response = await fetch(`${apiUrl}/products/${currentProduct.id}`, {
                  method: "PUT",
                  headers: {
                      "Content-Type" : "application/json"
                  },
                  body: JSON.stringify(updateProduct),
              })
              if (!response.ok) {
                  throw new Error("ไม่สามารถแก้ไขสินค้าได้");
              }
  
              const data = await response.json();
              setProducts(
                  products.map((product) => 
                      product.id === currentProduct.id
                          ? {...product, ...updateProduct}
                          : product
                  )
              )
          } catch (error) {
              console.error("ข้อผิดพลาดในการเเก้ไขสินค้า", error)
          }
          setCurrentProduct(null);
      } else {
          try {
              const response = await fetch(`${apiUrl}/products`, {
                  method: "POST",
                  headers: {
                      "Content-Type" : "application/json",
                  },
                  body: JSON.stringify(newProduct),
              })
              if (!response.ok) {
                  throw new Error("ไม่สามารถเพิ่มสินค้าได้");
              }
  
              const data = await response.json();
              setProducts([...products, data.product])
          } catch (error) {
              console.error("ข้อผิดพลาดในการเพิ่มสินค้า", error)
          }
      }
      setPopup(false);
  }
  

  
    
      return (
        <div className="popupOverlay active" onClick={()=> {
            setPopup(false)
            setCurrentProduct(null)}
            }>
            <div className="popupContent" onClick={(e)=> e.stopPropagation()}>
              <button className="closeBtn" onClick={()=> {
                setPopup(false)
                setCurrentProduct(null)}
                }>x</button>
              <h2>{currentProduct ? 'แก้ไขสินค้า' : "เพิ่มรายการสินค้า"}</h2>
              <form onSubmit={hdlSubmit}>
                <label>ชื่อสินค้า: </label>
                {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
                <input 
                  type="text" 
                  name="name"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                  required
                />
    
                <label>ราคาสินค้า(บาท):</label>
                <input 
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e)=> setPrice(e.target.value)}
                  required
                />
    
                <label>จำนวน:</label>
                <input 
                  type="number" 
                  name="stock"
                  value={stock}
                  onChange={(e)=> setStock(e.target.value)}
                  required
                />
                
                <button type="submit">ยืนยัน</button>
                <button 
                  type="button"
                  className="cancel" 
                  onClick={()=> {
                    setPopup(false)
                    setCurrentProduct(null)
                  }} 
                >ยกเลิก</button>
              </form>
            </div>
          </div>
      )
    
}

export default ProductForm;


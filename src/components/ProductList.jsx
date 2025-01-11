import React from "react";

const ProductList = ({
    isLoading,
    filterProducts,
    setPopup,
    setCurrentProduct,
    setProducts,
}) => {
    
    const apiUrl = import.meta.env.VITE_API_URL;
    const hdlEdit = (product) => {
        setCurrentProduct(product);
        setPopup(true);
      }

      const hdlDelete = async (id) => {
        const confirmDelete = window.confirm("ต้องการลบสินค้าชิ้นนี้?");
        if(confirmDelete) {
            try {
                const response = await fetch(`${apiUrl}/products/${id}`, {
                    method: 'DELETE',
                });
                if(!response.ok) {
                    throw new Error("ไม่สามารถลบสินค้าชิ้นนี้ได้")
                }
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id) || []);
            } catch (error) {
                console.error("ข้อผิดพลาดในการลบสินค้า", error);
            }
      };
    }

    return (
        <div>
            <table>
    <thead>
      <tr>
        <th>ลำดับ</th>
        <th>ชื่อสินค้า</th>
        <th>ราคา(บาท)</th>
        <th>จำนวนสินค้าในสต็อก(ชิ้น)</th>
        <th>จัดการสินค้า</th>
      </tr>
    </thead>
    <tbody>
      {isLoading ? (
        <tr>
          <td>...</td>
          <td >กำลังค้นหาสินค้า...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
      ): filterProducts && filterProducts.length === 0 ? (
        <tr>
          <td>-</td>
          <td>ไม่พบสินค้าในฐานข้อมูล</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      ) : (
        filterProducts && filterProducts.map((product, index) => {
         return ( <tr key={product.id}>
            <td>{index +1}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>
            <div className="manageBtn">
              <button className="editBtn" onClick={()=> hdlEdit(product)}>แก้ไข</button>
              <button className="deleteBtn" onClick={()=> hdlDelete(product.id)}>ลบ</button>
            </div>
            </td>
          </tr>
         );
        })
      )
    }
     
        
    </tbody>
    </table>
    
    <p>จำนวนสินค้าทั้งหมด: {filterProducts.length} รายการ</p> 
        </div>
    )
}
 
export default ProductList
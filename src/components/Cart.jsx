import React, { useEffect, useState } from "react";
import { MCartContainer } from "../utils/styledComponents";
import { CARTS, PRODUCTS } from "../utils/variables";
import { axiosShopInstance } from "../services/axios";
import Loading from "./Loading";
import { Close } from "./Modal";

const Cart = ({ openRef, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);

  const getProductData = async (id) => {
    const res = await axiosShopInstance.get(PRODUCTS + `/${id}`);
    return res.data;
  };

  const getProductsData = async () => {
    setIsLoading(true);
    data.map((item) => {
      getProductData(item.productId).then((res) => {
        setProduct([...product, { ...item, ...res }]);
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axiosShopInstance.get(CARTS + "/1");
        setData(res.data.products);
      } catch (e) {
        console.log("Error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    getProductsData();
  }, []);

  return (
    <>
      <MCartContainer ref={openRef}>
        <Close onClick={() => setIsOpen(false)}>❌</Close>
        {isLoading ? (
          <Loading />
        ) : (
          <div style={{ marginTop: "60px" }}>
            {/* {product.length < 1
              ? product?.map((item) => (
                  <div key={item.productId}>{item.productId}</div>
                )) */}
            Корзина пуста
          </div>
        )}
      </MCartContainer>
    </>
  );
};

export default Cart;

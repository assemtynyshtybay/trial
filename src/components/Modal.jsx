import React, { useEffect, useState } from "react";
import { axiosShopInstance } from "../services/axios";
import { CARTS, PRODUCTS } from "../utils/variables";
import Loading from "../components/Loading";

import styled from "styled-components";
import { CardTextDate, CardTextTitle } from "./Card/CardStyles";
import { MButton } from "./Form";
import { useParams } from "react-router-dom";

const CustomModal = (props) => {
  const { setIsOpen, modalRef } = props;
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddToBasket = () => {
    const body = {
      userId: 1,
      date: new Date().toISOString().split("T")[0],
      products: [{ productId: id, quantity: cnt !== 0 ? cnt : 1 }],
    };
    async function addToCard() {
      try {
        const res = await axiosShopInstance.post(CARTS, body);
        if (res.status === 200) {
          alert("Успешно!");
        }
      } catch (e) {
        console.log("Error:", e);
      } finally {
        setCnt(0);
      }
    }

    addToCard();
  };
  const handleClose = () => {
    setIsOpen?.(false);
  };
  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await axiosShopInstance.get(PRODUCTS + `/${id}`);
      setData(res.data);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    setCnt(0);
  }, [id]);

  return (
    <DetailCard>
      <ModalWrapper ref={modalRef}>
        <Close onClick={handleClose}>❌</Close>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <DetailCardImg src={data?.image} />
            <CardTextDate>${data?.price}</CardTextDate>
            <CardTextTitle>{data?.title}</CardTextTitle>
            <DetailCardContent>{data?.description}</DetailCardContent>
            <CountDiv>
              <MButton onClick={() => cnt > 0 && setCnt(cnt - 1)}>-</MButton>
              {cnt}
              <MButton onClick={() => setCnt((v) => v + 1)}>+</MButton>
            </CountDiv>
            <ModalBtns>
              <MButton onClick={handleAddToBasket}>Купить</MButton>
            </ModalBtns>
          </>
        )}
      </ModalWrapper>
    </DetailCard>
  );
};

export default CustomModal;

const CountDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: fit-content;
`;
const ModalWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
  height: 100%;
  align-items: center;
  align-content: center;
  justify-content: space-evenly;
`;
const ModalBtns = styled.div`
  padding-top: 1rem;
  display: flex;
  gap: 5px;
  align-items: center;
  align-content: center;
  justify-content: flex-end;
  height: fit-content;
`;
export const Close = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 25px;
  height: 25px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid;
  cursor: pointer;
`;
const DetailCard = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 90vh;
  max-width: 1200px;
  text-align: center;
  border-radius: 8px;
  background-color: var(--bg-dark);
  padding: 1rem 2rem;
  color: var(--text-light);
  overflow-y: scroll;
`;

const DetailCardImg = styled.img`
  width: 80%;
  object-fit: scale-down;
  overflow: hidden;
`;

const DetailCardTitle = styled.div`
  width: 100%;
  font-size: 2rem;
  padding: 0.8rem 0.5rem;
`;
const DetailCardContent = styled.div`
  width: 100%;
  height: auto;
  font-size: 1.5rem;
  padding: 0.8rem 0.5rem;
  word-break: break-all;
`;
const DetailCardAuthor = styled.div`
  width: 100%;
  height: auto;
  text-align: right;
  font-size: 1.5rem;
  padding: 0.8rem 0.5rem;
`;

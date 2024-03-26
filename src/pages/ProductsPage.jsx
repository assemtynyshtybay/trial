import React, { useEffect, useState } from "react";
import { PageContainer } from "../utils/styledComponents";
import { axiosShopInstance } from "../services/axios";
import { PRODUCTS } from "../utils/variables";
import { Title } from "../components/Form";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import styled from "styled-components";
import { Card } from "../components/Card";
import { useOutClick } from "../hooks/useOutClick";
import CustomModal from "../components/Modal";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { isOpen, setIsOpen, openRef } = useOutClick();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axiosShopInstance.get(PRODUCTS);
        setData(res.data);
      } catch (e) {
        console.log("Error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <PageContainer>
      <Title>Наши товары</Title>
      {isLoading ? (
        <Loading />
      ) : (
        <CardContainer>
          {data?.map((item) => (
            <div key={item.id}>
              <Card item={item} setShowDetails={setIsOpen} />
              <Separator />
            </div>
          ))}
        </CardContainer>
      )}

      {isOpen && (
        <CustomModal item={[]} modalRef={openRef} setIsOpen={setIsOpen} />
      )}
    </PageContainer>
  );
};

export default ProductsPage;

export const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 2rem;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
`;

const Separator = styled.span`
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

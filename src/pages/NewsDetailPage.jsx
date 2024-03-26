import React, { useEffect, useState } from "react";
import { PageContainer } from "../utils/styledComponents";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { axiosInstance } from "../services/axios";
import { NEWS } from "../utils/variables";
import Loading from "../components/Loading";

const NewsDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(NEWS + `/${id}`);
        setData(res.data);
      } catch (e) {
        console.log("Error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);
  return (
    <PageContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <DetailCard>
          <DetailCardImg src={data?.imageUrl} />
          <DetailCardTitle>{data?.title}</DetailCardTitle>
          <DetailCardContent>{data?.content}</DetailCardContent>
          <DetailCardAuthor>{data?.author}</DetailCardAuthor>
          <DetailCardAuthor>
            {data?.tags.map((str) => (
              <span>#{str} </span>
            ))}
          </DetailCardAuthor>
        </DetailCard>
      )}
    </PageContainer>
  );
};

export default NewsDetailPage;

const DetailCard = styled.div`
  width: 80%;
  max-width: 1200px;
  text-align: center;
  border-radius: 8px;
  background-color: var(--dark-blue);
  padding: 1rem 2rem;
  color: var(--bg-dark);
`;

const DetailCardImg = styled.img`
  width: 80%;
  height: auto;
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

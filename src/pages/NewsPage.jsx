import React, { useEffect, useState } from "react";
import {
  BackCard,
  Card,
  Cards,
  PageContainer,
} from "../utils/styledComponents";
import { axiosInstance } from "../services/axios";
import { NEWS } from "../utils/variables";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const NewsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(NEWS);
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
      {isLoading ? (
        <Loading />
      ) : (
        <Cards isflex={true}>
          {data?.map((item) => (
            <BackCard key={item?._id} url={item?.imageUrl}>
              <Card
                url={item?.imageUrl}
                onClick={() => {
                  nav(NEWS + `/${item?._id}`);
                }}
              >
                <Img src={item?.imageUrl} alt="news_img" />
                <CardTitle>{item.title}</CardTitle>
                <Content>{item.content}</Content>
                <Description>
                  <Author>
                    {item.tags.map((item) => (
                      <span key={item}>#{item} </span>
                    ))}
                  </Author>
                  <Author>{item.author}</Author>
                </Description>
              </Card>
            </BackCard>
          ))}
        </Cards>
      )}
    </PageContainer>
  );
};

export default NewsPage;

export const Img = styled.img`
  height: 90%;
  width: 90%;
  object-fit: contain;
  grid-row-start: 2;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 2;
`;
export const Content = styled.div`
  width: 100%;
  height: 230px;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  padding: 0.5rem;
  background-color: rgba(10, 7, 7, 0.566);
  color: #fafafa;
`;

export const Author = styled.div`
  width: 50%;
  color: #9595a7;
  font-size: 1.5rem;
  background-color: rgba(10, 7, 7, 0.566);
  text-align: left;
  span {
    font-size: 1.5rem;
  }
`;

export const CardTitle = styled.div`
  font-size: 3rem;
  font-weight: 900;
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
`;

export const Description = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  grid-gap: 5px;
`;

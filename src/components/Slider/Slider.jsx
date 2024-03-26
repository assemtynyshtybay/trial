import React, { useState, useEffect, useContext, createContext } from "react";
import styled from "styled-components";
import { NEWS } from "../../utils/variables";

export const SliderContext = createContext();

const Slider = ({ autoPlay, autoPlayTime, width, height }) => {
  const [items, setItems] = useState([]);
  const [slide, setSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const getImages = (length = 10) => {
    return fetch(`https://alphaedu.portfolio-adilzhexenov.kz${NEWS}`)
      .then((response) => response.json())
      .then((response) => {
        const images = [];
        response?.forEach((c) => {
          const title = c?.content;
          const url = c?.imageUrl;

          images.push({ title, url });
        });
        return images.slice(1, length);
      });
  };
  useEffect(() => {
    const loadData = async () => {
      const images = await getImages();
      setItems(images);
    };
    loadData();
  }, []);

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = items.length - 1;
    } else {
      slideNumber = (slide + direction) % items.length;
    }

    setSlide(slideNumber);
  };

  const goToSlide = (number) => {
    setSlide(number % items.length);
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    if (touchPosition === null) {
      return;
    }

    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      changeSlide(1);
    }, autoPlayTime);

    return () => {
      clearInterval(interval);
    };
  }, [items.length, slide]);
  return (
    <SliderContainer
      style={{ width, height }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <SliderContext.Provider
        value={{
          goToSlide,
          changeSlide,
          slidesCount: items.length,
          slideNumber: slide,
        }}
      >
        <Arrows>
          <Arrow isleft={true} onClick={() => changeSlide(-1)}>
            {">"}
          </Arrow>
          <Arrow isleft={false} onClick={() => changeSlide(1)}>
            {">"}
          </Arrow>
        </Arrows>
        <SliderList style={{ transform: `translateX(-${slide * 100}%)` }}>
          {items?.map((item) => (
            <SliderItem key={item?.url}>
              <img src={item?.url} alt={item?.title} />
              <span>{item?.title}</span>
            </SliderItem>
          ))}
        </SliderList>
        <CDots />
      </SliderContext.Provider>
    </SliderContainer>
  );
};

export default Slider;

function CDots() {
  const { slidesCount, goToSlide, slideNumber } = useContext(SliderContext);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < slidesCount; i++) {
      dots.push(
        <Dot
          key={`dot-${i}`}
          selected={slideNumber === i}
          onClick={() => goToSlide(i)}
        />
      );
    }

    return dots;
  };

  return <Dots>{renderDots()}</Dots>;
}

const SliderContainer = styled.div`
  overflow: hidden;
  position: relative;
`;
const SliderList = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  width: 100%;
`;
const SliderItem = styled.div`
  flex: 1 0 100%;
  position: relative;
  img {
    display: flex;
    margin: 0 auto;
    max-height: 300px;
    width: 100%;
    object-fit: contain;
  }
  span {
    text-align: center;
    margin-top: 10px;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  position: relative;
  z-index: 2;
`;

const Dot = styled.div`
  background-color: ${({ selected }) => (selected ? "green" : "#e7e7e7")};
  border-radius: 5px;
  height: 10px;
  margin: 5px;
  width: 10px;
  :hover {
    cursor: pointer;
  }
`;
const Arrows = styled.div`
  color: white;
  display: flex;
  font-size: 30px;
  justify-content: space-between;
  height: 100%;
  position: absolute;
  top: 30%;
  width: 100%;
  z-index: 1;
`;
const Arrow = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(../../assets/images/arrow.png);
  color: var(--text-light);
  font-size: 3rem;
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: 5px;
  ${({ isleft }) => (isleft ? "transform: rotate(180deg);" : "")}
  &:hover {
    cursor: pointer;
  }
`;

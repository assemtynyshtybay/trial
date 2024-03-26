import { useNavigate } from "react-router-dom";
import {
  CardWrapper,
  CardImage,
  CardTextWrapper,
  CardTextDate,
  CardTextTitle,
  CardTextBody,
  CardStatWrapper,
  CardStats,
  LinkText,
} from "./CardStyles";
import { CARTS, PRODUCTS } from "../../utils/variables";
import { axiosShopInstance } from "../../services/axios";

export const Card = ({ item, setShowDetails }) => {
  const { id, title, price, image, description } = item;
  const nav = useNavigate();
  const handleAddToBasket = () => {
    const body = {
      userId: 1,
      date: new Date().toISOString().split("T")[0],
      products: [{ productId: id, quantity: 1 }],
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
      }
    }

    addToCard();
  };
  return (
    <CardWrapper>
      <CardImage background={image} />
      <CardTextWrapper>
        <CardTextDate>${price}</CardTextDate>
        <CardTextTitle>{title}</CardTextTitle>
        <CardTextBody>{description}</CardTextBody>
      </CardTextWrapper>
      <CardStatWrapper>
        <CardStats>
          <LinkText
            onClick={() => {
              setShowDetails(true);
              nav(PRODUCTS + `/${id}`);
            }}
          >
            Посмотреть
          </LinkText>
        </CardStats>
        <CardStats>
          <LinkText onClick={handleAddToBasket}>Купить</LinkText>
        </CardStats>
      </CardStatWrapper>
    </CardWrapper>
  );
};

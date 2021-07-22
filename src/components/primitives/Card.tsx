import styled from "styled-components";
import simpUnit from "../../util/simpUnit";

interface CardProps {
  margin?: number | string;
  padding?: number | string;
  elevation?: number;
}

const Card = styled.div<CardProps>`
  border-radius: 16px;
  box-shadow: 0 5px 8px rgba(154, 160, 185, 0.2),
    0 6px 20px rgba(166, 173, 201, 0.6);
  margin: ${({ margin }) => simpUnit(margin ?? 0)};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export default Card;

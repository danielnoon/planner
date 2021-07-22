import styled from "styled-components";

interface ListProps {
  roundBottom?: boolean;
}

const Unordered = styled.ul<ListProps>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  ${({ roundBottom }) => roundBottom && `border-radius: 0 0 16px 16px`};
  z-index: 1;
`;

const Ordered = styled.ol``;

export { Unordered, Ordered };

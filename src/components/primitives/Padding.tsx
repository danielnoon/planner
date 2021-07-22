import styled, { css } from "styled-components";

interface PaddingProps {
  amount?: number;
  flood?: boolean | "x" | "y";
}

const Padding = styled.div<PaddingProps>`
  ${({ flood, amount }) =>
    flood &&
    css`
      width: ${flood === true || flood === "x" ? `100%` : "unset"};
      height: ${flood === true || flood === "y" ? `100%` : "unset"};
    `}

  padding: ${({ amount }) => amount ?? 24}px;
`;

export default Padding;

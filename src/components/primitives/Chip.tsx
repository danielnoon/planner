import styled from "styled-components";

interface ChipProps {
  color: string;
}

const Chip = styled.span<ChipProps>`
  background: ${({ color }) => color};
  border-radius: 2em;
  padding: 6px 12px;
  display: inline-flex;
  place-items: center;
`;

export default Chip;
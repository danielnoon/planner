import styled from "styled-components";

const ListItem = styled.li`
  padding: 12px 16px;

  background: white;

  &:nth-child(2n) {
    background: #efefef;
  }
`;

export default ListItem;

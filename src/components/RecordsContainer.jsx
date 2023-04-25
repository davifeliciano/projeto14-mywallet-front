import styled from "styled-components";

const RecordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
  overflow-y: scroll;

  & > *:first-child {
    margin-top: 5px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default RecordsContainer;

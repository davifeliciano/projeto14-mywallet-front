import styled from "styled-components";

const RecordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  overflow-y: scroll;

  & > *:first-child {
    margin-top: 1rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default RecordsContainer;

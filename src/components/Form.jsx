import styled from "styled-components";
import { Form as ReactRouterForm } from "react-router-dom";

const Form = styled(ReactRouterForm)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 30rem;
  max-width: 90vw;
`;

export default Form;

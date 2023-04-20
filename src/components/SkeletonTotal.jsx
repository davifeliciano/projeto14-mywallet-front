import Skeleton from "react-loading-skeleton";
import { Container, TotalText } from "./Total";

export default function SkeletonTotal() {
  return (
    <Container>
      <TotalText>Total</TotalText>
      <Skeleton width="10rem" height="2.6rem" />
    </Container>
  );
}

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonRecords({ count }) {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Skeleton key={index} height="2.4rem" />
      ))}
    </>
  );
}

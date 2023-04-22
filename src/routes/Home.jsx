import axios from "axios";
import { Suspense, useContext, useEffect } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import SessionContext from "../contexts/SessionContext";
import PageContainer from "../components/PageContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecordsContext from "../contexts/RecordsContext";
import { getToken } from "../utils/sessionUtils";
import PageContent from "../components/PageContent";
import RecordsContainer from "../components/RecordsContainer";
import Record from "../components/Record";
import SkeletonRecords from "../components/SkeletonRecords";
import Total from "../components/Total";
import SkeletonTotal from "../components/SkeletonTotal";
import RecordsError from "../components/RecordsError";
import TotalError from "../components/TotalError";

export async function loader() {
  const token = getToken();
  const config = { headers: { authorization: `Bearer ${token}` } };
  const recordsPromise = axios.get("/transactions", config);
  const sumPromise = axios.get("/transactions/total", config);
  const recordsAndSumPromise = Promise.all([recordsPromise, sumPromise]);
  return defer({ recordsAndSum: recordsAndSumPromise });
}

export default function Home() {
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const { session } = useContext(SessionContext);
  const { setRecords } = useContext(RecordsContext);

  useEffect(() => {
    if (!session) navigate("/?reason=denied");
    if (loaderData) setRecords(loaderData);
  }, [loaderData]);

  return (
    <PageContainer>
      <Header />
      <PageContent>
        <RecordsContainer>
          <Suspense fallback={<SkeletonRecords count={4} />}>
            <Await
              resolve={loaderData.recordsAndSum}
              errorElement={<RecordsError />}
            >
              {(recordsAndSum) => {
                const [records, sum] = recordsAndSum;
                return records.data
                  .toReversed()
                  .map((record, index) => (
                    <Record
                      key={index}
                      date={record.createdAt}
                      description={record.description}
                      amount={record.amount}
                    />
                  ));
              }}
            </Await>
          </Suspense>
        </RecordsContainer>
        <Suspense fallback={<SkeletonTotal />}>
          <Await
            resolve={loaderData.recordsAndSum}
            errorElement={<TotalError />}
          >
            {(recordsAndSum) => {
              const [records, sum] = recordsAndSum;
              const { total } = sum.data;
              return <Total amount={total} />;
            }}
          </Await>
        </Suspense>
      </PageContent>
      <Footer />
    </PageContainer>
  );
}

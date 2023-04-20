import { Suspense, useContext, useEffect } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import SessionContext from "../contexts/SessionContext";
import PageContainer from "../components/PageContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecordsContext from "../contexts/RecordsContext";
import PageContent from "../components/PageContent";
import RecordsContainer from "../components/RecordsContainer";
import Record from "../components/Record";
import SkeletonRecords from "../components/SkeletonRecords";
import getFakeRecords from "../utils/getFakeRecords";
import Total from "../components/Total";
import SkeletonTotal from "../components/SkeletonTotal";
import RecordsError from "../components/RecordsError";

export async function loader() {
  const options = {
    count: 20,
    delays: [1000, 700],
  };

  const recordsAndSumPromise = getFakeRecords(options);
  return defer({ recordsAndSum: recordsAndSumPromise });
}

export default function Home() {
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const { session } = useContext(SessionContext);
  const { setRecords } = useContext(RecordsContext);

  useEffect(() => {
    if (!session) navigate("/");
    if (loaderData) setRecords(loaderData);
  }, [session, loaderData]);

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
                return records.map((record, index) => (
                  <Record
                    key={index}
                    date={record.date}
                    description={record.description}
                    amount={record.amount}
                  />
                ));
              }}
            </Await>
          </Suspense>
        </RecordsContainer>
        <Suspense fallback={<SkeletonTotal />}>
          <Await resolve={loaderData.recordsAndSum} errorElement={<></>}>
            {(recordsAndSum) => {
              const [records, sum] = recordsAndSum;
              return <Total amount={sum} />;
            }}
          </Await>
        </Suspense>
      </PageContent>
      <Footer />
    </PageContainer>
  );
}

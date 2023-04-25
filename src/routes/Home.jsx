import axios from "axios";
import { Suspense, useContext, useEffect } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import SessionContext from "../contexts/SessionContext";
import PageContainer from "../components/PageContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getToken } from "../utils/sessionUtils";
import PageContent from "../components/PageContent";
import RecordsContainer from "../components/RecordsContainer";
import RecordsMessage from "../components/RecordsMessage";
import Record from "../components/Record";
import SkeletonRecords from "../components/SkeletonRecords";
import Total from "../components/Total";
import SkeletonTotal from "../components/SkeletonTotal";
import RecordsError from "../components/RecordsError";

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

  useEffect(() => {
    if (!session) navigate("/?reason=denied");
  }, []);

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

                return records.data.length !== 0 ? (
                  records.data
                    .toReversed()
                    .map((record) => (
                      <Record
                        key={record._id}
                        id={record._id}
                        date={record.createdAt}
                        description={record.description}
                        amount={record.amount}
                        type={record.type}
                      />
                    ))
                ) : (
                  <RecordsMessage message="Nada aqui! Cadastre seus ganhos e gastos abaixo." />
                );
              }}
            </Await>
          </Suspense>
        </RecordsContainer>
        <Suspense fallback={<SkeletonTotal />}>
          <Await resolve={loaderData.recordsAndSum} errorElement={null}>
            {(recordsAndSum) => {
              const [records, sum] = recordsAndSum;
              const { total } = sum.data;

              return records.data.length !== 0 && <Total amount={total} />;
            }}
          </Await>
        </Suspense>
      </PageContent>
      <Footer />
    </PageContainer>
  );
}

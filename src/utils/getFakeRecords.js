export default function getFakeRecords({ delays, count }) {
  // This function creates two promises:
  // one resolves to an array of records, the other resolves
  // to the sum of the amounts of those records, simullating
  // a sum performed by the database, instead of in the front end.
  // These promises are passed to Promise.allSettled and returned
  const [recordsDelay, sumDelay] = delays;
  const msInAMonth = 2.628e9;
  const records = [];

  for (let i = 0; i < count; i++) {
    records.push({
      date: Date.now() - Math.floor(msInAMonth * Math.random()),
      description: "This is a transaction description",
      amount: 3000 * (Math.random() - 0.5),
    });
  }

  const recordsPromise = new Promise((resolve) =>
    setTimeout(() => {
      const sortedRecords = records.sort((a, b) => b.date - a.date);
      resolve(sortedRecords);
    }, recordsDelay)
  );

  const sumPromise = new Promise((resolve) =>
    setTimeout(() => {
      const sum = records.reduce((acc, curr) => acc + curr.amount, 0);
      resolve(sum);
    }, sumDelay)
  );

  return Promise.all([recordsPromise, sumPromise]);
}

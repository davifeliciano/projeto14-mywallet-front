export default function getFakeSession(delay) {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ token: "faketoken", nome: "Nelson Faria" }),
      delay
    )
  );
}

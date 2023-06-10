import { Results } from "../lib/redux/slices/results.slice";

const BACKEND = import.meta.env.VITE_BACKEND ?? "http://localhost:1234";

function fetchThreadData(threadId: string, amount: string): Promise<Results> {
  return fetch(BACKEND + "/thread?t=" + threadId + "&amount=" + amount)
    .then((res) => res.json())
    .then((res) => res);
}

export { fetchThreadData };

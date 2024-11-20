import { useLoading } from "../components/providers/LoadingProvider";
import getRandomInt from "../util/getRandomInt";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function useMockLoading() {
  const { loading, setLoading } = useLoading();
  const mockLoading = async (milliseconds = getRandomInt(500, 3000)) => {
    setLoading(true);
    await sleep(milliseconds);
    setLoading(false);
  };

  return mockLoading;
}

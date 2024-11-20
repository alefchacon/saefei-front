import { useLoading } from "../components/providers/LoadingProvider";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function useMockLoading() {
  const { loading, setLoading } = useLoading();
  const mockLoading = async () => {
    setLoading(true);
    await sleep(2000);
    setLoading(false);
  };

  return mockLoading;
}

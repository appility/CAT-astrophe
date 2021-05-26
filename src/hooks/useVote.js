export const useFetch = ({ url, init }: RequestProps) => {
  // Response state
  const [data, setData] = useState<DogImageType>();

  useEffect(() => {
    // Define asynchronous function
    const fetchApi = async () => {
      // ...
    };

    // Call async function
    fetchApi();
  }, []);

  return data;
};

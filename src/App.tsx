import axios, { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";

interface Users {
  id: number;
  name: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

function App() {
  const [users, setUsers] = useState<Users[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Cancel Fetching Data";
  });

  // useEffect(() => {
  //   axios
  //     .get<Users[]>("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => setUsers(res.data))
  //     .catch((err) => setError(err.message));
  // }, []);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axios.get<Users[]>(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <div>
      {error && <h3 className="text-danger">{error}!</h3>}
      {isLoading && <div className="text-secondary spinner-border"></div>}
      <ul>
        {users.map((user) => (
          <div key={user.id}>
            <li>{user.name}</li>
            <p>
              {user.address.street} {user.address.suite}
              <br />
              {user.address.city} {user.address.zipcode}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;

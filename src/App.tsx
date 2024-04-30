import axios, { AxiosError } from "axios";
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

  useEffect(() => {
    document.title = "Fetching Data";
  });

  // useEffect(() => {
  //   axios
  //     .get<Users[]>("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => setUsers(res.data))
  //     .catch((err) => setError(err.message));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Users[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(res.data);
      } catch (err) {
        setError((err as AxiosError).message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {error && (
        <h3 className="text-danger">
          {error}! <br />
          Please check the URL
        </h3>
      )}
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

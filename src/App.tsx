import axios from "axios";
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
  console.log(users);

  useEffect(() => {
    document.title = "Fetching Data";
  });

  useEffect(() => {
    axios
      .get<Users[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
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

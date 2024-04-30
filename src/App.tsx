import { useEffect, useState } from "react";
import { CanceledError, AxiosError } from "./services/api-client";
import userService, { Users } from "./services/user-service";

function App() {
  const [users, setUsers] = useState<Users[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        setLoading(false);
      });
    return () => cancel();
  }, []);

  useEffect(() => {
    document.title = "Cancel Fetching Data";
  });

  const deleteUser = (user: Users) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService.deleteUser(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Bhoying" };
    setUsers([newUser, ...users]);

    userService
      .addUser(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: Users) => {
    const originalUsers = [...users];

    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.updateUser(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <div>
      {error && <h3 className="text-danger">{error}!</h3>}
      {isLoading && <div className="text-secondary spinner-border"></div>}
      <div onClick={addUser} className="mb-3 btn btn-primary">
        Add User
      </div>
      <ul className="list-group">
        {users.map((user) => (
          <div className="" key={user.id}>
            <div>
              <li className="list-group-item d-flex justify-content-between  align-items-center">
                <div>
                  <p>{user.name}</p>
                </div>
                <div>
                  <button
                    className="mx-2 btn btn-outline-secondary"
                    onClick={() => updateUser(user)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteUser(user)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;

// useEffect(() => {
//   setLoading(true);
//   const controller = new AbortController();
//   const fetchData = async () => {
//     try {
//       const res = await apiClient.get<Users[]>("/users/", {
//         signal: controller.signal
//       });
//       setUsers(res.data);
//       setLoading(false);
//     } catch (err) {
//       if (err instanceof CanceledError) return;
//       setError((err as AxiosError).message);
//       setLoading(false);
//     }
//   };

//   fetchData();
//   return () => controller.abort();
// }, []);

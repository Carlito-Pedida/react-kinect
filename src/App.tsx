import { useEffect, useState } from "react";
import "./App.css";
import ProductList from "./component/ProductList";

function App() {
  const [category, setCategory] = useState("");

  const connect = () => {
    console.log("Connecting");
  };
  const disConnect = () => {
    console.log("Disconnecting");
  };

  useEffect(() => {
    document.title = "UseEffect Lesson";
  });

  useEffect(() => {
    connect();

    return () => disConnect();
  });

  return (
    <div>
      <select
        className="form-select"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} />
    </div>
  );
}

export default App;

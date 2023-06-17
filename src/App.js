import { useEffect, useState } from "react";
import db from "./nedb/items";
import "./App.css";
import { CreateItem } from "./Components/CreateItem";
import { TODOItems } from "./Components/TODOItems";

function App() {
  const [items, setItems] = useState([]);

  const getAllItems = () => {
    db.find({}, (err, docs) => {
      if (!err) {
        setItems(docs);
      }
    });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            textAlign: "left",
            color: "white",
            marginTop: 30,
            marginLeft: 0,
            paddingLeft: 0,
            padding: 20,
          }}
        >
          Reminders ☀️
        </h1>
      </div>
      <CreateItem items={items} setItems={setItems} />
      <TODOItems items={items} setItems={setItems} />
    </div>
  );
}

export default App;

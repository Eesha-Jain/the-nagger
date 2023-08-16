import { useState } from "react";
import "../App.css";
import { socket } from "../socket";

export const CreateItem = ({ items, setItems }) => {
  const [item, setItem] = useState("");
  const [error, setError] = useState("");

  const saveItemToDB = async (e) => {
    try {
      e.preventDefault();

      let doc = {
        task: item,
        done: false,
      };

      await socket.emit("add", doc);
      setItem("");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="formContainer" style={{ width: "70vw" }}>
        <input
          type="text"
          placeholder="Enter Item"
          className="inputTODO"
          onChange={(e) => {
            setItem(e.target.value);
          }}
          value={item}
        />
        <button className="addItem" onClick={saveItemToDB}>
          Add Item
        </button>
      </div>
      <p>{error}</p>
    </div>
  );
};

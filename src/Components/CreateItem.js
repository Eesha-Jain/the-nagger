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
        item,
        dateAdded: String(
          new Date().getMonth() + 1 + "/" + new Date().getDate()
        ),
        done: false,
      };

      var itemsTwo = [...items, doc];
      setItems(itemsTwo);
      setItem("");

      await socket.emit("add", doc);
    } catch (err) {
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

import db from "../nedb/items";
import "../App.css";
import {
  AiFillDelete,
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiFillBell,
} from "react-icons/ai";
import { Notification } from "electron";

export const Item = ({ item, idx, items, setItems }) => {
  const deleteItem = (e) => {
    e.preventDefault();
    db.remove({ _id: item._id }, {}, (err, numRemoved) => {
      if (!err) {
        console.log("DELETED: ", item._id);
        setItems([...items.slice(0, idx), ...items.slice(idx + 1)]);
      }
    });
  };
  const changeCheck = (e) => {
    e.preventDefault();
    db.update(
      { _id: item._id },
      { $set: { done: !item.done } },
      {}, // this argument was missing
      function (err, numReplaced) {
        let itemMod = item;
        itemMod.done = !item.done;

        setItems([...items.slice(0, idx), itemMod, ...items.slice(idx + 1)]);
      }
    );
  };
  const pushNotification = (e) => {
    e.preventDefault();
    new Notification({
      title: "Mom asks... Complete:",
      body: item.item,
    }).show();
  };

  return (
    <div className="item">
      <div className="flex">
        <button
          className="check flex"
          style={{ color: item.done ? "var(--primary)" : "gray" }}
          onClick={changeCheck}
        >
          {item.done ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
        </button>
        <div
          className="title"
          style={{ textDecoration: item.done ? "line-through" : "none" }}
        >
          {item.item}
        </div>
      </div>
      <div className="flex">
        <div
          className="date"
          style={{ textDecoration: item.done ? "line-through" : "none" }}
        >
          {item.dateAdded}
        </div>
        <button className="push flex" onClick={pushNotification}>
          <AiFillBell />
        </button>
        <button className="delete flex" onClick={deleteItem}>
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

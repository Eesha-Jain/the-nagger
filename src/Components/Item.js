import "../App.css";
import { socket } from "../socket";
import {
  AiFillDelete,
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiFillBell,
} from "react-icons/ai";

export const Item = ({ item, idx, items, setItems }) => {
  const deleteItem = (e) => {
    e.preventDefault();
    socket.emit("delete", item);
  };

  const changeCheck = (e) => {
    e.preventDefault();
    socket.emit("changeCheck", item);
  };

  const pushNotification = (e) => {
    e.preventDefault();
    socket.emit("sendNotif", item);
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

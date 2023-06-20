import "../App.css";
import { socket } from "../socket";
import {
  AiFillDelete,
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiFillBell,
} from "react-icons/ai";
import addNotification from "react-push-notification";

export const Item = ({ item, idx, items, setItems }) => {
  const deleteItem = (e) => {
    e.preventDefault();
    socket.emit("delete", item);

    let index = 0;
    for (let i = 0; i < items.length; i++) {
      if (item._id === items[i]._id) {
        index = i;
        break;
      }
    }

    var itemsTwo = [...items.slice(0, index), ...items.slice(index + 1)];
    setItems(itemsTwo);
  };

  const changeCheck = (e) => {
    e.preventDefault();
    socket.emit("changeCheck", item);

    for (let i = 0; i < items.length; i++) {
      if (item._id === items[i]._id) {
        let itemDup = item;
        itemDup.done = !item.done;

        var itemsTwo = [...items.slice(0, i), itemDup, ...items.slice(i + 1)];
        setItems(itemsTwo);
        break;
      }
    }
  };

  const pushNotification = (e) => {
    e.preventDefault();
    addNotification({
      title: "Mom says to do...",
      message: item.item,
      theme: "red",
      closeButton: "X",
      native: true,
    });
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

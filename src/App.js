import { useEffect, useState } from "react";
import "./App.css";
import { CreateItem } from "./Components/CreateItem";
import { TODOItems } from "./Components/TODOItems";
import { socket } from "./socket";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    socket.emit("get");
  }, []);

  socket.on("get", function (newItems) {
    setItems(newItems);
  });

  socket.on("add", function (newItems) {
    setItems(newItems);
  });

  socket.on("delete", function (newItems) {
    setItems(newItems);
  });

  socket.on("changeCheck", function (newItems) {
    setItems(newItems);
  });

  socket.on("sendNotif", function (item) {
    Notification.requestPermission().then((result) => {
      new Notification("The Nagger says to...", {
        body: item.task
      })
    })
  });

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

const path = require("path");
const isDev = require("electron-is-dev");

const { app, BrowserWindow } = require("electron");
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    icon: __dirname + "/icon.png",
    title: "MomTasker",
    label: "MomTasker",
  });
  mainWindow.maximize();
  mainWindow.removeMenu();
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.setAppUserModelId("MomTasker");
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

let items = [];

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("add", (value) => {
    console.log("Add socket connection");

    var itemsTwo = [...items, value];
    items = itemsTwo;

    io.emit("add", itemsTwo);
  });

  socket.on("delete", (value) => {
    console.log("Delete socket connection");

    let index = 0;
    for (let i = 0; i < items.length; i++) {
      if (items._id === value._id) {
        index = i;
        break;
      }
    }

    var itemsTwo = [...items.slice(0, index), ...items.slice(index + 1)];
    items = itemsTwo;

    io.emit("delete", itemsTwo);
  });

  socket.on("changeCheck", (value) => {
    console.log("Change check socket connection");

    let index = 0;
    for (let i = 0; i < items.length; i++) {
      if (items._id === value._id) {
        index = i;
        break;
      }
    }
    value.done = !value.done;

    var itemsTwo = [...items.slice(0, index), value, ...items.slice(index + 1)];
    items = itemsTwo;

    io.emit("changeCheck", itemsTwo);
  });
});
server.listen(3000);

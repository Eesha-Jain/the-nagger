const path = require("path");
const isDev = require("electron-is-dev");

const { app, BrowserWindow } = require("electron");
const io = require("socket.io-client");

const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://mom-tasker-server.vercel.app/"
    : "http://localhost:4000";

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

  // Create a socket.io connection
  const socket = io(URL);

  // Perform actions on socket events
  socket.on("connect", () => {
    console.log("Connected to Socket.io server");
  });

  mainWindow.on("closed", () => {
    socket.close();
    mainWindow = null;
  });
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

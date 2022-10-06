"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const url_1 = require("url");
const electron_1 = require("electron");
let mainWindow ;

const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const electron_next_1 = __importDefault(require("electron-next"));
electron_1.app.on("ready", async () => {
    await (0, electron_next_1.default)(".");
    const mainWindow = new electron_1.BrowserWindow({
        width: 1600,
        height: 1200,
        minHeight: 1200,
        minWidth: 1600,
        maxHeight: 1200,
        maxWidth: 1600,
        frame: false,
        backgroundColor: '#000034',
        webPreferences: {
            nodeIntegration: false,
            preload: (0, path_1.join)(__dirname, "preload.js"),
        },
    });
    mainWindow.webContents.on("new-window", (event, url) => {
        event.preventDefault();
        electron_1.shell.openExternal(url);
    });
    const url = electron_is_dev_1.default
        ? "http://localhost:8000/"
        : (0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, "../out/index.html"),
            protocol: "file:",
            slashes: true,
        });
    mainWindow.loadURL(url);
});
electron_1.app.on("window-all-closed", electron_1.app.quit);


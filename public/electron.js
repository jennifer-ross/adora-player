const electron = require("electron");
const {ipcMain} = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const express = require('express');
const bodyParser = require('body-parser');
let cors = require('cors');
request = require('request');

let mainWindow;
let authWindow;
let serverApp;
let getCodeID;
let server;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1900,
        height: 1600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        },
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", () => {
    startServer();
    createWindow();
});
app.on("window-all-closed", () => {
    clearInterval(getCodeID);
    server.close();
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

function startServer() {
    serverApp = express();
    serverApp.use(cors());
    serverApp.use(bodyParser.urlencoded({ extended: false }));
    serverApp.use(bodyParser.json());

    serverApp.post('/auth', function(req, res) {
        console.log(req.body.url);
        if (req.body.url) {
            if (!authWindow) {
                authWindow = new BrowserWindow({
                    parent: mainWindow,
                    modal: true,
                    show: false,
                    width: 900,
                    height: 680,
                    webPreferences: {
                        nodeIntegration: true,
                        webSecurity: false
                    },
                });
                authWindow.loadURL(req.body.url);
                authWindow.once('ready-to-show', () => {
                    authWindow.show();
                });

                authWindow.webContents.on('did-navigate', (event, url) => {
                    const pattern = 'https://oauth.yandex.ru/verification_code#';

                    if (url.startsWith(pattern)) {
                        const stringParams = url.replace(pattern, '');
                        const params = JSON.parse('{"' + decodeURI(stringParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
                        res.json({success: true, payload: params});
                        authWindow.close();
                    }
                });

                authWindow.once('closed', () => {authWindow = null;});
            }
        }
    });

    server = serverApp.listen(3001);
}
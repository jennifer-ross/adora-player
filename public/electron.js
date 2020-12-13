const electron = require("electron");
const {ipcMain, Tray, session, Menu} = require("electron");
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
let isInit = false;
let appIcon;

function createWindow() {
    if (!isDev) {
        appIcon = path.join(__dirname, "../build/favicon.ico");
    }else {
        appIcon = path.join(__dirname, "../public/favicon.ico");
    }

    // const tray = new Tray(appIcon);

    Menu.setApplicationMenu(null);

    mainWindow = new BrowserWindow({
        width: 1240,
        height: 960,
        center: true,
        transparent: false,
        frame: false,
        hasShadow: true,
        icon: appIcon,
        minWidth: 960,
        minHeight: 740,
        show: false,
        backgroundColor: '#000000',
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            enableRemoteModule: true
        },
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.webContents.once('did-finish-load', () => {
        if (!mainWindow.visible && isInit === false) {
            mainWindow.show();
            isInit = true;
        }
    });
    mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['Origin'] = 'https://music.yandex.ru';
        details.requestHeaders['Referer'] = 'https://music.yandex.ru/home';
        details.requestHeaders['X-Requested-With'] = 'XMLHttpRequest';
        details.requestHeaders['X-Retpath-Y'] = 'https://music.yandex.ru/home';
        callback({cancel: false, requestHeaders: details.requestHeaders});
    });
    mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", () => {
    startServer();
    createWindow();
});
app.on("window-all-closed", () => {
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
        if (req.body.url) {
            if (!authWindow) {
                authWindow = new BrowserWindow({
                    parent: mainWindow,
                    modal: true,
                    show: false,
                    width: 900,
                    height: 680,
                    center: true,
                    transparent: false,
                    frame: true,
                    hasShadow: true,
                    icon: appIcon,
                    webPreferences: {
                        nodeIntegration: false,
                        webSecurity: true,
                        enableRemoteModule: false
                    },
                });
                authWindow.loadURL(req.body.url);
                authWindow.once('ready-to-show', () => {
                    authWindow.show();
                });

                authWindow.webContents.on('did-navigate', (event, url) => {
                    const pattern = 'https://passport.yandex.ru/profile';
                    const authPattern = 'https://passport.yandex.ru/auth';

                    if (url.startsWith(pattern)) {
                        authWindow.webContents.session.cookies.get({}).then(cookies => {
                            const params = {};
                            cookies.map((cookie, key) => {
                                if (cookie.name === 'yandex_login' || cookie.name === 'Session_id' || cookie.name === 'sessionid2' || cookie.name === 'sessguard') {
                                    params[cookie.name] = {value: cookie.value, domain: '.yandex.ru', expirationDate: cookie.expirationDate};
                                }
                            });
                            res.json({success: true, payload: params});
                        }).catch(err => {
                            res.status(400).json({success: false, payload: {}});
                        });
                        authWindow.close();
                    }
                });

                authWindow.once('closed', () => {authWindow = null;});
            }
        }
    });

    server = serverApp.listen(3001);
}
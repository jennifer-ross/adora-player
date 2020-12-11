const electron = require("electron");
const {ipcMain, Tray, session} = require("electron");
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

function createWindow() {
    let appIcon;
    if (!isDev) {
        appIcon = path.join(__dirname, "../build/favicon.ico");
    }else {
        appIcon = path.join(__dirname, "../public/favicon.ico");
    }

    // const tray = new Tray(appIcon);

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
                    frame: false,
                    hasShadow: true,
                    webPreferences: {
                        nodeIntegration: true,
                        webSecurity: false,
                        enableRemoteModule: true
                    },
                });
                authWindow.loadURL(req.body.url);
                authWindow.once('ready-to-show', () => {
                    authWindow.show();
                    authWindow.webContents.on('did-finish-load', () => {
                        authWindow.webContents.executeJavaScript(
                            `document.body.insertAdjacentHTML("afterBegin",'<style>body{overflow-x:hidden;overflow-y:hidden;}.button{border:none;outline:0;text-transform:uppercase;text-decoration:none;-webkit-transition:.3s ease;transition:.3s ease;color:#9c9c9c;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:3px}.button:hover{color:#892cdc;cursor:pointer}.button__icon{margin-right:10px;font-size:16px}.window-control{-webkit-app-region:drag;position:relative;width:100%;padding:8px 5px 8px 20px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;background:#000;color:#dcdcdc;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.window-control__title{font-size:14px;line-height:14px}.window-control__drag{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;z-index:4}.window-control__actions{-webkit-app-region: no-drag;margin-right:25px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.window-control__actions .button{font-size:12px;line-height:12px;width:14px;height:14px;margin:0;padding:6px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;z-index:1}.window-control__actions .button svg{width:14px;height:14px}.window-control__actions .button svg path{fill:#dcdcdc}.window-control__actions .button:hover{background:#892cdc;color:#fafafa}.window-control__actions .button:hover svg path{fill:#fafafa}.window-control__actions .btn-close{font-size:16px;line-height:16px}.window-control__actions .btn-close:hover{background:#e32929;color:#fafafa}</style><div class="window-control"><div class="window-control__drag"><div class="window-control__title">Adora player</div></div><div class="window-control__actions"><div class="button btn-minimize"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 480H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h448c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg></div><div class="button btn-screen-resize"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 0H144c-26.5 0-48 21.5-48 48v48H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-96 464H48V256h320v208zm96-96h-48V144c0-26.5-21.5-48-48-48H144V48h320v320z"/></svg></div><div class="button btn-close"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"/></svg></div></div></div>');
                                    let close = document.querySelector('.window-control__actions .btn-close');
                                    let resize = document.querySelector('.window-control__actions .btn-screen-resize');
                                    let minimize = document.querySelector('.window-control__actions .btn-minimize');
                                    
                                    if(close && resize && minimize) {
                                        let remote = window.require("electron").remote;
                                        let win = remote.getCurrentWindow();
                                        close.addEventListener("click", e => {if (win.closable) {window.close();}});
                                        resize.addEventListener("click", e => {if (!win.isMaximized()){win.maximize();}else{win.unmaximize();}});
                                        minimize.addEventListener("click", e => {if (win.minimizable) {win.minimize();}});
                                    }
                                    `
                        ).then(result => {}).catch(err => {});
                    });
                });

                authWindow.webContents.on('did-navigate', (event, url) => {
                    const pattern = 'https://passport.yandex.ru/profile';
                    const authPattern = 'https://passport.yandex.ru/auth';

                    if (url.startsWith(pattern)) {
                        authWindow.webContents.session.cookies.get({}).then(cookies => {
                            const params = {};
                            cookies.map((cookie, key) => {
                                if (cookie.name === 'yandex_login' || cookie.name === 'Session_id' || cookie.name === 'sessionid2' || cookie.name === 'sessguard') {
                                    params[cookie.name] = {value: cookie.value, domain: '.yandex.ru', expirationDate: cookie.expirationDate}
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
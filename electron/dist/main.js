"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import necesarios
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
// Inicializamos la ventana de Electron
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        title: "Kube-Auth",
        icon: __dirname + "/../../dist/kube-auth/assets/logo.icns"
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/kube-auth/index.html"),
        protocol: 'file:',
        slashes: true
    }));
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
// Para ver el estado de la app
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
// SSL/TSL: this is the self signed certificate support
electron_1.app.on('certificate-error', function (event, webContents, url, error, certificate, callback) {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault();
    callback(true);
});
//# sourceMappingURL=main.js.map
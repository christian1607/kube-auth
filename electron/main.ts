// Import necesarios
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

// Inicializamos la ventana de Electron
let win: BrowserWindow;
function createWindow() {
    win = new BrowserWindow({
         width: 800, 
         height: 600, 
         title: "Kube-Auth",
         icon: path.join(__dirname, `/../../dist/kube-auth/assets/logo.icns`)
        });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/../../dist/kube-auth/index.html`),
            protocol: 'file:',
            slashes: true
        })
    );
            
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}
// Para ver el estado de la app
app.on('ready', createWindow)

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

// SSL/TSL: this is the self signed certificate support
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault();
    callback(true);
});
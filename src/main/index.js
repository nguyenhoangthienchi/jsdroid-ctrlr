const {
    app,
    BrowserWindow,
} = require('electron');
const path = require('path');
const ipcSetup = require('./ipcSetup');

const createWindow = () => {
    const window = new BrowserWindow({
        frame: false,
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 300,
        titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: true,
            devTools: !app.isPackaged,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: './icon.ico'
    });
    ipcSetup(window);
    window.loadFile('src/static/index.html');
    window.center();
}

app.whenReady().then(() => {
    createWindow();
});

app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
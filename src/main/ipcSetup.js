const {
    remote,
    ipcMain,
} = require('electron');

const ipcSetup = (window) => {
    ipcMain.handle('close-app', () => {
        window.close();
    });

    ipcMain.handle('maximize-app', () => {
        return new Promise(resolve => {
            window[window.isMaximized() ? 'restore' : 'maximize']();
            resolve(window.isMaximized());
        });
    });

    ipcMain.handle('minimize-app', () => {
        window.minimize();
    });
}

module.exports = ipcSetup;
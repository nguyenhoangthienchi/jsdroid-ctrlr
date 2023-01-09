const { contextBridge, ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    // setup for title bar button
    document.querySelectorAll('#title-bar > .action-button > button')
        .forEach(button => {
            button.addEventListener('click', async () => {
                const id = button.id;
                const result = await ipcRenderer.invoke(button.id);
                if (id == 'maximize-app') {
                    const baseImage = 'theme/default-dark/title-bar/';
                    button.children[0].src = baseImage + (result ? 'restore.png' : 'maximize.png');
                }
            });
        });
});

contextBridge.exposeInMainWorld('env', {
    ...process.env
});
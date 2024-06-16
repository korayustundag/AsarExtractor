const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const asar = require('asar');

function createWindow() {
    const win = new BrowserWindow({
        width: 1050,
        height: 310,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        },
        maximizable: false,
        resizable: false
    });

    win.setMenu(null);
    win.loadFile('App/index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('select-asar-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Asar Files', extensions: ['asar'] }]
    });
    if (canceled) {
        return null;
    } else {
        return filePaths[0];
    }
});

ipcMain.handle('select-extract-folder', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    if (canceled) {
        return null;
    } else {
        return filePaths[0];
    }
});

ipcMain.handle('extract-asar', async (event, asarPath, extractPath) => {
    try {
        await asar.extractAll(asarPath, extractPath);
        return 'success';
    } catch (err) {
        return `error: ${err.message}`;
    }
});
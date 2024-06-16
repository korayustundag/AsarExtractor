const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    selectAsarFile: () => ipcRenderer.invoke('select-asar-file'),
    selectExtractFolder: () => ipcRenderer.invoke('select-extract-folder'),
    extractAsar: (asarPath, extractPath) => ipcRenderer.invoke('extract-asar', asarPath, extractPath)
});
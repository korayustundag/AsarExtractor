document.getElementById('selectAsarFileButton').addEventListener('click', async () => {
    const asarFilePath = await window.electron.selectAsarFile();
    if (asarFilePath) {
        document.getElementById('inputAsarFilePath').value = asarFilePath;
    }
});

document.getElementById('selectExtractFolderButton').addEventListener('click', async () => {
    const extractFolderPath = await window.electron.selectExtractFolder();
    if (extractFolderPath) {
        document.getElementById('extractFolderPath').value = extractFolderPath;
    }
});

document.getElementById('extractButton').addEventListener('click', async () => {
    const asarFilePath = document.getElementById('inputAsarFilePath').value;
    const extractFolderPath = document.getElementById('extractFolderPath').value;

    if (asarFilePath && extractFolderPath) {
        const result = await window.electron.extractAsar(asarFilePath, extractFolderPath);
        if (result === 'success') {
            new Notification({ title: 'Asar Extractor', body: 'Extraction successful!' }).show()
            alert('Extraction successful!');
        } else {
            new Notification({ title: 'Asar Extractor', body: `Extraction failed: ${result}` }).show()
            alert(`Extraction failed: ${result}`);
        }
    } else {
        alert('Please select both an asar file and an extract folder.');
    }
});

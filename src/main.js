const { app, BrowserWindow } = require("electron");

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title:"Digital garbage cleaner",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },
        vibrancy: "window",
    })
    win.maximize();
    win.loadFile('index.html')
    win.webContents.openDevTools();
    win.on("closed", () => {
        win = null;
    });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

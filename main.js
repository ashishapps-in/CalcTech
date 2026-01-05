const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 450, // Slightly wider than CSS width to accommodate borders
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // Simplified for this local-only app
        },
        title: "CalcTech",
        resizable: true,
        icon: path.join(__dirname, 'icon.png'), // Placeholder if icon doesn't exist
        autoHideMenuBar: true
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

const { app, BrowserWindow } = require('electron')
const url = require('url');
const path = require('path');
  let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/system/browser/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
   // mainWindow.loadURL('http://localhost:4200');

  mainWindow.webContents.openDevTools()
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Carga fallida:', errorCode, errorDescription);
  });
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
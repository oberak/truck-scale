import { app, BrowserWindow } from 'electron' // eslint-disable-line
import io from 'socket.io-client'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const socket = io('http://127.0.0.1:3000')
socket.on('connect', () => {
  console.log('connected to server')
  // send data to ts-server and recevie data
  socket.emit('data', 'sample data from app', (data) => {
    console.log('received:', data)
  })
})
setInterval(() => { // test code
  // receive from app or serial moduele(using ipc, store)
  // send data to ts-server
  socket.emit('weight', { weihgt: Math.round(Math.random() * 1000), uint: 'Kg', mcno: 1 })
}, 5000)

// receive from ts-server
socket.on('data', (data) => {
  console.log('receive data', data)
  // need to call app module(use ipc, store)
})
socket.on('disconnect', () => console.log('disconnected'))

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

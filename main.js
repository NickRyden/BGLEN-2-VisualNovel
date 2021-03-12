const { app, BrowserWindow } = require('electron')

'use strict';

var maindir   = 'resources/';

const fs = require('fs');
const EventEmitter = require('events')

const loadingEvents = new EventEmitter()
const createMainWindow = () => new BrowserWindow()

let rawdata = fs.readFileSync(maindir + 'config.json');
let data = JSON.parse(rawdata);

function createWindow () {
	const win = new BrowserWindow({
		// Set this to JSON height and width
		width: data.scene_width,
		height: data.scene_height,
		icon: __dirname + maindir + data.icon,
		title: data.title,
		backgroundColor: '#000',
		//resizeable: false,
		//maximizable: false,
		minWidth: data.scene_width,
		minHeight: data.scene_height,
		//frame: false,
		webPreferences: {
			nodeIntegration: true,
			devTools: true
		}
	})
	
	win.removeMenu()
	win.loadFile('index.html')
	win.webContents.openDevTools()
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





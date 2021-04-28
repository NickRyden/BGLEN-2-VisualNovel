const { app, BrowserWindow } = require('electron')

'use strict';

var maindir   = 'resources/';

const fs = require('fs');
const EventEmitter = require('events')

require('./engine.js');

const loadingEvents = new EventEmitter()
const createMainWindow = () => new BrowserWindow()

const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./char.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the character database.');
});

//db.run('CREATE TABLE user_save (id INTEGER PRIMARY KEY,	HairArc1 VARCHAR(5),HairArc2 VARCHAR(5),HairArc3 VARCHAR(5),HairArc4 VARCHAR(5),HairArc5 VARCHAR(5),Arc1Complete VARCHAR(5),Arc2Complete VARCHAR(5),Arc3Complete VARCHAR(5),Arc4Complete VARCHAR(5),Arc5Complete VARCHAR(5),CurrArc VARCHAR(10),CurrLine VARCHAR(10))');

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

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




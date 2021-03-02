// Native
const { join } = require('path')
const { format } = require('url')

// Packages
const { BrowserWindow, app, session } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const pie = require('puppeteer-in-electron')
const puppeteer = require('puppeteer-core');
const startProcess = require('./startProcess')

async function main() {

  await pie.initialize(app);
  await prepareNext('./renderer')
  const browser = await pie.connect(app, puppeteer);

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, 'preload.js'),
    },

  })
  const secondWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    show: true,
  })

  const url = isDev
    ? 'http://localhost:8000'
    : format({
      pathname: join(__dirname, '../renderer/out/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  const instagramPage = "https://www.instagram.com/giovanifranz/";
  await mainWindow.loadURL(url);
  await secondWindow.loadURL(instagramPage)

  await startProcess(browser, secondWindow, instagramPage);


  mainWindow.setAlwaysOnTop(true)

} main();

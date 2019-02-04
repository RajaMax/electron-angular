const {app, BrowserWindow,Menu} = require('electron')   
  const path = require('path')   
  const url = require('url')  
  const template = [
    {
       label: 'App',
       submenu: [
          {
             label: 'new'
          },
          {
            role: 'toggledevtools'
          },
       ]
    }];
  function createWindow () {     
    // Create the browser window.     
    win = new BrowserWindow()
    win.maximize()
       
    // and load the index.html of the app.     
    win.loadURL(url.format({      
      pathname: path.join(__dirname, 'dist','index.html'),
      protocol: 'file:',      
      slashes: true     
    }))   
  } 
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  app.on('ready', createWindow)
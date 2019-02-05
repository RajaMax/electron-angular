const {app, BrowserWindow,Menu,ipcRenderer} = require('electron')   
  const path = require('path')   
  const url = require('url')  
  // const template = [
  //   {
  //      label: 'file',
  //      submenu: [
  //         {
  //            label: 'new',
  //            click(){
  //             ipcRenderer.send('open-file')
  //            } 
  //         },
  //         {
  //           role: 'toggledevtools'
  //         },
  //      ]
  //   }];
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
  // fileMenu.submenu
  // .find(item => item.label === 'Quit')
  // .click = () => win.webContents.send('open-file')
  } 
  
 // const menu = Menu.buildFromTemplate(template)
 

  //Menu.setApplicationMenu(menu)
  console.log(Menu)
  app.on('ready', createWindow)
const { app, BrowserWindow, Menu } = require('electron')

let win

function createWindow () {

  app.setName('Map Project');

  win = new BrowserWindow({ width: 1280, height: 760 });

  win.loadURL('http://localhost:3000');

  var template = [
    {
      label: "Villes",
      submenu: [
        {
          label: "Tout les villes",
          click() {
            win.loadURL('http://localhost:3000/villes')
          }
        },
        {
          label: "Ajouter une ville",
          click() {
            win.loadURL('http://localhost:3000/villes/add')
          }
        }
      ]
    },
    {
      label: "Communes",
      submenu: [
        {
          label: "Tout les communes",
          click() {
            win.loadURL('http://localhost:3000/communes')
          }
        },
        {
          label: "Ajouter une commune",
          click() {
            win.loadURL('http://localhost:3000/communes/add')
          }
        }
      ]
    },
    {
      label: "Objets",
      submenu: [
        {
          label: "Tout les objets",
          click() {
            win.loadURL('http://localhost:3000/objets')
          }
        },
        {
          label: "Ajouter un objet",
          click() {
            win.loadURL('http://localhost:3000/objets/add')
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: "Map Project",
      submenu: [
        {
          label: "Accueille",
          click() {
            win.loadURL('http://localhost:3000')
          }
        },
        {
          label: "Statistics",
          click() {
            win.loadURL('http://localhost:3000/statistics')
          }
        },
        {
          label: "A propos de nous",
          click() {
            win.loadURL('http://localhost:3000/about')
          }
        },
        { role: 'quit' }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow);
const { app, BrowserWindow, Menu } = require('electron');

// window main
var mainWindow = null;
async function createWindow() {
    mainWindow = new BrowserWindow({
        width:500,
        height:500
    });

    await mainWindow.loadFile('src/pages/editor/index.html');
}

// file
var file = {};
// create file
function createNewFile() {
    file = {
        name:"novo-arquivo.txt",
        content:"",
        saved:false,
        path: app.getPath('documents')+"/novo-arquivo.txt"
    }
}

// template menu
const templateMenu = [
    {
        label:"Arquivo",
        submenu: [
            {
                label:"Novo",
                click() {
                    createNewFile()
                }
            },{
                label:"Abrir"
            },{
                label:"Salvar como"
            },{
                label:"Fechar",
                role: process.platform === "darwin" ? "close" : "quit"
            }
        ]
    }
];

// menu
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

// on ready
app.whenReady().then(createWindow);

// activate
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
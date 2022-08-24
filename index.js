const { app, BrowserWindow, Menu } = require("electron");

var mainWindow = null;

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration:true
        }
    });

    await mainWindow.loadFile("src/pages/editor/index.html")

    mainWindow.webContents.openDevTools()
}

var file = {}
// criar novo arquivo
function createNewFile() {
    file = {
        name: "novo-arquivo.txt",
        content: "",
        saved: false,
        path: app.getPath("documents")+"/novo-arquivo.txt"
    }

    mainWindow.webContents.send("set-file", file)
}

// template menu
const templateMenu = [
    {
        label: "Arquivo",
        submenu: [
            {
                label: "Novo",
                click() {
                    createNewFile();
                }
            }, {
                label: "Abrir"
            }, {
                label: "Salvar"
            }, {
                label: "Salvar como"
            }, {
                label: "Fechar",
                role: process.platform == "darwin" ? "close" : "quit"
            }
        ]
    }
];

// menu
const menu = Menu.buildFromTemplate(templateMenu)
Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow);

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
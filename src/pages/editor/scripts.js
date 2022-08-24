const { ipcRender } = require("electron")

const textarea = document.getElementById("text")
const title = document.getElementById("title")

// set file
ipcRender.on("set-file", function(event, data) {
    textarea.value = data.content
    title.innerHTML = data.name + " | Robson"
})
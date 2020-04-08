// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const zgClient = require('zego-express-engine-electron/ZegoExpressEngine');
const zgDefines = require('zego-express-engine-electron/ZegoExpressDefines');
console.log("ZegoExpressEngine version:", zgClient.getVersion())

const initButton = document.getElementById("initButton");
const uninitButton = document.getElementById("uninitButton");

const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const sendBroadcastMessageButton = document.getElementById("sendBroadcastMessageButton");
const sendBarrageMessageButton = document.getElementById("sendBarrageMessageButton");

const startPreviewButton = document.getElementById("startPreviewButton");
const stopPreviewButton = document.getElementById("stopPreviewButton");

const zoomInPreviewButton = document.getElementById("zoomInPreviewButton");
const zoomOutPreviewButton = document.getElementById("zoomOutPreviewButton");

const startPublishButton = document.getElementById("startPublishButton");
const stopPublishButton = document.getElementById("stopPublishButton");

const addPublishCdnButton = document.getElementById("addPublishCdnButton");
const removePublishCdnButton = document.getElementById("removePublishCdnButton");

const startPlayButton = document.getElementById("startPlayButton");
const stopPlayButton = document.getElementById("stopPlayButton");

let TheRoomID = "";
let TheUserID = "";
let TheUserName = "";
let ThePublishStreamID = ""
let ThePlayStreamID = ""

initButton.onclick = () => {
    zegoauth = require("./zegoauth")
    zgClient.init(
        appID = zegoauth.appID,
        appSign = zegoauth.appSign,
        isTestEnv = true,
        scenario = 0
    ).then(() => {
        zgClient.setDebugVerbose(true, zgDefines.ZegoLanguage.Chinese);
    }).catch((e) => {
        console.log(e)
    });
}

uninitButton.onclick = () => {
    zgClient.uninit();
}

loginButton.onclick = () => {
    TheRoomID = document.getElementById("roomIDInput").value
    TheUserID = document.getElementById("userIDInput").value
    TheUserName = document.getElementById("userNameInput").value
    zgClient.loginRoom(TheRoomID, { userID: TheUserID, userName: TheUserName });
}

logoutButton.onclick = () => {
    zgClient.logoutRoom(TheRoomID);
}

sendBroadcastMessageButton.onclick = () => {
    zgClient.sendBroadcastMessage(TheRoomID, "This is a broadcast messasge").then((a) => {
        console.log("sendBroadcastMessage resolved", a);
    }).catch((e) => {
        console.log("sendBroadcastMessage Rejected", e)
    })
}

sendBarrageMessageButton.onclick = () => {
    zgClient.sendBarrageMessage(TheRoomID, "This is a barrage messasge").then((a) => {
        console.log("sendBarrageMessage resolved", a);
    }).catch((e) => {
        console.log("sendBarrageMessage Rejected", e)
    })
}

startPreviewButton.onclick = () => {
    let localCanvas = document.getElementById("localCanvas");
    let view = {
        canvas: localCanvas,
    }
    zgClient.startPreview(view);
}

stopPreviewButton.onclick = () => {
    zgClient.stopPreview();
}

zoomInPreviewButton.onclick = () => {
    let localCanvas = document.getElementById("localCanvas");
    localCanvas.width = localCanvas.width * 1.1
    localCanvas.height = localCanvas.height * 1.1
}

zoomOutPreviewButton.onclick = () => {
    let localCanvas = document.getElementById("localCanvas");
    localCanvas.width = localCanvas.width * 0.9
    localCanvas.height = localCanvas.height * 0.9
}

startPublishButton.onclick = () => {
    ThePublishStreamID = document.getElementById("publishStreamIDInput").value
    zgClient.startPublishingStream(ThePublishStreamID);
}

stopPublishButton.onclick = () => {
    zgClient.stopPublishingStream();
}

addPublishCdnUrlButton.onclick = () => {
    zgClient.addPublishCdnUrl("123", "123").then((a) => {
        console.log("addPublishCdnUrl resolved", a);
    }).catch((e) => {
        console.log("addPublishCdnUrl Rejected", e)
    })
}

removePublishCdnUrlButton.onclick = () => {
    zgClient.removePublishCdnUrl("123", "123").then((a) => {
        console.log("removePublishCdnUrl resolved", a);
    }).catch((e) => {
        console.log("removePublishCdnUrl Rejected", e)
    })
}

startPlayButton.onclick = () => {
    let remoteCanvas = document.getElementById("remoteCanvas");
    let view = {
        canvas: remoteCanvas
    }
    ThePlayStreamID = document.getElementById("playStreamIDInput").value
    zgClient.startPlayingStream(ThePlayStreamID, view);
}

stopPlayButton.onclick = () => {
    zgClient.stopPlayingStream(ThePlayStreamID);
}


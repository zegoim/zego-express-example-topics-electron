// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const {crashReporter} = require('electron')
crashReporter.start({
  productName:"zego-express-example-topics-electron",
  companyName:"zego.im",
  uploadToServer: false,
  submitURL:"http://zego.im"
});

const zgEngine = window.require('zego-express-engine-electron/ZegoExpressEngine');
const zgDefines = window.require('zego-express-engine-electron/ZegoExpressDefines');
console.log("ZegoExpressEngine version:", zgEngine.getVersion())

const initButton = document.getElementById("initButton");
const uninitButton = document.getElementById("uninitButton");

const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");

const startPreviewButton = document.getElementById("startPreviewButton");
const stopPreviewButton = document.getElementById("stopPreviewButton");

const startPublishButton = document.getElementById("startPublishButton");
const stopPublishButton = document.getElementById("stopPublishButton");

const startPlayButton = document.getElementById("startPlayButton");
const stopPlayButton = document.getElementById("stopPlayButton");

let TheRoomID = "";
let TheUserID = "";
let TheUserName = "";
let ThePublishStreamID = ""
let ThePlayStreamID = ""

initButton.onclick = () => {
    zegoauth = require("./zegoauth")
    zgEngine.init(
        appID = zegoauth.appID,
        appSign = zegoauth.appSign,
        isTestEnv = true,
        scenario = 0
    ).then(() => {
        zgEngine.setDebugVerbose(true, zgDefines.ZegoLanguage.Chinese);
    }).catch((e) => {
        console.log(e)
    });
}

uninitButton.onclick = () => {
    zgEngine.uninit();
}

loginButton.onclick = () => {
    TheRoomID = document.getElementById("roomIDInput").value
    TheUserID = document.getElementById("userIDInput").value
    TheUserName = document.getElementById("userNameInput").value
    zgEngine.loginRoom(TheRoomID, { userID: TheUserID, userName: TheUserName });
}

logoutButton.onclick = () => {
    zgEngine.logoutRoom(TheRoomID);
}

startPreviewButton.onclick = () => {
    let localCanvas = document.getElementById("localCanvas");
    zgEngine.startPreview({
        canvas: localCanvas
    });
}

stopPreviewButton.onclick = () => {
    zgEngine.stopPreview();
}

startPublishButton.onclick = () => {
    ThePublishStreamID = document.getElementById("publishStreamIDInput").value
    zgEngine.startPublishingStream(ThePublishStreamID);
}

stopPublishButton.onclick = () => {
    zgEngine.stopPublishingStream();
}

startPlayButton.onclick = () => {
    let remoteCanvas = document.getElementById("remoteCanvas");
    ThePlayStreamID = document.getElementById("playStreamIDInput").value
    zgEngine.startPlayingStream(ThePlayStreamID, {
        canvas: remoteCanvas
    });
}

stopPlayButton.onclick = () => {
    zgEngine.stopPlayingStream(ThePlayStreamID);
}


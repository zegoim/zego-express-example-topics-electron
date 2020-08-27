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
const setVideoMirrorModeButton = document.getElementById("setVideoMirrorModeButton");

const startPublishButton = document.getElementById("startPublishButton");
const stopPublishButton = document.getElementById("stopPublishButton");

const startPlayButton = document.getElementById("startPlayButton");
const stopPlayButton = document.getElementById("stopPlayButton");

const createMediaPlayerButton = document.getElementById("createMediaPlayerButton");
const destroyMediaPlayerButton = document.getElementById("destroyMediaPlayerButton");
const loadResourceButton = document.getElementById("loadResourceButton");
const startButton = document.getElementById("startButton");
const stopButton  = document.getElementById("stopButton");
const pauseButton = document.getElementById("pauseButton");
const resumeButton = document.getElementById("resumeButton");

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

var PreviewViewMode = 0;
startPreviewButton.onclick = () => {
    let localCanvas = document.getElementById("localCanvas");
    zgEngine.startPreview({
        canvas: localCanvas,
        viewMode: PreviewViewMode
    });
    PreviewViewMode = (PreviewViewMode+1)%3;
}

stopPreviewButton.onclick = () => {
    zgEngine.stopPreview();
}

var VideoMirrorMode = 0;
setVideoMirrorModeButton.onclick = ()=>{
    console.log(VideoMirrorMode)
    zgEngine.setVideoMirrorMode(VideoMirrorMode)
    VideoMirrorMode = (VideoMirrorMode+1)%4
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

var mp = null;
createMediaPlayerButton.onclick = ()=>{
    if(mp){
        console.log("this is mediaPlayer already");
        return;
    }
    mp = zgEngine.createMediaPlayer();
    if(mp){
        mp.on("onMediaPlayerStateUpdate", (param)=>{
            console.log(`onMediaPlayerStateUpdate: state=${param.state} errorCode=${param.errorCode}`);
        })
    }
    else{
        console.log("createMediaPlayer failed");
    }
}

destroyMediaPlayerButton.onclick = ()=> {
    zgEngine.destroyMediaPlayer(mp);
    mp = null;
}

loadResourceButton.onclick = ()=>{
    mp.loadResource("C:/Users/Admin/Desktop/test.mp4").then(errorCode=>{
        console.log("loadResource result ", errorCode);
    }).catch(error=>{
        console.log("loadResouce error:", error);
    })
}

startButton.onclick = () =>{
    let mediaPlayerCanvas = document.getElementById("mediaPlayerCanvas");
    mp.setPlayerView({
        canvas: mediaPlayerCanvas,
    });
    mp.start();
}

stopButton.onclick = () =>{
    mp.stop();
}

pauseButton.onclick = () =>{
    mp.pause();
}

resumeButton.onclick = () =>{
    mp.resume();
}



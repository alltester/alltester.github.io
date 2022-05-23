var soundtest;
var soundImg;
var sound;
var soundslider;
var micImg;
var micTester;
var mic, recordero, soundFile;
var isMic;
var isRecording;
var stopbutton;
var playbutton;
var download;
var cameraImg;
var cameralook;
var cameratest;
var isCamera;
var isCameraOn;

function preload(){
soundImg = loadImage("sound-on.png");
sound = loadSound("Kalimba.mp3");
micImg = loadImage("mic.png");
cameraImg = loadImage("camera.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    soundtest = createButton("Sound Test");
    soundtest.position(150,150);
    soundtest.class("button");
    soundtest.mouseClicked(soundtester);

    soundslider = createSlider(0,5,1,0.2);
    soundslider.position(450,175);
    soundslider.class('range');

    mic = new p5.AudioIn();
    mic.start();

    recordero = new p5.SoundRecorder();
    recordero.setInput(mic);

    soundFile = new p5.SoundFile();

    micTester = createButton("Mic Test");
    micTester.position(150,300);
    micTester.class("button");
    micTester.mouseClicked(mictest123);

    stopbutton = createButton("Stop");
    stopbutton.position(550,300);
    stopbutton.class("button");
    stopbutton.mouseClicked(micstopo);
    stopbutton.hide();

    playbutton = createButton("Play");
    playbutton.position(550,300);
    playbutton.class("button");
    playbutton.mouseClicked(micplayo);
    playbutton.hide();
   
    download = createButton("Download Audio");
    download.position(550,375);
    download.class("button");
    download.mouseClicked(micfilesave);
    download.hide();

    cameralook = createCapture(VIDEO);

    cameratest = createButton("Camera Test");
    cameratest.position(width/2 + 200,25);
    cameratest.class("button");
    cameratest.mouseClicked(cameraon);



}

function draw() {
    background("white");
    image(soundImg,50,144,75,75);
    image(micImg,50,294,75,75);
    image(cameraImg,width/2 + 100,25,75,75);
    sound.setVolume(soundslider.value());

    if(isRecording){
    textSize(30);
    fill("black");
    text("Recording...",350,335);
    stopbutton.show();
    }

    if(isCameraOn){
        image(cameralook,width/2 + 250,50,250,250);
    }
  

    drawSprites();

}

function micsuccess(){
    isMic = true;
}
function micfail(){
    isMic = false;
}

navigator.getUserMedia({
    audio : true
}, micsuccess, micfail);

navigator.getUserMedia({
    video : true
}, videosuccess, videofail);

function soundtester(){
    if(!sound.isPlaying()){
sound.play();
    }else{
sound.stop();
    }
}

function mictest123(){

if(isMic){
    recordero.record(soundFile);
    isRecording = true;
    micTester.hide();
}

if(!isMic){
    alert("No Microphone Detected");
}


}

function micstopo(){
    background("white");
    isRecording = false;
    if(!isRecording){
    fill("black");
    textSize(30);
    text('Recording stopped.', 20, 20);
    stopbutton.hide();
    playbutton.show();
    download.show();
    recordero.stop();
    }
}

function micplayo(){
    if(!isRecording){
    soundFile.play();
    soundFile.setVolume(3);
    }
}

function micfilesave(){
    saveSound(soundFile, 'MicTest.wav');
}

function videosuccess(){
    isCamera = true;
}

function videofail(){
    isCamera = false;
}

function cameraon(){
    if(!isCamera){
    isCameraOn = true;
    }else{
alert("Your Device Is Not Connected To A Camera");
    }
}


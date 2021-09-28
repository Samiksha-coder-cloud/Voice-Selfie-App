var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

//Start Function
function Start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

//Taking the text from the event and displaying it in the textbox
recognition.onresult = function(event){
    console.log(event);
    var content = event.results[0][0].transcript;
    content = content.toLowercase();
    console.log(content);
    document.getElementById("textbox").innerHTML = content;
    if (content=="take my selfie") {
        Speak();
        console.log("taking my selfie");
    }
    
}

//Taking your Selfie and using the timeout calling the function takeSnapshot()
function Speak() {
    var synth = window.speechSynthesis;
    var speak_data = "Taking Your Selfie in 5 Seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach("camera");
    setTimeout(function(){
        takeSnapshot();
        saveSnapshot();
    },5000);
}

//Webcam  code
var camera = document.getElementById("camera");
Webcam.set({
    width:360,
    height:250,
    image_format:"png",
    png_quality:100
});

//Taking the Photo or Snapshot
function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='photo' src='"+data_uri+"'>"
    });
}

//Saving or Downloading the photo to the Device
function saveSnapshot() {
    link = document.getElementById("link");
    image = document.getElementById("photo").src;
    link.href = image;
    link.click();
}
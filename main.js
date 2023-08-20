objects=[];
video="";
status="";
var input_text="";
function preload(){
    // video=createVideo('video.mp4');
    // video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    video.hide();
   // document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function draw(){
    image(video,0,0,480,380);
    if(status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("object_found_status").innerHTML="";
            document.getElementById("status").innerHTML="Status: Objects Detected"+objects[i].label;
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are:"+objects.length;
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==input_text){
                document.getElementById("object_found_status").innerHTML=input_text+" Found";
            } 
        }

    }

}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    input_text=document.getElementById("object_name").value;
    //document.getElementById("status").innerHTML=input_text;
}

function modelLoaded(){
    console.log("Model Loaded: ");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    (console.log(results));
    objects=results;
}

function speak(){
    varsynth=window.speechSynthesis;
    var utterThis= new SpeechSynthesisUtterance("object found");
    synth.speak(utterThis);
}
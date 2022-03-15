var video = "";
var status1 = "";
var object = [];
var object_name = "";
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function setup() 
{
    canvas = createCanvas(480,480);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function Start(){
    objectdecter = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("Op").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("Object").value;
}

function modelLoaded()
{
    console.log("modelLoaded");
    status1=true;
}

function gotresult(error,result)
{
  if(error)
  {
      console.log(error);
  }
    console.log(result);
    object= result;
}

function draw() {
    image(video,0,0,580,480);

    if(status1 != "")
    {
        objectdecter.detect(video,gotresult);
        if(object.length < 0)
        {
            document.getElementById("GO").innerHTML = object_name+"Not Found";
        }
      for(i= 0; i < object.length; i++)
      {
          r = random(255);
          g = random(255);
          b = random(255);

          document.getElementById("GO").innerHTML = "Status: Detecting Objects";

          fill(r,g,b);
          percent = floor(object[i].confidence*100);
          text(object[i].label, object[i].x +15,object[i].y +15);
          noFill();
          stroke(r,g,b);
          rect(object[i].x , object[i].y , object[i].width , object[i].height);
          if(object[i].label == object_name)
          {
           document.getElementById("GO").innerHTML = object_name+"Found";
           video.stop();
           var synth = window.speechSynthesis;
           speak_data = "Object Found";
           var utterThis = new SpeechSynthesisUtterance(speak_data);
           synth.speak(utterThis);
          }
          else{
            document.getElementById("GO").innerHTML = object_name+"Not Found"; 
          }
      }
    }
}
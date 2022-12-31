video="";
objects=[];
function preload()
{
    video=createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas= createCanvas(690,370);
    canvas.position(340,200);
}

function draw()
{
    image(video,0,0,700,380);
    if(status !="")
    {
      objectDetector.detect(video,gotResult);
      for(i=0 ; i < objects.length ; i++)
      {
        document.getElementById("status").innerHTML="Status:Object detected";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected : "+objects.length;

        fill("#FF0000");
        percent=floor(objects[i].confidence*100);s
        text(objects[i].label+ "" + percent+ "%" ,objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("FF0000");
        rect(objects[i].x , objects[i].y , objects[i].width, objects[i].height);

      }
    }
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML="Status=Detecting Objects";
}

function modelLoaded()
{
    console.log("modelLoaded!");
    status=true;
    video.loop();
    video.speed(0);
    video.volume(1);
}

function gotResult(error,results)
{
if (error)
{
    console.error(error);
}
console.log(results);
objects=results;
}
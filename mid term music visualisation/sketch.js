//global for the controls and input 
var controls;

//store visualisations in a container
var vis;

//variable for the p5 sound object
var sound;

//variable for the sound's metadata
var soundMeta;

//variable for p5 fast fourier transform
var fourier;

//variable for p5 amplitude object
var amplitude;

//variable for left channel
var soundL;

//variable for right channel
var soundR;

//variable for fft of the left channel
var fftL;

//variable for fft of the right channel
var fftR;

//boolean flag to indicate when sound has loaded
var soundLoaded;

//boolean flag to indicate if there was a problem with loading 
//the sound
var error;

//variable to store the percent the sound has loaded for the 
//loading animation
var percentLoaded;

//control variables for the user instructions
var uiStep;
var time;

//threashold the uiStep globaly since multiple animations depend 
//on it
var uiStepMax;

function setup(){
    
    //initialize some global variables
    soundLoaded = false;
    error = false;
    percentLoaded = 0;
    uiStep = 0;
    uiStepMax = 50;
    controls = null;
    vis = null;
    
    //setting frame rate to 60 so that beat detection works as 
    //expected
    frameRate(60);
    
    //object to store the songs meta data for displaying to user
    soundMeta = {
        title: 'Tropicana',
        artist: 'Dear6',
        album: 'Skyline',
        year: '2020',
        site: 'Dear6.com'
    }

	createCanvas(windowWidth, windowHeight);
    
    //Alt-J, the band who produced this song, kindly granted me 
    //permission to use it in my project. You can find their music 
    //at http://www.altjband.com/
	sound = loadSound(
        'assets/tropicana.mp3', 
        onLoad, 
        loadErr, 
        whileLoading
    );
}

function draw(){
    
    //set background to black
    background(0);
    //translate origin to center to make math easier
    translate(width/2, height/2);
    
    if (error){

        //if sound does not load
        alert("Something went wrong. Please try again.");
    } else if (soundLoaded) {

        //if sound does load draw the selected visualisation
        vis.selectedVisual.draw();

        //draw the controls on top
        controls.draw();
    } else {

        //if sound is still loading draw loading animation
        loadingAnimation(percentLoaded);
    }
}

function mouseClicked(){

    //run mouse clicked method of controls
	controls.mousePressed();
}

function keyPressed(){

    //run keyPressed method of controls, passing in the detected 
    //keycode as an argument
	controls.keyPressed(keyCode);
}

function windowResized(){
    
    //when the window has been resized - resize canvas & controls 
    //to fit
	resizeCanvas(windowWidth, windowHeight);
    controls.onResize();
    
    //if the visualisation needs to be resized call its onResize 
    //method
	if(vis.selectedVisual.hasOwnProperty('onResize')){
        
		vis.selectedVisual.onResize();
	}
}

//////////////////////////////////////////////////
/////////// User Interface Animations ////////////
//////////////////////////////////////////////////

function updateUiStep(){
    
    //oscillate uiStep for animations
    if (time % (uiStepMax * 2) > (uiStepMax - 1)){
            uiStep--;
    } else {
        uiStep++;
    }
}

function userInstructions(){
    
    //variable for setting the upper limit of the UI text
    var topMargin = 0;
    
    //translate the mouseX and mouseY variables to center origin 
    //coordinates
    var mx = mouseX - width/2;
    var my = mouseY - height/2;
    
    //function for displaying instructions to the user when song 
    //is paused
    
    push();
    
   
    fill(255);
    textSize(20);
   
    
    //list out the names of the visuals stored in vis.visuals with 
    //corresponding number keys for switching between them
    var list = "";
    for (var i = 0; i < vis.visuals.length; i++){
        list += (i + 1)+" - "+vis.visuals[i].name+"\n"
    }
    text(
        "Select your visualisation pressing the number:\n"+
        list, 
        0, topMargin
    );
    textSize(15);
    text("Click anywhere to pause", 0, topMargin + 180);
    
    
    
    pop();
}

function loadingAnimation(pl){
    //function for showing a loading animating while song is 
    //loading
    
    push();
    textAlign(CENTER);
    fill(255);
    noStroke();
    textSize(16);
    text('Hi!\nYour song\'s loading...', 0, 0);
 
    beginShape();
    stroke(255,0,0);
    strokeWeight(15);
    noFill();
    for (var i = 0; i < pl * 1000; i++){
        var a = PI/2 + (i * (4 * PI / 1000));
        var r = 100;
        vertex(cos(a) * r, sin(a) * r);
    }
    endShape();
    
    beginShape();
    stroke(255);
    strokeWeight(15);
    noFill();
    for (var i = 0; i < pl * 1000; i++){
        var a = PI/2 + (i * (4 * PI / 1000));
        var r = 130;
        vertex(cos(a) * r, sin(a) * r);
    }
    endShape();
    beginShape();
    stroke(0,0,255);
    strokeWeight(15);
    noFill();
    for (var i = 0; i < pl * 1000; i++){
        var a = PI/2 + (i * (4 * PI / 1000));
        var r = 160;
        vertex(cos(a) * r, sin(a) * r);
    }
    endShape();
    pop();
}

//////////////////////////////////////////////////
//////// Callback functions for loadSound ////////
//////////////////////////////////////////////////

function onLoad(){
    //function for instantiating global variables and other 
    //resources once media has loaded
    
    //add a delay before loading everything in, since otherwise for 
    //most songs the loading screen is just a flash and somewhat 
    //disconcerting
    setTimeout(function(){
    
        //instantiate the conrols and input
        controls = new ControlsAndInput();

        //instantiate the amplitude object
        amplitude = new p5.Amplitude()

        //get left channel
        soundL = new p5.SoundFile();
        soundL.setBuffer([sound.buffer.getChannelData(0)]);


        //get right channel
        soundR = new p5.SoundFile();
        soundR.setBuffer([sound.buffer.getChannelData(1)]);

        //instantiate the fft objects for the left and right 
        //channels
        fftL = new p5.FFT();
        fftR = new p5.FFT();

        //set the input as left and right channels
        fftL.setInput(soundL);
        fftR.setInput(soundR);

        //instantiate the fft object
        fourier = new p5.FFT();

        //create a new visualisation container and add 
        //visualisations
        vis = new Visualisations();
        vis.add(new Multiply());
        vis.add(new Proliferate());
        
        
        
        soundLoaded = true;
    }, 1000);
}

function loadErr(){
    //function to indicate if there was an error loading media
    // - will switch boolean 'error' variable to true which can in 
    //turn trigger user feedback if applied
    
    error = true;
}

function whileLoading(p){
    //function to update 'percentLoaded' variable while media is 
    //loading - percentLoaded is passed to the loadingAnimation() 
    //function
    
    percentLoaded = p;
}

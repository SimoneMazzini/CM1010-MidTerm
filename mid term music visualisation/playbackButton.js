//displays and handles clicks on the playback button
function PlaybackButton(){
	
    //size and position of the playback button
    this.size = null;
	this.x = 0;
	this.y = null;
    
    //variables for the areas of the play button triangle the sub 
    //triangles made up of the mouse position and any two of the 
    //play button triangle's vertices - for use in determing if the 
    //mouse is within the play button
    var aT = 0;
    var a1 = 0;
    var a2 = 0;
    var a3 = 0;
    
    //variables for the vertices of the play button triangle
    var x1;
    var y1;
    var x2;
    var y2;
    var x3;
    var y3;
    
    //boolean flag to indicate if animation variables have been 
    //reset
    var aniVarsReset = false;
    
    //keep track of playhead time, to keep channels in sync
    this.channelDiff = 0;

	//flag to determine whether to play or pause after button 
    //click 
    //and to determine which icon to draw
	this.playing = false;
    
    //resize the button when screen size changes
    this.onResize = function(){

        this.size = height * 0.6;
        this.y = -height * 0.45;
        x1 = this.x - (this.size/2);
        y1 = this.y - (this.size/2)
        x2 = this.x + (this.size/2);
        y2 = this.y;
        x3 = this.x - (this.size/2);
        y3 = this.y + (this.size/2);
    }
    
    //call onResize to set initial values when the object is 
    //created
    this.onResize();

	this.draw = function(){
        
        //determine if audio is playing
		if(!this.playing){
            
            //if animation variables haven't been reset, do so, and 
            //switch boolean so that it wont happen again while 
            //still playing
            if (!aniVarsReset){
                
                uiStep = 0;
                time = 0;
                aniVarsReset = true;
            } else {
                
                //once animation variables have been reset 
                //increment global time variable
                time ++;
            }
            
            //keep updating global uiStep variable if song is 
            //paused so that user instructions and play button 
            //animate
            updateUiStep();
            
            
            
            //animate play button
            this.buttonAnimation();
            //display user instructions
            userInstructions();
		}else{
            
            //switch boolean so that it triggers reset of animation 
            //variables on next pause
            aniVarsReset = false;
        }
	};

    //function for use in our button animation and determining if 
    //the cursor is within the triangle - based on video “Check 
    //whether a given point lies inside a triangle or not | 
    //GeeksforGeeks” by GeeksforGeeks, found at: 
    //https://youtu.be/H9qu9Xptf-w
    this.areaOfTriangle = function(x1, y1, x2, y2, x3, y3){

        return floor(
            abs(
                (x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2))/2
            )
        );
    }
    
    this.buttonAnimation = function(){
        
        //translate the mouseX and mouseY variables to center 
        //origin coordinates
        var mx = mouseX - width/2;
        var my = mouseY - height/2;
        
        push();
        blendMode(EXCLUSION);
        noStroke();
        
        

        if((a1 + a2 + a3) < aT + 1000){

            cursor('pointer');
        } else {

            cursor();
        }
        
        textSize(20);
        textAlign(CENTER);
        text('CLICK HERE TO START', 0, this.y + 6);
        pop();
    }
    
	//checks for clicks on the button, starts or pauses playabck,
	//returns true if clicked, false otherwise
	this.hitCheck = function(){
        
        //determine if sound is playing
        if (soundL.isPlaying()) {
            //if playing, a click anywhere pauses
                
            soundL.pause();

            soundR.pause();

            //record the difference in position of the playheads
            this.channelDiff = 
                soundL.currentTime() - soundR.currentTime();
            
            this.playing = !this.playing;
            return true;

        } else {
            //if not playing, a click on the play button plays
            
            if((a1 + a2 + a3) < aT + 1000){

                //start soundL after a delay to keep both channels 
                //in sync
                soundL.loop(this.channelDiff);

                soundR.loop();

                //pan both channels to their respective sides
                soundL.pan(-1);
                soundR.pan(1);
                
                this.playing = !this.playing;
                return true;
            }
            
            return false;
        }
	};
}

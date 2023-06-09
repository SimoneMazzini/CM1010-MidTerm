//constructor function to handle the onscreen menu, keyboard and 
//mouse controls
function ControlsAndInput(){

	//boolean to control when artist info is displayed
	this.artistDisplayed = false;

	//boolean to control whether artist info should be displayed 
    //automatically or based on user input
    this.userSelectArtistDisplay = false;
    
	//playback button initialization
	this.playbackButton = new PlaybackButton();
    
	this.mousePressed = function(){
        
        if(
            mouseX - width/2 < -width/2 + 44 &&
            mouseY - height/2 < -height/2 + 44
        ){

            //check for clicks on fullscreen/collapse-fullscreen 
            //and toggle if found
            fullscreen(!fullscreen());
        } else if(this.playbackButton.hitCheck()){

            //check if the song is being played and display artist 
            //info if it is - do not take this action if user has 
            //defined whether the artist info is displayed
            if (!this.userSelectArtistDisplay){

                this.artistDisplayed = true;
            }
        }
	};

	//responds to keyboard presses @param keycode - the ascii 
    //code of the key pressed
	this.keyPressed = function(keycode){

        //check for press on number keys which correspond to 
        //visualizations and display corresponding vis if found
		if(keycode > 48 && keycode <= 48 + vis.visuals.length){

			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}

        //check for press on A key and toggle artist info if found
		if(keycode == 65){

            this.userSelectArtistDisplay = true;
            this.artistDisplayed = !this.artistDisplayed;
        }
	};

	//draws the playback button and potentially the menu
	this.draw = function(){

		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(14);

		//playback button 
		this.playbackButton.draw();
        
        //draw fullscreen icon based on current state
        this.fullScreenIcon(fullscreen());

        //only draw the artist info if artist displayed is
        //set to true
		if(this.artistDisplayed){

            //display artist info
            this.artistInfo();
        }

		pop();
	};

    //method for drawing out the artist's info
	this.artistInfo = function(){
        var rightMargin = width/2 - 40;
        var topMargin = height/2 - (height * 0.2);
        
        //draw out artist info items
        push();
        fill(0, 0, 0, 70);
        noStroke();
        rect(
            -width/2, topMargin, 
            width, size
        );
        stroke(1);
        fill(180);
        textAlign(RIGHT);
        textSize(height * 0.018);
        textSize(height * 0.018);

        //draw out the artist info for the current song
        textStyle(BOLD);
        text(
            soundMeta.title,
            rightMargin, topMargin + height * 0.03
        );
        textStyle(NORMAL);
        text(
            soundMeta.artist,
            rightMargin, topMargin + height * 0.05
        );
        text(
            soundMeta.album + ' (' + soundMeta.year + ')',
            rightMargin, topMargin + height * 0.07
        );
        text(
            soundMeta.site,
            rightMargin, topMargin + height * 0.09
        );
        textAlign(LEFT);
        push();
        stroke(180);
        strokeWeight(height * 0.003);
        noFill();
        rect(
            rightMargin - (height * 0.03), 
            topMargin + height * 0.10, 
            height * 0.03, 
            height * 0.03, 
            height * 0.006
        );
        pop();
        textAlign(CENTER);
        text(
            'A',
            rightMargin - (height * 0.03)/2, 
            topMargin + height * 0.122
        );
        
        textSize(height * 0.014);
        text(
            'Press',
            rightMargin - (height * 0.11)/2, 
            topMargin + height * 0.122
        );
        text(
            'to hide',
            rightMargin - 0.03 * height, 
            topMargin + height * 0.148
        );
        pop();
    }
    
    //method for drawing fullscreen icon dependant on state
    this.fullScreenIcon = function(displayExit){

        //variables for the top right corner coords
        var trX = -width/2;
        var trY = -height/2;
        push();
        noStroke();

        if (displayExit){
            //draw an exit fullscreen icon

            stroke(120);
            strokeWeight(2);
            line(trX + 10, trY + 19, trX + 19, trY + 19);
            line(trX + 10, trY + 25, trX + 19, trY + 25);
            line(trX + 19, trY + 10, trX + 19, trY + 19);
            line(trX + 19, trY + 25, trX + 19, trY + 33);
            line(trX + 25, trY + 10, trX + 25, trY + 19);
            line(trX + 25, trY + 25, trX + 25, trY + 33);
            line(trX + 25, trY + 19, trX + 33, trY + 19);
            line(trX + 25, trY + 25, trX + 33, trY + 25);
        } else {
            //draw an enter full screen icon
            
            stroke(255);
            strokeWeight(2);
            line(trX + 10, trY + 10, trX + 10, trY + 19);
            line(trX + 10, trY + 25, trX + 10, trY + 33);
            line(trX + 10, trY + 10, trX + 19, trY + 10);
            line(trX + 10, trY + 33, trX + 19, trY + 33);
            line(trX + 25, trY + 10, trX + 33, trY + 10);
            line(trX + 25, trY + 33, trX + 33, trY + 33);
            line(trX + 33, trY + 10, trX + 33, trY + 19);
            line(trX + 33, trY + 25, trX + 33, trY + 33);
        }
        pop();
        
        //make the cursor a pointer if over enter/exit fullscreen 
        //icon
        if(
            mouseX - width/2 < -width/2 + 44 &&
            mouseY - height/2 < -height/2 + 44
        ){

            cursor('pointer');
        }
    }
    
    //resize controls placements when screen size changes
    this.onResize = function(){
        
        this.playbackButton.onResize();
    }
}

//"Extend" visualization
function Extend(){

    //vis name
	this.name = "Extend";
    
    //container for waveforms
    var waves = [];
    
    //max radius for first wave - length from center to corner of 
    //viewport - anything larger than this would be out of view
    var maxRadius = sqrt(pow(height/2, 2) + pow(width/2, 2));
    
    //function for adding a new wave to the waves container
    this.addWave = function(){
        
        //get waveform for audio at current moment
        var w = fourier.waveform();
        
        //create wave container to hold vertices of wave 
        //representation
        var wave = [];

        //iterate over the bins output by FFT.waveform()
        for (var i = 0; i < w.length; i++){
            
            //only create new vertex every tenth bin
            if (i % 10 == 0){
                
                //make the waveform wrap around the circumferance 
                //of a circle
                var angle = map(i, 0, w.length - 1, 0, 2*PI);
                
                //get cos & sin in order to calculate the x and y 
                //coords for each vertex
                var cosine = cos(angle);
                var sine = sin(angle);
                
                //calculate the magnitude of the offset of the 
                //frequency represented by the vertex i
                var offset = map(
                    mouseX, 
                    0, width, 
                    0, maxRadius * w[i]
                );
                
                //start x and y's offsets = offset by default
                var xOffset = offset;
                var yOffset = offset;
                
                //if angle is in 3rd or 4th quadrants make xOffset 
                //negative
                if (cosine < 0){
                    xOffset = -offset;
                }
                
                //if angle is in 2nd or 3rd quadrants make yOffset 
                //negative
                if (sine < 0){
                    yOffset = -offset;
                }
                
                //calculate x and y coords using cos/sin, radius, 
                //and offsets
                var x = cosine * maxRadius + xOffset;
                var y = sine * maxRadius + yOffset;
                
                //push coords to wave container
                wave.push({
                    x: x,
                    y: y
                });
            }
        }
        
        //push wave to waves container
        waves.push(wave);
    }

    //draw the ridge plots to the screen
	this.draw = function(){
        push();

        noStroke();
        
        //only create new wave object every ten frames
        if(frameCount % 10 == 0){
            this.addWave();
        }

        //iterate over waves and draw lines based on values
        for (var i = waves.length - 1; i >= 0 ; i--){
            
            //store wave in variable o
            var o = waves[i];
            
            //create a gradiated fill to differentiate between wave 
            //objects
            var f = map(i, waves.length - 1, 0, 0, 255);
            
            fill(f);
            
            //draw wave object
            beginShape()
            for (var j = 0; j < o.length; j++){
                
                //decriment the magnitude of each vertex to create 
                //movemement
                o[j].x /= 1.01;
                o[j].y /= 1.01;
                vertex(o[j].x, o[j].y);
            }
            
            endShape();
            
            //calculate the radius of smallest wave object
            var radius = sqrt(pow(o[0].y, 2) + pow(o[0].x, 2));
            
            //remove a wave object that has shrunk below a given 
            //threashold
            if (radius < 10){
                waves.splice(i, 1);
            }
        }
                
        pop();
    }
}

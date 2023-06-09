//"Proliferate" visualization
function Proliferate(){

    //vis name
	this.name = "Proliferate";
    
    //get the min distance from the middle of the screen to 
    //either edge
    var radius;

    //set up a time tracker to dictate the flow of the other values
    var t = 0;

    //set up var to keep track of our current connection between 
    //nodes
    var currentProduct = 0;

    //set and initialize the 'connection points' in our vis
    var nodes = random(7, radius * 2);

    //set and initialize the factor by which we relate the nodes
    var factor = random(radius * 2 * 0.7, 11 + (radius * 2 * 0.));

    //set up x and y coords for the start and end of each line
    var x1;
    var y1;
    var x2;
    var y2;

    //set up array to hold our p5 vectors
    var vecs = [];
    
    //resize the vis when screen size changes
	this.onResize = function() {
		radius = min(height, width)/2;
	};
    
    //call onResize to set initial values when the object is 
    //created
	this.onResize();

	this.draw = function(){
        
        //some trig to determine the start and end points for 
        //each line
        x1 = sin(((2*PI)/nodes) * t) * radius;
        y1 = cos(((2*PI)/nodes) * t) * radius;

        x2 = sin(((2*PI)/nodes) * currentProduct) * radius;
        y2 = cos(((2*PI)/nodes) * currentProduct) * radius;

        //analyze the fft.
        fourier.analyze();
        
        //create variables for color values based on energies
        var colors = [];
        colors.push(fourier.getEnergy('bass'));
        colors.push(fourier.getEnergy('mid'));
        colors.push(fourier.getEnergy('highMid'));
        
        //drop out minimum value in colors to increase vibrancy
        var min = colors[0];
        var minIndex = 0;

        for (var i = 1; i < colors.length; i++) {

            if (colors[i] < min) {

                minIndex = i;
                min = colors[i];
            }
        }

        colors[minIndex] = 0;

        //get applitude level
        var level = amplitude.getLevel();
        
        //set nodes and factor to aesthetically pleasing values 
        //based on amplitude
        nodes = map(level, 0, 1, 7, radius * 2);
        factor = map(
            level, 
            0, 1, 
            radius * 2 * 0.7, 7 + (radius * 2 * 0.)
        );

        push();

        //set max and min line widths based on mouseX
        var maxLineWidth = map(mouseX, 0, width, 1, 50);
        var minLineWidth = map(mouseX, 0, width, 0, 2);
        
        //set line width to aesthetically pleasing values based 
        //on amplitude
        var lineWidth = map(
            level, 
            0, 1, 
            minLineWidth, maxLineWidth
        );

        strokeWeight(lineWidth);
        
        //assign stroke color based on colors array
        stroke(colors[0], colors[1], colors[2]);

        //create vectors for lines
        var vec = createVector(x1, y1);

        //set the magnitude of vec to be the square of the mean of 
        //the distances from the center to both edges so that it
        //covers the entire canvas but maintains a high level of
        //detail
        vec.setMag(Math.pow((x2-x1), 2)+Math.pow((y2-y1), 2));
        vecs.push(vec);
        
        //iterate through vecs and draw out lines based on each
        for (i = 0; i < vecs.length; i++){

            line(vecs[i].x,vecs[i].y, x2, y2);
        }

        pop();
        
        //increment our time tracker and keep it below our 
        //number of nodes
        t = (t + 1) % nodes;

        //update our current product and keep it below our 
        //number of nodes
        currentProduct = (factor * t) % nodes;
        
        //keep vecs from growing indefinitely
        if (vecs.length > 5000){
            
            vecs.pop();
        }
	};
}

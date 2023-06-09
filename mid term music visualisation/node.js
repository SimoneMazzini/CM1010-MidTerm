//node constructor - sub constructor for multiply vis
function Node(t, radius){

    //time of node creation
    this.t = t;

    //some trig to determine the node (start and end points 
    //for each line)
    this.x = sin(((2*PI)/radius) * this.t) * radius;
    this.y = cos(((2*PI)/radius) * this.t) * radius;

    //create vector
    this.vec = createVector(this.x, this.y)

    //create array to store color and alpha channels
    this.c = [0,0,0,255];
    
    //function to update the color of the lines
    this.color = function(){

        //analyze the fft.
        fourier.analyze();
        
        //create variables for color values based on energies
        this.c[0] = fourier.getEnergy('bass');
        this.c[1] = fourier.getEnergy('lowMid');
        this.c[2] = fourier.getEnergy('mid');
        
        //drop out the minimum color value, to increase vibrancy
        var min = this.c[0];
        var minIndex = 0;
        for (var i = 1; i < this.c.length - 1; i++) {

            if (this.c[i] < min) {

                minIndex = i;
                min = this.c[i];
            }
        }

        this.c[minIndex] = 0;
    }
    
    //initialize the node color
    this.color();
    
    //update radii in order for vis to display reasonabley after 
    //window resize
    this.update = function(radius){

        this.x = sin(((2*PI)/radius) * this.t) * radius;
        this.y = cos(((2*PI)/radius) * this.t) * radius;
        this.vec = createVector(this.x, this.y)
    }
}

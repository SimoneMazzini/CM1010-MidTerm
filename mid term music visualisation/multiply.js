//"Multiply" visualization
function Multiply(){

    //vis name
	this.name = "Multiply";

    //variable to store the radius based on window size
    //it serves double duty as number of nodes around the perimeter 
    //of circle
    //so that the entirety of the pattern will always fit inside 
    //the canvas, the radius is the shortest distance from the 
    //center, to any edge
    var radius = floor(min(height, width)/2);

    //variable to keep track of "localTime" (frames)
    var localTime = 0;

    //variable to store relationships between nodes
    var currentProduct = 0;

    //variable to store the factor by which we determine the 
    //relationships between nodes
    var factor;

    //variables to hold the starting coords for each line
    var x1;
    var y1;

    //an array to store each line object
    var nodes = [];
    
    //change radii based on input for every node in nodes array
    this.updateAllNodes = function(r){
        for (i = 0; i < nodes.length; i++){
            nodes[i].update(r);
        }
    }
    
    //resize the vis when screen size changes
	this.onResize = function() {
		this.updateAllNodes(floor(min(height, width)/2))
	};

	//call onResize to set initial values when the object is 
    //created
	this.onResize();
    
	this.draw = function(){

        //get the current amplitude
        var level = amplitude.getLevel();

        //generate a random factor
        factor = random(7, radius / 2 - 1);

        push();
        
        //rotate the entire animation, for visual effect
        rotate((PI / radius) * map(localTime, 0, radius, 0, 1));

        //create new node, at each frame step
        nodes.push(new Node(localTime, radius));
        
        //only draw if there are at least two nodes
        if (nodes.length > 1){

            //iterate through all nodes and draw each corresponding
            //line
            for (i = 0; i < nodes.length; i++){

                push();

                //rotate vis based on mouseX
                rotate(PI / map(mouseX, 0, width, 308, -308) * i);

                //set the alpha for all lines to be proportional to 
                //the amplitude
                nodes[i].c[3] = level * 255;
                
                //use the node color property to color the line
                stroke(nodes[i].c);
                strokeWeight(1);

                //draw line from the current node to the next node
                //in line
                line(
                    nodes[i].x, 
                    nodes[i].y, 
                    nodes[(i+1) % nodes.length].x, 
                    nodes[(i+1) % nodes.length].x
                );

                pop();
            }
        }

        pop();
        
        //keep localTime, current product, and nodes array at reasonable 
        //threasholds
        localTime = (localTime + 1) % radius;

        currentProduct = (factor * localTime) % radius;

        if (nodes.length == radius){
            
            nodes.shift();
        }
	};
}

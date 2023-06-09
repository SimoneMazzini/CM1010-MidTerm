//Cosmos constructor - sub constructor for cell sub constructor

function Cosmos(x, y, color, angle, speed, shift){
    
   
    var color = color;
    
    //var for the angle of the atom around the center point of the 
    //cell
    var angle = angle;
    
    //storing coords in a p5 vector to make the math easier
    var vec = createVector(x, y)
    
    
    var speed = speed;
    
    //draw the atom to the screen
    this.draw = function(){
        push();
        
        //initially update the atom to ensure values are set
        update();
        
        //draw out the atom
        noStroke();
        fill(color);
        ellipse(vec.x, vec.y, 10, 10);
        
        pop();
    }
    
    //update function for controlling movement of the cell
    function update(){
        
        //speed by which the atoms move out from the cell's 
        //centerpoint
        speed -= map(mouseX, 0, width, -0.5, 0.5);
        
        
        vec.x += cos(angle) * speed;
        vec.y += sin(angle) * speed;
        
        
        vec.mult(shift);
        
        
        vec.rotate(fourier.getEnergy("bass", "treble")/4000);
    }
}

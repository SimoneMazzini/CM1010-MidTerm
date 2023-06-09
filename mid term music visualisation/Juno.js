//Juno constructor - sub constructor for organism sub constructor
//inspired by the in-course "firework" constructor
function Juno(color, x, y){
    
    //variable for the color of the cell passed in from the 
    //organism object and based on the energy of the mid level of 
    //the current audio output
    var color = color;
    
    //coords for the center point of the cell object passed in and 
    //determined randomly from the organism object
    var x = x;
    var y = y;
    
    //variable to store a random value which controls the lifelike 
    //jittering of the entire cell object
    var shift = random(0.6, 2);
    
    //container for every atom within the given cell
    var atoms = [];
    
    //iterate around the center point of the cell and place an atom 
    //at predetermined points along the perimeter
    for(var i = 0; i < 360; i += 18){
        
        //convert from degress to radians
        var angleRad = i * PI/180;
        
        //create and add the new atom to the atoms array
        atoms.push(new Atom(x, y, color, angleRad, 4, shift));
    }
    
    this.draw = function(){
        
        //iterate over the atoms array and draw each atom
        for (var i = 0; i < atoms.length; i++){
            atoms[i].draw();
        }
    }
}

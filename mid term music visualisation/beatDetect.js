//beat detect constructor - sub constructor for Luminesce vis
//http://archive.gamedev.net/archive/reference/programming/features/beatdetection/
function BeatDetect(){
    var sampleBuffer = [];
    
    this.detectBeat = function(spectrum){
        var sum = 0;
        var isBeat = false;
    
        for (var i = 0; i < spectrum.length; i++){
            //taking the square to increase differences
            sum += spectrum[i] * spectrum[i];
        }

        if (sampleBuffer.length == 60){
            //detect a beat
            var sampleSum = 0;
            for (var i = 0; i < sampleBuffer.length; i++){
                sampleSum += sampleBuffer[i];
            }

            var sampleAverage = sampleSum / sampleBuffer.length;

            var c = calculateConstant(sampleAverage);
            
            if (sum > sampleAverage * c){
                //beat
                isBeat = true;
            }

            sampleBuffer.splice(0,1);
            sampleBuffer.push(sum);
        } else {
            sampleBuffer.push(sum);   
        }
        return isBeat;
    }
    
    function calculateConstant(sampleAverage){
        var varianceSum = 0;
        for (var i = 0; i < sampleBuffer.length; i++){
            varianceSum += sampleBuffer[i] - sampleAverage;
        }

        var variance = varianceSum/sampleBuffer.length;

        var m = -0.15 / (25 - 200);
        var b = 1 + (m * 200);


        return (m * variance) + b;
    }
}

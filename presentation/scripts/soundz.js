var snddata = [];
var wave = new RIFFWAVE();
var audio; 
wave.header.sampleRate = 8000;
wave.header.numChannels = 1;

function sndPlay(){
    var text = document.getElementById('a-data').value;
    for(var i = 0;i<8000*20;i++){
        var t = i;
        var res = 0;
        eval(text);
        snddata[i] = res % 256;
    }
    wave.Make(snddata);
    var audio = document.getElementById('a-player');
    audio.src = wave.dataURI;
    audio.play();
}

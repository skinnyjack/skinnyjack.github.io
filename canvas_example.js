var gl;
var verts =[-1.0,-1.0,1.0,-1.0,1.0,1.0,-1.0,1.0,-1.0,-1.0];
var buff;
var tt = 0;
var shaderProgram;
var unitime;
var vertex_shader_text = 'attribute vec3 aVertexPosition;varying vec4 p; void main(void) {gl_Position = p = vec4(aVertexPosition,1.0);}';
var vertex_shader;
var intervalId;
var fragment_shader;

function getShader(gl,txt,shader_type){
    var shader;
    shader = gl.createShader(shader_type);
    gl.shaderSource(shader,txt);
    gl.compileShader(shader);
   	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

function init(){
    var can = document.getElementById('canvas_example');
    gl = can.getContext('webgl');
    if(gl){
   	gl.clearColor(0.2, 0.2, .2, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	buff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buff);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts),
		      gl.STATIC_DRAW);
	buff.itemSize = 2;
	buff.numItems = 5;
    
    vertex_shader = getShader(gl,vertex_shader_text,gl.VERTEX_SHADER);
    }
}

function drawScene(){
    tt++;
    gl.useProgram(shaderProgram);
    gl.uniform1f(unitime,Date.now()%10000*0.001);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, buff);
  	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,buff.itemSize,gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, buff.numItems);
    gl.flush();
}

function start_canvas_fun(){
    var doc = document.getElementById('canvas_example_shader').value;
    fragment_shader = getShader(gl,doc,gl.FRAGMENT_SHADER);
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertex_shader);
    gl.attachShader(shaderProgram,fragment_shader);
    gl.linkProgram(shaderProgram);
 	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			alert("Could not initialise shaders");
		}

		gl.useProgram(shaderProgram);
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram,"aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        unitime = gl.getUniformLocation(shaderProgram,"time");
		intervalId = setInterval(drawScene, 10); 
}

function stop_canvas_fun(){
    clearInterval(intervalId);
    //gl.useProgram(0);
    gl.deleteProgram(shaderProgram);
    gl.deleteShader(fragment_shader);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

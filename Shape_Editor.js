var elem = document.body;
var params = { width: 512, height: 512 };
var two = new Two(params).appendTo(elem);
var mousePosStart, mousePos;
var line_button = document.getElementById("line_button");
var square_button = document.getElementById("square_button");
var circle_button = document.getElementById("circle_button");
var triangle_button = document.getElementById("triangle_button");
var polygon_button = document.getElementById("polygon_button");
var clear_button = document.getElementById("clear_button");

var svg = document.querySelector('svg');

var pt = svg.createSVGPoint();

function cursorPoint(evt){
  pt.x = evt.clientX; pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

svg.addEventListener('mousemove',function(evt){
  mousePos = cursorPoint(evt);
},false);

line_button.addEventListener("click", function(){
    var line = two.makeLine(0,0, 50, 50);
    line.fill = 'rgb(0,255,0)';
    line.linewidth = 5;
    two.update();
}, false);

square_button.addEventListener("click", function(){
    var square = two.makeRectangle(200, 100, 100, 100);
    square.fill = 'rgb(255, 0, 0)';
    square.linewidth = 5;

    two.update();
}, false);

circle_button.addEventListener("click", function(){
    var circle = two.makeCircle(300,100, 50);
    circle.fill = 'rgb(0,0,255)';
    circle.linewidth = 5;
   
    two.update();
}, false);

triangle_button.addEventListener("click", function(){
    var triangle = two.makePolygon(400,100, 50, 3);
    triangle.fill = 'rgb(255, 255, 0)';
  
    two.update();
}, false);

polygon_button.addEventListener("click", function(){
    var numSides = document.getElementById("polygon_sides").value;
    var polygon = two.makePolygon(100,200, 50, numSides);
    polygon.linewidth = 5;
    polygon.fill = 'rgb(0, 0, 0)';

    two.update();
}, false);

clear_button.addEventListener("click", function(){
    two.clear();
    two.update();
}, false);

window.addEventListener("click", function(e){
    for (let shape of two.scene.children) 
    {
        shape._renderer.elem.addEventListener("mousedown", function(e){
            shape._renderer.elem.addEventListener('mousedown', function(e){
                shape.stroke = 'rgb(0, 255, 255)';
                mousePosStart = cursorPoint(e);
                two.update();
                dragging_shape = true;
                },false);
            svg.addEventListener('mouseup', function(e){
                if(dragging_shape)
                {
                shape.stroke = 'rgb(0, 255, 255)';
                var delta_x = mousePosStart.x - mousePos.x;
                var delta_y = mousePosStart.y - mousePos.y;
                shape.translation.x -= delta_x;
                shape.translation.y -= delta_y;
                }
                dragging_shape = false;
            two.update();
            },false);
        },false);
    }
}, false);

//two.scene.children.Events.addEventListener("click", function(){
  //  alert("test");
//}, false);


/*window.addEventListener('click', function(e){
    for (let shape of two.scene.children) 
    {
        shape._renderer.elem.addEventListener('click', function(e){
            if(!shape_selected)
            {
                shape.stroke = 'rgb(0, 255, 255)';
                two.update();
                shape_selected = true;
    
                rotation_input = document.createElement("INPUT");
                document.getElementById("end_buttons").appendChild(rotation_input);
                rotation_button = document.createElement("BUTTON");
                rotation_button.innerHTML = "Rotate by Radians";
                document.getElementById("end_buttons").appendChild(rotation_button);
    
                scale_input = document.createElement("INPUT");
                document.getElementById("end_buttons").appendChild(scale_input);
                scale_button = document.createElement("BUTTON");
                scale_button.innerHTML = "Scale";
                document.getElementById("end_buttons").appendChild(scale_button);
    
                rotation_button.addEventListener("click",function(e){
                    rotation_angle = rotation_input.value;
                    shape.rotation += rotation_angle;
                    two.update();
                }, false);
    
                scale_button.addEventListener("click", function(e)
                {
                    scale_factor = scale_input.value;
                    shape.scale *= scale_factor;
                    two.update;
                }, false)
            }
            else
            {
                rotation_button.remove();
                rotation_input.remove();
                scale_button.remove();
                scale_input.remove();
                shape_selected = false;
                shape.stroke = 'rgb(0,0,0)';
                two.update();
            }
            },false);
        var dragging_shape = false;
        shape._renderer.elem.addEventListener('mousedown', function(e){
            shape.stroke = 'rgb(0, 255, 255)';
            mousePosStart = cursorPoint(e);
            two.update();
            dragging_shape = true;
            },false);
        svg.addEventListener('mouseup', function(e){
            if(dragging_shape)
            {
            shape.stroke = 'rgb(0, 255, 255)';
            var delta_x = mousePosStart.x - mousePos.x;
            var delta_y = mousePosStart.y - mousePos.y;
            shape.translation.x -= delta_x;
            shape.translation.y -= delta_y;
            }
            dragging_shape = false;
        two.update();
        },false);
    }
}, false);*/

two.update();

document.getElementById("jpeg_button").addEventListener("click", function() {
    
    html2canvas(document.querySelector('#body')).then(function(canvas) {
        saveAs(canvas.toDataURL(), 'drawing.jpeg');
    });
});

function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

document.getElementById("download_button").addEventListener("click",function(e){
    alert("please note this method is only implemented for lines currently.");
    shapes = [];//JSON object
    for (let shape of two.scene.children) 
    {
        if(shape instanceof Two.Line)
        {
            const info = 
            {
                "type": "line",
                "p1": {
                    "x" : shape.vertices[0].x,
                    "y" : shape.vertices[0].y,
                },
                "p2": {
                    "x" : shape.vertices[1].x,
                    "y" : shape.vertices[1].y,
                },
            };
            var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(info));
            
            var a = document.createElement('a');
            a.href = 'data:' + data;
            a.download = 'data.json';
            a.innerHTML = 'download JSON';

            var container = document.getElementById('container');
            container.appendChild(a);
        }
    }
},false);

document.getElementById("upload_button").addEventListener("click",function(e){
    alert("this method has not been implemented yet.");
},false);
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function draw(data) {
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d');
    var image = new Image();
    image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

        data.meta.forEach(function(face) {
        ctx.beginPath();
        ctx.moveTo(face[0].x, face[0].y);
        ctx.lineTo(face[1].x, face[1].y);
        ctx.lineTo(face[2].x, face[2].y);
        ctx.lineTo(face[3].x, face[3].y);
        ctx.lineTo(face[0].x, face[0].y);

        ctx.strokeStyle="#FFFF00";
        ctx.stroke();
    });
    };
    image.src = data.image;
}

$(function() {
    var id = getParameterByName('id');
    $.get("http://localhost:8000/image/" + id + '/', function(data) {
        draw(data);
    });
});
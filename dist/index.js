$(function() {
    $.get("http://localhost:8000/images/", function(data) {
        console.log(data);
    });
});
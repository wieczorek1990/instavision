function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function makeDetail(data) {
    return '<img src="' + data.image + '" style="max-width: 400px;">'
}

$(function() {
    $detailContainer = $('#detail-container');
    var id = getParameterByName('id');
    $.get("http://localhost:8000/image/" + id + '/', function(data) {
        var html = makeDetail(data);
        $detailContainer.html(html);
    });
});
function makeList(data) {
    var out = '';
    for (var i = 0; i < data.length; i++) {
        out += '<div>';
        out += '<img src="' + data[0].image + '" style="max-width: 200px;">'
        var id = data[i]['id'];
        out += '<button class="btn btn-primary" onclick="location.href=\'http://localhost/detail.html?id=' + id + '\';">DETAIL</button>';
        out += '<button data-id="' + id + '" class="destroy btn btn-danger">DESTROY</button>';
        out += '</div>'
    }
    return out;
}

$(function() {
    $listContainer = $('#list-container');
    $.get("http://localhost:8000/images/", function(data) {
        console.log(data);
        if (data.length == 0) {
            $listContainer.html('There are no uploaded images.')
        } else {
            var html = makeList(data);
            $listContainer.html(html);
            $('.destroy').click(function() {
                var id = $(this).data('id');
                $.ajax({
                    url: 'http://localhost:8000/image/' + id + '/',
                    type: 'DELETE',
                    success: function(result) {
                        location.reload();
                    }
                });
            });
        }
    });
});
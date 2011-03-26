function roll() {
    $.ajax({
        url: '/api/roll/',
        data: {
            'd6': 2
        },
        dataType: 'json',
        success: function(data) {
            render_roll(data);
            window.location.hash = data['id']
        }
    });
}

function recall_roll(id) {
    $.ajax({
        url: '/api/recall/' + id,
        dataType: 'json',
        success: function(data) {
            render_roll(data);
        }
    });
}

function render_roll(data) {
    console.log(data);
}

$(function() {
    if (window.location.hash != "") {
        recall_roll(window.location.hash.substring(1));
    } else {
        //roll();
    }
});

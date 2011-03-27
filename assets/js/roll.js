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
    die = "d6";
    number = data["d6"][0];

    now = new Date();

    timestamp = new Date();
    timestamp.setTime(Date.parse(data["timestamp"]));

    delta = timestamp - now;

    second = 1000;
    minute = second * 60;
    hour = minute * 60;
    day = hour * 24;

    if (delta > day) {
        age = Math.floor(delta / day);

        if (age > 1) {
            age += " day";
        } else {
            age += " days";
        }
    } else if (delta > hour) {
        age = Math.floor(delta / hour);

        if (age == 1) {
            age += " hour";
        } else {
            age += " hours";
        }
    } else if (delta > minute) {
        age = Math.floor(delta / minute);

        if (age == 1) {
            age += " minute";
        } else {
            age += " minutes";
        }
    } else if (delta > second) {
        age = Math.floor(delta / minute);

        if (age == 1) {
            age += " second";
        } else {
            age += " days";
        }
    }

    $("#results .number").text(number);
    $("#results .die").text(die);
    $("#results .timestamp").text(timestamp.toDateString());
    $("#results .age").text(age);

    $("#results").show();
}

$(function() {
    if (window.location.hash != "") {
        recall_roll(window.location.hash.substring(1));
    } else {
        //roll();
    }
});

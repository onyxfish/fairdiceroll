var DICE = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];

function roll(dice) {
    $.ajax({
        url: '/api/roll/',
        data: dice, 
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
    rolled = [];

    _(DICE).each(function(die) {
        if (die in data) {
            rolled.push(data[die].length + die);
        }
    });

    if (rolled.length > 1) {
        rolled = rolled.join(" + ");
    } else {
        rolled = rolled[0];
    }

    number = data["sum"];

    now = new Date();

    timestamp = new Date();
    timestamp.setTime(parse_iso8601(data["timestamp"]));

    delta = now - timestamp;

    second = 1000;
    minute = second * 60;
    hour = minute * 60;
    day = hour * 24;

    if (delta > day) {
        age = Math.floor(delta / day);

        if (age > 1) {
            age += " day ago";
        } else {
            age += " days ago";
        }
    } else if (delta > hour) {
        age = Math.floor(delta / hour);

        if (age == 1) {
            age += " hour ago";
        } else {
            age += " hours ago";
        }
    } else if (delta > minute) {
        age = Math.floor(delta / minute);

        if (age == 1) {
            age += " minute ago";
        } else {
            age += " minutes ago";
        }
    } else if (delta > second) {
        age = Math.floor(delta / second);

        if (age == 1) {
            age += " second ago";
        } else {
            age += " seconds ago";
        }
    } else {
        age = "just now";
    }

    $("#results .number").text(number);
    $("#results .die").text(rolled);
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

var DICE = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
var COUNTS = {'d4': 1, 'd6': 1, 'd8': 1, 'd10': 1, 'd12': 1, 'd20': 1}

function show_advanced_controls() {
    $("#dice-controls .wrapper .inc, #dice-controls .wrapper .dec").show();
    $("#toggle-advanced").hide();
}

function increment_die_count(die) {
    COUNTS[die] += 1;

    $("button#" + die).text(COUNTS[die] + die);
}

function decrement_die_count(die) {
    if (COUNTS[die] > 0) {
        COUNTS[die] -= 1;
    }
    
    $("button#" + die).text(COUNTS[die] + die);
}

function get_die_count(die) {
    return COUNTS[die];
}

function roll(dice) {
    $("#results").hide();
    $("#rolling").show();

    $.ajax({
        url: '/api/roll/',
        data: dice, 
        dataType: 'json',
        success: function(data) {
            render_roll(data);
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

function update_twitter_link(number, rolled) {
    $("#results .twitter-share-button").attr("href",
        "http://twitter.com/home?status=" + 
        encodeURIComponent
            ("I rolled " + number + " on " + rolled + ". " + window.location.href + " (@fairdiceroll)"));
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
    window.location.hash = data['id']
    update_twitter_link(number, rolled);

    $("#rolling").hide();
    $("#results").show();
    document.title = number + " on " + rolled;
}

$(function() {
    if (window.location.hash != "") {
        recall_roll(window.location.hash.substring(1));
    } else {
        roll({'d6':1});
    }
});

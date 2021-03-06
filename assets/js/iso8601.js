/**
 * Date.parse with progressive enhancement for ISO-8601, version 2
 * © 2010 Colin Snover <http://zetafleet.com>
 * Released under MIT license.

 MODIFIED: CEG / 2011
 */

function parse_iso8601(date) {
    var timestamp = Date.parse(date), minutesOffset = 0, struct;
    if (isNaN(timestamp) && (struct = /^(\d{4}|[+\-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?))?/.exec(date))) {
        if (struct[8] !== 'Z') {
            minutesOffset = +struct[10] * 60 + (+struct[11]);
            
            if (struct[9] === '+') {
                minutesOffset = 0 - minutesOffset;
            }
        }
        
        timestamp = Date.UTC(+struct[1], +struct[2] - 1, +struct[3], +struct[4], +struct[5] + minutesOffset, +struct[6], +struct[7].substr(0, 3));
    }
    
    return timestamp;
};

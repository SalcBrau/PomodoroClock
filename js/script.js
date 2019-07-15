var $this, $target, status = "Session", on = false, $current = $('#current'), timeSec, timeStr, totalSec, min, sec, start = true, $circle = $('#circle'), $h3 = $('h3'), percent, color, $clock = $('#current, h3'), $span = $('span');
$span.click(function(){
  if (on === false) {
  $this = $(this);
  switch($this.text()) {
    case "+":
      $target = $this.prev();   
      $target.text(Number.parseInt($target.text()) + 1);
      break;
    default:
      $target = $this.next();
      if ($target.text() > 1) $target.text(Number.parseInt($target.text()) - 1);
      break;
  }
  if ($target.attr("id") === status) {
    $current.text($target.text());
    start = true;
   }
  }
});

$circle.click(function() {
  if (start) {
    timeSec = Number.parseInt($current.text()) * 60;
    percent = 0;
    increment = (1 / timeSec) * 100;
    start = false;
    $circle.css({
        "background": "-webkit-linear-gradient(bottom, black, black 0%, transparent 0%, transparent 0%)"
      });
  }
  if (on === false) {
    on = setInterval(function() {
      timeSec--;
      convert(timeSec);
      color = $circle.css("border-top-color");
      if (/:+/.test($current.text())) { 
       percent += increment;
       $circle.css({
          "background": "-webkit-linear-gradient(bottom, " + color + ", " + color + " " + percent + "%, transparent 0%, transparent 0%)"
       });
      }
    }, 1000);
    $span.animate({ color: "#000000"}, 1000);
    $span.css({"cursor": "default"});
  } else {
    clearInterval(on);
    on = false;
    $span.animate({ color: "#ffffff"}, 1000);
    $span.css({"cursor": "pointer"});
  }
});

function convert(secs) {
  if (secs !== 0) {
    min = Math.floor(secs / 60); 
    sec = secs % 60;
    if (sec === 0) 
      sec = "00"; 
    else if (sec < 10)
      sec = "0" + sec;
    $current.text(min + ":" + sec);
  } else {
    triggerChange();
  }
}

function triggerChange() {
  if (status === "Session") {
    status = "Break";
    $circle.css({"border-color": "red"});
    $clock.css({"color": "#6e1313"});
  } else {
    status = "Session";
    $circle.css({"border-color": "green"});
    $clock.css({"color": "#2b470e"});
  }
  $h3.text(status);
  $current.text($('#' + status).text());
  start = true;
  clearInterval(on);
  on = false;
  $circle.trigger('click');
}

$('#reset').click(function() {
  status = "Session";
  $circle.css({"border-color": "green"});
  $h3.text(status);
  $current.text($('#' + status).text());
  start = true;
  clearInterval(on);
  on = false;
  $circle.css({
        "background": "-webkit-linear-gradient(bottom, black, black 0%, transparent 0%, transparent 0%)"
      });
  $span.animate({ color: "#ffffff"}, 1000);
    $span.css({"cursor": "pointer"});
});

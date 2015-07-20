$(function() {
    $({blurRadius: 10}).animate({blurRadius: 0}, {
        duration: 1000,
        easing: 'swing', // or "linear"
                         // use jQuery UI or Easing plugin for more options
        step: function() {
            console.log(this.blurRadius);
            $('.box').css({
                "-webkit-filter": "blur("+this.blurRadius+"px)",
                "filter": "blur("+this.blurRadius+"px)"
            });
        }
    });
});
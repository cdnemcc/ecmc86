(function() {
    var reFz = function() {
        document.querySelector('html').style.fontSize = (document.documentElement.clientWidth * 100) / 750 + 'px';
    }
    reFz();
    window.onresize = reFz;
    /*window.addEventListener('orientationchange',function() {
        window.location.reload();
    });*/
})();
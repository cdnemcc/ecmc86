$(function($) {
    $(document).on("click", "a[data-type='cmsad']", function(e) {
        e.preventDefault();
        var adid = $(this).attr("data-id");
        if (adid && adid != null) { $.get("/api/advertise/hitcount", { ADID: adid }, function(r) {}); }
        window.location.href=$(this).attr('href')
    });
});

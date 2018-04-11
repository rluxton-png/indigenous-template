window.fbAsyncInit = function() {
  FB.init({
    appId      : '1781519975439910',
    xfbml      : true,
    version    : 'v2.7'
  });

  FB.api(
    "/1536789006633925/videos?limit=100&access_token=1781519975439910|50ca548c3eb6af45e1812ea315bd658b",
    function (response) {
      $(".fb-loading").hide();
      $("a.load-more").css("display", "inline-block");
      if (response && !response.error) {
        $.each(response.data, function( index, value ) {
          if(value.id !== '1620510634928428') {
            $("#facebook-videos-container").append('<div class="fb-video"><a href="#fb-video-popup" class="fb-popup" data-fb-id="'+value.id+'"><img src="https://graph.facebook.com/'+value.id+'/picture?width=500&height=500&access_token=1781519975439910|50ca548c3eb6af45e1812ea315bd658b" /></a></div>');
          }
        });

        $('a.fb-popup').click( function(e) {
          e.preventDefault();
          $('<div class="modal"><iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F60SecDocs%2Fvideos%2F'+$(this).data('fb-id')+'%2F&show_text=0&width=560" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe></div>').appendTo('body').modal();
          $("a.close-modal").click(function(e) {
            e.preventDefault();
            $.modal.close();
          });
        });
      }
    }
  );

  $(document).ready( function() {
    $("a.load-more").click( function(event) {
      event.preventDefault();

      $("#facebook-videos-container").css("max-height", "none");
      $(this).hide();
    });

    $(".links a, .press a").click( function(e) {
      console.log("CLICK");
      if (document.cookie.replace(/(?:(?:^|.*;\s*)sixtysecdocs\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
        $('#exit-popup').modal();
        $('#exit-popup').css('display', 'inline-block');
        $("a.close-modal").click(function(e) {
          e.preventDefault();
          $.modal.close();
        });
        document.cookie = "sixtysecdocs=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
      } else {
        console.log("NOT TRUE");
      }
    });
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1781519975439910',
    xfbml      : true,
    version    : 'v2.7'
  });

  FB.api(
    "/1536789006633925/videos?fields=length&no_story=true&limit=100&access_token=1781519975439910|50ca548c3eb6af45e1812ea315bd658b",
    function (response) {
      $(".fb-loading").hide();
      $("a.load-more").css("display", "inline-block");
      if (response && !response.error) {
        $.each(response.data, function( index, value ) {
          if(value.id !== '1620510634928428' && value.length > 20) {
            $("#facebook-videos-container").append('<div class="fb-video"><a href="#fb-video-popup" class="fb-popup" data-fb-id="'+value.id+'"><img src="https://graph.facebook.com/'+value.id+'/picture?width=500&height=500&access_token=1781519975439910|50ca548c3eb6af45e1812ea315bd658b" /></a></div>');
          }
        });

        $('a.fb-popup').click( function(e) {
          e.preventDefault();
          $("a.close-modal").click(function(e2) {
            e2.preventDefault();
            $.modal.close();
          });
          var videoID = $(this).data('fb-id');
          FB.api(
            videoID + '?fields=embed_html&access_token=1781519975439910|50ca548c3eb6af45e1812ea315bd658b',
            function(response) {
              $('<div class="modal">'+response.embed_html+'</div>').appendTo('body').modal();
            }
          );
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

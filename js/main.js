// loader 
$(window).load(function () { // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({ 'overflow': 'visible' });
})

// Sticky Header
$(window).scroll(function () {

    if ($(window).scrollTop() > 100) {
        $('.main_header').addClass('sticky');
    } else {
        $('.main_header').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function () {
    if ($('.main_header').hasClass('open-nav')) {
        $('.main_header').removeClass('open-nav');
    } else {
        $('.main_header').addClass('open-nav');
    }
});

$('.main_header li a').click(function () {
    if ($('.main_header').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_header').removeClass('open-nav');
    }
});

// navigation scroll lijepo radi materem
$('nav a').click(function (event) {
    var id = $(this).attr("href");
    var offset = 70;
    var target = $(id).offset().top - offset;
    $('html, body').animate({
        scrollTop: target
    }, 500);
    event.preventDefault();
});



// wow js

new WOW().init();

// nice scroll

$(document).ready(

  function () {

      $("html").niceScroll({ cursorwidth: "8", cursorborderradius: "none", cursorborder: "none", cursorcolor: "#3498db", mousescrollstep: "60" });

  }

);

// portfolio filter

$(function () {



    var filterList = {

        init: function () {

            loadProjects(function () {

                // MixItUp plugin
                // http://mixitup.io
                $('#portfoliolist').mixitup({
                    targetSelector: '.portfolio',
                    filterSelector: '.filter',
                    effects: ['fade'],
                    easing: 'snap',
                    // call the hover effect
                    onMixEnd: filterList.hoverEffect()
                });

            });

        },

        hoverEffect: function () {

            // Simple parallax effect
            $('#portfoliolist .portfolio').hover(
              function () {
                  $(this).find('.label').stop().animate({ bottom: 0 }, 200, 'easeOutQuad');
                  $(this).find('img').stop().animate({ top: -30 }, 500, 'easeOutQuad');
              },
              function () {
                  $(this).find('.label').stop().animate({ bottom: -40 }, 200, 'easeInQuad');
                  $(this).find('img').stop().animate({ top: 0 }, 300, 'easeOutQuad');
              }
            );

        }

    };

    // Run the show!
    filterList.init();


});


// Skillset js 

var object = [

  {

      'headline': 'ASP.Net',
      'value': 8,
      'length': 10,
      'description': 'Significant experience and knowlage of ASP.Net.'

  },
  {

      'headline': 'Node.Js',
      'value': 8,
      'length': 10,
      'description': 'Significant experience and knowlage of NodeJs.'

  },
  {

      'headline': 'JavaScript & jQuery',
      'value': 8,
      'length': 10,
      'description': 'Javascript & jQuery'

  },
  {

      'headline': 'Express.Js',
      'value': 8,
      'length': 10,
      'description': 'ExpressJs'

  },
  {

      'headline': 'ASP.Net MVC',
      'value': 7,
      'length': 10,
      'description': 'Significant experience and knowlage of ASP.Net MVC.'

  },
  
  {

      'headline': 'Angular.Js',
      'value': 5,
      'length': 10,
      'description': 'Significant experience and knowlage of Angular.'

  },
  
  {

      'headline': 'Ionic.Js',
      'value': 5,
      'length': 10,
      'description': 'Ionic.Js'

  }

];

$(document).ready(function () {

    $("#skillset").skillset({

        object: object,
        duration: 40

    });

});


// Owl carousel

$(document).ready(function () {

    $("#testimonial_carosule").owlCarousel({

        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        autoPlay: true,
        transitionStyle: "backSlide",
        // "singleItem:true" is a shortcut for:
        // items : 1, 
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });

});

// Up to top js

$(document).ready(function () {

    $().UItoTop({ easingType: 'easeOutQuart' });

});



/* ==========================================================================
   CONTACT FORM JS
   ========================================================================== */

$(document).ready(function () {
    $("#submit_btn").click(function () {
        $('#overlay').show();

        //get input field values
        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_message = $('textarea[name=message]').val();

        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "") {
            $('input[name=name]').css('border-color', 'red');
            proceed = false;
        }
        if (user_email == "") {
            $('input[name=email]').css('border-color', 'red');
            proceed = false;
        }

        if (!isEmail(user_email)) {
            $('input[name=email]').css('border-color', 'red');
            proceed = false;
        }

        if (user_message == "") {
            $('textarea[name=message]').css('border-color', 'red');
            proceed = false;
        }

        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            post_data = { 'userName': user_name, 'userEmail': user_email, 'userMessage': user_message };

            // parameters: service_id, template_id, template_parameters
            emailjs.send("gmail", "template_KDw8mXjU", { to_name: "Jameer", from_name: user_name + ' ' + user_email, message_html: user_message })
            .then(function (response) {
                console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
                $(".contact_section").find(":input").each(function () {
                    $(this).val('');
                    $('#overlay').hide();
                })
            }, function (err) {
                $('#overlay').hide();
                alert(err);
            });
        } else {
            $('#overlay').hide();
        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function () {
        $("#contact_form input, #contact_form textarea").css('border-color', '');
        $("#result").slideUp();
    });

});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


/*=========================================================================
  MANAGE MODAL POPUP
  =========================================================================*/

function viewPortfolio(ev) {
    $("#title").html($(ev).find("a").html());
    $("#technology").html($(ev)[0].lastChild.value);
    $("#description").html($(ev)[0].nextSibling.value);
    $("#prjtImg").attr("src", $(ev).find("img")[0].src);

    $("#myModal").modal("show");
}

function loadProjects(f) {
    var prjTitle,
        technology,
        imagePath,
        description,
        category;

    // Load the xml file using ajax 
    $.ajax({
        type: "GET",
        url: "/private/projects.xml",
        dataType: "xml",
        success: function (xml) {
            var len = $(xml.documentElement).find("project title").length;
            var html = "";
            for (var i = 0; i < len; i++) {
                prjTitle = $(xml.documentElement).find("project title")[i].innerHTML;
                technology = $(xml.documentElement).find("project technology")[i].innerHTML;
                imagePath = $(xml.documentElement).find("project imagepath")[i].innerHTML;
                description = $(xml.documentElement).find("project description")[i].innerHTML;
                category = $(xml.documentElement).find("project category")[i].innerHTML;
                var id = $(xml.documentElement).find("project")[i].id;

                html += '<div class="portfolio ' + category + '" data-cat="' + category + '">';
                html += '<div class="portfolio-wrapper" onclick="viewPortfolio(this)">';
                html += '<img src="' + imagePath + '" alt="" height="230" width="265" />';
                html += '<div class="label">';
                html += '<div class="label-text">';
                html += '<a class="text-title">' + prjTitle + '</a>';
                html += '<span class="text-category">' + category + '</span>';
                html += '</div>';
                html += '<div class="label-bg"></div>';
                html += '</div>';
                html += '<input type="hidden" id="hdn_technology_' + id + '" value="' + technology + '" />';
                html += '</div>';
                html += '<input type="hidden" id="hdn_description_' + id + '" value="' + description + '" />';
                html += '</div>';
            }

            $("#portfoliolist").html(html);

            if (typeof f == "function") f(); else alert('It should be a callback function!');
        }
    });
}
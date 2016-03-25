window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
} (document, "script", "twitter-wjs"));

(function($, mt) {
	var url = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";
	var authKey = "dcWWNNjXxTmshCGo9KirZoBUoEQcp1znwebjsnPZl3v5PEYpjz";

    var qtContainer = $("#quote-content");
    var qtAuthor = $("#quote-author");

    function getRandomQuotes() {
        $("#twitter-button").hide();
        $("#loader").css('display', 'inline-block');

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                qtContainer.html(data.quote);
                qtAuthor.html(" - " + data.author);
                mt.fadeInImage(qtContainer);
                mt.fadeInImage(qtAuthor);
                updateTwitter(data.quote + "\n - " + data.author);
                //hide loader
                $("#loader").hide();
            },
            error: function(err) {
                mt.toast('Something went wrong!', 4000);
                $("#loader").hide();
                console.log(err);
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", authKey);
            }
        });

    }

    function updateTwitter(text) {
        // Remove existing iframe
        $('#twitter-button iframe').remove();
        // Generate new markup
        var tweetBtn = $('<a></a>')
            .addClass('twitter-share-button')
            .attr('href', 'https://twitter.com/share')
            .attr('data-url', window.location.href)
            .attr('data-text', text);
        $('#twitter-button').append(tweetBtn);
        twttr.widgets.load();
        $('#twitter-button').css('display', 'inline-block');
        mt.fadeInImage('#twitter-button');
    }

    $(document).ready(function() {
        $('#twitter-button iframe').remove();
        getRandomQuotes();
        $("#get-quote").on("click", function() {
            getRandomQuotes();
        });
        var currentBg = 0;
        window.setInterval(function() {
            var colors = [
                '#4a148c',
                '#1a237e',
                '#004d40',
                '#827717',
                '#33691e',
                '#bf360c',
                '#827717',
                '#3e2723',
                '#263238',
                '#1b5e20',
                '#006064',
                '#880e4f',
                '#01579b',
                '#212121'
            ];
            
            var color = colors[currentBg];
            
            currentBg++;
            if (currentBg > colors.length)
                currentBg = 0;

            $('body').css({
                transition: 'background-color 3s ease-in-out',
                'background-color': color
            });
        }, 3000);
    });

})(jQuery, Materialize);

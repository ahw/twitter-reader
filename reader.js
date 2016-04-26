// The oauth.io public key
OAuth.initialize('AlNaoL_6Ro5x3AjGitFWGS326eE');

$('#redirect').click(function(e) {
    console.log('clicked on redirect');
    e.preventDefault();
    OAuth.redirect('twitter', '/callback.html');
});

$('#popup').click(function(e) {
    console.log('click on popup');
    e.preventDefault();
    OAuth.popup('twitter', function(error, result) {
        if (error) {
            console.error(error);
        }
        console.log(result);
        window.Twitter = result;
    });
});

$('#twitter-api').submit(function(e) {
    e.preventDefault();
    var method = $('#method').val();
    var resource = $('#resource').val();
    window.Twitter[method.toLowerCase()]('https://api.twitter.com/1.1/' + resource).done(function(result) {
        console.log('Request results', result);
        $('#results').val(JSON.stringify(result, null, '    '));
    });
});

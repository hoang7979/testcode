jQuery(function($) {
    if ($('.willgroup-comment-count').html() > 0) {
        $('.willgroup-comment-title').append('<span class="count">(' + $('.willgroup-comment-count').html() + ')</span>');
    }
});
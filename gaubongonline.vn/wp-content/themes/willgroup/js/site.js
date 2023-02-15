jQuery(function($) {
    /**
     * Site nav
     */
    var adminbarHeight = $('#wpadminbar').length > 0 ? $('#wpadminbar').height() : 0;
    var sitebrandingHeight = $('.site-branding').length > 0 ? $('.site-branding').outerHeight() : 0;
    $(window).resize(function() {
        adminbarHeight = $('#wpadminbar').length > 0 ? $('#wpadminbar').height() : 0;
        sitebrandingHeight = $('.site-branding').length > 0 ? $('.site-branding').outerHeight() : 0;
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > sitebrandingHeight) {
            $('body').addClass('fixed');
        } else {
            $('body').removeClass('fixed');
        }
    });


    /**
     * Site nav
     */
    $('.site-nav li.menu-item-has-children').on('click', function() {
        $(this).children('.sub-menu').slideToggle();
    });
    $('.site-nav li.menu-item-has-children > a').on('click', function(e) {
        e.stopPropagation();
    });

    /**
     * Site slider
     */
    $('.site-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button type="button" class="slick-prev"><i class="ion-ios-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="ion-ios-arrow-right"></i></button>'
    });

    /**
     * Fancybox
     */
    $('[data-fancybox]').fancybox({
        youtube: {
            showinfo: 0
        },
        thumbs: {
            autoStart: true
        }
    });
    /**
     * Read more
     */
    if ($('.term-description').length) {
        $('.term-description').readmore({
            speed: 75,
            lessLink: '<div class="text-center"><a class="more-descript font-weight-bold text-primary" href="javascript:void(0);">Thu lại</a></div>',
            moreLink: '<div class="text-center"><a class="more-descript font-weight-bold text-primary" href="javascript:void(0);">Đọc thêm</a></div>',
            collapsedHeight: 310
        });
    }
    if ($('.bottom-description').length) {
        $('.bottom-description').readmore({
            speed: 75,
            lessLink: '<div class="text-center"><a class="more-descript font-weight-bold text-primary" href="javascript:void(0);">Thu lại</a></div>',
            moreLink: '<div class="text-center"><a class="more-descript font-weight-bold text-primary" href="javascript:void(0);">Đọc thêm</a></div>',
            collapsedHeight: 210
        });
    }
    /**
     * Form comment
     */
    var $formComment = $('.form-comment');
    $formComment.on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);
        $this.find('.btn').append('<i class="ion-loop spin icon"></i>');
        $.ajax({
            type: 'POST',
            url: ajax.ajax_url,
            data: $this.serialize(),
            success: function(data, textStatus, jqXHR) {
                if (data.status == true) {
                    $this.find('.form-control').val('');
                }
                $this.find('.btn').find('.icon').remove();
                $('#modal-result .modal-body').html(data.message);
                $('#modal-result').modal('show');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });
    $('.comment .reply').on('click', function() {
        $formComment.find('input[name="parent"]').remove();
        $formComment.prepend('<input type="hidden" name="parent" value="' + $(this).data('parent') + '"/>');
        $formComment.find('[name="name"]').focus();
        $('html, body').animate({
            scrollTop: $formComment.offset().top - 50
        }, 600);
    });

    /**
     * Fill form quick order inputs
     */
    $('.product [data-variation_id]').on('shown.bs.tab', function(e) {
        $('.form-quick-order [name="variation_id"]').val($(this).data('variation_id'));
    });

    /**
     * Form quick order
     */
    $('.form-quick-order').on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);
        $this.find('.btn').append('<i class="ion-loop spin icon"></i>');
        $.ajax({
            type: 'POST',
            url: ajax.ajax_url,
            data: $this.serialize(),
            success: function(data, textStatus, jqXHR) {
                if (data.status == true) {
                    $this.find('.form-control').val('');
                    setTimeout(function() {
                        window.location.href = data.link;
                    }, 4000);
                }
                $this.find('.btn').find('.icon').remove();
                $('#modal-result .modal-body').html(data.message);
                $('#modal-result').modal('show');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });


    /**
     * Fill form order inputs
     */
    $('.modal-order [data-variation_id]').on('shown.bs.tab', function(e) {
        $('.form-order [name="variation_id"]').val($(this).data('variation_id'));
        $('.form-order [name="price"]').val($(this).data('price'));
        $('.form-order [name="size"]').val($(this).text());
    });

    /**
     * Form order
     */
    $('.form-order').on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);
        $this.find('.btn').append('<i class="ion-loop spin icon"></i>');
        $this.find('.alert').remove();
        $.ajax({
            type: 'POST',
            url: ajax.ajax_url,
            data: $this.serialize(),
            success: function(data, textStatus, jqXHR) {
                if (data.status == true) {
                    $this.find('.form-control').val('');
                    $this.append('<div class="alert alert-success">' + data.message + '</div>');
                    setTimeout(function() {
                        window.location.href = data.link;
                    }, 4000);
                } else {
                    $this.append('<div class="alert alert-danger">' + data.message + '</div>');
                }
                $this.find('.btn').find('.icon').remove();
                $('#modal-result .modal-body').html(data.message);
                $('#modal-result').modal('show');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });

    /**
     * Reset flexslider
     */
    $('.modal-order').on('shown.bs.modal', function(e) {
        $('.modal-order .woocommerce-product-gallery').data('flexslider').setup();
        $(this).find('.alert').remove();
    });

    /**
     * Ajax search
     */
    var products = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: ajax.ajax_url + '?action=willgroup_get_products',
            cache: false,
        },
    });
    $('.typeahead').typeahead({
        minLength: 1,
        highlight: true,
        classNames: {
            menu: 'w-100 tt-menu',
            dataset: 'bg-white border border-primary shadow-sm py-2 tt-dataset',
            suggestion: 'text-body bg-white d-flex py-2 px-3',
            highlight: 'text-primary tt-highlight'
        }
    }, {
        name: 'products',
        source: products,
        display: function(item) {
            return item.name;
        },
        limit: 5,
        templates: {
            suggestion: function(item) {
                return '<a href="' + item.link + '">' +
                    '<div class="flex-shrink-0 mr-2">' +
                    '<img style="width: 2.5rem;" src="' + item.image + '" alt="' + item.name + '">' +
                    '</div>' +
                    '<div class="w-100">' +
                    '<div class="font-weight-bold mb-1 clearfix">' +
                    item.name +
                    '<span class="font-weight-bold text-secondary float-right">' + item.price + '</span>' +
                    '</div>' +
                    '<div class="small">' + item.cats + '</div>' +
                    '</div>' +
                    '</a>';
            }
        }
    }, );
    /**
     * Defer facebook and google
     */
    setTimeout(function() {
        $('.fb_dialog, .fb-customerchat').css({
            'visibility': 'visible',
            'opacity': 1
        });
    }, 30000);

    setTimeout(function() {
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https:www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-K6ZD4T');

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https:connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js#xfbml=1&version=v2.12&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, 3000);
});
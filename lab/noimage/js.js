window.MrHellish                           = window.MrHellish || {};
window.MrHellish.Lab                       = window.MrHellish.Lab || {};
window.MrHellish.Lab.NoImage               = window.MrHellish.Lab.NoImage || {};

({
    init: function() {

        $('.row.imageWrapper').each(function() {
            $(this).height($(this).width()*9/16);
        });

        if (typeof window.MrHellish.Lab.NoImage.AwesomeSmiley !== 'undefined') {
            new window.MrHellish.Lab.NoImage.AwesomeSmiley({
                $wrapper:     $('#noimage1').parent(),
                $canvasBkg:   $('#noimage1'),
                $canvasImage: $('#noimage1_2')
            });
        }

        return;
    }
}).init();
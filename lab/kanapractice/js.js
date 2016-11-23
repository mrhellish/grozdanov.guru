window.MrHellish                  = window.MrHellish || {};
window.MrHellish.Lab              = window.MrHellish.Lab || {};
window.MrHellish.Lab.KanaPractice = window.MrHellish.Lab.KanaPractice || {};

({
    init: function() {
        if (typeof window.MrHellish.Lab.KanaPractice !== 'undefined') {
            new window.MrHellish.Lab.KanaPractice({
                $canvas: $('#kanapractice')
            });
        }

        return;
    }
}).init();
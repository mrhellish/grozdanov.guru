window.MrHellish                      = window.MrHellish || {};
window.MrHellish.Lab                  = window.MrHellish.Lab || {};
window.MrHellish.Lab.GravityParticles = window.MrHellish.Lab.GravityParticles || {};

({
    init: function() {

        if (typeof window.MrHellish.Lab.GravityParticles.Particles !== 'undefined') {
            new window.MrHellish.Lab.GravityParticles.Particles({
                $wrapper: $('#gravityparticlesWrapper'),
                $canvas: $('#gravityparticles')
            });
        }

        return;
    }
}).init();
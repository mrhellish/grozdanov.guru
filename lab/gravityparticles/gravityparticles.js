// jQuery required

window.MrHellish                      = window.MrHellish || {};
window.MrHellish.Lab                  = window.MrHellish.Lab || {};
window.MrHellish.Lab.GravityParticles = window.MrHellish.Lab.GravityParticles || {};

window.MrHellish.Lab.GravityParticles.Particles = function(options) {
    this.initialize(options);
}

$.extend(window.MrHellish.Lab.GravityParticles.Particles.prototype, {
    options: {
        $wrapper: null,
        $canvas: null,
    },
    data: {
        needRender:   null,
        particleX:    null,
        particleY:    null,
        particleV:    null,
        particleM:    null,
        lastRateDate: null,
        RATE:         50,
        SPEEDUP:      2.0,
    },
    N: 400,
    canvas: null,
    requestAnimFrame: null,
    initialize: function (options) {
        this.options = $.extend({}, this.options, options);

        if (typeof this.options.$canvas === 'undefined') {
            console.error('Option "$canvas" is required.');
            return;
        }

        this.canvas = this.options.$canvas.get(0);

        this.requestAnimFrame = function(callback) {
            var raf =
                window.requestAnimationFrame   ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };

            var callbackContext = this;
            raf.call(window, function() {
                callback.call(callbackContext);
            });
        }

        if (this.options.$wrapper) {
            this.canvas.width  = this.options.$wrapper.get(0).offsetWidth;
            this.canvas.height = this.options.$wrapper.get(0).offsetHeight;
        }

        ctx = this.canvas.getContext('2d');

        this.data.particleX = Array(this.N);
        this.data.particleY = Array(this.N);
        this.data.particleM = Array(this.N);
        this.data.particleV = Array(this.N);
        mDrawRate = 2;
        for (var m,i = 0; i < this.N; i++) {
            this.data.particleX[i] = Math.random()*10000%this.canvas.width;
            this.data.particleY[i] = Math.random()*10000%this.canvas.height;
            m = Math.random()*100%52-24;
            this.data.particleM[i] = (m > -23 && m < 23) ? 0 : m;
            this.data.particleV[i] = [Math.random()*100%16-8, Math.random()*100%16-8];
        }

        this.data.needRender = true;

        this.draw();
        this.rate();
    },
    draw: function() {
        if (!this.data.needRender) {
            return;
        }

        ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw gravity objects
        ctx.beginPath();
        ctx.fillStyle = 'rgb(100, 255, 100)';
        for (var i = 0; i < this.N; i++) {
            if (this.data.particleM[i] > 0) {
                ctx.moveTo(this.data.particleX[i], this.data.particleY[i]);
                ctx.arc(this.data.particleX[i], this.data.particleY[i], this.data.particleM[i], 0, 2 * Math.PI, false);
                // ctx.rect(this.data.particleX[i] -  this.data.particleM[i]/2, this.data.particleY[i] -  this.data.particleM[i]/2,  this.data.particleM[i],  this.data.particleM[i]);
            }

        }
        ctx.fill();
        ctx.closePath();

        // draw anti-gravity objects
        ctx.beginPath();
        ctx.fillStyle = 'rgb(255, 150, 150)';
        for (var i = 0; i < this.N; i++) {
            if (this.data.particleM[i] < 0) {
                ctx.moveTo(this.data.particleX[i], this.data.particleY[i]);
                ctx.arc(this.data.particleX[i], this.data.particleY[i], -1*this.data.particleM[i], 0, 2 * Math.PI, false);
                // ctx.rect(this.data.particleX[i] +  this.data.particleM[i]/2, this.data.particleY[i] +  this.data.particleM[i]/2,  -this.data.particleM[i],  -this.data.particleM[i]);
            }

        }
        ctx.fill();
        ctx.closePath();

        // draw neutral objects
        ctx.beginPath();
        ctx.fillStyle = 'rgb(255, 255, 255)';
        for (var i = 0; i < this.N; i++) {
            if (this.data.particleM[i] == 0) {
                ctx.moveTo(this.data.particleX[i], this.data.particleY[i]);
                ctx.arc(this.data.particleX[i], this.data.particleY[i], 5, 0, 2 * Math.PI, false);
                // ctx.rect(this.data.particleX[i] -  5, this.data.particleY[i] -  5, 10, 10);
            }

        }
        ctx.fill();
        ctx.closePath();

        this.data.needRender = false;
    },
    rate: function() {
        this.requestAnimFrame(this.rate.bind(this));

        RATE = this.data.RATE;
        passedMilliseconds = Date.now() - this.data.lastRateDate;
        if (this.data.lastRateDate == null || (passedMilliseconds) >= 1000/RATE) {
            if (this.data.lastRateDate != null) {
                var stepRate = this.data.SPEEDUP*passedMilliseconds/1000;

                for (var i = 0; i < this.N; i++) {
                    if (this.data.particleM[i])
                        continue;

                    /*if (this.data.particleX[i] < 0 || this.data.particleX[i] > this.canvas.width ||
                        this.data.particleY[i] < 0 || this.data.particleY[i] > this.canvas.height) {
                        this.data.particleX[i] = this.data.particleX[this.N - 1];
                        this.data.particleY[i] = this.data.particleY[this.N - 1];
                        this.data.particleM[i] = this.data.particleM[this.N - 1];
                        this.data.particleV[i] = this.data.particleV[this.N - 1];
                        this.N--;
                        i--;
                    }*/
                    v0 = this.data.particleV[i][0];
                    v1 = this.data.particleV[i][1];
                    for (var j = 0; j < this.N; j++) {
                        f = this.data.particleM[j];
                        if (this.data.particleM[j] == 0 || i == j)
                            continue;

                        dSquared = (this.data.particleX[i]-this.data.particleX[j])*(this.data.particleX[i]-this.data.particleX[j])
                            + (this.data.particleY[i]-this.data.particleY[j])*(this.data.particleY[i]-this.data.particleY[j]);

                        a = Math.atan2(this.data.particleY[j]-this.data.particleY[i], this.data.particleX[j]-this.data.particleX[i]);
                        // v = ((f < 0) ? -1 : 1)*Math.min((2*f*2*f)/dSquared, f/2);
                        v = ((f < 0) ? -1 : 1)*Math.min((2*f*2*f)/dSquared, Math.abs(f)/2);

                        this.data.particleV[i][0] += v*Math.cos(a);
                        this.data.particleV[i][1] += v*Math.sin(a);
                    }
                    this.data.particleV[i][0] += v0;
                    this.data.particleV[i][0] /= 2;
                    this.data.particleV[i][1] += v1;
                    this.data.particleV[i][1] /= 2;
                }

                for (var i = 0; i < this.N; i++) {
                    if (this.data.particleM[i])
                        continue;
                    this.data.particleX[i] += stepRate*this.data.particleV[i][0];
                    this.data.particleY[i] += stepRate*this.data.particleV[i][1];
                }
            }

            this.data.needRender = true;
            this.data.lastRateDate = Date.now();
            this.requestAnimFrame(this.draw.bind(this));
        }
    }
});

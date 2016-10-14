// jQuery required

window.MrHellish                           = window.MrHellish || {};
window.MrHellish.Lab                       = window.MrHellish.Lab || {};

window.MrHellish.Lab.GameOfLife = function(options) {
    this.initialize(options);
}

$.extend(window.MrHellish.Lab.GameOfLife.prototype, {
    options: {
        $canvasImage: null,
        $canvasBkg: null
    },
    data: {
        cells        : {
            M    : null,
            N    : null,
            size : 10   ,
            grid : null,
        },
        needRender   : true,
        lastRateDate : null,
        FPS          : 13
    },
    canvasImage: null,
    canvasBkg: null,
    initialize: function (options) {
        window.requestAnimFrame =
            window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };

        this.options = $.extend({}, this.options, options);

        if (typeof this.options.$canvasImage === 'undefined') {
            console.error('Option "$canvasImage" is required.');
            return;
        }

        this.canvasImage = this.options.$canvasImage.get(0);
        this.canvasBkg   = this.options.$canvasBkg.get(0);

        this.canvasImage.width = this.options.$canvasImage.width();
        this.canvasImage.height = this.options.$canvasImage.height();

        this.canvasBkg.width = this.options.$canvasBkg.width();
        this.canvasBkg.height = this.options.$canvasBkg.height();

        cellSize = this.data.cells.size;
        M = Math.ceil(this.canvasImage.width/cellSize);
        N = Math.ceil(this.canvasImage.height/cellSize);

        this.data.cells.M = M;
        this.data.cells.N = N;
        this.data.cells.grid = Array(M);
        grid = this.data.cells.grid;
        for (var x = 0; x < M; x++) {
            grid[x] = Array(N);
            for (var y = 0; y < N; y++) {
                // grid[x][y] = false;
                grid[x][y] = Math.round((Math.random()*1000))%3 == 0;
            }
        }

        this.drawBkg();

        window.requestAnimFrame(this.render.bind(this));
        window.requestAnimFrame(this.rate.bind(this));
    },
    drawBkg: function() {
        ctx = this.canvasBkg.getContext('2d');

        gradient = ctx.createLinearGradient(0, 0, this.canvasBkg.width, 0);
        gradient.addColorStop(0, '#000');
        gradient.addColorStop(1, '#222');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvasBkg.width, this.canvasBkg.height);

        gradient = ctx.createRadialGradient(this.canvasBkg.width/2, this.canvasBkg.height/2, 0, this.canvasBkg.width/2, this.canvasBkg.height/2, this.canvasBkg.width/2);
        gradient.addColorStop(0, 'rgba(154, 33, 162, 0.7)');
        gradient.addColorStop(1, 'rgba(176, 8, 47, 0.2)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvasBkg.width, this.canvasBkg.height);

        gradient = ctx.createRadialGradient(0, this.canvasBkg.height/2, this.canvasBkg.height/2, this.canvasBkg.width/2, this.canvasBkg.height, this.canvasBkg.height*2);
        gradient.addColorStop(0, 'rgba(100, 180, 120, 0.4)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvasBkg.width, this.canvasBkg.height);
    },
    render: function () {
        if (this.data.needRender) {
            M = this.data.cells.M;
            N = this.data.cells.N;
            grid = this.data.cells.grid;
            cellSize = this.data.cells.size;

            ctx = this.canvasImage.getContext('2d');
            ctx.fillStyle = '#2f9';

            ctx.clearRect(0, 0, this.canvasImage.width, this.canvasImage.height);
            ctx.beginPath();
            for (var x = 0; x < M; x++) {
                for (var y = 0; y < N; y++) {
                    if (grid[x][y]) {
                        // ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
                        ctx.moveTo(x*cellSize, y*cellSize);
                        ctx.arc(x*cellSize + cellSize/2, y*cellSize + cellSize/2, cellSize/2, 0, 2*Math.PI, false );
                    }
                }
            }
            ctx.fill();
            ctx.closePath();
            this.data.needRender = false;
        }
        window.requestAnimFrame(this.render.bind(this));
    },
    rate: function() {
        fps = this.data.FPS;
        if (this.data.lastRateDate == null ||
            (Date.now() - this.data.lastRateDate) >= 1000/fps) {

            M = this.data.cells.M;
            N = this.data.cells.N;
            grid = this.data.cells.grid;
            tmpGrid = Array(M);
            for (var x = 0; x < M; x++) {
                tmpGrid[x] = Array(N);
                for (var y = 0; y < N; y++) {
                    tmpGrid[x][y] = false;
                }
            }
            var neighbours;
            for (var x = 0; x < M; x++) {
                for (var y = 0; y < N; y++) {
                    /*neighbours =
                        (x > 0 && y > 0 ? grid[x-1][y-1] : 0) + (x > 0 ? grid[x-1][y] : 0) + (x > 0 && y < N-1 ? grid[x-1][y+1] : 0) +
                        (         y > 0 ? grid[x][y-1] : 0)   +              0             + (         y < N-1 ? grid[x][y+1] : 0) +
                        (x < M-1 && y > 0 ? grid[x+1][y-1] : 0) + (x < M-1 ? grid[x+1][y] : 0) + (x < M-1 && y < N-1 ? grid[x+1][y+1] : 0);
                    */
                    // with toroidal array:
                    neighbours =
                        grid[(M + x-1)%M][(N + y-1)%N] + grid[(M + x-1)%M][y] + grid[(M + x-1)%M][(N + y+1)%N] +
                        grid[x][(N + y-1)%N] +                    0           + grid[x][(N + y+1)%N] +
                        grid[(M + x+1)%M][(N + y-1)%N] + grid[(M + x+1)%M][y] + grid[(M + x+1)%M][(N + y+1)%N];
                    if (neighbours == 3 || (grid[x][y] && neighbours == 2)) {
                        tmpGrid[x][y] = true;
                    }
                }
            }

            this.data.cells.grid = tmpGrid;
            this.data.lastRateDate = Date.now();
            this.data.needRender = true;
        }
        window.requestAnimFrame(this.rate.bind(this));
    }

});

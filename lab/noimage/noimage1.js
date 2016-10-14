// jQuery required

window.MrHellish                           = window.MrHellish || {};
window.MrHellish.Lab                       = window.MrHellish.Lab || {};
window.MrHellish.Lab.NoImage               = window.MrHellish.Lab.NoImage || {};

window.MrHellish.Lab.NoImage.AwesomeSmiley = function(options) {
    this.initialize(options);
}

$.extend(window.MrHellish.Lab.NoImage.AwesomeSmiley.prototype, {
    options: {
        $wrapper: null,
        $canvasImage: null,
        $canvasBkg: null
    },
    data: {
        leftEyeOffsetX: 0,
        rightEyeOffsetX: 0
    },
    canvasBkg: null,
    canvasImage: null,
    initialize: function (options) {
        this.options = $.extend({}, this.options, options);

        if (typeof this.options.$canvasImage === 'undefined') {
            console.error('Option "$canvasImage" is required.');
            return;
        }

        if (typeof this.options.$canvasBkg === 'undefined') {
            console.error('Option "$canvasBkg" is required.');
            return;
        }

        this.canvasImage = this.options.$canvasImage.get(0);
        this.canvasBkg   = this.options.$canvasBkg.get(0);

        if (this.options.$wrapper) {
            this.canvasBkg.width  = this.options.$wrapper.get(0).offsetWidth;
            this.canvasBkg.height = this.options.$wrapper.get(0).offsetHeight;

            this.canvasImage.width = this.canvasImage.height = Math.min(
                this.options.$wrapper.get(0).offsetWidth,
                this.options.$wrapper.get(0).offsetHeight
            );
        }

        this.drawBkg();
        this.drawImage();
    },
    drawBkg: function() {
        ctx = this.canvasBkg.getContext('2d');

        gradient = ctx.createLinearGradient(0, 0, this.canvasBkg.width, 0);
        gradient.addColorStop(0, '#000');
        gradient.addColorStop(1, '#333');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvasBkg.width, this.canvasBkg.height);

        gradient = ctx.createRadialGradient(this.canvasBkg.width, this.canvasBkg.height * 0.6, 0, this.canvasBkg.width, this.canvasBkg.height * 0.6, this.canvasBkg.width);
        gradient.addColorStop(0, 'rgba(200, 200, 100, 0.5)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvasBkg.width, this.canvasBkg.height);

        gradient = ctx.createRadialGradient(this.canvasBkg.width/2, this.canvasBkg.height, this.canvasBkg.height/2, this.canvasBkg.width/2, this.canvasBkg.height, this.canvasBkg.height*2);
        gradient.addColorStop(0, 'rgba(100, 200, 200, 0.2)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvasBkg.width, this.canvasBkg.height);
    },
    drawImage: function() {
        ctx = this.canvasImage.getContext('2d');
        cW = this.canvasImage.width;
        cH = this.canvasImage.height;
        this.data.leftEyeOffsetX = cW*-0.256;
        this.data.rightEyeOffsetX = cW*0.167;
        ctx.beginPath();
        ctx.arc(cW/2, cH/2, cH/2 - cH*0.011, 0, 2*Math.PI, false );
        ctx.closePath();
        ctx.fillStyle = '#fedd58';
        ctx.fill();
        ctx.lineWidth = cW*0.022;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        this.awesomeSmileMouthPath = function(ctx) {
            ctx.beginPath();
            ctx.moveTo(cW*0.15, cH*0.6);
            ctx.lineTo(cW*0.80, cH*0.6);
            ctx.moveTo(cW*0.80 - cW*0.011 , cH * 0.6);
            ctx.bezierCurveTo(
                cW*0.8, cH,
                cW*0.3, cH + cH*0.033,
                cW*0.15 + cW*0.033 , cH*0.6
            );

            ctx.closePath();
        }

        this.awesomeSmileMouthPath(ctx);
        ctx.fillStyle = '#871a44';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cW/2 + cW*0.22 , cH*0.6 + cH*0.22);
        ctx.bezierCurveTo(
            cW/2, cH*0.6,
            cW/2 - cW*0.22 , cH*0.6 + cH*0.53,
            cW/2 + cW*0.22 , cH*0.6 + cH*0.22
        );
        ctx.closePath();

        ctx.fillStyle = '#f9bede';
        ctx.fill();

        this.awesomeSmileMouthPath(ctx);
        ctx.stroke();

        this.drawImageEye(this.data.leftEyeOffsetX);
        this.drawImageEye(this.data.rightEyeOffsetX);


        $('body').on('mousemove', this.onMouseMove.bind(this));
        $('body').on('touchmove', this.onTouchMove.bind(this));
    },
    drawImageEye: function (offsetX, targetX, targetY) {
        ctx = this.canvasImage.getContext('2d');
        cW = this.canvasImage.width;
        cH = this.canvasImage.height;
        x = cW/2 + offsetX;
        y = cH*0.48;
        ctx.beginPath();
        ctx.moveTo(x - cW*0.11, y);
        ctx.lineTo(x + cW*0.11, y);
        ctx.bezierCurveTo(
            x + cW*0.156, y - cH*0.267,
            x - cW*0.156, y - cH*0.267,
            x - cW*0.11, y
        );
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        eyeOriginX = x;
        eyeOriginY = y - cH*0.139 + cH*0.051;
        angle = null;
        r = cH*0.051;
        if (targetX || targetY) {
            targetX -= this.canvasImage.offsetLeft;
            targetY -= this.canvasImage.offsetTop;
            diffX = targetX-eyeOriginX;
            diffY = targetY-eyeOriginY;
            if (r*r > diffX*diffX + diffY*diffY) {
                angle = -1;
            } else {
                angle = Math.atan2(diffX, diffY);
            }
        } else angle = Math.PI*5.7/8;

        if (angle == -1)
            ctx.arc(targetX, targetY, cH*0.037, 0, 2 * Math.PI, false);
        else
            ctx.arc(eyeOriginX + r*Math.sin(angle), eyeOriginY + r*Math.cos(angle), cH*0.037, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    },
    onMouseMove: function(event) {
        var targetX = event.pageX;
        var targetY = event.pageY;
        targetX -= this.options.$wrapper.offset().left;
        targetY -= this.options.$wrapper.offset().top;

        this.drawImageEye(this.data.leftEyeOffsetX, targetX, targetY);
        this.drawImageEye(this.data.rightEyeOffsetX, targetX, targetY);
    },
    onTouchMove: function(event) {
        if (event.targetTouches.length == 1) {
            var targetX = event.targetTouches[0].pageX;
            var targetY = event.targetTouches[0].pageY;
            targetX -= this.options.$wrapper.offset().left;
            targetY -= this.options.$wrapper.offset().top;

            this.drawImageEye(this.data.leftEyeOffsetX, targetX, targetY);
            this.drawImageEye(this.data.rightEyeOffsetX, targetX, targetY);
        } else if (event.targetTouches.length >= 2) {
            var target1X = event.targetTouches[0].pageX;
            var target1Y = event.targetTouches[0].pageY;
            var target2X = event.targetTouches[1].pageX;
            var target2Y = event.targetTouches[1].pageY;

            targetY -= this.options.$wrapper.offset().left;
            targetY -= this.options.$wrapper.offset().top;

            this.drawImageEye(this.data.leftEyeOffsetX, target1X, target1X);
            this.drawImageEye(this.data.rightEyeOffsetX, target2X, target2Y);
        }
        return false;
    }
});

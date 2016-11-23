// jQuery required

window.MrHellish                  = window.MrHellish || {};
window.MrHellish.Lab              = window.MrHellish.Lab || {};
window.MrHellish.Lab.KanaPractice = window.MrHellish.Lab.KanaPractice || {};

window.MrHellish.Lab.KanaPractice = function(options) {
    this.initialize(options);
}

$.extend(window.MrHellish.Lab.KanaPractice.prototype, {
    options: {
        $canvas: null
    },
    score: 0,
    canvas: null,
    canvasCtx: null,
    currentKanaOffset: 0,
    currentRomajiString: '',
    currentKana: null,
    kanaQueue: [],
    kanaHistory: [],
    movementOffset: 0,
    kanaMap: [
        // ["っ", "__dub_next_first_char__"],
        // ["ゐ", "wi"],
        // ["ゑ", "we"],
        // ["ゝ", "(reduplicates and\nunvoices syllable)"],
        // ["ゞ", "(reduplicates and\nvoices syllable)"],
        ["あ", "a"], ["い", "i"], ["う", "u"], ["え", "e"], ["お", "o"],
        ["か", "ka"], ["き", "ki"], ["く", "ku"], ["け", "ke"], ["こ", "ko"],
        ["が", "ga"], ["ぎ", "gi"], ["ぐ", "gu"], ["げ", "ge"], ["ご", "go"],
        ["さ", "sa"], ["し", "shi"], ["す", "su"], ["せ", "se"], ["そ", "so"],
        ["ざ", "za"], ["じ", "ji"], ["ず", "zu"], ["ぜ", "ze"], ["ぞ", "zo"],
        ["た", "ta"], ["ち", "chi"], ["つ", "tsu"], ["て", "te"], ["と", "to"],
        ["だ", "da"], ["ぢ", "ji"], ["づ", "zu"], ["で", "de"], ["ど", "do"],
        ["な", "na"], ["に", "ni"], ["ぬ", "nu"], ["ね", "ne"], ["の", "no"],
        ["は", "ha"], ["ひ", "hi"], ["ふ", "fu"], ["へ", "he"], ["ほ", "ho"],
        ["ば", "ba"], ["び", "bi"], ["ぶ", "bu"], ["べ", "be"], ["ぼ", "bo"],
        ["ぱ", "pa"], ["ぴ", "pi"], ["ぷ", "pu"], ["ぺ", "pe"], ["ぽ", "po"],
        ["ま", "ma"], ["み", "mi"], ["む", "mu"], ["め", "me"], ["も", "mo"],
        ["や", "ya"], ["ゆ", "yu"], ["よ", "yo"],
        ["ら", "ra"], ["り", "ri"], ["る", "ru"], ["れ", "re"], ["ろ", "ro"],
        ["わ", "wa"], ["を", "wo"],
        ["ん", "n"],
        // ["ゔ", "vu"],
        // ["きゃ", "kya"], ["きゅ", "kyu"], ["きょ", "kyo"], ["ぎゃ", "gya"],
        // ["ぎゅ", "gyu"], ["ぎょ", "gyo"],
        // ["しゃ", "sha"], ["しゅ", "shu"], ["しょ", "sho"],
        // ["じゃ", "ja"], ["じゅ", "ju"], ["じょ", "jo"],
        // ["ちゃ", "cha"], ["ちゅ", "chu"], ["ちょ", "cho"],
        // ["ぢゃ", "ja"], ["ぢゅ", "ju"], ["ぢょ", "jo"],
        // ["にゃ", "nya"], ["にゅ", "nyu"], ["にょ", "nyo"],
        // ["ひゃ", "hya"], ["ひゅ", "hyu"], ["ひょ", "hyo"],
        // ["びゃ", "bya"], ["びゅ", "byu"], ["びょ", "byo"],
        // ["ぴゃ", "pya"], ["ぴゅ", "pyu"], ["ぴょ", "pyo"],
        // ["みゃ", "mya"], ["みゅ", "myu"], ["みょ", "myo"],
        // ["りゃ", "rya"], ["りゅ", "ryu"], ["りょ", "ryo"]
    ],
    basicWords: ["にんげん","じんるい","ひと","おとこ","おとこのひと","おとこのこ","おんな","おんなのひと","おんなのこ","あかちゃん","わかもの","わたし","わたくし","ぼく","おれ","あたし","しょうじょ","しょうねん","いしゃ","かんごし","かんごふ","しかい","せいじか","べんごし","しょうぼうし","けいさつかん","へいし","けんちくか","せんせい","きょうし","かしゅ","エンジニア","あし","かかと","すね","ひざ","もも","あたま","かお","くち","くちびる","は","はな","め","ひげ","かみ","みみ","い","うで","ひじ","かた","つめ","て","てくび","てのひら","ゆび","しり","おなか","かんぞう","きも","きんにく","くび","こころ","こし","しんぞう","せなか","ち","にく","はだ","ひふ","ほね","むね","かぜ","げり","びょうき","かぞく","りょうしん","こども","ちち","はは","つま","おっと","あに","あね","おとうと","いもうと","きょうだい","しまい","そふ","そぼ","まご","おじ","おば","いとこ","めい","おい","いきもの","ばけもの","どうぶつ","いぬ","ねこ","うし","ぶた","うま","ひつじ","さる","ねずみ","とら","オオカミ","うさぎ","りゅう","しか","かえる","がま","しし","キリン","ぞう","とり","にわとり","すずめ","からす","わし","たか","さかな","たい","えび","いわし","まぐろ","かつお","さんま","あじ","さば","イカ","タコ","むし","ちょう","ガ","せみ","トンボ","バッタ","クモ","ホタル","ハエ","カ","ゴキブリ","カタツムリ","ナメクジ","ミミズ","かい","かいがら","トカゲ","へび","しょくぶつ","くさ","はな","み","き","は","ね","くき","きのこ","きく","さくら","こめ","いね","むぎ","やさい","くだもの","いも","まめ","だいこん","にんじん","リンゴ","ミカン","バナナ","ナシ","クリ","モモ","トマト","スイカ","たべもの","ちょうしょく","ひるごはん","ばんごはん","ごはん","みそ","りょうり","サラダ","デザート","パン","サンドイッチ","おやつ","アイスクリーム","のみもの","おちゃ","コーヒー","ぎゅうにゅう","さとう","しお","しょうゆ","じかん","とき","こよみ","ふん","びょう","ひ","つき","とし","きのう","きょう","あした","あさ","ひる","ゆうがた","ばん","よる","ようび","げつようび","かようび","すいようび","もくようび","きんようび","どようび","にちようび","しゅう","いっしゅうかん","たいよう","つき","ほし","てんき","はれ","あめ","くもり","ゆき","かぜ","かみなり","たいふう","あらし","そら","きた","ひがし","みなみ","にし","ここ","そこ","あそこ","みぎ","ひだり","うえ","した","まえ","うしろ","むこう","ななめ","てまえ","おく","ちかい","みず","ゆ","こおり","ゆげ","ひ","ガス","くうき","つち","きんぞく","どろ","けむり","てつ","どう","きん","ぎん","なまり","しお","メートル","リットル","グラム","キロ","ミリ","センチメートル","インチ","しゃかい","けいざい","かいしゃ","かいぎ","がっこう","やくしょ","みせ","ホテル","こうじょう","かね","さつ","こぜに","つりせん","じどうはんばいき","きっぷ","きって","つくえ","いす","たたみ","と","とびら","ドア","まど","ふとん","げんかん","いえ","エレベーター","エスカレーター","でんき","くぎ","ひも","なわ","ふくろ","かばん","かさ","かぎ","ちょうこく","ぶんぼうぐ","インク","ペン","ボールペン","まんねんひつ","えんぴつ","ふで","チョーク","けしゴム","えんぴつけずり","じょうぎ","ノート","にっき","カバー","ふうとう","はさみ","ホッチキス","ふく","ようふく","きもの","わふく","そで","えり","ボタン","チャック","ベルト","くつ","くつした","めがね","てつどう","えき","ひこうき","くうこう","みち","どうろ","バスてい","とおり","でんしゃ","くるま","もじ","じ","かんじ","ひらがな","カタカナ","すうじ","アルファベット","ローマ字","がいこくご","にほんご","えいご","ちゅうごくご","どいつご","すぺいんご","ふらんすご","ちょうせんご","ほん","かみ","てがみ","しんぶん","じしょ","パソコン","いろ","あか","きいろ","みどり","あお","むらさき","しろ","くろ","ピンク","ちゃいろ","はいいろ","オレンジ","え","おんがく","りか","さんすう","れきし","ちり","たいいく","スポーツ","システム","じょうほう","ひつよう","べんきょう","いらい","れい","いち","に","さん","よん","ご","ろく","なな","はち","きゅう","じゅう","ひゃく","せん","まん","おく","ひとつ","ふたつ","みっつ","よっつ","いつつ","むっつ","ななつ","やっつ","ここのつ","とお","これ","それ","あれ","どれ","こちら","そちら","あちら","どちら","ひみつ","じどう","ないよう","はば","せいしき","けっこん","げんざい","いま","かこ","みらい","いい","すごい","すばらしい","わるい","たかい","ひくい","やすい","おおきい","ちいさい","ほそい","ふとい","ふるい","あたらしい","わかい","かるい","おもい","やさしい","むずかしい","やわらかい","かたい","あつい","つめたい","さむい","おいしい","うまい","まずい","あまい","からい","しょっぱい","にがい","うれしい","かなしい","さびしい","さみしい","こわい","いたい","かゆい","くさい","つらい","する","やる","いる","ある","なる","おこる","現れる","いきる","うむ","しぬ","壊れる","いく","くる","かえる","あるく","とぶ","およぐ","うごく","おどる","ねる","うたう","かむ","たべる","のむ","さわる","なげる","もつ","うつ","なぐる","さす","さす","さす","ける","すわる","たつ","はしる","あく","こむ","いる","かわく","みだす","みだれる","つかえる","そなわる","すぐれる","ひえる","さめる","さめる","むく","たおれる","かたまる","うまる","うもれる","ます","ふえる","へる","はずれる","ふとる","はじまる","おわる","きめる","みる","きく","さわる","かぐ","いう","はなす","かたる","かく","よむ","つかう","つくる","なおす","すてる","とる","おく","かなしむ","なく","わらう","おこる","ほめる","しかる","よろこぶ","よろこび","なぐさめる","あきる","おどろく","あう","あける","あそぶ","あつまる","うる","える","おる","かう","きる","きる","はく","かえる","かえる","しめる","しめる","しめる","しる","つかれる","でかける","はたらく","はなす","やすむ","わかれる","わかれる","もう","まだ","ずっと","とても","こう","そう","ああ","どう","しばしば","この","その","あの","どの","はい","いいえ","でも","しかし","そして","それに","なぜなら","う","せる","れる","そうだ","た","たい","だろう","ない","ぬ","ます","が","で","と","に","の","へ","まで","から","より","を","は","も","や","および","か","かも","そして","それとも","だの","つつ","て","と","ながら","ならびに","なり","に","の","ので","また","または","も","や","ね","か","な","かしら","さ","っけ","こそ","さえ","しか","すら","くらい","だけ","だって","ったら","って","でも","どころ","など","なら","なんか","なんて","は","ばかり","まで","も"],
    requestAnimationFrame: function(f) {},
    isRomajiFinishedOrInvalid: function(romaji) {
        if (romaji == 'n') {
            return false;
        }

        if (romaji.match(/^((sh|ch|j)(e|ya|yu|yo))$/)) {
            return true;
        }

        return
            romaji.match(/^([kgsztdnahbpmr]|sh]|ch|ts|j)?([aiueo]|ya|yu|yo)$/)
        ;
    },
    initialize: function (options) {
        this.options = $.extend({}, this.options, options);

        if (typeof this.options.$canvas === 'undefined') {
            console.error('Option "$canvas" is required.');
            return;
        }
        this.canvas   = this.options.$canvas.get(0);

        this.canvas.width  = this.options.$canvas.outerWidth();
        this.canvas.height = this.options.$canvas.outerHeight();
        this.canvasCtx     = this.canvas.getContext('2d');;

        this.requestAnimationFrame = (function() {
            return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout( callback, (1000/50) << 0 );
            };
        })();

        $(window).on('keyup', this.keyup.bind(this));

        for (var i = 0; i < 10; i++) {
            this.kanaQueue.push(
                this.kanaMap[(Math.random()*this.kanaMap.length)%this.kanaMap.length << 0]
            );
        }

        this.requestDraw();
        this.rate();
    },
    keyup: function(e) {
        var charCode = e.which || e.keyCode;
        if (charCode == 0) { return; }

        var char = String.fromCharCode(charCode).toLowerCase();
        if (e.ctrlKey) { return; }

        forceKanaCheck = false;
        switch (charCode) {
            case 8: // Backspace
                this.currentRomajiString = this.currentRomajiString.substr(0, this.currentRomajiString.length - 1);
                break;
            case 32: // Space
                forceKanaCheck = true;
            default:
                if (char.match(/^\w$/)) {
                    this.currentRomajiString += char;
                }

                if (forceKanaCheck || this.currentRomajiString == this.kanaQueue[0][1]) {
                    var kana = this.kanaQueue.shift().slice(0);
                    if (this.currentRomajiString == kana[1]) {
                        kana[2] = true;
                        this.score++;
                    } else {
                        kana[2] = false;
                    }
                    this.kanaHistory.push(kana);
                    this.kanaQueue.push(
                        this.kanaMap[(Math.random()*this.kanaMap.length)%this.kanaMap.length << 0]
                    );

                    this.canvasCtx.font = '80px Helvetica';
                    this.movementOffset += this.canvasCtx.measureText(kana[0]).width;
                    this.currentRomajiString = '';
                }

                break;
        }
        this.requestDraw();
    },
    requestDraw: function() {
        this.requestAnimationFrame.call(window, this.draw.bind(this));
    },
    rate: function() {
        this.movementOffset -= 1;
        this.requestDraw();

        setTimeout((function() {
            this.rate();
        }).bind(this), (1000/60) << 0);
    },
    draw: function() {
        var textWidth, i;
        var canvasWidth  = this.canvas.width;
        var canvasHeight = this.canvas.height;
        this.canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

        this.canvasCtx.font      = '80px Helvetica';
        textWidth = this.canvasCtx.measureText(this.kanaQueue[0][0]).width;

        this.canvasCtx.font      = '40px Helvetica';
        this.canvasCtx.fillStyle = '#fff';
        this.canvasCtx.textAlign = 'center';
        this.canvasCtx.fillText(
            this.currentRomajiString,
            canvasWidth/2 + textWidth/2 + this.movementOffset,
            canvasHeight/2 - canvasHeight/4 + 40
        );

        this.canvasCtx.textAlign = 'left';
        this.canvasCtx.font      = '80px Helvetica';

        var currentKanas = '';
        var x = canvasWidth/2 + this.currentKanaOffset + this.movementOffset;
        for (i = 0; i < this.kanaQueue.length; i++) {
            this.canvasCtx.fillText(
                this.kanaQueue[i][0],
                x,
                canvasHeight/2 - canvasHeight/4
            );

            x += this.canvasCtx.measureText(this.kanaQueue[i][0]).width;
        }

        var x = canvasWidth/2 + this.currentKanaOffset + this.movementOffset;
        for (i = this.kanaHistory.length - 1; i >= 0 ; i--) {
            this.canvasCtx.font      = '80px Helvetica';
            this.canvasCtx.textAlign = 'right';

            if (this.kanaHistory[i][2]) {
                this.canvasCtx.fillStyle = '#00ff00';
            } else {
                this.canvasCtx.fillStyle = '#ff0000';
            }

            this.canvasCtx.fillText(
                this.kanaHistory[i][0],
                x,
                canvasHeight/2 - canvasHeight/4
            );

            textWidth = this.canvasCtx.measureText(this.kanaHistory[i][0]).width;

            this.canvasCtx.fillStyle = '#ffffff';
            this.canvasCtx.textAlign = 'center';
            this.canvasCtx.font      = '40px Helvetica';

            this.canvasCtx.fillText(
                this.kanaHistory[i][1],
                x - textWidth/2,
                canvasHeight/2 - canvasHeight/4 + 40
            );


            x -= textWidth;
        }


    }
});

(function () {
    let ie = !!(window.attachEvent && !window.opera);
    let webkit = /webkit\/(\d+)/i.test(navigator.userAgent) && ~~RegExp.$1 < 525;
    let fn = [];
    let run = function () {
        for (var i = 0; i < fn.length; i++) fn[i]();
    };
    document.ready = function (f) {
        if (!ie && !webkit && document.addEventListener) {
            return document.addEventListener("DOMContentLoaded", f, false);
        }
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
                try {
                    document.documentElement.scroll({ left: 0 });
                    run();
                } catch (err) {
                    setTimeout(arguments.callee, 0);
                }
            })();
        else if (webkit)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(document.readyState)) clearInterval(t), run();
            }, 0);
    };
})();

var handle;
var vpanel, clip;
document.ready(() => {
    handle = document.querySelector("#rectPlayer .cpanel .handle");
    var volumn = document.querySelector("#rectPlayer .cpanel .volume");
    handle.addEventListener("click", this.expandorhide);
    volumn.addEventListener("DOMMouseScroll", scrollFunc, false);
    volumn.onmousewheel = scrollFunc;

    var ol = document.getElementById("openlist");
    ol.addEventListener("click", this.openlist);
    var vt = document.getElementById("volume-track");
    vpanel = document.getElementById("volume");
    vt.addEventListener("click", this.tc);
});

function expandorhide() {
    var player = document.getElementById("rectPlayer");
    var classl = player.classList;
    classl.contains("panel-on")
        ? (classl.remove("panel-on"), classl.add("panel-off"))
        : classl.contains("panel-off")
        ? (classl.remove("panel-off"), classl.add("panel-on"))
        : classl.add("panel-on");
    
}

function openlist(e) {
    var player = document.getElementById("rectPlayer");
    var classl = player.classList;
    classl.contains("list-on")
        ? (classl.remove("list-on"), classl.add("list-off"))
        : classl.contains("list-off")
        ? (classl.remove("list-off"), classl.add("list-on"))
        : classl.add("list-on");
}

function tc(e) {
    clip = vpanel.getBoundingClientRect();

    //   console.log(e, clip);

    var cw = clip.width / 2;
    var ch = clip.height / 2;
    var x1 = e.clientX - clip.x,
        y1 = e.clientY - clip.y;

    var ang = getAngle(
        {
            x: cw - cw,
            y: 0 - ch,
        },
        {
            x: x1 - cw,
            y: y1 - ch,
        }
    );

    console.log(ang, x1, y1);
    vl = (ang / 360) * 6000;
    drawcir(vl);
}

var vl = 0;

const getAngle = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
    const dot = x1 * x2 + y1 * y2;
    const det = x1 * y2 - y1 * x2;
    const angle = (Math.atan2(det, dot) / Math.PI) * 180;
    return (angle + 360) % 360;
};

function scrollFunc(e) {
    e = e || window.event;
    var data;
    if (e.wheelDelta) {
        //IE/Opera/Chrome
        data = e.wheelDelta;
    } else if (e.detail) {
        //Firefox
        data = e.detail;
    }
    vl += data;
    vl = vl < 6000 ? (vl < 0 ? 0 : vl) : 6000;
    drawcir(vl);
    vpanel.title = "音量 ：" + ((vl / 6000) * 100).toFixed(0);
}

function drawcir(vl) {
    let ang = vl / 6000;
    var A = ang * Math.PI * 2;
    var x = 24 * Math.sin(A);
    var y = 24 * Math.cos(A);
    x = 32 + x;
    y = 32 - y;

    var pathd = "";
    if (ang < 0.5) pathd = "M 32,8 A 24 24 0 0 1 " + x + " " + y;
    else if (ang == 1) pathd = "M 32,8 A 24 24 0 1 1 " + (x - 0.01) + " " + y;
    else pathd = "M 32,8 A 24 24 0 1 1 " + x + " " + y;
    var vpath = document.getElementById("volume-path");
    //var vnum = document.getElementById("volume-num");
    vpath.setAttribute("d", pathd);
    // vnum.innerHTML = (ang*100).toFixed(0);

    var volumn = document.querySelector("#rectPlayer .cpanel .volume");
    if (vl == 0) {
        volumn.classList.add("mute");
    } else {
        volumn.classList.contains("mute") ? volumn.classList.remove("mute") : null;
    }
}
var cc = new Object();

cc.element = null;
cc.elementsrc = null;
cc.audioContext = null;
cc.source = null;
cc.analyser = null;
cc.farr = [];

function Init(cc) {
    window.AudioContext =
        window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    try {
        cc.audioContext = new AudioContext();
    } catch (e) {
        console.log(e);
    }
    cc.source = cc.audioContext.createGain();
    cc.element = document.getElementById("source");
    cc.elementsrc = cc.audioContext.createMediaElementSource(cc.element);
    cc.analyser = cc.audioContext.createAnalyser();
    cc.analyser.smoothingTimeConstant = 0.86;
    cc.analyser.fftSize = 128;
    cc.elementsrc.connect(cc.source);
    cc.source.connect(cc.analyser);
    cc.analyser.connect(cc.audioContext.destination);
    cc.source.connect(cc.audioContext.destination);
    cc.farr = new Uint8Array(cc.analyser.frequencyBinCount);
    // cc.source.connect(cc.audioContext.destination);
}

function play(cc) {
    cc.element.play();
    setInterval(showbuffer, 500, cc);
}

function showbuffer(cc) {
    cc.analyser.getByteFrequencyData(cc.farr);
    console.log(cc.farr);
}

var Visualizer = function (config) {
    this.audioContext = null;
    this.analyser = null;
    this.source = null; //the audio source
    this.config = config;
    this.frequency = [];
    this.playing = false;
    this.ready = false;
    this.loadFailed = false;
};

Visualizer.prototype = {
    init: function () {
        this._prepare();
        this.getData();
        this._analyser();
    },

    _prepare: function () {
        //实例化一个音频上下文类型window.AudioContext。目前Chrome和Firefox对其提供了支持，但需要相应前缀，Chrome中为window.webkitAudioContext，Firefox中为mozAudioContext。
        // 所以为了让代码更通用，能够同时工作在两种浏览器中，只需要一句代码将前缀进行统一即可。
    },

    _analyser: function () {
        var that = this;
        that.analyser = that.audioContext.createAnalyser();
        that.analyser.smoothingTimeConstant = 0.85;
        that.analyser.fftSize = 32; //傅里叶变换参数 简化成16个元素数组
        //将source与分析器连接
        that.source.connect(that.analyser);
        //将分析器与destination连接，这样才能形成到达扬声器的通路
        that.analyser.connect(that.audioContext.destination);
        that.frequency = new Uint8Array(that.analyser.frequencyBinCount);
    },
    getData: function () {
        var that = this;
        //建立缓存源
        that.source = that.audioContext.createBufferSource();
        var request = new XMLHttpRequest();
        //请求资源
        request.open("GET", that.config.url, true);
        request.responseType = "arraybuffer";
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                that.ready = true;

                // if (request.status === 200) {
                //     that.ready = true;
                // } else {
                //     that.loadFailed = true;
                // }
                console.log("Fetch");
                var audioData = request.response;
                //解码
                that.audioContext.decodeAudioData(
                    audioData,
                    function (buffer) {
                        that.source.buffer = buffer;
                        console.log(buffer.duration); //资源长度
                        that.source.connect(that.audioContext.destination);
                        // 将audioBufferSouceNode连接到audioContext.destination，
                        // 这个AudioContext的destination也就相关于speaker（扬声器）。
                        that.source.loop = that.config.loop || false;
                    },
                    function (e) {
                        "Error with decoding audio data" + e.err;
                    }
                );
            }
        };

        request.send();
    },
    play: function () {
        var that = this;
        that.source.start();
        that.playing = true;
        var timer = setInterval(function () {
            that.analyser.getByteFrequencyData(that.frequency);
            if (that.source.buffer) {
                if (that.audioContext.currentTime > that.source.buffer.duration) {
                    that.source.stop(0);
                    that.playing = false;
                    clearInterval(timer);
                }
            }
        }, 100);
    },
    stop: function () {
        var that = this;
        that.source.stop(0);
        that.playing = false;
    },
};

(function(){
    switch("2"){

        case "0"||"1"||"2":console.log("Ca");
        case "2":console.log("Ca");
        case "10":console.log("Cass");
    }
})();

// setInterval(function () {
//     if(v.ready){
//           console.log("ready!");
//     } else if(v.loadFailed){
//           console.log("加载失败");
//     }
//     if (v.playing){ //playing判断是否在播放
//         console.log(v.frequency);//frequency是长度为16的频率值数组
//     }
// },100);

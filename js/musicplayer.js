//Muisc player implementation
var music;
$(".play-button").on("click", function () {
    $(this).toggleClass("playing");
    $(this).find(".fa").toggleClass("fa-play").toggleClass("fa-pause");
    var fastforward = $(this).parent().find(".fast-forward");
    fastforward.fadeToggle(1000);
    var rewind = $(this).parent().find(".rewind");
    rewind.fadeToggle(1000);
    var volume = $(this).parent().find(".volume");
    volume.fadeToggle(1000);
    var download = $(this).parent().find(".download");
    download.fadeToggle(1000);
    var cardimage = $(this).parent().find(".card-image");
    var top = cardimage.height() - 16;
    fastforward.css("top", top + "px");
    rewind.css("top", top + "px");
    volume.css("top", top + "px");
    download.css("top", top + "px");
    var volumeSlider = $(volume).parent().find("#volumeController");
    volumeSlider.on("input", function () {
        var volumeValue = $(volume).parent().find(".value").html();
        if(volumeValue < 2) {
            music.muted = true;
        }
        else {
            music.muted = false;
            music.volume = volumeValue / 100;
        }
    });
    volume.on("click", function () {
        volumeSlider.fadeToggle();
        volumeSlider.css("top", (top - 30) + "px").css("left", "-12px");

    });


    music = $(this).find("#music")[0];
    if(music.paused) {
        music.play();
    }
    else {
        music.pause();
        volumeSlider.css("display","none");
    }
    var playhead = $(this).parent().find("#playhead");
    var timeline = $(this).parent().find("#timeline");
    timeline.fadeToggle();
    music.ontimeupdate = function () {
        timeUpdate(playhead);
    };
    var duration;
    duration = music.duration;
    function timeUpdate(playhead) {
        var playPercent = 95 * (music.currentTime / duration);
        $(playhead).css("margin-left", playPercent + "%");
    }

    var timelineWidth = timeline.width();
    timeline.on("click", function (event) {
        moveplayhead(event);
        music.currentTime = duration * clickPercent(event);
    });

    function clickPercent(event) {
        return (event.clientX - getPosition(timeline)) / timelineWidth;
    }
    function moveplayhead(event) {
        var newMargLeft = event.clientX - getPosition(timeline);
        if(newMargLeft >= 0 && newMargLeft <= timelineWidth) {
            playhead.css("margin-left", newMargLeft + "px");
        }
        if(newMargLeft < 0) {
            playhead.css("margin-left", 0 + "px");
        }
        if(newMargLeft > timelineWidth) {
            playhead.css("margin-left", timelineWidth + "px");
        }
    }
    function getPosition(el) {
        return el[0].getBoundingClientRect().left;
    }
    $(".fast-forward").on("click", function () {
        music.currentTime += 5;
    });
    $(".rewind").on("click", function () {
        music.currentTime -= 5;
    })
});
//End of music player implementation
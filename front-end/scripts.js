const video = document.querySelector('video');
const playButton = document.querySelector('button');
const backwardButton = document.querySelector('[data-skip="-10"]');
const forwardButton = document.querySelector('[data-skip="25"]');
const volumeBar = document.querySelector('[name="volume"]');
const speedBar = document.querySelector('[name="playbackRate"]');
const inputs = document.querySelectorAll('[type=range]');
const fillProgress = document.querySelector('.progress__filled');
let play = false;
let click;

video.onloadedmetadata = function () {

    video.preload = "auto";
    const duration = String(video.duration);
    document.querySelector('[name="currentTime"]').setAttribute('max', `${duration}`);

    function playPause() {
        if (!play) {
            video.play();
            playButton.innerHTML="||";
            play = true;
        }
        else {
            video.pause();
            playButton.innerHTML="►";
            play = false;
        }
    }

    function backwardVid() {
        video.currentTime = video.currentTime -10;
    }

    function forwardVid() {
        video.currentTime = video.currentTime +25;
    }

    function stopProgress() {
        clearInterval(progress);
    }

    function triggerMouseMoveEvent() {
        click = true;
    }

    function stopMouseMoveEvent() {
        click = false;
    }

    function handleOnChangeInputs() {
        console.log(this.name, this.value);
        video[this.name] = this.value;
    }

    function handleOnClickInputs() {
        if (click) {
            console.log(this.name, this.value);
            video[this.name] = this.value;
        }
    }

    
    
    playButton.addEventListener('click', playPause);
    backwardButton.addEventListener('click', backwardVid);
    forwardButton.addEventListener('click', forwardVid);
    inputs.forEach(input => input.addEventListener('mousedown', triggerMouseMoveEvent));
    inputs.forEach(input => input.addEventListener('mouseup', stopMouseMoveEvent));
    inputs.forEach(input => input.addEventListener('change', handleOnChangeInputs));
    inputs.forEach(input => input.addEventListener('mousemove', handleOnClickInputs));
    video.addEventListener('click', playPause);

}




async function initVideo() {

    const video = document.querySelector('video');
    const playButton = document.querySelector('button');
    const backwardButton = document.querySelector('[data-skip="-10"]');
    const forwardButton = document.querySelector('[data-skip="25"]');
    const volumeBar = document.querySelector('[name="volume"]');
    const speedBar = document.querySelector('[name="playbackRate"]');
    const inputs = document.querySelectorAll('[type=range]');
    const fillProgress = document.querySelector('.progress__filled');
    let play = false;
    let progress;
    let fillBar = 0;
    video.preload = "auto";
    console.log(video)



    video.onloadedmetadata = function () {
        const duration = String(video.duration);

        document.querySelector('[name="currentTime"]').setAttribute('max', `${duration}`);

        videoProgress();

        function playPause() {
            if (!play) {
                video.play();
                playButton.innerHTML = "||";
                play = true;
                progress = setInterval(videoProgress, 100);
            }
            else {
                video.pause();
                playButton.innerHTML = "►";
                play = false;
                stopProgress();
            }
        }

        function backwardVid() {
            video.currentTime = video.currentTime - 10;
            videoProgress();
        }

        function forwardVid() {
            video.currentTime = video.currentTime + 25;
            videoProgress();
        }

        function videoProgress() {
            fillBar = video.currentTime === 0 ? video.currentTime : video.currentTime * 100 / video.duration;
            fillProgress.style.flexBasis = `${fillBar}` + "%";
            if (fillBar == 100) {
                play = false;
                playButton.innerHTML = "►";
                stopProgress();
            }
        }

        function stopProgress() {
            clearInterval(progress);
        }

        function handleInputs() {
            console.log('event start')
            console.log(this.name, this.value);
            video[this.name] = this.value;
        }

        playButton.addEventListener('click', playPause);
        backwardButton.addEventListener('click', backwardVid);
        forwardButton.addEventListener('click', forwardVid);
        inputs.forEach(input => input.addEventListener('change', handleInputs));
        inputs.forEach(input => input.addEventListener('mousedown', handleInputs));
        video.addEventListener('click', playPause);

    };


}


initVideo()

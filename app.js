class GuitarKit {
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.currentGuitar = './Guitar B/110 bpm/HMLead110d-01.wav';
        this.currentChug = './Guitar B/110 bpm/Chugs A/HMRhyA Chug-A.wav';
        this.currentPowerchord = 'Guitar B/110 bpm/Powerchords A/HMRhyA Powerchord-A.wav';
        this.guitarAudio = document.querySelector('.guitar-sound');
        this.chugAudio = document.querySelector('.chug-sound');
        this.powerchordAudio = document.querySelector('.powerchord-sound');
        this.index = 0;
        this.bpm = 120;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
    }

    activePad() {
        this.classList.toggle("active");
    }

    repeat(){
        let step = this.index % 10;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //Loop over pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
        //check if pads are active    
            if(bar.classList.contains('active')){
                //Check each sound
                if (bar.classList.contains("guitar-pad")) {
                    this.guitarAudio.play();
                }
                if (bar.classList.contains("chug-pad")) {
                    this.chugAudio.currentTime = 0;
                    this.chugAudio.play();
                }
                if (bar.classList.contains("powerchord-pad")) {
                    this.powerchordAudio.currentTime = 0;
                    this.powerchordAudio.play();
                }
            }
        });
        this.index++;
    }

    //Start
    start(){
        const interval = (60/this.bpm) * 1000;
        //Check if pads are playing
        if(!this.isPlaying) {
        this.isPlaying = setInterval(() => {
            this.repeat();
        }, interval);
        } else {
            //Clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }


    updateBtn(){
        if(!this.isPlaying) {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove('active');  
        }
    }


    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName){
            case "guitar-select":
                this.guitarAudio.src = selectionValue;
                break;
            case "chug-select":
                this.chugAudio.src = selectionValue;
                break;
            case "powerchord-select":
                this.powerchordAudio.src = selectionValue;
                break;
        }
    }
    mute(e) {
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains('active')) {
            switch(muteIndex){
                case "0":
                    this.guitarAudio.volume = 0;
                    break;
                case "1":
                    this.chugAudio.volume = 0;
                    break;
                case "2":
                    this.powerchordAudio.volume = 0;
                    break;
            }
        } else {
          switch(muteIndex){
            case "0":
                this.guitarAudio.volume = 1;
                break;
            case "1":
                this.chugAudio.volume = 1;
                break;
            case "2":
                this.powerchordAudio.volume = 1;
                break;
          }  
        }
    }
}


const guitarKit = new GuitarKit();


//event listeners



guitarKit.pads.forEach(pad => {
    pad.addEventListener("click", guitarKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    });
});

guitarKit.playBtn.addEventListener('click', function() {
    guitarKit.updateBtn();
    guitarKit.start();
});

guitarKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        guitarKit.changeSound(e);
    });
});

guitarKit.muteBtns.forEach(btn => {
    btn.addEventListener("click", function(e){
        guitarKit.mute(e);
    });
});
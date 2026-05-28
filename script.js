function goToScreen(screenNumber) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    document.getElementById('screen' + screenNumber).classList.add('active');

    if (screenNumber === 3) {
        messageIndex = 0;
        charIndex = 0;
        document.getElementById("typingText").innerHTML = "";
        typeMessage();
    }

    if (screenNumber === 6) {
        startMicDetection();
    }
}

function showQ2() {
    document.getElementById("q2").style.display = "block";

    // 🌸 trigger tree animation
    startTreeAnimation();
}

const messages = [
    "I don't say this often...",
    "But thank you for everything ❤️",
    "You are my biggest supporter",
    "And I love you so much ❤️"
];

const slideMessages = [
    "It all started with you two… the kind of bond that built our whole world.",
    "A  family…  full of warmth, laughter, and togetherness.",
    "You held everything together so effortlessly… we never even noticed how much you did.",
    "A perfect balance of love, care, and strength—you were the heart of our home.",
    "Then life changed… but you didn’t let us fall.",
    "Through pain and silence, you stood up stronger than ever… for us.",
    "You carried our future on your shoulders, never letting us feel the weight.",
    "You are not just our mother… you are our strength, our home, our everything. ❤️"
];

let messageIndex = 0;
let charIndex = 0;

function typeMessage() {
    if (messageIndex >= messages.length) {
        setTimeout(() => {
        goToScreen(4);
        startSlideshow();
    }, 1000);
    return;
}

    let currentMessage = messages[messageIndex];
    let textElement = document.getElementById("typingText");

    if (charIndex < currentMessage.length) {
        textElement.innerHTML += currentMessage.charAt(charIndex);
        charIndex++;
        setTimeout(typeMessage, 50);
    } else {
        // move to next message
        messageIndex++;
        charIndex = 0;
        setTimeout(() => {
            textElement.innerHTML = "";
            typeMessage();
        }, 1200);
    }
}
const photos = [
    "photo1.jpg",
    "photo2.jpg",
    "photo3.jpg",
    "photo4.jpg",
    "photo5.jpg",
    "photo6.jpg",
    "photo7.jpg",
    "photo8.jpg"
];

let photoIndex = 0;

function startSlideshow() {
    const img = document.getElementById("slideshow");
    const text = document.getElementById("slideText");

    let photoIndex = 0;

    img.src = photos[0];
    text.innerText = slideMessages[0];

    setInterval(function () {
        photoIndex++;

        if (photoIndex >= photos.length) {
            photoIndex = 0;
        }

        img.src = photos[photoIndex];
        text.innerText = slideMessages[photoIndex];
    }, 3000);
}

let score = 0;

function startGame() {
    const gameArea = document.getElementById("gameArea");

    score = 0;
    document.getElementById("score").innerText = "Cakes: 0 / 5";

    const interval = setInterval(() => {
        const cake = document.createElement("div");
        cake.classList.add("cake-item");
        cake.innerHTML = "🎂";

        // random position inside box
        cake.style.top = Math.random() * 260 + "px";
        cake.style.left = Math.random() * 260 + "px";

        cake.onclick = () => {
            cake.remove();
            score++;

            document.getElementById("score").innerText = `Cakes: ${score} / 5`;

            if (score >= 5) {
                clearInterval(interval);
                setTimeout(() => {
                    goToScreen(6); // move to cake page
                }, 500);
            }
        };

        gameArea.appendChild(cake);

        // remove cake after 2 sec if not clicked
        setTimeout(() => {
            cake.remove();
        }, 2000);

    }, 800);
}

const colors = [
    "linear-gradient(145deg, #ff4d6d, #ff758f)",   // pink
    "linear-gradient(145deg, #ffd166, #ffb703)",   // yellow
    "linear-gradient(145deg, #06d6a0, #1b9aaa)",   // teal
    "linear-gradient(145deg, #118ab2, #4361ee)",   // blue
    "linear-gradient(145deg, #9b5de5, #7209b7)",   // purple
    "linear-gradient(145deg, #f72585, #b5179e)"    // magenta
];

function blowCandle() {
    // remove flames
    document.querySelectorAll(".flame").forEach(f => {

    // 📍 get flame position
    const rect = f.getBoundingClientRect();

    // 🌫️ create smoke
    for (let i = 0; i < 4; i++) {
        const smoke = document.createElement("div");
        smoke.className = "smoke";

        smoke.style.left = rect.left + window.scrollX + "px";
        smoke.style.top = rect.top + window.scrollY + "px";

        smoke.style.animationDelay = (i * 0.2) + "s";

        document.body.appendChild(smoke);

        setTimeout(() => smoke.remove(), 2500);
    }

    // 🔥 fade flame instead of instant remove
    f.style.opacity = "0";
    f.style.animation = "none";

    // optional: remove after fade
    setTimeout(() => {
        f.style.display = "none";
    }, 500);
});

     // lower music
    const music = document.getElementById("bgMusic");
    music.volume = 0.15;

   setTimeout(() => {
    const msg = document.getElementById("finalMessage");
    msg.style.display = "block";
    msg.style.opacity = "0";

    setTimeout(() => {
        msg.style.transition = "opacity 2s ease";
        msg.style.opacity = "1";
    }, 100);

}, 1000);

    // safe confetti
    setTimeout(() => {
    for (let i = 0; i < 120; i++) {

        const confetti = document.createElement("div");
        confetti.className = "confetti";

        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.background = [
            "#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#ef476f"
        ][Math.floor(Math.random() * 5)];

        confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}, 400);

for (let i = 0; i < 12; i++) {

    const balloon = document.createElement("div");
    balloon.className = "balloon";

    // 🎨 random color
    balloon.style.setProperty(
        "--balloon-color",
        colors[Math.floor(Math.random() * colors.length)]
    );

    // 📍 random position
    balloon.style.left = Math.random() * window.innerWidth + "px";

    // ⏱️ random speed
    balloon.style.animationDuration = (Math.random() * 3 + 4) + "s";

    // 🎈 slight size variation
    const scale = Math.random() * 0.4 + 0.8;
    balloon.style.transform = `scale(${scale})`;

    document.body.appendChild(balloon);

    setTimeout(() => balloon.remove(), 7000);
}

}
async function startMicDetection() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const audioContext = new AudioContext();
        const mic = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 256;
        mic.connect(analyser);

        const data = new Uint8Array(analyser.frequencyBinCount);

        let blowCount = 0;

        function detectSound() {
            analyser.getByteFrequencyData(data);

            let volume = 0;
            for (let i = 0; i < data.length; i++) {
                volume += data[i];
            }

            volume = volume / data.length;

            console.log("Volume:", volume); // 👈 check in console

            if (volume > 42) {
               blowCount++;
            } else {
                blowCount = 0;
            }

             if (blowCount > 5) {
                 blowCandle();   
                return;
            }

            requestAnimationFrame(detectSound);
        }

        detectSound();

    } catch (err) {
        alert("Please allow microphone access 🎤");
    }
}

function startMusicOnce() {
    const music = document.getElementById("bgMusic");

    music.volume = 0;
    music.play();

    let vol = 0;
    const fade = setInterval(() => {
        if (vol < 0.65) {
            vol += 0.03;
            music.volume = vol;
        } else {
            clearInterval(fade);
        }
    }, 200);

    document.removeEventListener("click", startMusicOnce);
}

document.addEventListener("click", startMusicOnce);

function createLuxuryParticles() {
    setInterval(() => {
        const p = document.createElement("div");
        p.innerHTML = ["✨","💖","⭐"][Math.floor(Math.random()*3)];

        p.style.position = "fixed";
        p.style.left = Math.random() * window.innerWidth + "px";
        p.style.top = "100%";
        p.style.fontSize = "18px";

        document.body.appendChild(p);

        let speed = Math.random() * 2 + 1;

        const rise = setInterval(() => {
            p.style.top = (p.offsetTop - speed) + "px";
        }, 20);

        setTimeout(() => {
            clearInterval(rise);
            p.remove();
        }, 5000);

    }, 200);
}

createLuxuryParticles();

function startTreeAnimation() {

    const tree = document.getElementById("treeImg");

    // 🔥 reset animation (important)
    tree.style.animation = "none";
    tree.offsetHeight;

    tree.style.animation = "growTree 2.5s ease-out forwards";

     const audio = document.getElementById("bgMusic");
    if (audio) {
        audio.volume = 0.3;
        audio.play().catch(() => {}); // prevents browser error
    }


    // 🌸 wind petals
    const interval = setInterval(() => {

        const petal = document.createElement("div");
        petal.className = "petal";

        petal.innerHTML = ["🌸","💮","🌺"][Math.floor(Math.random()*3)];

        // start near tree (left side now)
        petal.style.left = (Math.random() * 250) + "px";
        petal.style.animationDuration = (Math.random()*2 + 5) + "s";

        document.body.appendChild(petal);

        setTimeout(() => petal.remove(), 7000);

    }, 120);

    setTimeout(() => clearInterval(interval), 8000);
     
}

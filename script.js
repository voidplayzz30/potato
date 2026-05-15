// ===== LOCK SCREEN =====
const correctAnswer = "potato";
let wrongCount = 0;

const wrongMessages = [
    "Nope! Try again 😘",
    "Wronggg! Think baby think 🤔",
    "Not even close cutie 😂",
    "Are you even trying?! 🥺",
    "Bruh... really? 😭"
];

function checkGuess() {
    const input = document.getElementById("guessInput");
    const guess = input.value.trim().toLowerCase();
    const wrongMsg = document.getElementById("wrongMsg");
    const hintMsg = document.getElementById("hintMsg");
    const inputArea = document.querySelector(".input-area");

    if (guess === "") {
        wrongMsg.textContent = "Type something first baby 😭";
        return;
    }

    if (guess === correctAnswer) {
        wrongMsg.style.color = "#2e7d32";
        wrongMsg.textContent = "YESSS! Welcome my Potato 🥔❤️";
        
        setTimeout(() => {
            document.getElementById("lockScreen").style.display = "none";
            document.getElementById("mainApp").style.display = "block";
            document.getElementById("bottomNav").style.display = "flex";
            loadBucketLists();
            loadTheme();
            playMusic();
            loadDiary();
            loadWishes();
            loadDailyLoveNote();
            loadSpecialDates();
            loadStats();
            setTimeout(initStarMap, 500);
            setTimeout(drawWheel, 500);
        }, 1000);
    } else {
        wrongCount++;
        inputArea.classList.add("shake");
        setTimeout(() => inputArea.classList.remove("shake"), 500);
        const randomWrong = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
        wrongMsg.textContent = randomWrong;
        input.value = "";
        input.focus();
        if (wrongCount >= 3) {
            hintMsg.textContent = "its yourrrrrr nameeeee dumbooooooo 😭🥔";
        }
    }
}

document.getElementById("guessInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") checkGuess();
});

// ===== TAB SWITCHING =====
function switchTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    document.getElementById("tab-" + tabName).classList.add("active");
    document.querySelector(`.nav-item[data-tab="${tabName}"]`).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Re-init canvases when switching to those tabs
    if (tabName === "home") setTimeout(initStarMap, 200);
    if (tabName === "fun") setTimeout(drawWheel, 200);
}

// ===== TIMER =====
const startDate = new Date("2025-10-19 00:00:00");

function updateTimer() {
    const now = new Date().getTime();
    const diff = now - startDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    if (daysEl) {
        daysEl.textContent = String(days).padStart(3, '0');
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("mins").textContent = String(mins).padStart(2, '0');
        document.getElementById("secs").textContent = String(secs).padStart(2, '0');
    }
}

setInterval(updateTimer, 1000);
updateTimer();

// ===== DAILY LOVE NOTE =====
const loveNotes = [
    "Nirvuu I woke up thinking about you again. This has been happening for 7 months and I do not see it stopping ever. Good morning my entire world 🌸",
    "Bhondu just a reminder that you are loved. Madly. Fully. Completely. Without conditions. Forever 💕",
    "Rasmalai you are doing better than you think. I am proud of you for just existing today 🥺",
    "Cutie if you are reading this it means I love you. Yes. Right now. Always 💗",
    "Dumboo no matter what kind of day you are having know that you have me. Always 🤗",
    "Malkinn the world is a better place because you are in it and I am the luckiest because I get to call you mine 👑",
    "Nirvuu I am so glad you exist baby. Like genuinely. The universe did good when it made you 🌌",
    "Bhondu you are stronger than you realize and softer than you let people see and I love both sides of you 💪💗",
    "Rasmalai today is a great day to remember that someone very far away is loving you very much. That is me. Hi 👋💕",
    "Cutie pinky promise to give yourself the same love you give everyone else today okay? You deserve it 🤙",
    "Dumboo you are my favorite human across all timelines. Just had to remind you 🌍",
    "Nirvuu missing you is now a permanent state of being but loving you is even more permanent so we are good 💕",
    "Bhondu you have no idea how much joy your existence brings me. Thank you for being you 🥹",
    "Malkinn just popping in to say I am still down bad for you. Cool. Goodbye 😘",
    "Rasmalai today's love note is just this — I love you. Plain. Simple. Loud. True 📣❤️",
    "Cutie reminder that you are not too much. You are exactly enough. Always have been 🌸",
    "Dumboo if I could teleport right now I would be there in 0.1 seconds just to hug you. The mission continues 🚀",
    "Nirvuu the way I love you is not normal. It should not be possible to feel this much. But here we are 🥲",
    "Bhondu thank you for choosing me every single day. I notice. I see. I love you for it 💗",
    "Malkinn one day none of this will be long distance anymore. Until then this app is my heart in code form 💻💕",
    "Rasmalai there is no version of me that does not love you. I checked. Multiple times. Confirmed 💯",
    "Cutie you are the best part of my every single day. Even the bad days. Especially the bad days 🌟",
    "Dumboo today I love you. Tomorrow I will love you. Forever I will love you. Boring? Yes. True? Also yes 🥔",
    "Nirvuu just because I love you doesn't mean I'll stop telling you. Get used to it baby 💕",
    "Bhondu I would write you a love note every single day for the rest of my life. Lucky you. Stuck with me forever 😎",
    "Malkinn my favorite hobby is loving you. My favorite person is you. My favorite life is the one with you in it 🏠",
    "Rasmalai you matter to me more than you can comprehend. End of message 📩❤️",
    "Cutie even on days you don't feel beautiful you are still the prettiest thing in my world 🌸",
    "Dumboo loving you is the easiest thing I have ever done in my life and I want to keep doing it forever 💍",
    "Nirvuu you are my answer to every question. Hungry? Nirvuu. Sad? Nirvuu. Tired? Nirvuu. Just happens to be the cure for everything 🥹"
];

function loadDailyLoveNote() {
    const dateEl = document.getElementById("loveNoteDate");
    const textEl = document.getElementById("loveNoteText");
    if (!dateEl || !textEl) return;

    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const noteIndex = dayOfYear % loveNotes.length;

    const dateStr = today.toLocaleDateString("en-US", { 
        weekday: "long", month: "long", day: "numeric" 
    });
    
    dateEl.textContent = dateStr;
    textEl.textContent = loveNotes[noteIndex];
}

// ===== SPECIAL DATES COUNTDOWN =====
const specialDates = [
    { name: "My Birthday 🎂", date: "03-14", icon: "🎉", year: null },
    { name: "Your Birthday 🎂", date: "04-23", icon: "🎀", year: null },
    { name: "First Time Meeting 🥹", date: "06-01", icon: "✈️", year: 2026, oneTime: true },
    { name: "Next Monthsary 💕", date: "monthsary", icon: "💝" }
];

function getNextDate(monthDay, oneTimeYear, isOneTime) {
    const now = new Date();
    const [m, d] = monthDay.split("-").map(Number);
    
    if (isOneTime) {
        const target = new Date(oneTimeYear, m - 1, d);
        return target;
    }
    
    let target = new Date(now.getFullYear(), m - 1, d);
    if (target < now) {
        target = new Date(now.getFullYear() + 1, m - 1, d);
    }
    return target;
}

function getNextMonthsary() {
    const now = new Date();
    let target = new Date(now.getFullYear(), now.getMonth(), 19);
    if (target <= now) {
        target = new Date(now.getFullYear(), now.getMonth() + 1, 19);
    }
    return target;
}

function loadSpecialDates() {
    const grid = document.getElementById("datesGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const now = new Date();
    
    specialDates.forEach(dateObj => {
        let targetDate;
        if (dateObj.date === "monthsary") {
            targetDate = getNextMonthsary();
        } else {
            targetDate = getNextDate(dateObj.date, dateObj.year, dateObj.oneTime);
        }

        const diff = targetDate - now;
        const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
        
        const formattedDate = targetDate.toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric"
        });

        let countdownText;
        let isToday = false;
        
        if (daysLeft === 0) {
            countdownText = "TODAY! 🎉";
            isToday = true;
        } else if (daysLeft === 1) {
            countdownText = "Tomorrow! 🥳";
        } else if (daysLeft < 0) {
            countdownText = "Already happened ✨";
        } else {
            countdownText = daysLeft + " days to go ✨";
        }

        const card = document.createElement("div");
        card.className = "date-card" + (isToday ? " today" : "");
        card.innerHTML = `
            <div class="date-icon">${dateObj.icon}</div>
            <div class="date-info">
                <p class="date-name">${dateObj.name}</p>
                <p class="date-when">${formattedDate}</p>
                <p class="date-countdown">${countdownText}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== STATS =====
function loadStats() {
    const grid = document.getElementById("statsGrid");
    if (!grid) return;

    const now = new Date();
    const diff = now - startDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.4);

    const places = JSON.parse(localStorage.getItem("places") || "[]").length;
    const things = JSON.parse(localStorage.getItem("things") || "[]").length;
    const diaryEntries = JSON.parse(localStorage.getItem("diaryEntries") || "[]").length;
    const wishes = JSON.parse(localStorage.getItem("wishes") || "[]").length;

    const stats = [
        { icon: "📅", number: days, label: "Days Together" },
        { icon: "⏰", number: hours.toLocaleString(), label: "Hours" },
        { icon: "📆", number: weeks, label: "Weeks" },
        { icon: "🗓️", number: months, label: "Months" },
        { icon: "🌍", number: places, label: "Places Listed" },
        { icon: "💕", number: things, label: "Things to Do" },
        { icon: "📝", number: diaryEntries, label: "Diary Entries" },
        { icon: "🌟", number: wishes, label: "Wishes" }
    ];

    grid.innerHTML = "";
    stats.forEach(stat => {
        const card = document.createElement("div");
        card.className = "stat-card";
        card.innerHTML = `
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        grid.appendChild(card);
    });
}

// ===== MEMORIES =====
const memories = [
    { date: "Oct 19, 2025", photo: "month1.jpeg", msg: "The day everything changed nirvuu. I still remember how nervous I was. I had no idea that one yes from you would change my entire world. From that day till today every single morning I wake up grateful. Grateful that out of all the people in this world you chose me. You picked me. Me. Bhondiii I love you more than I will ever be able to type in this stupid little box. Happy 1st bestest day of my life rasmalai." },
    { date: "Nov 19, 2025", photo: "month2.jpeg", msg: "One month with you and I already knew you were it for me. No more searching. No more wondering. No more wasting my time on people who didn't deserve me. Just you. Always you. The way you laugh at your own jokes. The way you get angry over the smallest things and forget about it in 2 minutes. The way you say my name. Cutie pie you have no idea what you do to me. One month down. A whole lifetime to go merii malkinn." },
    { date: "Dec 19, 2025", photo: "month3.jpeg", msg: "December was cold but baby you were my entire warmth. Two months of loving you and I swear it feels like I have known you my whole life. Distance was hitting hard this month. I missed your face. I missed your stupid laugh. I missed everything. But every time we got on call and I saw your eyes light up I forgot we were even apart. Your eyes nirvi. God your eyes. I could write a whole book about them. Happy 2 months my dumboo." },
    { date: "Jan 19, 2026", photo: "month4.jpeg", msg: "New year and you were still mine. That itself was the biggest blessing of 2026. Three months of us bhondu and I am more obsessed with you than day one. You know what I thought about this whole month. Our future. Our tiny little home. Our mini nirvi running around with your big eyes and your stubborn attitude. I want it all baby. Every single piece of it. With you. Only you. Always you." },
    { date: "Feb 19, 2026", photo: "month5.jpeg", msg: "Valentine's month and you were my valentine even from miles away. Four months of loving the most beautiful soul I have ever met. Rasmalai you are everything. Your smile. The way it just appears out of nowhere and ruins my entire day in the best way. I have a screenshot of every smile you have ever sent me. Embarrassing I know. But I cannot help it. You are my favorite person to look at on this entire planet." },
    { date: "Mar 19, 2026", photo: "month6.jpeg", msg: "Five months in and I am writing this thinking how lucky I am that you actually exist. Like out of all the timelines and all the universes I got the one where nirvi is real and she is mine. We survived another month of distance baby. Every fight. Every misunderstanding. Every late night where one of us was crying. We made it. We always make it. Because you and me cutie pie we are not normal. We are built different. Forever team us." },
    { date: "Apr 19, 2026", photo: "month7.jpeg", msg: "Six months. Half a year of loving you and I still get butterflies when your name pops up on my phone. Do you know how rare that is. People date for years and lose that feeling. I lose my mind every single time you message me. Bhondiii I want the tiny home. I want the mini nirvi. I want lazy mornings where you steal all the blanket and I pretend to be mad. I want every single boring ordinary day with you. Because boring days with you are still better than the best day without you." },
    { date: "May 19, 2026", photo: "month8.jpeg", msg: "Seven months. Seven months of us nirvuu. Look how far we have come baby. From two strangers to this. To people who cannot even imagine a life without each other. Distance tried so hard to break us. It failed. People tried to come between us. They failed. Even our own bad days could not stop us. Because this thing we have. This is real. This is the realest thing I have ever felt. Merii malkinn you are my home. You are my person. You are my whole damn world. I love you to the moon and back and to that tiny home and to our mini nirvi and forever after that. Yours. Always. Potato. 💍" }
];

function showMemory(index) {
    const memory = memories[index];
    document.getElementById("popup-date").textContent = memory.date;
    document.getElementById("popup-msg").textContent = memory.msg;
    const photo = document.getElementById("memoryPhoto");
    photo.src = memory.photo;
    photo.classList.remove("slide-in");
    document.getElementById("memoryOverlay").style.display = "block";
    document.getElementById("memoryWrapper").classList.add("active");
    setTimeout(() => photo.classList.add("slide-in"), 400);
}

function closeMemory() {
    const photo = document.getElementById("memoryPhoto");
    photo.classList.remove("slide-in");
    setTimeout(() => {
        document.getElementById("memoryOverlay").style.display = "none";
        document.getElementById("memoryWrapper").classList.remove("active");
    }, 300);
}

// ===== MOOD =====
const moodResponses = {
    happy: { title: "Yay my Potato is happy 🌸", msg: "Oh my god this makes me so happy nirvuu. Your happiness is literally my drug. When you are happy the whole world just feels better. I want to bottle this feeling and save it forever. Keep smiling that ugly cute smile of yours rasmalai. You deserve every bit of happiness this world has to give. And I promise I will always be the reason behind atleast 90 percent of your smiles." },
    sad: { title: "Hey baby don't be sad 🥺", msg: "Bhondu listen to me. Whatever it is that is making you sad right now. It is temporary. I promise. You have survived 100 percent of your worst days till now. You will survive this one too. And you have me. Always. No matter what time it is no matter where I am just call me. I will drop everything for you. You are not alone in this nirvuu. Never. I love you. Please take a deep breath and remember how loved you are." },
    miss: { title: "I miss you too cutie 💔", msg: "Stop it. You are gonna make me cry. Because I miss you every single second of every single day. The distance kills me too baby. But listen. Every day that passes is one day closer to me holding you again. One day closer to that tiny home. One day closer to never having to say goodbye on call again. I am yours. Always. Even when I am not next to you my heart is right there with you rasmalai. Always." },
    angry: { title: "Oof somebody is angry 😡", msg: "Okay first of all take a deep breath dumboo. I know you. You get angry fast and forget faster. Whatever it is do not let it ruin your day. If it is me I am sorry. Genuinely. I never want to be the reason you feel anything but loved. If it is someone else then they are stupid because nobody should ever upset my malkinn. Vent to me. Yell at me. Block me for 10 minutes. Just come back. Always come back." },
    love: { title: "Awwwww my baby is in love 🥰", msg: "Are you in love with me. Because I am very in love with you. Like stupid amounts of love. The kind of love that makes me grin at my phone for no reason. The kind that makes me listen to sad songs and feel happy. The kind that makes me believe in stupid things like soulmates and forever. Yeah that kind. You did this to me nirvi. You ruined me for anyone else. And I would not have it any other way." },
    sleepy: { title: "Goodnight cutie 😴", msg: "Go to sleep my love. Close those big beautiful eyes. Stop scrolling your phone right now. Yes I see you. Sleep baby. Dream of us. Dream of our tiny home. Dream of mini nirvi. Dream of everything beautiful because you deserve nothing less. I love you more than the whole sky. Goodnight rasmalai. Sweet dreams. I will be the first thing you think about tomorrow morning right. Right." },
    anxious: { title: "Hey breathe baby 😰", msg: "Nirvuu listen. Pause everything. Right now. Take a deep breath in. Hold it. And let it out slowly. Again. Again. Whatever your brain is telling you right now is not the truth. Anxiety lies. Loud. Constantly. But it lies. You are safe. You are loved. You are doing better than you think. I am right here. Always right here. You are not your thoughts baby. You are my brave beautiful bhondu. We will get through this. Together. Always together." },
    bored: { title: "Bored huh 🥱", msg: "Open the gallery and look at our photos. Read all the memory hearts again. Add 10 more places to our bucket list. Plan our tiny home in your head. Imagine mini nirvi running around. Text me random thoughts. Send me a selfie. Make me a list of things you want me to do for you. Or just sit and miss me a little more so you appreciate me when I come back. Boredom is temporary cutie. I am forever." }
};

function showMood(mood) {
    const data = moodResponses[mood];
    document.getElementById("mood-title").textContent = data.title;
    document.getElementById("mood-msg").textContent = data.msg;
    document.getElementById("moodOverlay").style.display = "block";
    document.getElementById("moodPopup").style.display = "block";
}

function closeMood() {
    document.getElementById("moodOverlay").style.display = "none";
    document.getElementById("moodPopup").style.display = "none";
}

// ===== BUCKET LIST =====
function loadBucketLists() {
    renderList("places");
    renderList("things");
}

function renderList(type) {
    const listId = type === "places" ? "placesList" : "thingsList";
    const list = document.getElementById(listId);
    if (!list) return;
    const items = JSON.parse(localStorage.getItem(type) || "[]");
    list.innerHTML = "";
    if (items.length === 0) {
        list.innerHTML = '<p class="empty-msg">Nothing here yet. Add something baby 💕</p>';
        return;
    }
    items.forEach((item, index) => {
        const li = document.createElement("li");
        if (item.done) li.classList.add("done");
        li.innerHTML = `
            <span class="item-text" onclick="toggleItem('${type}', ${index})">${item.text}</span>
            <button class="delete-btn" onclick="deleteItem('${type}', ${index})">🗑️</button>
        `;
        list.appendChild(li);
    });
}

function addPlace() {
    const input = document.getElementById("placeInput");
    const value = input.value.trim();
    if (value === "") return;
    const items = JSON.parse(localStorage.getItem("places") || "[]");
    items.push({ text: value, done: false });
    localStorage.setItem("places", JSON.stringify(items));
    input.value = "";
    renderList("places");
    loadStats();
}

function addThing() {
    const input = document.getElementById("thingInput");
    const value = input.value.trim();
    if (value === "") return;
    const items = JSON.parse(localStorage.getItem("things") || "[]");
    items.push({ text: value, done: false });
    localStorage.setItem("things", JSON.stringify(items));
    input.value = "";
    renderList("things");
    loadStats();
}

function toggleItem(type, index) {
    const items = JSON.parse(localStorage.getItem(type) || "[]");
    items[index].done = !items[index].done;
    localStorage.setItem(type, JSON.stringify(items));
    renderList(type);
}

function deleteItem(type, index) {
    const items = JSON.parse(localStorage.getItem(type) || "[]");
    items.splice(index, 1);
    localStorage.setItem(type, JSON.stringify(items));
    renderList(type);
    loadStats();
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        const placeInput = document.getElementById("placeInput");
        const thingInput = document.getElementById("thingInput");
        if (placeInput) placeInput.addEventListener("keypress", e => { if (e.key === "Enter") addPlace(); });
        if (thingInput) thingInput.addEventListener("keypress", e => { if (e.key === "Enter") addThing(); });
    }, 500);
});

// ===== FALLING HEARTS =====
function createFallingHearts() {
    const container = document.getElementById("fallingHearts");
    const hearts = ["❤️", "💕", "💖", "💗", "🌸", "💝"];
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart-fall";
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = (Math.random() * 1.5 + 1) + "rem";
        heart.style.animationDuration = (Math.random() * 5 + 5) + "s";
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }, 400);
}
createFallingHearts();

// ===== THEME SWITCHER =====
const themes = [
    { name: "theme-pink", label: "Pink Blossom 🌸", icon: "🌸" },
    { name: "theme-blue", label: "Ocean Blue 💙", icon: "💙" },
    { name: "theme-purple", label: "Midnight Purple 🔮", icon: "🔮" },
    { name: "theme-dynamic", label: "Dynamic Time 🌅", icon: "🌅" }
];

let currentThemeIndex = 0;

function cycleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    applyTheme(currentThemeIndex);
    localStorage.setItem("selectedTheme", currentThemeIndex);
    showThemeToast(themes[currentThemeIndex].label);
}

function applyTheme(index) {
    document.body.classList.remove("theme-pink", "theme-blue", "theme-purple", "theme-dynamic");
    document.body.classList.remove("time-morning", "time-day", "time-evening", "time-night");
    const themeName = themes[index].name;
    document.body.classList.add(themeName);
    document.getElementById("themeToggle").textContent = themes[index].icon;
    if (themeName === "theme-dynamic") updateDynamicTheme();
}

function loadTheme() {
    const saved = localStorage.getItem("selectedTheme");
    if (saved !== null) {
        currentThemeIndex = parseInt(saved);
        applyTheme(currentThemeIndex);
    }
}

function showThemeToast(text) {
    const toast = document.getElementById("themeToast");
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

function updateDynamicTheme() {
    if (!document.body.classList.contains("theme-dynamic")) return;
    document.body.classList.remove("time-morning", "time-day", "time-evening", "time-night");
    const hour = new Date().getHours();
    let timeClass = "", icon = "";
    if (hour >= 5 && hour < 11) { timeClass = "time-morning"; icon = "🌅"; }
    else if (hour >= 11 && hour < 17) { timeClass = "time-day"; icon = "☀️"; }
    else if (hour >= 17 && hour < 20) { timeClass = "time-evening"; icon = "🌇"; }
    else { timeClass = "time-night"; icon = "🌙"; }
    document.body.classList.add(timeClass);
    document.getElementById("themeToggle").textContent = icon;
}

setInterval(() => {
    if (document.body.classList.contains("theme-dynamic")) updateDynamicTheme();
}, 60000);

// ===== MUSIC PLAYER =====
const playlist = [
    { src: "blue.mp3", name: "Blue", artist: "Yung Kai 💙" },
    { src: "wildflower.mp3", name: "Wildflower", artist: "Yung Kai 🌸" },
    { src: "glue-song.mp3", name: "Glue Song", artist: "beabadoobee 💕" },
    { src: "only.mp3", name: "Only", artist: "Lee Hi 🎵" },
    { src: "perfect-pair.mp3", name: "Perfect Pair", artist: "beabadoobee 💖" }
];

let currentSongIndex = 0;
let isPlaying = false;
const bgMusic = new Audio(playlist[0].src);
bgMusic.loop = false;
bgMusic.volume = 0.4;

bgMusic.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadAndPlay(currentSongIndex);
});

bgMusic.addEventListener("timeupdate", () => {
    const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
    const progEl = document.getElementById("playerProgress");
    if (progEl) {
        progEl.style.width = progress + "%";
        document.getElementById("playerTime").textContent = formatTime(bgMusic.currentTime) + " / " + formatTime(bgMusic.duration);
    }
});

function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ":" + String(s).padStart(2, "0");
}

function seekSong(e) {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    bgMusic.currentTime = percent * bgMusic.duration;
}

function loadAndPlay(index) {
    currentSongIndex = index;
    bgMusic.src = playlist[index].src;
    bgMusic.play().catch(err => console.log("Autoplay blocked"));
    isPlaying = true;
    updatePlayerUI();
    showSongToast(playlist[index].name + " - " + playlist[index].artist);
    showPlayerBar();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadAndPlay(currentSongIndex);
}

function prevSong() {
    if (bgMusic.currentTime > 3) { bgMusic.currentTime = 0; bgMusic.play(); return; }
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadAndPlay(currentSongIndex);
}

function togglePause() {
    if (!isPlaying && bgMusic.currentTime === 0) { loadAndPlay(0); return; }
    if (bgMusic.paused) {
        bgMusic.play();
        isPlaying = true;
        showSongToast("▶️ " + playlist[currentSongIndex].name);
    } else {
        bgMusic.pause();
        isPlaying = false;
        showSongToast("⏸️ Paused");
    }
    updatePlayerUI();
}

function updatePlayerUI() {
    const song = playlist[currentSongIndex];
    const nameEl = document.getElementById("playerSongName");
    if (nameEl) {
        nameEl.textContent = song.name + " - " + song.artist;
        document.getElementById("playPauseBtn").textContent = isPlaying ? "⏸️" : "▶️";
        const topBtn = document.getElementById("musicToggle");
        topBtn.textContent = isPlaying ? "🎵" : "🔇";
        if (isPlaying) topBtn.classList.remove("paused");
        else topBtn.classList.add("paused");
        renderSongList();
    }
}

function showPlayerBar() {
    const bar = document.getElementById("playerBar");
    if (bar) bar.classList.add("active");
}

function showSongToast(text) {
    const toast = document.getElementById("songToast");
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

function openSongList() {
    renderSongList();
    document.getElementById("songListOverlay").style.display = "block";
    document.getElementById("songListPopup").style.display = "block";
}

function closeSongList() {
    document.getElementById("songListOverlay").style.display = "none";
    document.getElementById("songListPopup").style.display = "none";
}

function renderSongList() {
    const container = document.getElementById("songList");
    if (!container) return;
    container.innerHTML = "";
    playlist.forEach((song, index) => {
        const isActive = index === currentSongIndex;
        const div = document.createElement("div");
        div.className = "song-item" + (isActive ? " active" : "");
        div.onclick = () => { loadAndPlay(index); closeSongList(); };
        div.innerHTML = `
            <div class="song-item-icon">${isActive && isPlaying ? "🎧" : "🎵"}</div>
            <div class="song-item-info">
                <span class="song-item-name">${song.name}</span>
                <span class="song-item-artist">${song.artist}</span>
            </div>
            ${isActive ? '<span class="song-item-playing">' + (isPlaying ? "Playing 🎶" : "Paused") + "</span>" : ""}
        `;
        container.appendChild(div);
    });
}

function playMusic() { loadAndPlay(0); }

// ===== SPIN WHEEL =====
const wheelItems = [
    "Send your cutest selfie 📸", "Write a love letter 💌", "Call for 1 hour 📞",
    "Send 10 things you love about me 💕", "Voice note saying I love you 🎤",
    "Send your favorite photo of us 🖼️", "Plan our dream date 🌸",
    "Send a song that reminds you of me 🎵", "Say 5 things you miss 💔",
    "Goodmorning texts for 7 days ☀️", "Draw me something cute 🎨",
    "Send a sweet video 🥺", "Describe our tiny home 🏡",
    "Tell me your favorite memory 💗", "No fighting for 3 days 😤",
    "Send a photo right now 👀", "Pick our next bucket list place 🌍",
    "Rate our relationship out of 10 💯"
];
const wheelColors = ["#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffc107", "#ff9800", "#ff5722", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"];

let isSpinning = false;
let wheelRotation = 0;

function drawWheel() {
    const canvas = document.getElementById("wheelCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2, centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 5;
    const totalItems = wheelItems.length;
    const arc = (2 * Math.PI) / totalItems;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((wheelRotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
    for (let i = 0; i < totalItems; i++) {
        const startAngle = i * arc;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + arc);
        ctx.closePath();
        ctx.fillStyle = wheelColors[i % wheelColors.length];
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 7px Poppins, sans-serif";
        const text = wheelItems[i].length > 22 ? wheelItems[i].substring(0, 22) + "..." : wheelItems[i];
        ctx.fillText(text, radius - 10, 3);
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(centerX, centerY, 22, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff"; ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.1)"; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = "#e91e63";
    ctx.font = "bold 11px Poppins, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("GO", centerX, centerY);
    ctx.restore();
}

function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    const btn = document.getElementById("spinBtn");
    btn.disabled = true;
    const resultDiv = document.getElementById("wheelResult");
    resultDiv.classList.remove("show");
    const totalItems = wheelItems.length;
    const extraSpins = Math.floor(Math.random() * 3 + 5) * 360;
    const randomAngle = Math.floor(Math.random() * 360);
    const targetRotation = wheelRotation + extraSpins + randomAngle;
    const duration = 4000;
    const startTime = Date.now();
    const startRotation = wheelRotation;
    function animateSpin() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        wheelRotation = startRotation + (targetRotation - startRotation) * eased;
        drawWheel();
        if (progress < 1) requestAnimationFrame(animateSpin);
        else {
            isSpinning = false;
            btn.disabled = false;
            const normalizedAngle = ((360 - (wheelRotation % 360)) + 90) % 360;
            const arc = 360 / totalItems;
            const selectedIndex = Math.floor(normalizedAngle / arc) % totalItems;
            resultDiv.textContent = "🎉 " + wheelItems[selectedIndex];
            resultDiv.classList.add("show");
        }
    }
    requestAnimationFrame(animateSpin);
}

// ===== COMPLIMENTS =====
const compliments = [
    "Nirvuu you are the prettiest human I have ever seen in my entire life and I am not even exaggerating 🌸",
    "Bhondu your smile could literally cure diseases I am so serious right now 😭",
    "Rasmalai you have the most beautiful eyes on this planet and no one can tell me otherwise 👀💕",
    "Malkinn you are so smart it actually scares me sometimes like where does all that brain come from 🧠✨",
    "Cutie you are the reason I believe in soulmates because no normal person fits this perfectly into my life 💫",
    "Dumboo even when you are angry you look adorable and I hate it because I cannot take you seriously 😤❤️",
    "Nirvuu your voice is my favorite sound in this entire universe no song can beat it 🎵",
    "Bhondu you are stronger than you think braver than you feel and more loved than you will ever know 💪🥺",
    "Rasmalai your laugh is literally the most contagious thing on earth I hear it and I automatically smile 😂💕",
    "Malkinn you deserve the whole world and I am here trying my best to give it to you one day at a time 🌍",
    "Cutie the way you care about people shows how beautiful your heart is and I am so lucky it chose me ❤️",
    "Dumboo you are not just my girlfriend you are my best friend my diary my therapist and my whole comfort zone 🏠",
    "Nirvuu looking at you feels like looking at a sunset beautiful every single time and never gets boring 🌅",
    "Bhondu your kindness is your superpower and the world does not deserve you but I am glad I have you 💗",
    "Rasmalai you make everything better just by existing like the world is genuinely a better place because of you 🌸",
    "Malkinn I fall in love with you a little more every single day and at this point it is getting out of hand 📈❤️",
    "Cutie you have this energy about you that makes everyone around you feel safe and warm and loved 🔥",
    "Dumboo the fact that you are mine still does not feel real sometimes I just stare at your photo and smile like an idiot 🤡💕",
    "Nirvuu you are the most hardworking person I know and I am so proud of everything you do 💪✨",
    "Bhondu your stubbornness is annoying but also one of my favorite things about you because it shows how strong you are 😤💕",
    "Rasmalai you are the definition of beauty with brains and I hit the jackpot with you 🎰❤️",
    "Malkinn even on your worst days you are still better than everyone else on their best day 👑",
    "Cutie your hugs are something I dream about every night and I cannot wait to experience them again 🤗",
    "Dumboo you make me want to be a better person every single day just so I can deserve you 💫",
    "Nirvuu if loving you was a job I would be the most hardworking employee on this planet 💼❤️",
    "Bhondu the way you love is so pure and wholesome it makes my heart physically hurt sometimes 🥺💗",
    "Rasmalai you are not just pretty on the outside your soul is the most gorgeous thing about you 🦋",
    "Malkinn I would choose you in every lifetime in every universe in every version of reality 🌌❤️",
    "Cutie you are literally my favorite notification my favorite call my favorite everything 📱💕",
    "Dumboo I wrote all of this and I still feel like words are not enough to describe how amazing you are 📝✨",
    "Nirvuu even the stars are jealous of how bright you shine baby ⭐",
    "Bhondu you are the plot twist I never saw coming but the best thing that ever happened to my story 📖💕",
    "Rasmalai my heart does this stupid little flip every time I see your name pop up and it has been months and it still happens 💓",
    "Malkinn you could wear a potato sack and still be the prettiest person in the room I am telling you 🥔👗",
    "Cutie I love you more than pizza and you know how serious that is 🍕❤️"
];

let lastComplimentIndex = -1;

function generateCompliment() {
    const display = document.getElementById("complimentDisplay");
    let newIndex;
    do { newIndex = Math.floor(Math.random() * compliments.length); } while (newIndex === lastComplimentIndex && compliments.length > 1);
    lastComplimentIndex = newIndex;
    display.classList.remove("pop");
    void display.offsetWidth;
    display.textContent = compliments[newIndex];
    display.classList.add("pop");
}

// ===== STAR MAP =====
function initStarMap() {
    const canvas = document.getElementById("starCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 400;
    const stars = [], heartStars = [];
    const width = canvas.width, height = canvas.height;
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * width, y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.8 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            twinkleOffset: Math.random() * Math.PI * 2
        });
    }
    const heartPoints = 40;
    const centerX = width / 2, centerY = height / 2 - 10, scale = 5.5;
    for (let i = 0; i < heartPoints; i++) {
        const t = (i / heartPoints) * 2 * Math.PI;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        heartStars.push({
            x: centerX + x * scale, y: centerY + y * scale,
            radius: Math.random() * 1.5 + 1, alpha: 1,
            twinkleSpeed: Math.random() * 0.03 + 0.02,
            twinkleOffset: Math.random() * Math.PI * 2
        });
    }
    for (let i = 0; i < 15; i++) {
        const t = Math.random() * 2 * Math.PI;
        const innerScale = scale * (Math.random() * 0.6 + 0.2);
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        heartStars.push({
            x: centerX + x * innerScale, y: centerY + y * innerScale,
            radius: Math.random() * 1 + 0.5, alpha: 0.6,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            twinkleOffset: Math.random() * Math.PI * 2
        });
    }
    function drawLines() {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < heartPoints; i++) {
            const next = (i + 1) % heartPoints;
            ctx.beginPath();
            ctx.moveTo(heartStars[i].x, heartStars[i].y);
            ctx.lineTo(heartStars[next].x, heartStars[next].y);
            ctx.stroke();
        }
    }
    function animate() {
        ctx.clearRect(0, 0, width, height);
        const time = Date.now() / 1000;
        stars.forEach(star => {
            const twinkle = Math.sin(time * star.twinkleSpeed * 10 + star.twinkleOffset) * 0.4 + 0.6;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`;
            ctx.fill();
        });
        drawLines();
        heartStars.forEach(star => {
            const twinkle = Math.sin(time * star.twinkleSpeed * 10 + star.twinkleOffset) * 0.3 + 0.7;
            const glowRadius = star.radius * 3;
            const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRadius);
            gradient.addColorStop(0, `rgba(255, 215, 0, ${star.alpha * twinkle * 0.4})`);
            gradient.addColorStop(1, "rgba(255, 215, 0, 0)");
            ctx.beginPath();
            ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 220, ${star.alpha * twinkle})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

window.addEventListener("resize", () => setTimeout(initStarMap, 200));

function showStarMessage() {
    document.getElementById("starOverlay").style.display = "block";
    document.getElementById("starPopup").style.display = "block";
}
function closeStarMsg() {
    document.getElementById("starOverlay").style.display = "none";
    document.getElementById("starPopup").style.display = "none";
}

// ===== GALLERY FOLDERS =====
const folders = {
    mischief: {
        title: "Mischievous Potato 😈🥔",
        photos: ["mischief1.jpg","mischief2.jpg","mischief3.jpg","mischief4.jpg","mischief5.jpg","mischief6.jpg","mischief7.jpg","mischief8.jpg","mischief9.jpg"]
    },
    pretty: {
        title: "Pretty Potato 🥺💕",
        photos: ["pretty1.jpg","pretty2.jpg","pretty3.jpg","pretty4.jpg","pretty5.jpg","pretty6.jpg","pretty7.jpg","pretty8.jpg","pretty9.jpg","pretty10.jpg"]
    }
};

let currentFolder = null, currentSlideIndex = 0;
let touchStartX = 0, touchEndX = 0;

function openFolder(folderKey) {
    currentFolder = folders[folderKey];
    currentSlideIndex = 0;
    document.getElementById("folderPopupTitle").textContent = currentFolder.title;
    document.getElementById("folderPopup").classList.add("active");
    renderDots();
    showSlide(0);
    const wrapper = document.getElementById("slideWrapper");
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });
}

function closeFolder() {
    document.getElementById("folderPopup").classList.remove("active");
    currentFolder = null;
}

function showSlide(index) {
    if (!currentFolder) return;
    const total = currentFolder.photos.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    currentSlideIndex = index;
    const img = document.getElementById("slideImg");
    img.classList.add("fade");
    setTimeout(() => {
        img.src = currentFolder.photos[index];
        img.classList.remove("fade");
    }, 200);
    document.getElementById("slideCounter").textContent = (index + 1) + " / " + total;
    document.querySelectorAll(".slide-dot").forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function changeSlide(direction) { showSlide(currentSlideIndex + direction); }

function renderDots() {
    const dotsContainer = document.getElementById("slideDots");
    dotsContainer.innerHTML = "";
    currentFolder.photos.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "slide-dot" + (i === 0 ? " active" : "");
        dot.onclick = () => showSlide(i);
        dotsContainer.appendChild(dot);
    });
}

function handleTouchStart(e) { touchStartX = e.changedTouches[0].screenX; }
function handleTouchEnd(e) { touchEndX = e.changedTouches[0].screenX; handleSwipe(); }
function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) changeSlide(1);
        else changeSlide(-1);
    }
}

document.addEventListener("keydown", e => {
    if (!currentFolder) return;
    if (e.key === "ArrowLeft") changeSlide(-1);
    if (e.key === "ArrowRight") changeSlide(1);
    if (e.key === "Escape") closeFolder();
});

// ===== SLIDESHOW MOVIE =====
let movieInterval = null, movieIndex = 0;
const allMoviePhotos = [
    "month1.jpeg","month2.jpeg","month3.jpeg","month4.jpeg","month5.jpeg","month6.jpeg","month7.jpeg","month8.jpeg",
    ...folders.mischief.photos, ...folders.pretty.photos
];

function startSlideshowMovie() {
    movieIndex = 0;
    document.getElementById("moviePopup").classList.add("active");
    document.getElementById("movieImg").src = allMoviePhotos[0];
    document.getElementById("movieCounter").textContent = "1 / " + allMoviePhotos.length;
    if (!isPlaying) loadAndPlay(0);
    movieInterval = setInterval(() => {
        movieIndex = (movieIndex + 1) % allMoviePhotos.length;
        const img = document.getElementById("movieImg");
        img.classList.add("fade");
        setTimeout(() => {
            img.src = allMoviePhotos[movieIndex];
            img.classList.remove("fade");
        }, 400);
        document.getElementById("movieCounter").textContent = (movieIndex + 1) + " / " + allMoviePhotos.length;
    }, 3500);
}

function stopSlideshowMovie() {
    document.getElementById("moviePopup").classList.remove("active");
    if (movieInterval) { clearInterval(movieInterval); movieInterval = null; }
}

// ===== MISS DIARY =====
function loadDiary() {
    renderDiaryList();
    const toggle = document.getElementById("diaryShared");
    const label = document.getElementById("toggleLabel");
    if (toggle && label) {
        toggle.addEventListener("change", function() {
            label.textContent = this.checked ? "💌 For Potato" : "🔒 Private";
        });
    }
}

function saveDiaryEntry() {
    const input = document.getElementById("diaryInput");
    const text = input.value.trim();
    const isShared = document.getElementById("diaryShared").checked;
    if (text === "") { alert("Write something first baby 🥺"); return; }
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const entry = { date: dateStr, time: timeStr, text: text, shared: isShared, timestamp: now.getTime() };
    const entries = JSON.parse(localStorage.getItem("diaryEntries") || "[]");
    entries.unshift(entry);
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
    input.value = "";
    document.getElementById("diaryShared").checked = false;
    document.getElementById("toggleLabel").textContent = "🔒 Private";
    renderDiaryList();
    showSavedToast("Saved 💕");
    loadStats();
}

function showSavedToast(msg) {
    const toast = document.getElementById("themeToast");
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
}

function renderDiaryList() {
    const list = document.getElementById("diaryList");
    if (!list) return;
    const entries = JSON.parse(localStorage.getItem("diaryEntries") || "[]");
    list.innerHTML = "";
    if (entries.length === 0) {
        list.innerHTML = '<p class="diary-empty-msg">No entries yet. Pour your heart out baby 💕</p>';
        return;
    }
    entries.forEach((entry, index) => {
        const li = document.createElement("li");
        li.className = "diary-entry-item";
        const badge = entry.shared 
            ? '<span class="diary-entry-badge shared">💌 For Potato</span>'
            : '<span class="diary-entry-badge private">🔒 Private</span>';
        li.innerHTML = `
            <div class="diary-entry-info" onclick="viewDiaryEntry(${index})">
                <p class="diary-entry-date">${entry.date} • ${entry.time}</p>
                <p class="diary-entry-preview">${escapeHtml(entry.text)}</p>
                ${badge}
            </div>
            <button class="diary-delete-btn" onclick="deleteDiaryEntry(${index})">🗑️</button>
        `;
        list.appendChild(li);
    });
}

function viewDiaryEntry(index) {
    const entries = JSON.parse(localStorage.getItem("diaryEntries") || "[]");
    const entry = entries[index];
    if (!entry) return;
    document.getElementById("diaryEntryDate").textContent = entry.date + " • " + entry.time;
    document.getElementById("diaryEntryMode").textContent = entry.shared ? "💌 For Potato" : "🔒 Private";
    document.getElementById("diaryEntryText").textContent = entry.text;
    document.getElementById("diaryOverlay").style.display = "block";
    document.getElementById("diaryPopup").style.display = "block";
}

function closeDiaryEntry() {
    document.getElementById("diaryOverlay").style.display = "none";
    document.getElementById("diaryPopup").style.display = "none";
}

function deleteDiaryEntry(index) {
    if (!confirm("Delete this entry? This can't be undone 🥺")) return;
    const entries = JSON.parse(localStorage.getItem("diaryEntries") || "[]");
    entries.splice(index, 1);
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
    renderDiaryList();
    loadStats();
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// ===== WISH JAR =====
let currentWishIndex = -1;

function loadWishes() { renderWishes(); }

function addWish() {
    const input = document.getElementById("wishInput");
    const text = input.value.trim();
    if (text === "") { alert("Make a wish first baby 🌟"); return; }
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const wish = { text: text, date: dateStr, cameTrue: false, timestamp: now.getTime() };
    const wishes = JSON.parse(localStorage.getItem("wishes") || "[]");
    wishes.unshift(wish);
    localStorage.setItem("wishes", JSON.stringify(wishes));
    input.value = "";
    renderWishes();
    showSavedToast("Wish dropped 🌟");
    loadStats();
}

function renderWishes() {
    const jar = document.getElementById("wishJar");
    if (!jar) return;
    const wishes = JSON.parse(localStorage.getItem("wishes") || "[]");
    jar.innerHTML = "";
    if (wishes.length === 0) {
        jar.innerHTML = '<p class="wish-empty-msg">Your jar is empty. Make a wish baby ✨</p>';
        return;
    }
    wishes.forEach((wish, index) => {
        const bubble = document.createElement("div");
        bubble.className = "wish-bubble" + (wish.cameTrue ? " came-true" : "");
        bubble.textContent = wish.cameTrue ? "✨" : "🫧";
        bubble.onclick = () => openWish(index);
        jar.appendChild(bubble);
    });
}

function openWish(index) {
    currentWishIndex = index;
    const wishes = JSON.parse(localStorage.getItem("wishes") || "[]");
    const wish = wishes[index];
    document.getElementById("wishPopupDate").textContent = wish.date + (wish.cameTrue ? " ✨ Came True!" : "");
    document.getElementById("wishPopupText").textContent = wish.text;
    document.getElementById("wishTrueBtn").style.display = wish.cameTrue ? "none" : "inline-block";
    document.getElementById("wishOverlay").style.display = "block";
    document.getElementById("wishPopup").style.display = "block";
}

function closeWish() {
    document.getElementById("wishOverlay").style.display = "none";
    document.getElementById("wishPopup").style.display = "none";
    currentWishIndex = -1;
}

function markWishCameTrue() {
    if (currentWishIndex < 0) return;
    const wishes = JSON.parse(localStorage.getItem("wishes") || "[]");
    wishes[currentWishIndex].cameTrue = true;
    localStorage.setItem("wishes", JSON.stringify(wishes));
    renderWishes();
    closeWish();
    showSavedToast("Wish came true ✨");
}

function deleteWish() {
    if (currentWishIndex < 0) return;
    if (!confirm("Delete this wish? 🥺")) return;
    const wishes = JSON.parse(localStorage.getItem("wishes") || "[]");
    wishes.splice(currentWishIndex, 1);
    localStorage.setItem("wishes", JSON.stringify(wishes));
    renderWishes();
    closeWish();
    loadStats();
}

// ===== GAMES =====
function startGame(game) {
    document.getElementById(game + "GamePopup").classList.add("active");
    if (game === "tap") {
        document.getElementById("tapBest").textContent = localStorage.getItem("tapBest") || 0;
        document.getElementById("tapStartMsg").style.display = "block";
    }
    if (game === "reaction") {
        const best = localStorage.getItem("reactionBest");
        document.getElementById("reactionBest").textContent = best ? best + " ms" : "— ms";
        document.getElementById("reactionMsg").textContent = "Tap to start ⚡";
        document.getElementById("reactionArea").className = "reaction-area";
    }
    if (game === "catch") {
        document.getElementById("catchBest").textContent = localStorage.getItem("catchBest") || 0;
        document.getElementById("catchStartMsg").style.display = "block";
    }
    if (game === "memory") {
        const best = localStorage.getItem("memoryBest");
        document.getElementById("memoryBest").textContent = best ? best + " tries" : "— tries";
        beginMemoryGame();
    }
}

function endGame(game) {
    document.getElementById(game + "GamePopup").classList.remove("active");
    if (game === "tap" && tapInterval) clearInterval(tapInterval);
    if (game === "tap" && tapTimerInterval) clearInterval(tapTimerInterval);
    if (game === "catch" && catchInterval) clearInterval(catchInterval);
    if (game === "catch" && catchTimerInterval) clearInterval(catchTimerInterval);
}

// TAP THE POTATO
let tapScore = 0, tapTime = 30, tapInterval, tapTimerInterval;
function beginTapGame() {
    tapScore = 0; tapTime = 30;
    document.getElementById("tapScore").textContent = 0;
    document.getElementById("tapTime").textContent = 30;
    document.getElementById("tapStartMsg").style.display = "none";
    spawnPotato();
    tapInterval = setInterval(spawnPotato, 800);
    tapTimerInterval = setInterval(() => {
        tapTime--;
        document.getElementById("tapTime").textContent = tapTime;
        if (tapTime <= 0) endTapGame();
    }, 1000);
}

function spawnPotato() {
    const area = document.getElementById("tapGameArea");
    if (!area) return;
    const existing = area.querySelector(".tap-target");
    if (existing) existing.remove();
    const potato = document.createElement("div");
    potato.className = "tap-target";
    potato.textContent = "🥔";
    const maxX = area.offsetWidth - 60;
    const maxY = area.offsetHeight - 60;
    potato.style.left = Math.random() * maxX + "px";
    potato.style.top = Math.random() * maxY + "px";
    potato.onclick = () => {
        tapScore++;
        document.getElementById("tapScore").textContent = tapScore;
        potato.remove();
    };
    area.appendChild(potato);
}

function endTapGame() {
    clearInterval(tapInterval);
    clearInterval(tapTimerInterval);
    const best = parseInt(localStorage.getItem("tapBest") || 0);
    if (tapScore > best) {
        localStorage.setItem("tapBest", tapScore);
        alert("NEW HIGH SCORE! 🥳 " + tapScore + " taps! Show off bhondu!");
    } else {
        alert("Time's up! Score: " + tapScore + ". Try again cutie 💕");
    }
    document.getElementById("tapStartMsg").style.display = "block";
    const area = document.getElementById("tapGameArea");
    const existing = area.querySelector(".tap-target");
    if (existing) existing.remove();
}

// REACTION TEST
let reactionState = "idle", reactionStartTime = 0, reactionTimeout;
function reactionClick() {
    const area = document.getElementById("reactionArea");
    const msg = document.getElementById("reactionMsg");
    if (reactionState === "idle") {
        reactionState = "waiting";
        area.className = "reaction-area waiting";
        msg.textContent = "Wait for green... 🔴";
        const delay = 1500 + Math.random() * 3000;
        reactionTimeout = setTimeout(() => {
            reactionState = "ready";
            area.className = "reaction-area ready";
            msg.textContent = "TAP NOW! 💚";
            reactionStartTime = Date.now();
        }, delay);
    } else if (reactionState === "waiting") {
        clearTimeout(reactionTimeout);
        reactionState = "idle";
        area.className = "reaction-area too-soon";
        msg.textContent = "Too soon dumboo! Tap again 😤";
    } else if (reactionState === "ready") {
        const reactionTime = Date.now() - reactionStartTime;
        reactionState = "idle";
        area.className = "reaction-area";
        msg.textContent = reactionTime + "ms ⚡ Tap to retry";
        const best = parseInt(localStorage.getItem("reactionBest") || 9999);
        if (reactionTime < best) {
            localStorage.setItem("reactionBest", reactionTime);
            document.getElementById("reactionBest").textContent = reactionTime + " ms";
            msg.textContent = "🥳 NEW BEST! " + reactionTime + "ms ⚡";
        }
    }
}

// CATCH HEARTS
let catchScore = 0, catchTime = 30, catchInterval, catchTimerInterval;
function beginCatchGame() {
    catchScore = 0; catchTime = 30;
    document.getElementById("catchScore").textContent = 0;
    document.getElementById("catchTime").textContent = 30;
    document.getElementById("catchStartMsg").style.display = "none";
    catchInterval = setInterval(spawnFallingItem, 700);
    catchTimerInterval = setInterval(() => {
        catchTime--;
        document.getElementById("catchTime").textContent = catchTime;
        if (catchTime <= 0) endCatchGame();
    }, 1000);
}

function spawnFallingItem() {
    const area = document.getElementById("catchGameArea");
    if (!area) return;
    const item = document.createElement("div");
    item.className = "falling-item";
    const isBomb = Math.random() < 0.2;
    item.textContent = isBomb ? "💣" : ["❤️","💕","💖","💗"][Math.floor(Math.random()*4)];
    item.style.left = Math.random() * (area.offsetWidth - 40) + "px";
    item.style.animationDuration = (2 + Math.random() * 1.5) + "s";
    item.onclick = () => {
        if (isBomb) {
            catchScore = Math.max(0, catchScore - 3);
        } else {
            catchScore++;
        }
        document.getElementById("catchScore").textContent = catchScore;
        item.remove();
    };
    area.appendChild(item);
    setTimeout(() => item.remove(), 4000);
}

function endCatchGame() {
    clearInterval(catchInterval);
    clearInterval(catchTimerInterval);
    document.getElementById("catchGameArea").querySelectorAll(".falling-item").forEach(i => i.remove());
    const best = parseInt(localStorage.getItem("catchBest") || 0);
    if (catchScore > best) {
        localStorage.setItem("catchBest", catchScore);
        alert("🥳 NEW HIGH SCORE: " + catchScore + " hearts caught!");
    } else {
        alert("Time's up! Caught " + catchScore + " hearts 💕");
    }
    document.getElementById("catchStartMsg").style.display = "block";
}

// MEMORY CARDS
let memoryCards = [], memoryFlipped = [], memoryMatched = [], memoryTries = 0, memoryLock = false;
function beginMemoryGame() {
    const emojis = ["🥔","💕","🌸","⭐","🌙","🥺"];
    memoryCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    memoryFlipped = []; memoryMatched = []; memoryTries = 0; memoryLock = false;
    document.getElementById("memoryTries").textContent = 0;
    const grid = document.getElementById("memoryGrid");
    grid.innerHTML = "";
    memoryCards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.className = "memory-card";
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.textContent = emoji;
        card.onclick = () => flipCard(index);
        grid.appendChild(card);
    });
}

function flipCard(index) {
    if (memoryLock) return;
    if (memoryFlipped.includes(index) || memoryMatched.includes(index)) return;
    const card = document.querySelector(`.memory-card[data-index="${index}"]`);
    card.classList.add("flipped");
    memoryFlipped.push(index);
    if (memoryFlipped.length === 2) {
        memoryTries++;
        document.getElementById("memoryTries").textContent = memoryTries;
        const [a, b] = memoryFlipped;
        if (memoryCards[a] === memoryCards[b]) {
            memoryMatched.push(a, b);
            document.querySelectorAll(`.memory-card[data-index="${a}"], .memory-card[data-index="${b}"]`).forEach(c => c.classList.add("matched"));
            memoryFlipped = [];
            if (memoryMatched.length === memoryCards.length) {
                setTimeout(() => {
                    const best = parseInt(localStorage.getItem("memoryBest") || 999);
                    if (memoryTries < best) {
                        localStorage.setItem("memoryBest", memoryTries);
                        document.getElementById("memoryBest").textContent = memoryTries + " tries";
                        alert("🥳 NEW BEST! " + memoryTries + " tries! Genius bhondu 🧠");
                    } else {
                        alert("Won in " + memoryTries + " tries! 💕");
                    }
                }, 500);
            }
        } else {
            memoryLock = true;
            setTimeout(() => {
                document.querySelectorAll(`.memory-card[data-index="${a}"], .memory-card[data-index="${b}"]`).forEach(c => c.classList.remove("flipped"));
                memoryFlipped = [];
                memoryLock = false;
            }, 800);
        }
    }
}

// ===== SERVICE WORKER =====
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .then(reg => console.log("SW registered ✅"))
            .catch(err => console.log("SW failed ❌", err));
    });
}

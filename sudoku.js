// ✅ setup.js - for setup page (difficulty, time, theme)

const levels = ['Easy', 'Medium', 'Hard'];
let index = 0;
let time = 1;

const diffbutton = document.getElementById("diffButton");
const timebutton = document.getElementById("timeButton");
const themebutton = document.getElementById("themeButton");

diffbutton.addEventListener("click", (e) => {
    e.preventDefault();
    index = (index + 1) % levels.length;
    const level = levels[index];
    diffbutton.textContent = level;
    console.log(level);
    localStorage.setItem("level", level);
});

timebutton.addEventListener("click", () => {
    time = (time + 1) % 15;
    time = time === 0 ? 15 : time;
    timebutton.textContent = time + " Min";
});

themebutton.addEventListener("click", () => {
    if (themebutton.textContent === "Light") {
        themebutton.textContent = "Dark";
    } else {
        themebutton.textContent = "Light";
    }
});

function gameStart() {
    const theme = themebutton.textContent;
    localStorage.setItem("time", time);
    localStorage.setItem("theme", theme);
    const level = diffbutton.textContent;
    localStorage.setItem("level", level);
    window.location.href = "game.html";
}

let animationFrameId;

function updateCountdown() {
    const inputDate = document.getElementById('bday-input').value;
    if (!inputDate) return;
    const parts = inputDate.split('-');
    const bMonth = parseInt(parts[1], 10) - 1; 
    const bDay = parseInt(parts[2], 10);
const now = new Date();
    let targetDate = new Date(now.getFullYear(), bMonth, bDay, 0, 0, 0, 0);
if (bMonth === 1 && bDay === 29 && targetDate.getMonth() !== 1) {
        targetDate = new Date(now.getFullYear(), 2, 1, 0, 0, 0, 0);
    }

    if (now.getTime() >= targetDate.getTime()) {
        const endOfBirthday = new Date(targetDate.getTime());
        endOfBirthday.setHours(23, 59, 59, 999);
if (now.getTime() <= endOfBirthday.getTime()) {
            document.getElementById("message").innerText = "🎉 HAPPY BIRTHDAY! 🎉";
            renderTime(0, 0, 0, 0);
            cancelAnimationFrame(animationFrameId); 
            return;
        }
targetDate.setFullYear(now.getFullYear() + 1);
        document.getElementById("message").innerText = "Counting down to your next birthday...";
    } else {
        document.getElementById("message").innerText = "Counting down to your birthday...";
    }
const diffMs = targetDate.getTime() - now.getTime();
const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    renderTime(days, hours, minutes, seconds);
animationFrameId = requestAnimationFrame(updateCountdown);
}
function renderTime(d, h, m, s) {
    document.getElementById("days").innerText = String(d).padStart(2, '0');
    document.getElementById("hours").innerText = String(h).padStart(2, '0');
    document.getElementById("minutes").innerText = String(m).padStart(2, '0');
    document.getElementById("seconds").innerText = String(s).padStart(2, '0');
}
document.getElementById('bday-input').addEventListener('change', () => {
    cancelAnimationFrame(animationFrameId); 
    updateCountdown(); 
});
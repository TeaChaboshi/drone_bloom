// ===== Matrix rain background =====
(function matrixRain() {
    const c = document.getElementById("matrix");
    const ctx = c.getContext("2d");
    function resize() {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        columns = Math.floor(c.width / fontSize);
        drops = Array(columns).fill(1 + Math.floor(Math.random() * 50));
    }
    const chars =
        "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&+=*";
    const fontSize = 14;
    let columns = 0,
        drops = [];
    resize();
    window.addEventListener("resize", resize);

    function draw() {
        ctx.fillStyle = "rgba(5,8,6,0.10)";
        ctx.fillRect(0, 0, c.width, c.height);

        ctx.fillStyle = "#0aff57";
        ctx.font = fontSize + 'px ui-monospace, "DM Mono", monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize,
                y = drops[i] * fontSize;
            ctx.fillText(text, x, y);
            if (y > c.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// ===== SPA niceties =====
document.getElementById("year").textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
        const id = a.getAttribute("href").slice(1);
        const el = document.getElementById(id);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ===== PWA-like install prompt wiring (requires a real manifest + sw on production) =====
let deferredPrompt = null;
const installBtn = document.getElementById("installBtn");
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
});
installBtn?.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
});

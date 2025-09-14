(function matrixRain() {
    const c = document.getElementById("matrix");
    const ctx = c.getContext("2d");
    const chars =
        "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&+=*";
    const fontSize = 8;
    const GLOBAL_SPEED = 10; // rows per second (lower = slower)

    let columns = 0,
        drops = [],
        speeds = [],
        last = 0;

    function resize() {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        columns = Math.floor(c.width / fontSize);
        drops = Array(columns).fill(1 + Math.floor(Math.random() * 50));
        // per-column speed multipliers (adds variety)
        speeds = Array.from(
            { length: columns },
            () => 0.7 + Math.random() * 0.6
        ); // 0.7–1.3x
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(now = 0) {
        const dt = Math.min(0.05, (now - (last || now)) / 1000); // seconds, capped
        last = now;

        ctx.fillStyle = "rgba(5,8,6,0.10)";
        ctx.fillRect(0, 0, c.width, c.height);

        ctx.fillStyle = "yellow";
        ctx.font = fontSize + 'px ui-monospace, "DM Mono", monospace';

        for (let i = 0; i < drops.length; i++) {
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            const ch = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(ch, x, y);

            // slower flow: tune GLOBAL_SPEED
            drops[i] += GLOBAL_SPEED * speeds[i] * dt;

            if (y > c.height && Math.random() > 0.985) drops[i] = 0; // tweak reset feel
        }
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
})();

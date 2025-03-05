document.addEventListener("DOMContentLoaded", () => {
    // Ripple Effect
    function drawRipple(ev) {
        const ripple = document.createElement("div");
        ripple.classList.add("ripple", "animate");

        ripple.style.left = `${ev.clientX}px`;
        ripple.style.top = `${ev.clientY}px`;

        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    document.addEventListener("click", drawRipple);

    // Dark Mode Toggle
    const controller = document.querySelector(".controller");

    function toggleDarkMode() {
        document.body.classList.toggle("dark");
        controller.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
    }

    controller.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent ripple from appearing on the button
        toggleDarkMode();
    });
});

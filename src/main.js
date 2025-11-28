import './style.css'

const scriptURL =
  "https://script.google.com/macros/s/AKfycbx2z467MNSGJIKTVxcT7c9CtnDMt2Hg5iuvU8mMrNv1JDGEuGhZqiC7GoYqqtueGfD6/exec";
const form = document.getElementById("email-form");
const emailInput = document.getElementById("email-input");
const message = document.getElementById("form-message");
const submitBtn = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!email) return;
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting…";
  submitBtn.classList.add("opacity-60", "cursor-not-allowed");
  try {
    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    message.textContent = "Thanks! You’ll be notified ❤️";
    message.classList.remove("text-red-600");
    message.classList.add("text-green-600");
    emailInput.value = "";
  } catch (err) {
    message.textContent = "Oops! Something went wrong.";
    message.classList.remove("text-green-600");
    message.classList.add("text-red-600");
  }
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Join Waitlist";
    submitBtn.classList.remove("opacity-60", "cursor-not-allowed");
  }, 1200);
});

window.addEventListener("load", () => {
  const splatScreen = document.getElementById("splat-screen");
  const dripSvg = splatScreen.querySelector("svg");

  const waveHeight = dripSvg.clientHeight;
  const viewportHeight = window.innerHeight;
  const targetHeight = viewportHeight + waveHeight + 50;

  gsap.set("#intro-container", { pointerEvents: "auto" });
  gsap.set("#splat-screen", { height: waveHeight, y: -waveHeight });

  const tl = gsap.timeline({
    onComplete: () => {
      document.getElementById("intro-container").style.display = "none";
      document.body.classList.remove("overflow-hidden");
    }
  });

  // --- ANIMATION ---
  tl
    // 1. throw the tomato
    .to("#flying-tomato", { opacity: 1, duration: 0.05 })
    .fromTo("#flying-tomato",
      { scale: 0.1, rotation: 0 },
      { scale: 35, rotation: 360, duration: 1.0, ease: "power3.in" }
    )
    .addLabel("impact")

    // 2. splat fill
    .to("#splat-screen", {
      y: 0,
      height: targetHeight,
      duration: 1.5,
      ease: "power2.out"
    }, "impact-=0.1")

    // 3. cleanup the tomato
    .to("#flying-tomato", { opacity: 0, duration: 0.01 }, "impact")

    // 4. reveal
    .to("#splat-screen", {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut"
    })
    .to("#site-content", {
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut"
    }, "<");
});
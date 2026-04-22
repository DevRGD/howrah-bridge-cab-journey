# Howrah Bridge Cab Journey

This project is a small, interactive web experience. The goal was to build a smooth, atmospheric simulation of a journey across the iconic Howrah Bridge in Kolkata.

In this simulation, you will see a character walk to a yellow cab, get inside, and enjoy a ride across the bridge.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=flat-square)](https://howrah-bridge-cab-journey.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-lightgrey?style=flat-square)](https://github.com/DevRGD/howrah-bridge-cab-journey)

---

## Setup and Installation

I used Bun for this project because it is fast and easy to work with.

1. **Clone the project:**
   ```bash
   git clone https://github.com/DevRGD/howrah-bridge-cab-journey.git
   ```

2. **Go into the folder:**
   ```bash
   cd howrah-bridge-cab-journey
   ```

3. **Install the needs:**
   ```bash
   bun install
   ```

4. **Start the app:**
   ```bash
   bun dev
   ```

Now just open `http://localhost:3000` in your browser.

---

## How I Built This (My Approach)

I wanted this to feel more like a poetic experience than just a technical task. Here is how I went about it:

- **Thinking it through:** I started by visualizing the journey. Idle scene, the walk, the car door closing, and the movement of the bridge picking tech stack that could handle smooth animations without feeling heavy.
- **Making the visuals:** I used Gemini and Meta AI to help generate some of the base video ideas. I then designed custom SVGs like bird & cloud in Figma to make sure everything looked crisp.
- **The Lottie Magic:** To keep the animations smooth and scalable, I took video sequences and turned them into Lottie animations using Adobe After Effects. This makes the characters and cars move fluidly at any screen size.
- **Sound Design:** I spent time looking for the right sounds on the web to make it sound good.
- **Coding with AI:** I used Gemini Pro as my coding partner to help speed up the boilerplate work and help me solve tricky animation sync issues.
- **Polishing:** I spent a lot of time manually testing and tweaking the timings to make sure it felt just right and breaking into smaller components and hooks to keep it scalable.

---

## The Tech Stack

- **Next.js:** The main framework, built on top of React.js.
- **Zustand:** The global state handler for the project. It handles all the states in one place.
- **GSAP and Lottie-React:** These two do all the heavy lifting for the animations.
- **Howler.js:** Used this to manage all the audio and make sure sounds play exactly when they should.
- **Tailwind CSS:** For styling.

---

## Author

**Gautam Das (DevRGD)**
- GitHub: [@DevRGD](https://github.com/DevRGD)

---

> [!IMPORTANT]
> This project was developed specifically for the **Webingo Technical Round Assignment**.

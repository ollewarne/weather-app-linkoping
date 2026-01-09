# ☀️ Weather-App Linköping

A sleek, responsive, and easy-to-use frontend application for checking the current and forecasted weather in Linköping (and other locations).

---

### 🚀 Live Demo

You can view the deployed version of this application on GitHub Pages:

**[View Live Application](https://ollewarne.github.io/weather-app-linkoping/)**

---

## ✨ Features

This application provides a modern user experience with a focus on simplicity and performance.

* **City Search:** Find weather information for any city or location.
* **Detailed Current Weather:** Displays temperature, conditions, and other relevant metrics.
* **Modular Design:** Built with a component-based structure using vanilla JavaScript for easy maintenance and scalability.
* **Responsive UI:** Optimized to look great on desktop, tablet, and mobile devices.

## 🛠️ Technology Stack & Setup

This project is a modern, dependency-light web application built entirely using core web technologies.

| Category | Technology | Notes |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | Used to create the user interface and application logic. |
| **API** | **Open-Meteo API** | Weather data is sourced from the free and open-source **Open-Meteo API**. |
| **Architecture** | Modular Vanilla JS | Core logic is separated into `main.js` and `app.js`, with API handling in `services/`, and reusable elements in `components/`. |

## 💻 Local Setup

Since this is a vanilla JavaScript project, setting it up locally is straightforward.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ollewarne/weather-app-linkoping.git
    cd weather-app-linkoping
    ```

2.  **Run the application:**
    You can simply open the `index.html` file in your preferred web browser.

    Alternatively, for a better development experience (which handles API requests more reliably), you can serve the files using a simple local server:

    *If you have Python installed:*
    ```bash
    python3 -m http.server 8000
    ```
    Then, navigate to `http://localhost:8000` in your browser.

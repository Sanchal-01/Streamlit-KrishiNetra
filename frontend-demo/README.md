# 🌐 Frontend Demo (HTML / CSS / JavaScript)

This folder contains the **frontend demonstration** of the Plant Disease Recognition System.
The frontend is created using **HTML, CSS, and JavaScript** to visually explain the workflow
of the Streamlit-based machine learning application.

Since a live Streamlit deployment is not available, a **video-based walkthrough** is provided
to demonstrate the application flow and UI behavior.

---

## 🧩 Purpose of the Frontend Demo

- Demonstrate the UI/UX of the application
- Explain the prediction workflow visually
- Support and complement the Streamlit-based ML backend
- Provide clarity in the absence of a live deployment

---

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript

---

## 🌍 Language & UI Configuration

The `lang.json` file is used to store **UI text, labels, and messages** separately from the HTML and JavaScript code.

### Why `lang.json` is used:
- Keeps UI text organized and easy to update
- Avoids hardcoding content inside HTML/JS files
- Enables simple language switching (English / Hindi)
- Improves readability and maintainability of the frontend code

The frontend dynamically loads UI content from `lang.json` using JavaScript.

---

## 🎥 Demo Video

📺 **YouTube Walkthrough:**  
👉 https://www.youtube.com/watch?v=YOUR_VIDEO_LINK_HERE

The video explains:
- Overall application flow
- User interface design
- Image upload process
- Display of prediction results

---

## 📂 Files Included

- `sanchal.html` – Main webpage structure  
- `style.css` – Styling and layout  
- `script.js` – Frontend logic and interactions  
- `lang.json` – Language configuration for UI text (English / Hindi)

---

## 📝 Note

This frontend is created **only for demonstration and explanation purposes**.
All actual predictions are handled by the **Streamlit + TensorFlow backend**.

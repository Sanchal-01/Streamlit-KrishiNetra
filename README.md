# 🌿 Plant Disease Recognition System

This project is a plant disease recognition web application built using **TensorFlow** and **Streamlit**.
It predicts plant diseases from leaf images and displays the predicted class along with confidence.

The project was developed during the **Smart India Hackathon 2025** and focuses on the practical application of **Deep Learning and model deployment**.

---

## 🚀 Project Overview

This **Plant Disease Recognition System** uses a **Convolutional Neural Network (CNN)** to analyze images of plant leaves and identify whether the plant is healthy or affected by a disease.

### 🔍 How the System Works
- A user (farmer or researcher) uploads an image of a plant leaf
- The trained CNN model processes and analyzes the image
- The system predicts the disease or healthy class
- A confidence score is displayed for better understanding

---

## 🏆 Hackathon Context

This project was developed as part of the **Smart India Hackathon 2025**, where a team of **4 members** collaborated to build a practical solution for plant disease detection using deep learning.

The hackathon work involved:
- Dataset understanding and preprocessing
- Model training and evaluation
- Building a web-based interface for prediction
- Integrating the trained model with a Streamlit application

---

## 👥 Individual Contribution

This repository represents my **individual contribution and learning** from the hackathon project.

My responsibilities included:
- Working with the trained TensorFlow model
- Implementing the Streamlit web application
- Handling image preprocessing
- Integrating model inference with a user-friendly UI

The project was a collaborative team effort, and each member contributed to different aspects of the solution.

---

## 🧪 Dataset Information

- Dataset source: PlantVillage
- Total images: ~87,000 RGB images
- Number of classes: 38 (healthy + diseased)
- Train / Validation split: 80% / 20%
- Image size used for training: 128 × 128

---

## 🛠️ Technologies Used

- Python
- TensorFlow / Keras
- Streamlit
- NumPy
- Pillow (PIL)

---

## 🧠 Model Details

- Input shape: 128 × 128 × 3
- Image normalization: pixel values scaled to range 0–1
- Output layer: Softmax
- Prediction based on highest probability

---

## ▶️ How to Run the Project

### 1️⃣ Install required libraries
```bash
pip install -r requirements.txt
```

### 2️⃣ Run the Streamlit application
```bash
streamlit run app.py
```
---

## 📂 Project Structure
```bash
plant-disease-recognition/
│
├── app.py
├── trained_model.keras
├── README.md
└── requirements.txt
```
---

## 🎯 Purpose of the Project

- Apply deep learning concepts in a real-world problem
- Understand image preprocessing and model inference
- Practice deploying ML models using Streamlit
- Gain hands-on experience through **hackathon-based teamwork**
- Build a practical ML project for portfolio and learning

---

## ⚠️ Note

This project is developed for **educational and learning purposes** as part of a hackathon.
It should not be used as a replacement for professional agricultural or medical advice.

---

## 👤 Author

**Sanchal Kumar**  
(Data Analytics / Machine Learning – Hackathon Project)



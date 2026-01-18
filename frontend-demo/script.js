// Get DOM elements
const fileInput = document.getElementById('file-input');
const uploadContainer = document.getElementById('upload-container');
const imagePreview = document.getElementById('image-preview');
const previewImg = document.getElementById('preview-img');
const analyzeBtn = document.getElementById('analyze-btn');
const resultContainer = document.getElementById('result-container');
const resultMessage = document.getElementById('result-message');
const resultDetails = document.getElementById('result-details');
const healthScore = document.getElementById('health-score');
const waterNeeds = document.getElementById('water-needs');
const growthStage = document.getElementById('growth-stage');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');
const languageSwitcher = document.getElementById('language-switcher'); // ✅ FIXED

// Language data
let translations = {};

// Load translations from JSON file
fetch('lang.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        // Set initial language based on browser preference or default to English
        const browserLang = navigator.language.split('-')[0];
        const defaultLang = translations[browserLang] ? browserLang : 'en';
        languageSwitcher.value = defaultLang;
        setLanguage(defaultLang);
    })
    .catch(error => console.error('Error loading language file:', error));

// Change language on selection
languageSwitcher.addEventListener("change", () => {
    setLanguage(languageSwitcher.value);
});

function setLanguage(lang) {
    // Loop through all elements with data-key
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Loop through elements with specific IDs
    const ids = [
        "title", "tagline", "ss", "description", "upload_button",
        "analyze_button", "result_text", "about_title", "about_text",
        "contact_title", "name_label", "email_label", "message_label",
        "send_button"
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && translations[lang][id]) {
            el.textContent = translations[lang][id];
        }
    });
}

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// File upload handling
uploadContainer.addEventListener('click', () => {
    fileInput.click();
});

uploadContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadContainer.classList.add('bg-green-100');
    uploadContainer.classList.remove('bg-green-50');
});

uploadContainer.addEventListener('dragleave', () => {
    uploadContainer.classList.remove('bg-green-100');
    uploadContainer.classList.add('bg-green-50');
});

uploadContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadContainer.classList.remove('bg-green-100');
    uploadContainer.classList.add('bg-green-50');
    
    if (e.dataTransfer.files.length) {
        handleImageUpload(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleImageUpload(e.target.files[0]);
    }
});

function handleImageUpload(file) {
    if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImg.src = e.target.result;
        uploadContainer.classList.add('hidden');
        imagePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}
const resultsByStatus = {
  healthy: {
    messageKey: 'status_healthy',
    score: '92%',
    water: 'Low',
    stage: 'Flowering',
    suggestion: 'HEALTHY, keep monitoring your crops and continue current care.'
  },
  needs_water: {
    messageKey: 'Status-needs_water',
    score: '65%',
    water: 'Medium',
    stage: 'Vegetative',
    suggestion: 'IRRIGATION_REQUIRED_Irrigate within the next 48 hours and check soil moisture.'
  },
  disease_detected: {
    messageKey: 'Status=disease_detected',
    score: '45%',
    water: 'High',
    stage: 'Fruiting',
    suggestion: 'DISEASE_DETECTED, Inspect affected leaves and consider an appropriate fungicide treatment.'
  }
};

const STATUS_SEQUENCE = [
  'healthy',
  'needs_water',
  'healthy',
  'disease_detected',
  'disease_detected',
  'healthy',
  'disease_detected'
];

function getNextStatus() {
  // uses sessionStorage so it persists across refreshes but resets when the tab/window closes
  let count = parseInt(sessionStorage.getItem('analyzeCount') || '0', 10);
  const idx = count % STATUS_SEQUENCE.length;
  const status = STATUS_SEQUENCE[idx];
  // increment AFTER using current status
  sessionStorage.setItem('analyzeCount', (count + 1).toString());
  return status;
}


async function analyzeCrop() {
  try {
    // UI: show loading (your existing spinner logic)
    analyzeBtn.setAttribute('aria-busy', 'true');
    analyzeBtn.disabled = true;
    analyzeBtn.classList.add('loading');

    // simulate analysis delay (or replace with real API call)
    await new Promise(r => setTimeout(r, 2000));

    // Get next status from sequence
    const status = getNextStatus();
    const result = resultsByStatus[status];

    // translations dictionary (if you load lang.json earlier into `translations`)
    const currentLang = languageSwitcher.value || 'en';
    const dict = translations[currentLang] || {};

    // message translation (fallback to messageKey or English text)
    const messageText = dict[result.messageKey] || result.messageKey || '';
    // suggestion translation key (optional): e.g. 'suggestion_healthy'
    const suggestionKey = 'suggestion_' + status;
    const suggestionText = dict[suggestionKey] || result.suggestion || '';

    // update UI (guard elements exist)
    if (resultMessage) {
      resultMessage.textContent = messageText;
      resultMessage.setAttribute('aria-live', 'polite');
    }
    if (healthScore) healthScore.textContent = result.score;
    if (waterNeeds) waterNeeds.textContent = result.water;
    if (growthStage) growthStage.textContent = result.stage;

    const suggestionEl = document.getElementById('result-suggestion');
    if (suggestionEl) suggestionEl.textContent = suggestionText;

    // reveal result area
    if (resultContainer) resultContainer.classList.remove('hidden');
    if (resultDetails) resultDetails.classList.remove('hidden');
  } catch (err) {
    console.error('Analyze failed', err);
    const dict = translations[languageSwitcher.value] || {};
    resultMessage.textContent = dict.analyze_error || 'Analysis failed. Please try again.';
  } finally {
    // reset loading state
    analyzeBtn.removeAttribute('aria-busy');
    analyzeBtn.disabled = false;
    analyzeBtn.classList.remove('loading');
    const dict = translations[languageSwitcher.value] || {};
    analyzeBtn.innerHTML = `<i class="fas fa-search mr-2"></i> ${dict.analyze_button || 'Analyze Crop'}`;
  }
}


// Attach listener
analyzeBtn.addEventListener('click', analyzeCrop);


// attach listener
analyzeBtn.addEventListener('click', analyzeCrop);


// attach listener
analyzeBtn.addEventListener('click', analyzeCrop);

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        return;
    }
    
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});
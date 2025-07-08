// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- CHATBOT ELEMENTS ---
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const heroBookBtn = document.getElementById('hero-book-now');

    // --- CHATBOT STATE ---
    let isChatbotOpen = false;

    // --- FUNCTIONS ---
    const toggleChatbot = () => {
        isChatbotOpen = !isChatbotOpen;
        chatbotContainer.classList.toggle('open');
    };

    const addMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.innerHTML = message; // Use innerHTML to render emojis and links
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to bottom
    };

    const handleInitialGreeting = () => {
        setTimeout(() => {
            addMessage("Welcome to Aura Nails! Can I help you find the perfect treatment or book an appointment for you? ✨", "aura");
        }, 1000);
    };
    
    // --- EVENT LISTENERS ---

    // Open/close chatbot window
    chatbotIcon.addEventListener('click', () => {
        toggleChatbot();
        // If it's the first time opening, show greeting
        if (isChatbotOpen && chatBody.children.length === 0) {
            handleInitialGreeting();
        }
    });
    
    closeChatbotBtn.addEventListener('click', toggleChatbot);

    // Proactive chatbot opening on Home page after inactivity
    let inactivityTimer;
    const startInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            if (!isChatbotOpen && window.location.pathname.endsWith('index.html')) {
                toggleChatbot();
                handleInitialGreeting();
            }
        }, 10000); // 10 seconds
    };

    // Start timer on page load
    startInactivityTimer();
    // Reset timer on user activity
    document.addEventListener('mousemove', startInactivityTimer);
    document.addEventListener('keypress', startInactivityTimer);


    // Handle "Book Now" click from Hero section
    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isChatbotOpen) {
                toggleChatbot();
            }
            // Clear chat and start booking flow
            chatBody.innerHTML = ''; 
            setTimeout(() => {
                addMessage("Wonderful! Let's get you booked. What service are you interested in today?", "aura");
            }, 500);
        });
    }

    // Simulate chat responses
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            const userMessage = chatInput.value.trim();
            addMessage(userMessage, 'user');
            chatInput.value = '';
            
            // Basic simulated AI response logic
            setTimeout(() => {
                if (userMessage.toLowerCase().includes('manicure')) {
                    addMessage("Great choice! We have several luxurious manicure options. Are you interested in our Classic, Gel, or our signature Sculpted Gel Manicure?", "aura");
                } else if (userMessage.toLowerCase().includes('hours')) {
                    addMessage("We are open Tuesday to Saturday, from 9 AM to 6 PM. Would you like to book an appointment? 📅", "aura");
                } else if (userMessage.toLowerCase().includes('difference')) {
                     addMessage("Great question! The Classic is a traditional polish, the Gel offers a durable, high-shine finish lasting 2+ weeks, and the Sculpted Gel adds strength and length to your natural nails. Which would you like to book? ✨", "aura");
                } else {
                    addMessage("I can help with booking, service questions, and salon hours. How can I assist you?", "aura");
                }
            }, 1200);
        }
    });

    // Code for other pages will be added later, e.g., handling 'Book Now' on services page
    
});

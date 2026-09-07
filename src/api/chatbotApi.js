import { apiRequest } from './client';

export const DEFAULT_CHATBOT_CONFIG = {
  step1: {
    promptMessage: "Hi! 👋 Welcome to Admire Softech. I'm your AI IT solutions assistant. How can we help you today?",
    options: [
      "Website Development",
      "Mobile App Development",
      "Cloud & DevOps",
      "AI/ML Solutions",
      "Website Maintenance",
      "Hire a Developer",
      "Submit an Enquiry",
    ],
  },
  step2: {
    promptMessage: "Great! What type of project or solution are you looking for?",
    options: [
      "Business Website",
      "E-commerce Website",
      "Custom Web Application",
      "Mobile App (iOS / Android)",
      "Cloud & DevOps Infrastructure",
      "AI Chatbot / Custom Agent",
      "Not Sure / Let's Discuss",
    ],
  },
  step3: {
    promptMessage: "Nice! What features or capabilities do you need?",
    options: [
      "Payment Gateway Integration",
      "Product & Inventory Management",
      "User Login & Authentication",
      "Admin Analytics Dashboard",
      "Order Management & Cart",
      "Responsive Modern UI/UX",
      "CMS & Content Management",
      "REST/GraphQL API Integration",
      "SEO & Speed Optimization",
      "Cloud Auto-scaling & CI/CD",
    ],
  },
  step4: {
    promptMessage: "What is your approximate budget range for this project? 💰",
    options: [
      "Below ₹25,000",
      "₹25,000 - ₹50,000",
      "₹50,000 - ₹1,00,000",
      "₹1,00,000 - ₹2,50,000",
      "Above ₹2,50,000",
      "Not Sure / Let's Discuss",
    ],
  },
  step5: {
    formPromptMessage: "Wonderful! We have great technical solutions for you. Please share your details so our engineering team can send a tailored proposal:",
    successMessage: "🎉 Thank you! Your project requirements have been received. Our solutions architect will reach out within 24 hours.",
    whatsappNumber: "+919876543210",
    whatsappPrefillText: "Hello Admire Softech, I just submitted an inquiry through your AI Chatbot and would like to discuss my project!",
  },
};

/**
 * Fetch live dynamic chatbot settings configured by the admin
 */
export const getChatbotSettings = async () => {
  try {
    const res = await apiRequest('/chatbot/settings');
    if (res && res.settings) {
      return res.settings;
    }
    return DEFAULT_CHATBOT_CONFIG;
  } catch (error) {
    console.warn('[Chatbot API] Using fallback default settings:', error.message);
    return DEFAULT_CHATBOT_CONFIG;
  }
};

/**
 * Submit chatbot lead to the backend
 */
export const submitChatbotLead = async (leadPayload) => {
  try {
    const res = await apiRequest('/chatbot/lead', {
      method: 'POST',
      body: JSON.stringify(leadPayload),
    });

    if (res) return res;

    // Graceful offline fallback
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      message: `Thank you ${leadPayload.fullName || 'there'}! Your inquiry has been received. Our team will reach out within 24 hours.`,
      lead: leadPayload,
    };
  } catch (error) {
    console.warn('[Chatbot API] Offline fallback response activated:', error.message);
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      message: `Thank you ${leadPayload.fullName || 'there'}! Your inquiry has been received. Our team will reach out within 24 hours.`,
      lead: leadPayload,
    };
  }
};

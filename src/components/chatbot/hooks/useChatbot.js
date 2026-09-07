import { useState, useEffect, useCallback, useRef } from 'react';
import { getChatbotSettings, submitChatbotLead, DEFAULT_CHATBOT_CONFIG } from '../../../api/chatbotApi';
import { formatTime } from '../data/chatbotFlowData';

export function useChatbot() {
  const [settings, setSettings] = useState(DEFAULT_CHATBOT_CONFIG);
  const [loadingConfig, setLoadingConfig] = useState(true);

  const [step, setStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  // Selected Answers State
  const [selectedService, setSelectedService] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState('');

  const initializedRef = useRef(false);

  // 1. Fetch live admin settings on mount
  useEffect(() => {
    let isMounted = true;
    async function loadConfig() {
      try {
        setLoadingConfig(true);
        const liveSettings = await getChatbotSettings();
        if (liveSettings && isMounted) {
          setSettings(liveSettings);
        }
      } catch (e) {
        console.warn('Error loading chatbot settings, using defaults:', e);
      } finally {
        if (isMounted) setLoadingConfig(false);
      }
    }
    loadConfig();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Initialize the opening bot message when settings are ready
  useEffect(() => {
    if (!initializedRef.current && !loadingConfig) {
      initializedRef.current = true;
      const initialGreeting = settings.step1?.promptMessage || DEFAULT_CHATBOT_CONFIG.step1.promptMessage;
      setMessages([
        {
          id: `msg-${Date.now()}-1`,
          sender: 'bot',
          text: initialGreeting,
          timestamp: formatTime(),
          step: 1,
        },
      ]);
    }
  }, [loadingConfig, settings]);

  // Helper to add a bot message with smooth typing delay
  const addBotMessage = useCallback((text, nextStep) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'bot',
          text,
          timestamp: formatTime(),
          step: nextStep,
        },
      ]);
      setStep(nextStep);
      setIsTyping(false);
    }, 450);
  }, []);

  // ── Step 1 Handler: Service Selection ──
  const handleSelectService = useCallback(
    (service) => {
      setSelectedService(service);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-user-${Date.now()}`,
          sender: 'user',
          text: service,
          timestamp: formatTime(),
        },
      ]);

      // If user chose "Submit an Enquiry", jump directly to Lead Form (Step 5)
      if (service === 'Submit an Enquiry') {
        const formPrompt =
          settings.step5?.formPromptMessage || DEFAULT_CHATBOT_CONFIG.step5.formPromptMessage;
        addBotMessage(formPrompt, 5);
        return;
      }

      // Next: Step 2 Project Type
      const step2Prompt =
        settings.step2?.promptMessage || DEFAULT_CHATBOT_CONFIG.step2.promptMessage;
      addBotMessage(step2Prompt, 2);
    },
    [addBotMessage, settings]
  );

  // ── Step 2 Handler: Project Type Selection ──
  const handleSelectProjectType = useCallback(
    (projectType) => {
      setSelectedProjectType(projectType);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-user-${Date.now()}`,
          sender: 'user',
          text: projectType,
          timestamp: formatTime(),
        },
      ]);

      // Next: Step 3 Features Checklist
      const step3Prompt =
        settings.step3?.promptMessage || DEFAULT_CHATBOT_CONFIG.step3.promptMessage;
      addBotMessage(step3Prompt, 3);
    },
    [addBotMessage, settings]
  );

  // ── Step 3 Handlers: Feature Checklist & Continue ──
  const handleToggleFeature = useCallback((feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  }, []);

  const handleContinueFeatures = useCallback(() => {
    const featuresSummary =
      selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'Standard / Recommended Features';

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-user-${Date.now()}`,
        sender: 'user',
        text: `Features: ${featuresSummary}`,
        timestamp: formatTime(),
      },
    ]);

    // Next: Step 4 Budget Selection
    const step4Prompt =
      settings.step4?.promptMessage || DEFAULT_CHATBOT_CONFIG.step4.promptMessage;
    addBotMessage(step4Prompt, 4);
  }, [selectedFeatures, addBotMessage, settings]);

  // ── Step 4 Handler: Budget Selection ──
  const handleSelectBudget = useCallback(
    (budget) => {
      setSelectedBudget(budget);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-user-${Date.now()}`,
          sender: 'user',
          text: budget,
          timestamp: formatTime(),
        },
      ]);

      // Next: Step 5 Lead Capture Form
      const step5Prompt =
        settings.step5?.formPromptMessage || DEFAULT_CHATBOT_CONFIG.step5.formPromptMessage;
      addBotMessage(step5Prompt, 5);
    },
    [addBotMessage, settings]
  );

  // ── Step 5 Handler: Form Submission ──
  const handleSubmitLead = useCallback(
    async (formData) => {
      setSubmitting(true);
      const leadPayload = {
        fullName: (formData.fullName || '').trim(),
        email: (formData.email || '').trim().toLowerCase(),
        phone: (formData.phone || '').trim(),
        service: selectedService || 'Website Development',
        projectType: selectedProjectType || 'General Project',
        features: selectedFeatures,
        budget: selectedBudget || 'Flexible',
        notes: (formData.notes || '').trim(),
      };

      try {
        const res = await submitChatbotLead(leadPayload);
        setSubmittedLead(res?.lead || leadPayload);

        // Add user response bubble acknowledging submission
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-user-${Date.now()}`,
            sender: 'user',
            text: `Submitted Details: ${formData.fullName} (${formData.phone})`,
            timestamp: formatTime(),
          },
        ]);

        // Move to Step 6: Confirmation / WhatsApp
        const thanksMessage =
          settings.step5?.successMessage || DEFAULT_CHATBOT_CONFIG.step5.successMessage;
        addBotMessage(thanksMessage, 6);
      } catch (err) {
        console.error('Submission failed:', err);
      } finally {
        setSubmitting(false);
      }
    },
    [selectedService, selectedProjectType, selectedFeatures, selectedBudget, addBotMessage, settings]
  );

  // ── Reset Chat ──
  const handleResetChat = useCallback(() => {
    setSelectedService('');
    setSelectedProjectType('');
    setSelectedFeatures([]);
    setSelectedBudget('');
    setSubmittedLead(null);
    setStep(1);

    const initialGreeting =
      settings.step1?.promptMessage || DEFAULT_CHATBOT_CONFIG.step1.promptMessage;
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: initialGreeting,
        timestamp: formatTime(),
        step: 1,
      },
    ]);
  }, [settings]);

  return {
    settings,
    step,
    isTyping,
    messages,
    submitting,
    submittedLead,
    selectedService,
    selectedProjectType,
    selectedFeatures,
    selectedBudget,
    handleSelectService,
    handleSelectProjectType,
    handleToggleFeature,
    handleContinueFeatures,
    handleSelectBudget,
    handleSubmitLead,
    handleResetChat,
  };
}

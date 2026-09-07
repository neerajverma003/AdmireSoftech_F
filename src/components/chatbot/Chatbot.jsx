import React, { useState } from 'react';
import ChatbotTrigger from './ChatbotTrigger';
import ChatbotHeader from './ChatbotHeader';
import ChatbotMessages from './ChatbotMessages';
import ChatbotFooter from './ChatbotFooter';
import ChatbotOptions from './ChatbotOptions';
import ChatbotMultiSelect from './ChatbotMultiSelect';
import ChatbotLeadForm from './ChatbotLeadForm';
import ChatbotSuccess from './ChatbotSuccess';
import { useChatbot } from './hooks/useChatbot';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const {
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
  } = useChatbot();

  return (
    <>
      {/* Floating Circular Trigger Button */}
      <ChatbotTrigger isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />

      {/* Main Chatbot Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Admire Softech AI Assistant"
          className="fixed bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[410px] h-[580px] max-h-[82vh] rounded-3xl border border-slate-800/90 bg-[#070C1E]/95 backdrop-blur-2xl shadow-2xl shadow-cyan-950/40 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95 origin-bottom-right"
        >
          {/* Header */}
          <ChatbotHeader
            onReset={handleResetChat}
            onClose={() => setIsOpen(false)}
          />

          {/* Conversation History & Interactive Step Controls */}
          <ChatbotMessages messages={messages} isTyping={isTyping}>
            {/* Step 1: Selectable Service Options */}
            {step === 1 && !isTyping && (
              <ChatbotOptions
                options={settings.step1?.options}
                onSelect={handleSelectService}
              />
            )}

            {/* Step 2: Selectable Project Type Options */}
            {step === 2 && !isTyping && (
              <ChatbotOptions
                options={settings.step2?.options}
                onSelect={handleSelectProjectType}
              />
            )}

            {/* Step 3: Features Checklist with Continue CTA */}
            {step === 3 && !isTyping && (
              <ChatbotMultiSelect
                options={settings.step3?.options}
                selectedFeatures={selectedFeatures}
                onToggle={handleToggleFeature}
                onContinue={handleContinueFeatures}
              />
            )}

            {/* Step 4: Estimated Budget Options */}
            {step === 4 && !isTyping && (
              <ChatbotOptions
                options={settings.step4?.options}
                onSelect={handleSelectBudget}
              />
            )}

            {/* Step 5: Contact Lead Form */}
            {step === 5 && !isTyping && (
              <ChatbotLeadForm
                onSubmit={handleSubmitLead}
                submitting={submitting}
                initialNotes={`Service: ${selectedService} | Project Type: ${selectedProjectType} | Budget: ${selectedBudget}`}
              />
            )}

            {/* Step 6: Confirmation State */}
            {step === 6 && !isTyping && (
              <ChatbotSuccess
                settings={settings}
                onReset={handleResetChat}
                onClose={() => setIsOpen(false)}
                lead={submittedLead}
              />
            )}
          </ChatbotMessages>

          {/* Footer Step Progress Bar */}
          <ChatbotFooter step={step} />
        </div>
      )}
    </>
  );
}

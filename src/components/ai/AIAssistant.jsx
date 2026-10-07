import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Check,
  Copy,
  RefreshCw,
  Wand2,
  FileCheck,
  Zap,
  Bot,
  User,
} from 'lucide-react';
import Button from '../common/Button';
import { useResume } from '../../hooks/useResume';
import { mockAISuggestions } from '../../data/mockAI';

export default function AIAssistant({ isOpen, onClose }) {
  const { currentResume, updateSummary, addSkill, updateExperience } = useResume();
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello Alex! I'm your AI Resume Coach. I've reviewed your "${currentResume.title}" and found several opportunities to increase your ATS compatibility and interview conversion rate. What would you like to work on?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [appliedId, setAppliedId] = useState(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickActions = [
    { label: 'Improve Summary', action: 'summary', icon: Wand2 },
    { label: 'Improve Experience', action: 'experience', icon: Zap },
    { label: 'Generate Bullet Points', action: 'bullets', icon: Sparkles },
    { label: 'Suggest Skills', action: 'skills', icon: FileCheck },
    { label: 'Make ATS Friendly', action: 'ats', icon: Bot },
    { label: 'Fix Grammar & Polish', action: 'grammar', icon: Check },
  ];

  const handleSendPrompt = (promptText, actionType = null) => {
    if (!promptText && !actionType) return;
    const userMsgText = promptText || quickActions.find((a) => a.action === actionType)?.label;

    // Add user message
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    // Simulate realistic AI thought process & response
    setTimeout(() => {
      let aiResponseText = '';
      let actionData = null;

      if (actionType === 'summary' || promptText?.toLowerCase().includes('summary')) {
        const item = mockAISuggestions.summary[0];
        aiResponseText = `Here is an optimized executive summary engineered for high ATS impact and quantifiable leadership:\n\n"${item.content}"`;
        actionData = { type: 'apply_summary', content: item.content };
      } else if (actionType === 'experience' || promptText?.toLowerCase().includes('experience')) {
        const item = mockAISuggestions.experience[0];
        aiResponseText = `I enhanced your role at Nexus Labs with quantifiable metrics and modern tech keywords:\n\n"${item.improved}"`;
        actionData = {
          type: 'apply_experience',
          expId: item.targetExpId,
          content: item.improved,
        };
      } else if (actionType === 'bullets' || promptText?.toLowerCase().includes('bullet')) {
        const bullets = mockAISuggestions.bulletPoints.slice(0, 2).join('\n\n');
        aiResponseText = `Here are 2 high-impact bullet points demonstrating ownership and quantifiable scale:\n\n${bullets}`;
        actionData = { type: 'copy_only' };
      } else if (actionType === 'skills' || promptText?.toLowerCase().includes('skill')) {
        aiResponseText = `Based on current senior engineering openings, adding "TypeScript", "Next.js", and "CI/CD (GitHub Actions)" will elevate your ATS score from 87% to 94%.`;
        actionData = { type: 'apply_skills', skills: ['TypeScript', 'Next.js', 'CI/CD'] };
      } else if (actionType === 'ats') {
        aiResponseText = `Your resume's ATS score is 87/100. To pass corporate filters:
1. Standardize section headers (Verified ✓)
2. Include both abbreviations and long-form (e.g. "Continuous Integration (CI/CD)")
3. Ensure contact links are text-parsable without complex tables.`;
      } else {
        aiResponseText = `I analyzed your resume text. The structure is crisp, active verbs are present in 85% of sentences, and grammatical flow is clean. I recommend reinforcing your summary with measurable revenue or performance statistics.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiResponseText,
          timestamp: 'Just now',
          actionData,
        },
      ]);
      setIsThinking(false);
    }, 1100);
  };

  const handleApplyToResume = (msgId, actionData) => {
    if (!actionData) return;
    if (actionData.type === 'apply_summary') {
      updateSummary(actionData.content);
    } else if (actionData.type === 'apply_experience') {
      const exp = currentResume.experience?.find((e) => e.id === actionData.expId);
      if (exp) {
        updateExperience(actionData.expId, {
          description: `${exp.description}\n• ${actionData.content}`,
        });
      }
    } else if (actionData.type === 'apply_skills') {
      actionData.skills.forEach((s) => addSkill(s, 'Technical'));
    }

    setAppliedId(msgId);
    setTimeout(() => setAppliedId(null), 2500);
  };

  const handleCopyText = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-[#FFFFFF] dark:bg-[#1C1814] border-l border-[#E8DFD3] dark:border-[#382F27] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-[#E8DFD3] dark:border-[#352C25] flex items-center justify-between bg-[#FBF8F3] dark:bg-[#161310]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E39A7B]/15 border border-[#E39A7B]/30 flex items-center justify-center text-[#E39A7B]">
            <Sparkles className="w-4 h-4 text-[#E39A7B]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#231B15] dark:text-[#FAF5EE] flex items-center gap-1.5">
              <span>Resumely AI</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#DBB06B]/20 text-[#DBB06B]">
                COACH
              </span>
            </h3>
            <p className="text-[11px] text-[#73675F] dark:text-[#BAADA0]">Your personal resume coach</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F] cursor-pointer"
          aria-label="Close AI coach"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Action Chips Bar */}
      <div className="p-3 bg-[#FAF6F0] dark:bg-[#221C17] border-b border-[#E8DFD3]/80 dark:border-[#352C25]/80 overflow-x-auto flex gap-1.5 no-scrollbar">
        {quickActions.map((qa) => (
          <button
            key={qa.action}
            type="button"
            onClick={() => handleSendPrompt(null, qa.action)}
            disabled={isThinking}
            className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] hover:border-[#E39A7B] hover:text-[#E39A7B] transition-all cursor-pointer whitespace-nowrap"
          >
            {qa.label}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-[#E39A7B]/20 border border-[#E39A7B]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#E39A7B]">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#E39A7B] text-white rounded-tr-xs shadow-xs'
                  : 'bg-[#FAF7F2] dark:bg-[#241E19] text-[#231B15] dark:text-[#FAF5EE] border border-[#E8DFD3] dark:border-[#382F27] rounded-tl-xs shadow-xs'
              }`}
            >
              <div className="whitespace-pre-line font-normal">{m.text}</div>

              {/* Action Buttons for AI message */}
              {m.sender === 'ai' && m.id !== 'init-1' && (
                <div className="mt-3 pt-2.5 border-t border-[#E8DFD3]/80 dark:border-[#352C25]/80 flex flex-wrap items-center gap-2">
                  {m.actionData && m.actionData.type !== 'copy_only' && (
                    <button
                      type="button"
                      onClick={() => handleApplyToResume(m.id, m.actionData)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#E39A7B] text-white hover:bg-[#D48464] transition-all cursor-pointer"
                    >
                      {appliedId === m.id ? (
                        <>
                          <Check className="w-3 h-3" /> Applied ✓
                        </>
                      ) : (
                        <>
                          <Check className="w-3 h-3" /> Apply to Resume
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleCopyText(m.id, m.text)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] cursor-pointer"
                  >
                    {copiedId === m.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendPrompt('Regenerate with an alternative perspective')}
                    className="p-1 rounded text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] cursor-pointer"
                    title="Regenerate"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-[#231B15] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                ME
              </div>
            )}
          </div>
        ))}

        {/* Animated Thinking State */}
        {isThinking && (
          <div className="flex gap-2.5 items-start">
            <div className="w-7 h-7 rounded-lg bg-[#E39A7B]/20 border border-[#E39A7B]/40 flex items-center justify-center shrink-0 text-[#E39A7B]">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl rounded-tl-xs bg-[#FAF7F2] dark:bg-[#241E19] border border-[#E8DFD3] dark:border-[#382F27] flex items-center gap-2">
              <span className="text-xs text-[#73675F] dark:text-[#BAADA0] font-medium">
                Analyzing your profile...
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E39A7B] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#DBB06B] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD3AC] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputText.trim()) handleSendPrompt(inputText.trim());
        }}
        className="p-3 border-t border-[#E8DFD3] dark:border-[#352C25] bg-[#FBF8F3] dark:bg-[#161310] flex gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask AI (e.g. 'Shorten summary', 'Add metrics')..."
          className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 outline-hidden"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isThinking}
          className="p-2 rounded-xl bg-[#E39A7B] text-white hover:bg-[#D48464] disabled:opacity-40 transition-colors cursor-pointer"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

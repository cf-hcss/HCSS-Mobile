import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import {
  PaperAirplaneIcon,
  PowerIcon,
  ArrowPathIcon,
  MinusIcon,
  WindowIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
} from '../components/icons.tsx';

import { Chat } from '@google/genai';
import { gemini, isAiConfigured } from '../api.ts';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const aiStyles = `
  @keyframes aiFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @keyframes aiPulse {
    0%, 100% {
      transform: scale(1);
      opacity: .8;
    }
    50% {
      transform: scale(1.12);
      opacity: 1;
    }
  }

  .ai-floating-window {
    animation: aiFloat 6s ease-in-out infinite;
  }

  .ai-pulse {
    animation: aiPulse 3s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .ai-floating-window,
    .ai-pulse {
      animation: none !important;
    }
  }
`;

const AcademicsPage: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const systemInstruction = `You are Hub AI, an AI resource for students of Hampden Charter School of Science. Your goal is to be a helpful, safe, and engaging learning partner.

**Core Directives:**
1. **Knowledge & Expertise:** Your primary role is to assist with academic subjects. You have deep knowledge in areas like Literature and History. You can also help with math, science, and other subjects.
2. **Friendly & Professional Tone:** Be friendly, approachable, professional, educational, clear, simple, and to the point.
3. **Factual HCSS Information:** Provide accurate information about HCSS based ONLY on the details provided below.
4. **Handling Off-Topic Questions:** If a question is significantly outside your academic/HCSS scope, gently redirect the student toward academic help.

**Absolute Safety Restrictions:**
* Do not generate inappropriate, unsafe, sexual, hateful, violent, or profane content.
* If a request involves inappropriate content, politely refuse and maintain a safe educational environment.

**Authoritative HCSS Facts:**
* Official Website: https://hampdencharter.org
* High School: Hampden Charter School of Science - East. 511 Main Street, Chicopee, MA 01020.
* Middle School: Hampden Charter School of Science - West. 20 Johnson Road, West Springfield, MA 01089.

**Error Correction Protocol:**
If you make a mistake and the user corrects you, apologize, accept the correction, and use the corrected information.`;

  const initializeChat = useCallback(() => {
    if (!isAiConfigured || !gemini) {
      setAiError(
        'Hub AI is not available. The feature has not been configured by the administrator.'
      );
      setChat(null);
      setChatHistory([]);
      return;
    }

    try {
      setAiError(null);
      setIsAiLoading(true);

      const chatSession = gemini.chats.create({
        model: 'gemini-2.5-pro',
        config: {
          systemInstruction,
        },
      });

      setChat(chatSession);

      setChatHistory([
        {
          role: 'model',
          text: 'Hello! I am Hub AI. How can I help you with your studies today?',
        },
      ]);
    } catch (e) {
      console.error('Failed to initialize AI Chat:', e);

      setAiError(
        'Could not start the AI chat session. Please check the connection or API key setup.'
      );

      setChat(null);
      setChatHistory([]);
    } finally {
      setIsAiLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isAiLoading]);

  const handleSendMessage = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!userInput.trim() || isAiLoading || !chat) {
      return;
    }

    const currentInput = userInput;

    setChatHistory((prev) => [
      ...prev,
      {
        role: 'user',
        text: currentInput,
      },
    ]);

    setUserInput('');
    setIsAiLoading(true);
    setAiError(null);

    try {
      const result = await chat.sendMessage({
        message: currentInput,
      });

      setChatHistory((prev) => [
        ...prev,
        {
          role: 'model',
          text: result.text,
        },
      ]);
    } catch (e) {
      console.error('Error sending message:', e);

      setChatHistory((prev) => [
        ...prev,
        {
          role: 'model',
          text: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);

      setAiError(
        'Failed to get a response from the AI.'
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleNewChat = () => {
    setChat(null);
    setChatHistory([]);
    initializeChat();
  };

  const handleEndChat = () => {
    setChat(null);
    setChatHistory([]);
  };

  const handleMinimizeToggle = () => {
    setIsMinimized((prev) => !prev);
  };

  const renderContent = () => {
    if (!isAiConfigured) {
      return (
        <div
          style={{
            flex: 1,
            padding: '40px 20px',
            textAlign: 'center',
          }}
        >
          <ExclamationTriangleIcon
            style={{
              width: '40px',
              height: '40px',
              margin: '0 auto 14px',
              color: '#d97706',
            }}
          />

          <strong style={{ color: '#92400e' }}>
            Feature Not Available
          </strong>

          <p
            style={{
              color: '#a16207',
              fontSize: '13px',
            }}
          >
            Hub AI has not been configured by the administrator.
          </p>
        </div>
      );
    }

    if (aiError && chatHistory.length === 0) {
      return (
        <div
          style={{
            flex: 1,
            padding: '40px 20px',
            textAlign: 'center',
            color: '#881c1c',
          }}
        >
          {aiError}
        </div>
      );
    }

    if (!chat) {
      return (
        <div
          style={{
            flex: 1,
            padding: '45px 20px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#64748b' }}>
            Chat session ended.
          </p>

          <button
            onClick={initializeChat}
            style={{
              border: 'none',
              borderRadius: '18px',
              padding: '12px 18px',
              background: '#0d243e',
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Start New Chat
          </button>
        </div>
      );
    }

    return (
      <>
        <div
          ref={chatContainerRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            background:
              'linear-gradient(180deg, rgba(248,250,252,.8), rgba(241,245,249,.55))',
          }}
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent:
                  msg.role === 'user'
                    ? 'flex-end'
                    : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '78%',
                  padding: '12px 15px',
                  borderRadius:
                    msg.role === 'user'
                      ? '22px 22px 6px 22px'
                      : '22px 22px 22px 6px',

                  color:
                    msg.role === 'user'
                      ? '#ffffff'
                      : '#0d243e',

                  background:
                    msg.role === 'user'
                      ? 'linear-gradient(135deg, #0d243e, #234f7c)'
                      : 'rgba(255,255,255,.92)',

                  boxShadow:
                    '0 8px 22px rgba(13,36,62,.09)',

                  fontSize: '14px',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isAiLoading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '22px',
                  background: '#ffffff',
                  color: '#64748b',
                  boxShadow:
                    '0 8px 22px rgba(13,36,62,.08)',
                }}
              >
                Hub AI is thinking...
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSendMessage}
          style={{
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            borderTop:
              '1px solid rgba(13,36,62,.08)',
            background:
              'rgba(255,255,255,.88)',
          }}
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) =>
              setUserInput(e.target.value)
            }
            placeholder="Ask Hub AI..."
            disabled={isAiLoading || !chat}
            style={{
              width: '100%',
              border: '1px solid rgba(13,36,62,.10)',
              borderRadius: '22px',
              padding: '12px 16px',
              outline: 'none',
              background: '#f8fafc',
              color: '#0d243e',
              fontFamily: 'inherit',
            }}
          />

          <button
            type="submit"
            disabled={
              isAiLoading ||
              !userInput.trim() ||
              !chat
            }
            aria-label="Send message"
            style={{
              width: '45px',
              height: '45px',
              flexShrink: 0,
              border: 'none',
              borderRadius: '17px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'linear-gradient(135deg, #7a1717, #a72b2b)',
              color: '#ffffff',
              cursor: 'pointer',
              boxShadow:
                '0 8px 20px rgba(136,28,28,.22)',
            }}
          >
            <PaperAirplaneIcon
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          </button>
        </form>
      </>
    );
  };

  return (
    <>
      <style>{aiStyles}</style>

      <div
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          padding: '20px 16px 115px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px',
            }}
          >
            <div
              className="ai-pulse"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'linear-gradient(145deg, rgba(136,28,28,.12), rgba(13,36,62,.08))',
              }}
            >
              <SparklesIcon
                style={{
                  width: '22px',
                  height: '22px',
                  color: '#881c1c',
                }}
              />
            </div>
          </div>

          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#881c1c',
            }}
          >
            Learning Assistant
          </div>

          <h1
            style={{
              margin: '5px 0 0',
              fontSize: 'clamp(30px, 5vw, 44px)',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              color: '#0d243e',
            }}
          >
            HCSS Hub AI
          </h1>

          <p
            style={{
              margin: '8px 0 0',
              color: '#64748b',
              fontSize: '14px',
            }}
          >
            Ask questions and get help with your studies.
          </p>
        </div>

        <div
          className="ai-floating-window"
          style={{
            width: '100%',
            overflow: 'hidden',
            borderRadius: '30px',

            background:
              'rgba(255,255,255,.94)',

            border:
              '1px solid rgba(13,36,62,.08)',

            boxShadow:
              '0 18px 45px rgba(13,36,62,.14)',

            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
          }}
        >
          <div
            style={{
              minHeight: '64px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',

              borderBottom:
                '1px solid rgba(13,36,62,.08)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#0d243e',
                }}
              >
                Hub AI
              </div>

              <div
                style={{
                  fontSize: '10px',
                  color: '#64748b',
                  marginTop: '2px',
                }}
              >
                Academic support
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '4px',
              }}
            >
              <button
                onClick={handleMinimizeToggle}
                disabled={!isAiConfigured}
                title={
                  isMinimized
                    ? 'Maximize'
                    : 'Minimize'
                }
                style={controlButtonStyle}
              >
                {isMinimized ? (
                  <WindowIcon style={controlIconStyle} />
                ) : (
                  <MinusIcon style={controlIconStyle} />
                )}
              </button>

              <button
                onClick={handleNewChat}
                disabled={!isAiConfigured}
                title="New Chat"
                style={controlButtonStyle}
              >
                <ArrowPathIcon
                  style={controlIconStyle}
                />
              </button>

              <button
                onClick={handleEndChat}
                disabled={!isAiConfigured}
                title="End Chat"
                style={{
                  ...controlButtonStyle,
                  color: '#881c1c',
                }}
              >
                <PowerIcon
                  style={controlIconStyle}
                />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div
              style={{
                height: 'min(540px, 62vh)',
                minHeight: '380px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {renderContent()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const controlButtonStyle: React.CSSProperties = {
  width: '38px',
  height: '38px',
  border: 'none',
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(13,36,62,.05)',
  color: '#64748b',
  cursor: 'pointer',
};

const controlIconStyle: React.CSSProperties = {
  width: '19px',
  height: '19px',
};

export default AcademicsPage;

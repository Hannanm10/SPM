import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const MessageBubble = ({ message }) => {
    const isBot = message.sender === 'bot';
    const isThinking = message.isThinking;
    
    return (
        <div className={`message-row ${isBot ? 'bot-row' : 'user-row'} animate-slide-up`}>
            <div className={`avatar ${isBot ? 'avatar-bot' : 'avatar-user'}`}>
                {isBot ? <Bot className="icon-md" /> : <User className="icon-md" />}
            </div>

            <div className="message-content">
                <div className={`message-bubble ${isBot
                    ? 'glass-panel bubble-bot'
                    : 'bubble-user'
                    }`}>
                    {isThinking ? (
                        <div className="thinking-container">
                            <div className="thinking-dots">
                                <span></span><span></span><span></span>
                            </div>
                            <span style={{ marginLeft: '8px', fontSize: '0.9em', opacity: 0.7 }}>Thinking...</span>
                        </div>
                    ) : (
                        <div className="message-text" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            {message.text}
                        </div>
                    )}
                </div>
                {isBot && !isThinking && (
                    <div className="bot-verified-badge">
                        <Sparkles className="icon-xs text-warning" />
                        <span>powered by Lexify</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your IP Law Assistant. I can help you research copyright laws, patent eligibility, or analyze potential infringement risks. How can I assist you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        const userQuestion = input;
        setInput('');
        setIsLoading(true);

        // Create a "thinking" bot message
        const botMsgId = Date.now() + 1;
        const thinkingMsg = {
            id: botMsgId,
            text: '',
            sender: 'bot',
            isThinking: true
        };
        setMessages(prev => [...prev, thinkingMsg]);

        try {
            const response = await fetch('http://localhost:5000/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: userQuestion }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const fullText = data.answer || "I couldn't generate a response. Please try again.";
            
            // Remove thinking state and start typing effect
            setMessages(prev => 
                prev.map(msg => 
                    msg.id === botMsgId 
                        ? { ...msg, text: '', isThinking: false }
                        : msg
                )
            );

            // Typing effect - chunk by sentences for better readability
            const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
            let currentText = '';
            
            for (let i = 0; i < sentences.length; i++) {
                currentText += sentences[i];
                setMessages(prev => 
                    prev.map(msg => 
                        msg.id === botMsgId 
                            ? { ...msg, text: currentText }
                            : msg
                    )
                );
                // Wait between sentences (adjust speed here)
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        } catch (error) {
            console.error('Error calling backend:', error);
            setMessages(prev => 
                prev.map(msg => 
                    msg.id === botMsgId 
                        ? { ...msg, text: "Sorry, I'm having trouble connecting to the server. Please make sure the backend is running on http://localhost:5000", isThinking: false }
                        : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-interface">
            <div className="chat-history">
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <form onSubmit={handleSend} className="chat-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about copyright, patents, or compliance..."
                        className="chat-input glass-panel"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="chat-submit-btn"
                    >
                        {isLoading ? '...' : <Send className="icon-sm" />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const MessageBubble = ({ message }) => {
    const isBot = message.sender === 'bot';
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
                    <p className="message-text">{message.text}</p>
                </div>
                {isBot && (
                    <div className="bot-verified-badge">
                        <Sparkles className="icon-xs text-warning" />
                        <span>AI Verified</span>
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
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate bot response
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                text: "I can help with that. Could you provide more specific details about the intellectual property in question? For example, are we discussing a software patent or a copyright for creative work?",
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
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
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="chat-submit-btn"
                    >
                        <Send className="icon-sm" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;

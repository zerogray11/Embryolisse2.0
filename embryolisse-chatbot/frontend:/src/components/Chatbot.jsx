import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [context, setContext] = useState({}); // To manage conversation context

    const sendMessage = async () => {
        if (!input.trim()) return;
    
        // Add user message to the chat
        const userMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
    
        try {
            // Send the updated messages and context to the backend
            const response = await axios.post('http://localhost:5001/api/chat', {
                messages: updatedMessages,
                context: context,
            });
    
            const botResponse = response.data.response;
    
            // Handle the backend response
            if (botResponse) {
                const botMessage = {
                    role: 'assistant',
                    content: botResponse,
                };
    
                // Update the messages with the bot's response
                setMessages([...updatedMessages, botMessage]);
    
                // Update the context if provided by the backend
                if (response.data.context) {
                    setContext(response.data.context);
                }
            } else {
                console.error('Unexpected response format:', botResponse);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={styles.chatbotContainer}>
            <h1 style={styles.header}>Skincare Consultant</h1>
            <div style={styles.chatWindow}>
                {messages.map((msg, index) => (
                    <div key={index} style={msg.role === 'user' ? styles.userMessageContainer : styles.botMessageContainer}>
                        <div style={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    style={styles.input}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} style={styles.button}>Send</button>
            </div>
        </div>
    );
};

const styles = {
    chatbotContainer: {
        width: '400px',
        height: '600px',
        backgroundColor: '#f5f5dc',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
    },
    header: {
        textAlign: 'center',
        fontSize: '24px',
        color: '#4B3C31',
        marginBottom: '15px',
        fontWeight: 'bold',
    },
    chatWindow: {
        flex: 1,
        overflowY: 'auto',
        marginBottom: '10px',
    },
    userMessageContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '10px',
    },
    botMessageContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '10px',
    },
    userMessage: {
        padding: '12px 18px',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
        fontSize: '14px',
        display: 'block',
        maxWidth: '80%',
        wordBreak: 'break-word',
        marginLeft: 'auto',
    },
    botMessage: {
        padding: '12px 18px',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
        fontSize: '14px',
        display: 'block',
        maxWidth: '80%',
        wordBreak: 'break-word',
        marginRight: 'auto',
    },
    inputContainer: {
        display: 'flex',
        gap: '12px',
        marginTop: '15px',
    },
    input: {
        flex: 1,
        padding: '12px',
        borderRadius: '12px',
        border: '1px solid #D1C4B9',
        backgroundColor: '#F7F7F7',
        fontSize: '14px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#8B5E3C',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        transition: 'background-color 0.3s ease',
    },
};

export default Chatbot;

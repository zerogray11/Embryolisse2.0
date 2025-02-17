import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [context, setContext] = useState({});
    const [isThinking, setIsThinking] = useState(false);
    const chatWindowRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput || trimmedInput.length > 500) {
            alert("Please enter a valid message (1-500 characters).");
            return;
        }

        const userMessage = { role: 'user', content: trimmedInput };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsThinking(true);

        try {
            const response = await axios.post('http://localhost:5000/api/chat', {
                messages: updatedMessages,
                context: context,
            });

            const botResponse = response.data.response;

            if (botResponse) {
                const botMessage = {
                    role: 'assistant',
                    content: botResponse.message || botResponse,
                    products: botResponse.products || [],
                };

                setMessages([...updatedMessages, botMessage]);

                if (response.data.context) {
                    setContext(response.data.context);
                }
            } else {
                console.error('Unexpected response format:', botResponse);
                setMessages([...updatedMessages, { role: 'assistant', content: "Sorry, something went wrong. Please try again." }]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages([...updatedMessages, { role: 'assistant', content: "Sorry, I couldn't connect to the server. Please try again later." }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div style={styles.chatbotContainer}>
            <h1 style={styles.header}>Skincare Consultant</h1>
            <div style={styles.chatWindow} ref={chatWindowRef}>
                {messages.map((msg, index) => (
                    <div key={index} style={msg.role === 'user' ? styles.userMessageContainer : styles.botMessageContainer}>
                        <div style={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
                            <div style={styles.messageText}>{msg.content}</div>
                            {msg.products && msg.products.map((product, idx) => (
                                <div key={idx} style={styles.productContainer}>
                                    <a href={product.url} target="_blank" rel="noopener noreferrer" style={styles.productLink}>
                                        <img
                                            src={`data:image/jpeg;base64,${product.image}`}
                                            alt={product.title}
                                            style={styles.productImage}
                                            onError={(e) => {
                                                e.target.src = 'path/to/fallback-image.jpg'; // Fallback image
                                                console.error("Image failed to load:", product.title);
                                            }}
                                        />
                                        <div style={styles.productTitle}>{product.title}</div>
                                    </a>
                                    <div style={styles.productDetails}>
                                        <div style={styles.detailSection}>
                                            <span style={styles.detailLabel}>Benefits</span>
                                            <p style={styles.detailText}>{product.benefits}</p>
                                        </div>
                                        <div style={styles.detailSection}>
                                            <span style={styles.detailLabel}>Ingredients</span>
                                            <p style={styles.detailText}>{product.ingredients}</p>
                                        </div>
                                        <div style={styles.detailSection}>
                                            <span style={styles.detailLabel}>Usage</span>
                                            {typeof product.usage === 'string' ? (
                                                <p style={styles.detailText}>{product.usage}</p>
                                            ) : product.usage && typeof product.usage === 'object' ? (
                                                <div style={styles.usageList}>
                                                    {Object.entries(product.usage).map(([key, value], i) => (
                                                        <div key={i} style={styles.usageItem}>
                                                            <span style={styles.usageDash}>─</span> {value}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p style={styles.detailText}>No usage instructions available.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {isThinking && (
                    <div style={styles.botMessageContainer}>
                        <div style={styles.botMessage}>
                            <span style={styles.thinkingText}>Thinking...</span>
                        </div>
                    </div>
                )}
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
        width: '100%',
        height: '100vh',
        maxWidth: '800px', // Optional: Limit width for better readability
        margin: '0 auto', // Center the chatbot horizontally
        backgroundColor: '#F5F5F0',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        boxSizing: 'border-box',
    },
    header: {
        textAlign: 'center',
        fontSize: '24px',
        color: '#4B3C31',
        marginBottom: '15px',
        fontFamily: 'Playfair Display, serif',
        fontWeight: '500',
    },
    chatWindow: {
        flex: 1,
        overflowY: 'auto',
        marginBottom: '10px',
        maxHeight: 'calc(100vh - 200px)', // Adjust based on header and input container height
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
    messageText: {
        fontFamily: 'Inter, sans-serif',
        lineHeight: '1.5',
        marginBottom: '8px',
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
        fontFamily: 'Inter, sans-serif',
    },
    thinkingText: {
        fontStyle: 'italic',
        color: '#9A8E83',
        fontFamily: 'Inter, sans-serif',
    },
    productContainer: {
        marginTop: '15px',
        padding: '15px',
        backgroundColor: '#F9F9F5',
        borderRadius: '12px',
        border: '1px solid #E8E8E0',
    },
    productLink: {
        textDecoration: 'none',
        color: '#4B3C31',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
    },
    productImage: {
        width: '120px', // Increased width
        height: '120px', // Increased height
        borderRadius: '8px',
        marginRight: '12px',
        objectFit: 'cover',
    },
    productTitle: {
        fontFamily: 'Playfair Display, serif',
        fontSize: '18px',
        fontWeight: '500',
    },
    productDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    detailSection: {
        marginBottom: '8px',
    },
    detailLabel: {
        display: 'block',
        color: '#4B3C31',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'Inter, sans-serif',
        marginBottom: '4px',
    },
    detailText: {
        fontSize: '14px',
        color: '#666666',
        lineHeight: '1.5',
        margin: '0',
        fontFamily: 'Inter, sans-serif',
    },
    usageList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    usageItem: {
        display: 'flex',
        alignItems: 'baseline',
        fontSize: '14px',
        color: '#666666',
        fontFamily: 'Inter, sans-serif',
    },
    usageDash: {
        color: '#9A8E83',
        marginRight: '8px',
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
        border: '1px solid #E8E8E0',
        backgroundColor: '#FFFFFF',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#F5F5DC', // Light beige color
        color: '#4B3C31', 
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#E0D8C0', 
        },
    },
};

export default Chatbot;
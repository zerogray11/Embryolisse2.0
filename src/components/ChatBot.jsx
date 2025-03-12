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
            const response = await axios.post('https://embryolisse-python-5ce7c3101a2a.herokuapp.com/api/chat', {
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
        <div className="min-h-screen bg-[rgb(255,240,222)] py-8">
            {/* Brand title */}
            <div className="text-center mb-8 pt-4">
                <p className="text-sm text-gray-600">Le ChatBot</p>
                <h1 className="text-3xl font-light text-[rgb(6,31,108)] tracking-wider">EMBRYOLISSE</h1>
            </div>

            <div style={styles.chatbotContainer} className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
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
                                                    <div style={styles.usageList}>
                                                        {product.usage.split('\n').map((line, index) => (
                                                            <div key={index} style={styles.usageItem}>
                                                                <span style={styles.usageDash}>-</span> {line}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : product.usage && typeof product.usage === 'object' ? (
                                                    <div style={styles.usageList}>
                                                        {Object.entries(product.usage).map(([key, value], i) => (
                                                            <div key={i} style={styles.usageItem}>
                                                                <span style={styles.usageDash}>-</span> {value}
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
        </div>
    );
};

const styles = {
    chatbotContainer: {
        width: '100%',
        height: '100vh',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        boxSizing: 'border-box',
    },
    header: {
        textAlign: 'center',
        fontSize: '28px',
        color: '#4B3C31',
        marginBottom: '15px',
        fontFamily: 'Playfair Display, serif',
        fontWeight: '500',
        letterSpacing: '0.5px', 
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
    messageText: {
        fontFamily: 'Inter, sans-serif',
        lineHeight: '1.5',
        marginBottom: '8px',
    },
    userMessage: {
        padding: '14px 20px', 
        backgroundColor: 'white',
        fontSize: '15px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
        display: 'block',
        maxWidth: '80%',
        wordBreak: 'break-word',
        marginLeft: 'auto',
        border: '1px solid rgba(235, 230, 223, 0.4)', 
        fontFamily: 'Inter, sans-serif',
    },
    botMessage: {
        padding: '14px 20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
        display: 'block',
        maxWidth: '80%',
        wordBreak: 'break-word',
        marginRight: 'auto',
        fontSize: '15px', 
        fontFamily: 'Inter, sans-serif',
        border: '1px solid rgba(235, 230, 223, 0.4)',
    },
    thinkingText: {
        fontFamily: 'Playfair Display, serif',
        fontStyle: 'italic',
        color: '#9A8E83',
        fontSize: '15px',
        letterSpacing: '0.3px',
    },
    productTitle: {
        fontFamily: 'Playfair Display, serif',
        fontSize: '20px', 
        fontWeight: '500',
        letterSpacing: '0.3px',
        color: '#4B3C31',
        marginBottom: '10px',
        borderBottom: '1px solid #E8E8E0',
        paddingBottom: '8px',
    },
    productContainer: {
        marginTop: '15px',
        padding: '20px',
        backgroundColor: 'white', // Use white background to match the design
        borderRadius: '12px',
        border: '1px solid rgba(235, 230, 223, 0.4)', // Subtle border color
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)', // Soft shadow for depth
        transition: 'all 0.3s ease', // Smooth hover effect
        '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', // Enhanced shadow on hover
            transform: 'translateY(-2px)', // Slight lift effect
        },
    },
    productLink: {
        textDecoration: 'none',
        color: '#4B3C31',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
    },
    productImage: {
        width: '120px', 
        height: '120px', 
        borderRadius: '8px',
        marginRight: '12px',
        objectFit: 'cover',
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
        fontSize: '15px',
        fontWeight: '500',
        fontFamily: 'Playfair Display, serif',
        marginBottom: '6px',
        letterSpacing: '0.3px',
    },
    detailText: {
        fontSize: '14px',
        color: '#666666',
        lineHeight: '1.6',
        margin: '0',
        fontFamily: 'Inter, sans-serif', 
        fontStyle: 'italic',
        fontWeight: '300',
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
        padding: '12px 24px',
        background: 'rgb(36, 42, 135)', // Embryolisse blue
        color: '#FFFFFF', // White font
        border: 'none', // Remove border for a cleaner look
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '11px',
        fontFamily: 'Inter, sans-serif',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        '&:hover': {
            background: '#005F8E', // Slightly darker blue on hover
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Enhanced shadow on hover
        },
        '&:active': {
            transform: 'translateY(1px)',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)', // Reduced shadow on click
        }
    }
};

export default Chatbot;
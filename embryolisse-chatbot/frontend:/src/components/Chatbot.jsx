import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');

        try {
            const response = await axios.post('http://localhost:5001/api/chat', {
                messages: updatedMessages,
            });

            const botResponse = response.data.response;

            if (typeof botResponse === 'string') {
                setMessages([...updatedMessages, { role: 'assistant', content: botResponse }]);
            } else if (typeof botResponse === 'object' && botResponse.message && botResponse.products) {
                const botMessage = { role: 'assistant', content: botResponse.message, products: botResponse.products };
                setMessages([...updatedMessages, botMessage]);
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
                        {msg.products && (
                            <div style={styles.productList}>
                                {msg.products.map((product, idx) => (
                                    <div key={idx} style={styles.productItem}>
                                        <img src={product.image_url} alt={product.name} style={styles.productImage} />
                                        <div style={styles.productDetails}>
                                            <h4 style={styles.productName}>{product.name}</h4>
                                            <p>{product.description}</p>
                                            <a href={product.product_url} target="_blank" rel="noopener noreferrer" style={styles.productLink}>Buy Now</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
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
        backgroundColor: '#f5f5dc',  // Keeping the original beige color for the container
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
        justifyContent: 'flex-end',  // Align user message to the right
        marginBottom: '10px',
    },
    botMessageContainer: {
        display: 'flex',
        justifyContent: 'flex-start',  // Align bot message to the left
        marginBottom: '10px',
    },
    userMessage: {
        padding: '12px 18px',
        backgroundColor: 'white', // White background for user message bubbles
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
        fontSize: '14px',
        display: 'block',  // Makes sure each message is on its own line
        maxWidth: '80%',  // Set maximum width of the bubble
        wordBreak: 'break-word',
        marginLeft: 'auto',
    },
    botMessage: {
        padding: '12px 18px',
        backgroundColor: 'white', // White background for bot message bubbles
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
        fontSize: '14px',
        display: 'block',  // Makes sure each message is on its own line
        maxWidth: '80%',  // Set maximum width of the bubble
        wordBreak: 'break-word',
        marginRight: 'auto',
    },
    productList: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    productItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        padding: '12px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    productImage: {
        width: '60px',
        height: '60px',
        borderRadius: '8px',
        marginRight: '15px',
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#4B3C31',
    },
    productLink: {
        textDecoration: 'none',
        color: '#8B5E3C',
        fontSize: '14px',
        fontWeight: '500',
        marginTop: '5px',
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

import React, { useState, useRef, useEffect } from 'react';
import { useSendQuestionToGeminiMutation } from '../Services/chatbotAPI';
import { FaPaperclip } from 'react-icons/fa';
import '../Styles/chatbot.scss';
import Fuse from 'fuse.js';
import { knowledgeBase } from '../Data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatBox = ({ toggleChatbotOpen }) => {
  const [input, setInput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hello, I am Ticket AI' },
  ]);
  const messageContainerRef = useRef(null);

  const [sendImageToGemini, { isLoading }] = useSendQuestionToGeminiMutation();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleRemoveAttachment = (index) => {
    const updated = [...selectedFiles];
    updated.splice(index, 1);
    setSelectedFiles(updated);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };
  const fuse = new Fuse(knowledgeBase.documents, {
    includeScore: true,
    keys: ['title', 'content'],
    threshold: 0.8,
  });

  const searchKnowledgeBase = (query, limit = 10) => {
    const result = fuse.search(query);
    return result.slice(0, limit).map((r) => r.item);
  };
  const handleSendMessage = async () => {
    if (!input.trim() && selectedFiles.length === 0) return;

    setMessages((prev) => [
      ...prev,
      {
        from: 'user',
        text: input || '[Image]',
        attachments: selectedFiles.map((f) => f.name).filter(Boolean),
      },
    ]);

    try {
      const relevantDocs = searchKnowledgeBase(input, 10);
      let systemPrompt = '';
      if (relevantDocs.length > 0) {
        const docContext = relevantDocs
          .map((doc) => `Tài liệu: "${doc.title}"\n Nội dung: ${doc.content}`)
          .join('\n\n');

        systemPrompt =
          `Bạn là trợ lý AI của hệ thống nội bộ. Hãy trả lời dựa trên các tài liệu sau nếu có thể:\n\n${docContext}`;
      }

      let imageBase64 = '';
      if (selectedFiles.length > 0) {
        imageBase64 = await toBase64(selectedFiles[0]);
      }

      const result = await sendImageToGemini({
        prompt: input,
        imageBase64,
        systemPrompt,
      }).unwrap();

      const aiReply =
        result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'AI không phản hồi.';

      setMessages((prev) => [...prev, { from: 'ai', text: aiReply }]);
    } catch (error) {
      const errorMsg =
        error?.data?.error?.message || 'Lỗi khi gửi lên AI';
      setMessages((prev) => [...prev, { from: 'ai', text: `Error: ${errorMsg}` }]);
    }

    setInput('');
    setSelectedFiles([]);
  };

  return (
    <div className="chatai-detail-container">
      <div className="chat-header">
        <div className="user-info">
          <div className="avatar">
            <img
              src="https://s3.ap-southeast-2.amazonaws.com/ticketsystem.bucket/avatars/avatar_ai.avif"
              alt="Gemini AI"
            />
          </div>
          <div className="user-details">
            <div className="user-name">Ticket AI</div>
          </div>
        </div>
        <div className='hidden' onClick={() => {
          toggleChatbotOpen();
        }}>X</div>
      </div>

      <div className="message-container" ref={messageContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.from === 'user' ? 'sent' : 'received'}`}
          >
            <div className="message-inner">
              <div className="message-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
                {msg.attachments &&
                  msg.attachments.map((fileName, idx) => (
                    <div key={idx} className="attachment">
                      <span>{fileName}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message received">
            <div className="message-inner">
              <div className="message-content">answering...</div>
            </div>
          </div>
        )}
      </div>

      <div className="input-container">
        <div className="attachment-container">
          {selectedFiles.length > 0 && (
            <div className="attachments-preview">
              <div className="attachments-list">
                {selectedFiles.map((file, index) => (
                  <div key={file.name} className="attachment-item">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      className="remove-attachment"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <div className="input-field">
            <input
              type="text"
              placeholder="Writing a question... "
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
          <div className="input-actions">
            <div className="attach-icon" onClick={() => document.getElementById('fileInput').click()}>
              <FaPaperclip />
            </div>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
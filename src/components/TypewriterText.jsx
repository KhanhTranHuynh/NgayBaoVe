import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, speed = 100, pause = 1500 }) => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let timeout;

        if (!isDeleting && index < text.length) {
            // Gõ từng ký tự từ đầu
            timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text.charAt(index));
                setIndex(index + 1);
            }, speed);
        } else if (!isDeleting && index === text.length) {
            // Khi gõ xong, chờ 1 chút rồi bắt đầu xóa
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, pause);
        } else if (isDeleting && index > 0) {
            // Xóa từng ký tự từ cuối
            timeout = setTimeout(() => {
                setDisplayText((prev) => prev.slice(0, -1));
                setIndex(index - 1);
            }, speed);
        } else if (isDeleting && index === 0) {
            // Khi xóa hết, chờ rồi bắt đầu gõ lại
            timeout = setTimeout(() => {
                setIsDeleting(false);
            }, pause);
        }

        return () => clearTimeout(timeout);
    }, [index, isDeleting, text, speed, pause]);

    return (
        <div
            style={{
                fontSize: '18px',
                marginTop: '8px',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
                fontStyle: 'italic',
                whiteSpace: 'pre',
                fontWeight: 'bold',
            }}
        >
            {displayText}
            <span style={{ opacity: 0.5 }}>|</span>
        </div>
    );
};

export default TypewriterText;

// File: src/hooks/useTypingAnimation.js
import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for typing animation effect
 * @param {string} text - The text to animate
 * @param {number} speed - Typing speed in milliseconds (default: 50)
 * @param {number} delay - Initial delay before starting animation (default: 0)
 * @param {boolean} trigger - When to start/restart the animation (default: true)
 * @returns {object} - { displayText, isTyping, restart }
 */
const useTypingAnimation = (text, speed = 50, delay = 0, trigger = true) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef(null);
  const indexRef = useRef(0);
  const isMountedRef = useRef(true);

  const restart = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDisplayText('');
    setIsTyping(false);
    indexRef.current = 0;
  };

  useEffect(() => {
    // Mark component as mounted
    isMountedRef.current = true;

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Clear any existing timeout first
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!trigger || !text || !isMountedRef.current) {
      setDisplayText(text || '');
      setIsTyping(false);
      return;
    }

    // Reset state
    setDisplayText('');
    setIsTyping(true);
    indexRef.current = 0;

    // Start typing animation after initial delay
    const startTyping = () => {
      if (!isMountedRef.current) return;

      const typeNextCharacter = () => {
        if (!isMountedRef.current) return;

        if (indexRef.current < text.length) {
          setDisplayText(text.slice(0, indexRef.current + 1));
          indexRef.current++;
          timeoutRef.current = setTimeout(typeNextCharacter, speed);
        } else {
          setIsTyping(false);
          timeoutRef.current = null;
        }
      };

      typeNextCharacter();
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    // Cleanup function for this effect
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text, speed, delay, trigger]);

  return { displayText, isTyping, restart };
};

export default useTypingAnimation;

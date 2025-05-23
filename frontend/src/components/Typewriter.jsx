import { useState, useEffect } from 'react';

const Typewriter = ({ words, loop = true, speed = 100, deleteSpeed = 50, delay = 1000, render }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    const isLast = index === words.length - 1;

    let timeout = setTimeout(() => {
      if (!deleting) {
        if (subIndex < currentWord.text.length) {
          setSubIndex((prev) => prev + 1);
        } else {
          setDeleting(true);
        }
      } else {
        if (subIndex > 0) {
          setSubIndex((prev) => prev - 1);
        } else {
          setDeleting(false);
          if (loop || !isLast) {
            setIndex((prev) => (prev + 1) % words.length);
          }
        }
      }
    }, deleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  const current = words[index];
  const visibleText = current.text.substring(0, subIndex);

  return render(visibleText, current.className);
};

export default Typewriter;

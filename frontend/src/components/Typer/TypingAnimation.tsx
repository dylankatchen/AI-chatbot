import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Ask me anything',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Speak with my AI!',
        1500,
        'Answers found here!',
        2000,
        'Do not stop here signup and ask away!',
        1000
      ]}
      speed={50}
      style={{ fontSize: '60px', color: 'white', display: 'inline-block', textShadow: '1px 1px 20px #000'}}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation
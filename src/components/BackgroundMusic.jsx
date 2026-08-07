export default function BackgroundMusic({ isPlaying }) {
  if (!isPlaying) return null;

  return (
    <iframe
      width="0"
      height="0"
      src="https://www.youtube.com/embed/X1ZVFexC9wc?autoplay=1&loop=1&playlist=X1ZVFexC9wc"
      title="Background Music"
      frameBorder="0"
      allow="autoplay; encrypted-media"
      style={{ display: 'none' }}
    ></iframe>
  );
}

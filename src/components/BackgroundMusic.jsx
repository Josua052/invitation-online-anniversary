export default function BackgroundMusic({ isPlaying }) {
  if (!isPlaying) return null;

  return (
    <iframe
      width="0"
      height="0"
      src="https://www.youtube.com/embed/XInueyp7hmg?autoplay=1&loop=1&playlist=XInueyp7hmg"
      title="Background Music"
      frameBorder="0"
      allow="autoplay; encrypted-media"
      style={{ display: 'none' }}
    ></iframe>
  );
}

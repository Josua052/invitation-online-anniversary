export default function BackgroundMusic({ isPlaying }) {
  if (!isPlaying) return null;

  return (
    <audio 
      src="/bg music/Balinese Harmony _ Ethnic Indonesian Gamelan Background Music.mp3" 
      autoPlay 
      loop 
      style={{ display: 'none' }} 
    />
  );
}

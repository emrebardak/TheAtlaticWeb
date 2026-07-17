import { BlurText } from './components/BlurText';

function App() {
  return (
    <div className="bg-black">
      <div style={{ height: '120vh' }} className="flex items-center justify-center text-white/50">
        Scroll down to trigger the blur-in animation
      </div>
      <BlurText
        text="Raw Strength Forged In Concrete And Steel"
        className="font-heading text-6xl italic text-white"
      />
      <div style={{ height: '50vh' }} />
    </div>
  );
}

export default App;

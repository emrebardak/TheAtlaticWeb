import { HERO_HEADLINE } from './content/copy';
import { HERO_VIDEO_SRC } from './content/media';

function App() {
  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <p>{HERO_HEADLINE}</p>
      <p className="text-xs text-white/50">{HERO_VIDEO_SRC}</p>
    </div>
  );
}

export default App;

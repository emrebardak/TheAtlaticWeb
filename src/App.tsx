import { FadingVideo } from './components/FadingVideo';
import { HERO_VIDEO_SRC } from './content/media';

function App() {
  return (
    <div className="relative h-screen bg-black">
      <FadingVideo src={HERO_VIDEO_SRC} className="h-full w-full object-cover" />
    </div>
  );
}

export default App;

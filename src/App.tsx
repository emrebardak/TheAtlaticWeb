import {
  ArrowUpRight,
  Play,
  ClockIcon,
  GlobeIcon,
  ImageIcon,
  MovieIcon,
  LightbulbIcon,
} from './components/icons';

function App() {
  return (
    <div className="flex min-h-screen flex-wrap items-center gap-6 bg-black p-8 text-white">
      <ArrowUpRight className="h-6 w-6" />
      <Play className="h-6 w-6" />
      <ClockIcon className="h-6 w-6" />
      <GlobeIcon className="h-6 w-6" />
      <ImageIcon className="h-6 w-6" />
      <MovieIcon className="h-6 w-6" />
      <LightbulbIcon className="h-6 w-6" />
    </div>
  );
}

export default App;

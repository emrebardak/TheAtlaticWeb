import { LanguageProvider } from './i18n/LanguageContext';
import { Nav } from './components/Nav';
import { ScrollVideo } from './components/ScrollVideo';
import { Hero } from './sections/Hero';
import { Instagram } from './sections/Instagram';
import { Location } from './sections/Location';
import { Contact } from './sections/Contact';
import { SCROLL_VIDEO_SRC } from './content/media';

function App() {
  return (
    <LanguageProvider>
      <Nav />
      <ScrollVideo src={SCROLL_VIDEO_SRC} />
      <Hero />
      <Instagram />
      <Location />
      <Contact />
    </LanguageProvider>
  );
}

export default App;

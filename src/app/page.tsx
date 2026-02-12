import { Hero } from '@/components/Hero';
import { Rooms } from '@/components/Rooms';
import { Gallery } from '@/components/Gallery';
import { MapSection } from '@/components/MapSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Rooms />
      <Gallery />
      <MapSection />
    </>
  );
}

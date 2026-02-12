import { Hero } from '@/components/Hero';
import { FeaturedFacilities } from '@/components/FeaturedFacilities';
import { Rooms } from '@/components/Rooms';
import { Adventures } from '@/components/Adventures';
import { Gallery } from '@/components/Gallery';
import { PlacesOfInterest } from '@/components/PlacesOfInterest';
import { TeamSection } from '@/components/TeamSection';
import { FaqSection } from '@/components/FaqSection';
import { BlogPreview } from '@/components/BlogPreview';
import { MapSection } from '@/components/MapSection';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedFacilities />
      <Rooms />
      <Adventures />
      <Gallery />
      <PlacesOfInterest />
      <TeamSection />
      <FaqSection />
      <BlogPreview />
      <MapSection />
    </>
  );
}

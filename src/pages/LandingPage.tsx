import { Hero } from '../components/Hero';
import { Methodology } from '../components/Methodology';
import { Services } from '../components/Services';
import { SocialB2B } from '../components/SocialB2B';
import { WebHostingSection } from '../components/WebHostingSection';
import { ContentStrategy } from '../components/ContentStrategy';
import { Operations } from '../components/Operations';
import { GlobalPresence } from '../components/GlobalPresence';
import { Audiovisual } from '../components/Audiovisual';
import { Portal } from '../components/Portal';
import { EcosystemCTA } from '../components/EcosystemCTA';
import { Newsletter } from '../components/Newsletter';

export const LandingPage = () => {
  return (
    <>
      <Hero />
      <Methodology />
      <Services />
      <SocialB2B />
      <WebHostingSection />
      <ContentStrategy />
      <Operations />
      <GlobalPresence />
      <Audiovisual />
      <Portal />
      <EcosystemCTA />
      <Newsletter />
    </>
  );
};

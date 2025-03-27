import './App.css';
import CallToActionComponent from './component/home/call-to-action-component';
import DemoStoreComponent from './component/home/demo-store-component';
import FaqComponent from './component/home/faq-component';
import FeatureComponent from './component/home/feature-component';
import HeroComponent from './component/home/hero-component';
import HowItWorkComponent from './component/home/how-it-work-component';
import PricingPlanComponent from './component/home/pricing-plans-component';
import TestimonialComponent from './component/home/testimonial-component';

function App() {
  return (
    <div>
      <HeroComponent />

      <HowItWorkComponent />

      <FeatureComponent />

      <DemoStoreComponent />

      <PricingPlanComponent />

      <TestimonialComponent />

      <FaqComponent />

      <CallToActionComponent />
    </div>
  );
}

export default App;

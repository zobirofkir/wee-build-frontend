import './App.css';
import DemoStoreComponent from './component/home/demo-store-component';
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
    </div>
  );
}

export default App;

import './App.css';
import FeatureComponent from './component/home/feature-component';
import HeroComponent from './component/home/hero-component';
import HowItWorkComponent from './component/home/how-it-work-component';

function App() {
  return (
    <div>
      <HeroComponent />

      <HowItWorkComponent />

      <FeatureComponent />
    </div>
  );
}

export default App;

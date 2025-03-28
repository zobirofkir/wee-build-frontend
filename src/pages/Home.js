import React from 'react'
import HeroComponent from '../component/home/hero-component'
import HowItWorkComponent from '../component/home/how-it-work-component'
import FeatureComponent from '../component/home/feature-component'
import DemoStoreComponent from '../component/home/demo-store-component'
import PricingPlanComponent from '../component/home/pricing-plans-component'
import TestimonialComponent from '../component/home/testimonial-component'
import FaqComponent from '../component/home/faq-component'
import CallToActionComponent from '../component/home/call-to-action-component'
import AppLayout from '../layouts/app-layout'

const Home = () => {
  return (
    <AppLayout>
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
    </AppLayout>
  )
}

export default Home
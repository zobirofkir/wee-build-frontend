import React from 'react'
import HeroComponent from '../components/home/hero-component'
import HowItWorkComponent from '../components/home/how-it-work-component'
import FeatureComponent from '../components/home/feature-component'
import DemoStoreComponent from '../components/home/demo-store-component'
import PricingPlanComponent from '../components/home/pricing-plans-component'
import TestimonialComponent from '../components/home/testimonial-component'
import FaqComponent from '../components/home/faq-component'
import CallToActionComponent from '../components/home/call-to-action-component'
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
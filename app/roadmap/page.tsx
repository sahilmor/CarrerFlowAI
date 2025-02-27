import React from 'react'
import { TabsDemo } from './components/RoadmapTabs'
import { NavigationBar } from '@/components/ui-components/NavigationBar'
import Footer from '@/components/ui-components/Footer'

const RoadmapPage = () => {
  return (
    <div>
      <NavigationBar />
      <TabsDemo />
      <Footer />
      </div>
  )
}

export default RoadmapPage
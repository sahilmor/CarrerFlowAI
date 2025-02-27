import React from 'react'
import LandingPage from './home/page'
import { NavigationBar } from '@/components/ui-components/NavigationBar'
import MainWrapper from '@/components/wrapper/page'

const Home = () => {
  return (
    <>
    <MainWrapper>
      <LandingPage />
    </MainWrapper>
    </>
  )
}

export default Home
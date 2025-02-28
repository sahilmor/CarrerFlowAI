"use client"
import React, { useEffect } from 'react'
import { TabsDemo } from './components/RoadmapTabs'
import { NavigationBar } from '@/components/ui-components/NavigationBar'
import Footer from '@/components/ui-components/Footer'
import axios from 'axios'
import { roadmapDataAtom } from '@/recoil/atom'
import { useSetAtom } from 'jotai'

const RoadmapPage = () => {
  const setRoadmaps = useSetAtom(roadmapDataAtom);
  useEffect(()=>{
    const fetchRoadmaps = async () => {
      try {
        const { data } = await axios.get("/api/roadmap");
        if (data?.roadmaps?.length) {
          setRoadmaps(data.roadmaps);
          console.log("✅ Roadmaps received:", data.roadmaps);
        } else {
          console.log("❌ No roadmaps received");
        }
      } catch (error) {
        console.error("🚨 Error fetching roadmaps:", error);
      } finally {
      }
    };
    fetchRoadmaps();
  },[]);
  return (
    <div>
      <NavigationBar />
      <TabsDemo />
      <Footer />
      </div>
  )
}

export default RoadmapPage
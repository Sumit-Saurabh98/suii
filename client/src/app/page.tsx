import AiFeatures from '@/components/home/AiFeatures'
import Banner from '@/components/home/Banner'
import DesignTypes from '@/components/home/DesignTypes'
import Header from '@/components/home/Header'
import RecentDesigns from '@/components/home/RecentDesigns'
import Sidebar from '@/components/home/Sidebar'
import React from 'react'

const Home = () => {
  return (
    <div className='flex min-h-screen bg-white '>
      <Sidebar/>
      <div className='flex-1 flex flex-col ml-[72px]'>
        <Header/>
        <main className='flex-1 p-6 overflow-y-auto pt-20'>
          <Banner/>
          <DesignTypes/>
          <AiFeatures/>
          <RecentDesigns/>
        </main>
      </div>
    </div>
  )
}

export default Home

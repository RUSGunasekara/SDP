import React from 'react'
import ContentHeader from './ContentHeader'
import './Dashboard.css'
import Card from './Card';

function DashboardContent() {
  return (
   <div className='content'>
     <ContentHeader/>
     <Card/>
   </div>
  )
}

export default DashboardContent
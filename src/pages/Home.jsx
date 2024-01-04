import React from 'react'
import Navbar from '../components/Navbar'
import Parking from '../components/Parking'

const Home = () => {

    return (

        <div className="container bg-white rounded p-8 w-screen">
            <Navbar />
            <Parking />
            
        </div>

    )
}

export default Home
import React, { useState, useEffect, useContext } from 'react'
// import ParkingSpaces from '../data/parkingSpaces'
import Space from './Space'
import MapChart from './MapChart'
import { SpaceContext, SpaceDispatchContext } from '../providers/SpaceProvider';

const Parking = () => {

  const { spaceDetails, search } = useContext(SpaceContext);
  const { setSpaceDetails, setSearch } = useContext(SpaceDispatchContext);

  return (
    <div className='flex flex-col gap-1'>

      {spaceDetails.filter(item => {
        if (search === '') {
          return item;
        } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
          return item;
        }
      }).map((item, index) => (
        <Space item={item} parkingSpaces={spaceDetails} setParkingSpaces={setSpaceDetails} key={index} />
      ))}

    </div>
  )
}

export default Parking
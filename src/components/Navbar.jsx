import React, { useContext, useState } from 'react'
import Search from '../icons/Search';
import Add from '../icons/Add';
import { SpaceContext, SpaceDispatchContext } from '../providers/SpaceProvider';

const Navbar = () => {

    const {spaceDetails , search } = useContext(SpaceContext);
    const {setSpaceDetails , setSearch } = useContext(SpaceDispatchContext);
    
    
    const updateSearch = (e) => {
        setSearch(e.target.value);
    }

    

    return (
        <div className='flex items-center justify-between'>
            <div className='flex relative items-center w-full'>
                <input type='text' onChange={updateSearch} className='form-input border rounded-lg w-full m-2 p-2  focus:border-[#c0c0c0] focus:border-1 focus:outline-0' placeholder='поиск парковочного места' />
            </div>
            <button className='min-w-max px-4 bg-green-600 text-white rounded-md'><a className='no-underline' href='/add'><span className='hidden sm:block py-2'>Добавить парковочное место</span><span className='block sm:hidden py-1'><Add /></span></a></button>
        </div>
    )
}

export default Navbar
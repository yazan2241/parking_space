import React from 'react'
import MapChart from './MapChart';
import { MdAirlineSeatReclineNormal, MdPaid } from "react-icons/md";
import { FaSquare } from "react-icons/fa";
import { IoRemoveOutline } from "react-icons/io5";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdAdsClick } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { deleteSpace } from '../backend/spaces';

const Space = ({ item , parkingSpaces , setParkingSpaces }) => {
    const Area = 'площадные';
    const { name, address, coordinates, numberOfSeats, type, affiliation, availiability, scheduale , id } = item;
    let navigate = useNavigate();


    const deleteItem = () => {
        const result = deleteSpace(id);
        // console.log(result['status']);    
      }
    const updateSpace = () => {
        navigate(`/update/${id}`);
    }


    return (
        <div className='border-[#f1f1f1] p-1 flex flex-col sm:flex-row justify-between gap-2 border-2 rounded'>
            <MapChart coordinate={coordinates} />
            <div onClick={updateSpace} className='flex flex-col items-start justify-between p-3 w-full gap-2'>
                <span className='text-lg font-bold'>{name}</span>
                <span className='text-base text-[#666] font-semibold'>{address}</span>
                <span className='text-sm text-[#666] font-serif'>{availiability}</span>
                <div className='flex gap-2 items-center justify-around w-full'>
                    <div className='flex gap-1'>
                        <MdAirlineSeatReclineNormal className='w-5 h-5' />
                        <span>{numberOfSeats}</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        {(type == Area) ? <FaSquare /> : <IoRemoveOutline />}
                        <span className='hidden sm:block'>{type}</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        {(affiliation == 'частное') ? <RiGitRepositoryPrivateFill /> : <></>}
                        <span className='hidden sm:block'>{affiliation}</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        {(availiability == 'платные') ? <MdPaid className='w-5 h-5 text-[#2d9e35]' /> : <></>}
                        <span className='hidden sm:block'>{availiability}</span>
                    </div>
                </div>
            </div>
            <button onClick={deleteItem} className='p-4 hidden sm:block bg-red-600'><MdOutlineDelete  className='h-6 w-6 text-white' /></button>
            <button onClick={updateSpace} className='bg-green-600 text-white py-2 px-4 block sm:hidden '>Подробности</button>
        </div>
    )
}

export default Space
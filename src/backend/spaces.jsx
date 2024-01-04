import React from 'react'
import axios from 'axios';
import Urls from '../constant/Urls';

export const deleteSpace = async (id) => {
    await axios.delete(`${Urls.ServerUrl}/deleteSpace/${id}`)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            // TODO
        });
}
import React from 'react'
import { YMaps, Map, Placemark } from "react-yandex-maps";

const MapChart = ({ coordinate }) => {
    let cors = coordinate.split(/[ ,]+/);


    return (

        <YMaps >
            <Map width='100%' state={{ center: [cors[0], cors[1]], zoom: 9 }} defaultState={{ center: [cors[0], cors[1]], zoom: 9 }} >
                <Placemark geometry={[cors[0], cors[1]]} />
            </Map>
        </YMaps>
    )
}

export default MapChart
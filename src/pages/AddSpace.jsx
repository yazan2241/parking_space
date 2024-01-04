import React, { useState, useEffect } from 'react'
import FormInput from '../components/FormInput';
import MapChart from '../components/MapChart';
import axios, { isCancel, AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaBackspace } from 'react-icons/fa';
import { deleteSpace } from '../backend/spaces';
import Urls from '../constant/Urls';

const AddSpace = () => {
  const { id } = useParams();

  var today = new Date();

  var curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  const [coors, setCoors] = useState([45, 45]);
  const [Time, setTime] = useState([curTime, curTime]);
  const [timeScheduale, setTimeScheduale] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const [values, setValues] = useState({
    name: "",
    address: "",
    seats: 0,
    coordinates: '45,45',
    affiliation: 'муниципальное',
    availiability: 'платные',
    scheduale: ',',
    type: 'линейные',
  });


  useEffect(() => {
    if (id != undefined) {
      axios.get(`${Urls.ServerUrl}/getSpace/${id}`)
        .then(function (response) {
          console.log(response);
          setValues(response.data[0]);
          setCoors(response.data[0].coordinates.split(/[ ,]+/));
          console.log(response.data[0].availiability);
          if (response.data[0].availiability == "условно_бесплатные") {
            setTimeScheduale(true);
          }

          if (response.data[0].scheduale.length > 4) {
            setTime(response.data[0].scheduale.split(/[ ,]+/))
          }
        })
        .catch(function (error) {
          console.log(error);
          // TODO
        });
    }
  }, []);


  let navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "string",
      placeholder: "Наименование",
      errorMessage: "Пожалуйста, введите действительное имя",
      required: true,
    },
    {
      id: 2,
      name: "address",
      type: "text",
      placeholder: "Адрес",
      errorMessage: "Пожалуйста, укажите действительный адрес",
      required: true,
    },
    {
      id: 3,
      name: "seats",
      type: "number",
      placeholder: "Максимальное количество мест",
      errorMessage: "Пожалуйста, введите действительный номер",
      required: true,

    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, 'scheduale': Time[0] + ',' + Time[1] });

    if (id != undefined) {
      console.log(Time[0] + ',' + Time[1]);
      axios.put(`${Urls.ServerUrl}/updateSpace/${id}`, {
        name: values.name,
        address: values.address,
        seats: values.seats,
        coordinates: values.coordinates,
        affiliation: values.affiliation,
        availiability: values.availiability,
        scheduale: Time[0] + ',' + Time[1],
        type: values.type,
      })
        .then(function (response) {
          console.log(response);
          navigate('/');

        })
        .catch(function (error) {
          console.log(error);
          // TODO
        });
    }
    else {

      axios.post(`${Urls.ServerUrl}/addSpace`, {
        name: values.name,
        address: values.address,
        seats: values.seats,
        coordinates: values.coordinates,
        affiliation: values.affiliation,
        availiability: values.availiability,
        scheduale: Time[0] + ',' + Time[1],
        type: values.type,
      })
        .then(function (response) {
          console.log(response);
          navigate('/');

        })
        .catch(function (error) {
          console.log(error);
          // TODO
        });
    }



  }


  const getAddress = (val) => {


    var url = `https://nominatim.openstreetmap.org/search?q=${val}&format=json&addressdetails=1&limit=1&polygon_svg=1`;
    axios.get(url)
      .then(function (response) {
        //console.log(response.data[0].display_name);
        setSuggestion([response.data[0]]);
      })
      .catch(function (error) {
        console.log(error);
        // TODO
      });
  }

  const onChange = (e) => {
    if (e.target.name == "address") {
      getAddress(e.target.value);
    }
    setValues({ ...values, [e.target.name]: e.target.value });

  };

  const chooseLocation = (e) => {


    setCoors([suggestion[0].lat, suggestion[0].lon]);

    setValues(
      { ...values, "coordinates": suggestion[0].lat + ',' + suggestion[0].lon, address: suggestion[0].display_name }
    );


  }

  const updateavailiability = (e) => {
    if (e.target.value == "условно_бесплатные") {
      setTimeScheduale(true);

    }
    else {
      setTimeScheduale(false);
      setValues(
        { ...values, "scheduale": ',' }
      );
    }
    setValues(
      { ...values, [e.target.name]: e.target.value }
    );
  }

  const updateValue = (e) => {
    setValues(
      { ...values, [e.target.name]: e.target.value }
    );
  }

  const updateSchedual = (e) => {
    if (e.target.name == "scheduale1") {

      setTime([e.target.value, Time[1]]);

    } else {
      setTime([Time[0], e.target.value]);
    }
  }

  let allData = () => {
    return values.name.length > 0 && values.address.length > 0;
  }

  useEffect(() => {

  }, [values]);



  const deleteItem = () => {
    const result = deleteSpace(values.id);
    console.log(result);

    if (result.status == 200) {
      // const filtered = parkingSpaces.filter((item) => item.id !== values.id);
      // setParkingSpaces(filtered);
    } else {
      console.log(result.status);
    }



  }
  const cancel = () => {
    navigate('/');
  }




  return (
    <div className='p-4'>

      <form onSubmit={handleSubmit} className='w-full'>
        <div className='bg-white flex items-center justify-center p-4 w-full rounded'>
          <div className='flex flex-col items-center justify-center gap-2 m-1 w-full'>
            <p className='font-bold text-xl'>Добавить новое парковочное место</p>


            {inputs.map((input) => (
              <FormInput
                key={input.id}
                value={values[input.name]}
                onChange={onChange}
                {...input}
                suggest={suggestion}
                chooseLocation={chooseLocation}
              />
            ))}
            <MapChart coordinate={values.coordinates} />

            <select value={values.type} name='type' onChange={updateValue} className='bg-white text-black placeholder:text-[#535860] w-full py-2 px-4 rInput border-[#d1d1d1] border-2 rounded'>
              <option value='линейные'>линейные</option>
              <option value='площадные'>площадные</option>
            </select>

            <select value={values.affiliation} name='affiliation' onChange={updateValue} className='bg-white text-black placeholder:text-[#535860] w-full py-2 px-4 rInput border-[#d1d1d1] border-2 rounded'>
              <option value='муниципальное'>муниципальное</option>
              <option value='частное'>частное</option>
            </select>

            <select value={values.availiability} name='availiability' onChange={updateavailiability} className='bg-white text-black placeholder:text-[#535860] w-full py-2 px-4 rInput border-[#d1d1d1] border-2 rounded'>
              <option value='платные'>платные</option>
              <option value='бесплатные'>бесплатные</option>
              <option value='условно_бесплатные'>условно бесплатные</option>
            </select>
            <div className='flex gap-1 w-full'>
              <input value={Time[0]} type='time' name='scheduale1' onChange={updateSchedual} placeholder='Choose Scedulae' className={`${timeScheduale != false ? 'block' : 'hidden'}  bg-white text-black placeholder:text-[#535860] w-full py-2 px-4 rInput border-[#d1d1d1] border-2 rounded`} />
              <input value={Time[1]} type='time' name='scheduale2' onChange={updateSchedual} placeholder='Choose Scedulae' className={`${timeScheduale != false ? 'block' : 'hidden'}  bg-white text-black placeholder:text-[#535860] w-full py-2 px-4 rInput border-[#d1d1d1] border-2 rounded`} />

            </div>

            <div className='flex w-full gap-1'>
              <button className={`${allData() ? 'bg-[#296DC1] pointer-events-auto' : 'pointer-events-none bg-[#296DC180]'} text-white w-full py-2 px-4`}>{(id != undefined) ? "Обновление" : "Добавь"}</button>
              {(id != undefined) ?
                <button onClick={deleteItem} className={`bg-red-600 text-white w-full py-2 px-4`}>Удалить</button>
                : <button onClick={cancel} className={`bg-red-600 text-white w-full py-2 px-4`}>Отменить</button>
              }

            </div>
          </div>
        </div>
      </form>


    </div>
  )
}

export default AddSpace
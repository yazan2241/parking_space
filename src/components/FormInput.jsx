import React, { useState } from 'react'


const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { errorMessage, id, onChange, chooseLocation, suggest, ...inputprops } = props;
const [appears, setAppears] = useState(true);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const divClicked = (e) => {
    chooseLocation();
    setAppears(false);
  }


  return (
    <div className='w-full'>
      <input
        className='bg-white text-black placeholder:text-[#535860] w-full py-2 px-4 rInput border-[#d1d1d1] border-2 rounded'
        onChange={onChange}
        onFocus={() => setFocused(true)}
        {...inputprops}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      {
        (props.name == "address") ?
          <div onClick={divClicked} className={`${appears ? 'block' : 'hidden'}  `}>
            {
              suggest.map((item, index) => (
                (item.display_name != props.vale) ?
                  <div key={index + item.display_name}>{item.display_name.substring(0,45)}</div>
                  : <></>
              ))
            }
          </div>
          : <></>
      }
      <span className='text-red-400 text-xs wrap p-3 error'>{errorMessage}</span>
    </div>
  )
}

export default FormInput
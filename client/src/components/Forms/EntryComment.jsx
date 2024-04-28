import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuTop from '../MenuTop';

export default function EntryComment({ entryTopicText, entryid }) {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const authorid = localStorage.getItem('username');
  const token = localStorage.getItem('token'); // Token'ı localStorage'dan al

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/entries/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Token'ı header'a ekle
        },
        body: JSON.stringify({ text, entryid, authorid }),
      });
      if (!response.ok) {
        throw new Error('Failed to add entry');
       }
      // Refresh entries after adding a new one
      
    } catch (error) {
      console.error('Error adding entry:', error);
       console.log(token)

    }
    navigate(`/entrydetay/${entryid}`)
  };

  return (
    <div className='bg-welcome-page-color   '>
   
   
<div
        className=" bg-gradient-to-b from-green-500 to-sky-800 max-w-screen-xl mt-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center">
          <div>
            <h2 className="text-4xl lg:text-3xl font-bold leading-tight">{entryTopicText}</h2>
           
          </div>
          
        </div>
        <div className="">
         
           
          <div className="mt-8">
            <span className="uppercase text-sm text-gray-600 font-bold">Entry</span>
            <textarea   value={text}
            onChange={handleChange}
              className="w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="mt-8">
            <button onClick={handleSubmit}
              className="uppercase text-sm font-bold tracking-wide bg-green-600 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
              Ekle
            </button>
          </div>
        </div>
      </div>









       
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuTop from './MenuTop';
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

export default function AddEntry() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [text, setText] = useState('');
  const [content, setContent] = useState('');

   const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const author = location.state.author
  const token = localStorage.getItem('token');

  
  useEffect(() => {
    // localStorage'den token'ı al
 
    // Eğer token yoksa, kullanıcıyı /login sayfasına yönlendir
    if (!token) {
        navigate('/giris'); // Yönlendir
    }
  }, []);

 
  const onSubmit = async (data) => { 
    
    try {
      const response = await axios.post('https://kaktus-sozluk-mern-stack-1.onrender.com/api/entries', {
        text: data.text,
        content: data.content,
        author
        
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Token'ı header'a ekle
        },
      });
      if (!response.ok) {
        throw new Error('Failed to add entry');
       }
      // Refresh entries after adding a new one
      
    } catch (error) {
      console.error('Error adding entry:', error);
       console.log(token)

    }
    navigate('/anasayfa'); // Yönlendir

   
  }
  return (
    <div className='bg-welcome-page-color min-h-screen  '>
   
    <MenuTop/>   
     


    <div
        className="max-w-screen-xl mt-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Özgürce yaz paylaş!</h2>
           
          </div>
          
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
         
          <div className="mt-8">
            <span className="uppercase text-sm text-gray-600 font-bold">Başlık</span>
            <input 
              {...register('text', { required: true, minLength: 2, maxLength: 32 })}
             name="text"
             className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"/>
              <ErrorMessage
  errors={errors}
  name="text"
  required
  render={() => <span className='text-xs text-red-500 font-bold'>2-32 karakter uzunluğunda, özel karakterler kullanılamaz.</span>}
/>
          </div>
          <div className="mt-8">
            <span className="uppercase text-sm text-gray-600 font-bold">Entry</span>
            <textarea required name="content"  {...register('content', { required: true, minLength: 2, maxLength: 100  })}

              className="w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
              <ErrorMessage
  errors={errors}
  name="content"
  render={() => <span className='text-xs text-red-500 font-bold'>2-100 karakter uzunluğunda, özel karakterler kullanılamaz.</span>}
/>
          </div>
          <div className="mt-8">
            <button type='submit'
              className="uppercase text-sm font-bold tracking-wide bg-green-600 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
              Ekle
            </button>
          </div>
        </form>
      </div>
 
 
     </div>
  );
}

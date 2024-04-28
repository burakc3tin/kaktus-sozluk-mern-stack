import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import MenuTop from '../components/MenuTop';
import { ErrorMessage } from "@hookform/error-message"

function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
    const [registerControl, setRegisterControl] = useState(false);
  const [image,setImage] = useState('https://avatars.mds.yandex.net/i?id=fb77772430782856b635c729d72fa3c79ec13983-12980679-images-thumbs&n=13');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://kaktus-sozluk-mern-stack-1.onrender.com/api/users', {
        username: data.username,
        password: data.password,
        image
      });

      console.log('response:', response);

      if (response.status === 200) {
        console.log('Kullanıcı başarıyla kaydedildi.');
        setRegisterControl(true);
      } else {
        console.error('Kullanıcı kaydedilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('İstek yapılırken bir hata oluştu:', error);
    }
  };

  return (
    <div className='bg-welcome-page-color min-h-screen '>
      <MenuTop/>

      <section className="mt-16  flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            {registerControl ? (
              <h2 className="font-bold text-xl text-[#007408]">Başarı ile kaydoldunuz. Giriş yapabilirsiniz.</h2>
            ) : (
              <>
                <h2 className="font-bold text-2xl text-[#002D74]">Kayıt</h2>
                <p className="text-xs mt-4 text-[#002D74]">Gerekli alanları doldurarak kayıt olun</p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
  required
  className="p-2 mt-8 rounded-xl border"
  type="text"
  name="username"
  {...register('username', { required: true, minLength: 3, maxLength: 16, pattern: /^[a-zA-Z0-9]+$/ })}
  placeholder="Kullanıcı adı"
/>

 
<ErrorMessage
  errors={errors}
  name="username"
  render={() => <span className='text-xs text-red-500 font-bold'>3-16 karakter uzunluğunda, özel karakterler kullanılamaz.</span>}
/>
                  <div className="relative">
                  <input
  required
  className="p-2 rounded-xl border w-full"
  type="password"
  name="password"
  {...register('password', { required: true, minLength: 4, maxLength: 16, pattern: /^[a-zA-Z0-9]+$/ })}
  placeholder="Parola"
/>
<ErrorMessage
  errors={errors}
  name="password"
  render={() => <span className='text-xs text-red-500 font-bold'>4-16 karakter uzunluğunda, özel karakterler kullanılamaz.</span>}
/>

                     
                  </div>

                 
                  <button
                    className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                    type="submit"
                  >
                    Kayıt
                  </button>
                </form>
              </>
            )}
          </div>
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="https://images.unsplash.com/photo-1573689705887-bc0763c82ea2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;


// import React, { useState } from 'react';
// import axios from 'axios';
// import MenuTop from '../components/MenuTop';
// import { useForm } from 'react-hook-form';

// function Register() {
//   // State'ler kullanıcı adı ve şifreyi saklamak için
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [registerControl, setRegisterControl] = useState(false);
//   const [image,setImage] = useState('https://avatars.mds.yandex.net/i?id=fb77772430782856b635c729d72fa3c79ec13983-12980679-images-thumbs&n=13');
//   // Kullanıcının girdiği verileri saklamak için değişkenler
//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   // Kullanıcıyı kaydetmek için API'ye POST isteği gönderen fonksiyon
//   const handleRegister = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/api/users', {
//         username,
//         password,
//         image
//       });

//       console.log('response:', response);

//       if (response.status === 200) {
//         console.log('Kullanıcı başarıyla kaydedildi.');
//         setRegisterControl(true);
//       } else {
//         console.error('Kullanıcı kaydedilirken bir hata oluştu.');
//       }
//     } catch (error) {
//       console.error('İstek yapılırken bir hata oluştu:', error);
//     }
//   };

//   return (
//     <div className='bg-welcome-page-color min-h-screen '>
   
//     <MenuTop/>   



//     <section className="mt-16  flex items-center justify-center">
 
//  <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
 
//    <div className="md:w-1/2 px-8 md:px-16">
    
// {
//   registerControl ?      <h2 className="font-bold text-xl text-[#007408]">Başarı ile kaydoldunuz. Giriş yapabilirsiniz.</h2>
//   : <>
//    <h2 className="font-bold text-2xl text-[#002D74]">Kayıt</h2>
//     <p className="text-xs mt-4 text-[#002D74]">Gerekli alanları doldurarak kayıt olun</p>

// <div action="" className="flex flex-col gap-4">
  
//   <input required className="p-2 mt-8 rounded-xl border" type="text"   value={username}  onChange={handleUsernameChange} placeholder="Kullanıcı adı"/>
//   <div className="relative">
   
//     <input required className="p-2 rounded-xl border w-full" type="password" value={password} onChange={handlePasswordChange}   placeholder="Parola"/>
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
//       <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
//       <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
//     </svg>
//   </div>
//   <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" onClick={handleRegister} >Kayıt</button>
// </div>
// </>
// }
    
      

    
//    </div>

   
//    <div className="md:block hidden w-1/2">
//      <img className="rounded-2xl" src="https://images.unsplash.com/photo-1573689705887-bc0763c82ea2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
//    </div>
//  </div>
// </section>

  
//     </div>

//   );
// }

// export default Register;

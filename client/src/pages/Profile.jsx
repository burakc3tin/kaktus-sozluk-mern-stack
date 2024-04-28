import  { useState, useEffect } from 'react';
import MenuTop from '../components/MenuTop';
import { IKContext , IKUpload } from 'imagekitio-react';
import axios from 'axios';

export default function Profile() {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetch('https://kaktus-sozluk-mern-stack-1.onrender.com/api/users/')
          .then(response => response.json())
          .then(users => {
            const currentUser = users.find(user => user.username === localStorage.getItem('username'));
            if (currentUser) {
              setId(currentUser._id);
              setUsername(currentUser.username);
              setPassword(currentUser.password);
              setImage(currentUser.image);
            }
            console.log(currentUser)
          })
          .catch(error => console.error('Error fetching users:', error));
      }, []);

    const urlEndpoint = 'https://ik.imagekit.io/wzxk6dynp';
    const publicKey = 'public_XIyIxfaZPYSf8f+lSo7Lufcc9B0=';

    const authenticator = async () => {
        try {
            const response = await fetch('https://kaktus-sozluk-mern-stack-1.onrender.com/api/imageauth');

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };

    const onError = err => {
        console.log("Error", err);
    };

    const onSuccess = res => {
        console.log("Success", res);
        console.log(res.url);
        setImage(res.url);
    };

    const handleImageUpdate = async (event) => {
        event.preventDefault(); // Formun varsayılan gönderimini engelle
 
        try {
            const updatedImageData = { 
                image
            };
            await axios.put(`https://kaktus-sozluk-mern-stack-1.onrender.com/api/users/edit/${id}`, updatedImageData);
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleUpdate = async (event) => {
        event.preventDefault(); // Formun varsayılan gönderimini engelle
        
        try {
            if (oldPassword !== password) {
                setErrorMessage("Yanlış eski parola! Lütfen doğru eski parolanızı girin.");
                return;
            }

            const updatedDataEntry = {
                username,
                password: newPassword,
                image
            };

            await axios.put(`https://kaktus-sozluk-mern-stack-1.onrender.com/api/users/edit/${id}`, updatedDataEntry);
           setErrorMessage('');
            setSuccessMessage("Parolanız başarılı bir şekilde değiştirildi!");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-welcome-page-color min-h-screen '>
            <MenuTop />
            <div className="mx-auto container flex items-center justify-center" id="nav">
                <div className="w-full pt-2 p-4">
                    <div className="mx-auto md:p-6 md:w-1/2">
                        <div className="flex flex-wrap justify-between items-center">
                            <h1 className="text-2xl text-green-500 hover:text-green-400 transition duration-500 p-4">
                                <i className="fas fa-sign-in-alt fa-fw fa-lg"></i>
                                Profil
                            </h1>
                        </div>
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div>
                                <div className="mb-8 text-center">
                                    <img className='rounded-lg shadow-lg mx-auto' src={image} height={150} width={150} alt="" />
                                </div>
                                <div className="mb-8">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile-picture">
                                        Profil Resmi
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <IKContext
                                            publicKey={publicKey}
                                            urlEndpoint={urlEndpoint}
                                            authenticator={authenticator}
                                        >
                                            <IKUpload
                                                fileName="img.png"
                                                onError={onError}
                                                onSuccess={onSuccess}
                                            />
                                        </IKContext>
                                    </div>
                                </div> <div className="mb-4 text-center">
                                    <button onClick={handleImageUpdate} className="transition duration-500 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                                        Resmi Güncelle
                                    </button>
                                  
                                </div> 
                                <form action="" onSubmit={handleUpdate}> 

                                <div className="mb-8">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Eski parola
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                         <input
                                            type="password"
                                            value={oldPassword}
                                            required
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            className="block pr-10 shadow appearance-none border-2 border-green-100 rounded w-full py-2 px-4 text-green-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition duration-500 ease-in-out"
                                            placeholder="••••••" />
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Yeni Parola
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            type="password"
                                            value={newPassword}
                                           required
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="block pr-10 shadow appearance-none border-2 border-green-100 rounded w-full py-2 px-4 text-green-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition duration-500 ease-in-out"
                                            placeholder="••••••" />
                                    </div>
                                </div>
                                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                                {successMessage && <div className="text-green-500">{successMessage}</div>}

                                <div className="mb-4 text-center">
                                    <button type='submit' className="transition duration-500 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                                        Parolayı Güncelle
                                    </button>
                                  
                                </div>  </form>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

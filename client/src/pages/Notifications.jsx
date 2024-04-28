import  { useState, useEffect } from 'react';
  import MenuTop from '../components/MenuTop';
import Notification from '../components/Notification';
import uniqid from 'uniqid';
export default function Notifications() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ , setUserID] = useState('');

  useEffect(() => {
    fetch('https://kaktus-sozluk-mern-stack-1.onrender.com/api/users/')
      .then(response => response.json())
      .then(users => {
        const currentUser = users.find(user => user.username === localStorage.getItem('username'));
        if (currentUser) {
          setUserID(currentUser._id);
          setCurrentUser(currentUser);

        }
        console.log(currentUser)
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  
  return (
    <div className='bg-welcome-page-color min-h-screen'>
      <MenuTop />
      <div className="flex flex-col -m-3 justify-center items-center"> 
        {currentUser && currentUser.notifications.map(notification => (
          <Notification key={uniqid()} sender={notification} likeColor='bg-green-300'/>
        ))}
      </div>
    </div>
  );
}

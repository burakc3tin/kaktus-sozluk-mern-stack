import   { useEffect, useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function Notification({ sender, likeColor }) {
  const [senderId, setSenderId] = useState('');
  const [ , setSenderUsername] = useState('');
  const [entryId, setEntryId] = useState('');
  const [ , setError] = useState(false);  
  const [senderUsernameField, setSenderUsernameField] = useState('');

  useEffect(() => {
    if (sender) {
      axios.get('http://localhost:3000/api/users/getallnotifi')
        .then(response => {
          const notifies = response.data;
          const foundUser = notifies.find(notifi => notifi._id === sender);
          if (foundUser) {
            setSenderId(foundUser.sender);
            setEntryId(foundUser.relatedEntry);
            setSenderUsernameField(foundUser.sendUsername);
          }
        })
        .catch(error => console.error('Error fetching users:', error));
        setError(true); // Hata durumunu true olarak ayarla

    }
  }, [sender]);
 
  useEffect(() => {
    if (senderId) {
      axios.get(`http://localhost:3000/api/users/`)
        .then(response => {
          const users = response.data;
          const foundUser = users.find(user => user._id === senderId);
          if (foundUser) {
            setSenderUsername(foundUser.username);
          }
        })
        .catch(error => console.error('Error fetching users:', error));
        setError(true); // Hata durumunu true olarak ayarla

    }
  }, [senderId]);
 

  
  return (
    <div className="w-1/2 flex flex-col p-3 mt-16 ">
        
      <div className={`${likeColor} rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col`}>
        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-4 text-grey-darker text-sm flex-1">
            <p>{senderUsernameField} {entryId && `${entryId}`} numaralı entry&rsquo;ni beğendi.</p>
          </div>
         </div>
      </div>  
    </div>
  );
}

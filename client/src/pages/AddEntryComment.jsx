import React,{useEffect} from 'react'
import MenuTop from '../components/MenuTop'
import EntryComment from '../components/Forms/EntryComment'
import { useLocation,useNavigate } from 'react-router-dom'; // Import useLocation from React Router
 
export default function AddEntryComment() {
  const navigate = useNavigate();

  const location = useLocation();
 const entryTopicText = location.state.entryTopicText
  const entryID = location.state.entryID;
 useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Token yoksa /giris sayfasına yönlendir
    navigate('/giris');
  }
}, [history]);
  return (
   

<div className='bg-welcome-page-color h-screen text-default-color'>
   
<MenuTop/>
  <EntryComment entryTopicText ={entryTopicText} entryid ={entryID}    /> 
 
</div>
  )
}

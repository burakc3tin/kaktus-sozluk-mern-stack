import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';  
import MenuTop from '../components/MenuTop';
import UpdateEntryForm from '../components/Forms/UpdateEntryForm';
import { useNavigate } from 'react-router-dom';

export default function UpdateEntry() {
  const location = useLocation();
 const editStatus = location.state.editStatus
     const { id } = useParams();  
    const [text, setText] = useState('');
    const [content, setContent] = useState('');
     const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

     useEffect(() => {
        // Sunucudan verileri çekmek için GET isteği yap
        const fetchData = async () => {
            try {
                if(editStatus === 'entry')
               { 
                const response = await axios.get(`http://localhost:3000/api/entries/${id}?type=${editStatus}`);
                const { text, content } = response.data;
               setText(text);
               setContent(content);
                
              }
               else if(editStatus === 'entrydetail')
               {
                
                const response = await axios.get(`http://localhost:3000/api/entries/entrycommentsingle/${id}`);
           
                const { text } = response.data;
               setText(text);
              
                }
                
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        fetchData(editStatus);  
    }, [id]);  
    const handleUpdate = async () => {
        try {
            const updatedDataEntry = {
                text,
                content
            };
            const updatedDataContent = {
              text
          };
            if(editStatus === 'entry')
            { 
               await axios.put(`http://localhost:3000/api/entries/${id}`, updatedDataEntry);
               window.history.back();
            }
            else{
                await axios.put(`http://localhost:3000/api/entries/entrycomment/${id}`, updatedDataContent);
                window.history.back();

            }
         
        setSuccess(true);
        } catch (error) {
            setError(error.response.data.message);
        }
    }
  return (
    <div className='bg-welcome-page-color min-h-screen  '>
   
    <MenuTop/>   

    <div className="bg-green-200 min-h-screen flex items-center">
  <div className="bg-white p-10 md:w-2/3 lg:w-1/2 mx-auto rounded">
   
      <div className="flex items-center mb-5">
        <label
          htmlFor="name"
          className="w-20 inline-block text-right mr-4 text-gray-500  "
        >
          Başlık
        </label>
        <input
          name="name"
          id="name"
          value={text} onChange={(e) => setText(e.target.value)}
          type="text"
           className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"
        />
      </div>
      <div className="flex items-center mb-10">
         
        {editStatus==='entry' ?<><label
          htmlFor="twitter"
          className="w-20 inline-block text-right mr-4 text-gray-500 "
        >
          Entry
        </label> <input
          type="text"
          name="entry"
          value={content} onChange={(e) => setContent(e.target.value)}
          id="entry"
           className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"
        /></> : <></> }
        
      </div>
      <div className="text-right">
        <button onClick={handleUpdate} className="py-3 px-8 bg-green-500 text-green-100 font-bold rounded">
          Güncelle
        </button>
      </div>
   
  </div>
</div>
  
  </div>
  )
}

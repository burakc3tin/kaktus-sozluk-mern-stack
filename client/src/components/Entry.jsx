import React,{useEffect,useState} from 'react';
import axios from 'axios';
export default function Entry({id, text, author }) {
  const [commentCount, setCommentCount] = useState(0); // State to hold comment count

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/entries/allcomment/${id}`);
 setCommentCount(response.data.length)
} catch (error) {
        console.error('Yorum sayısı alınamadı:', error);
      }
    };

    fetchCommentCount();
  }, [id]);
    return (
  
    
      <div className="relative w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 px-2 mb-4">
      <a href={`/entrydetay/${id}`}>
        <div className="bg-gradient-to-b from-emerald-900 to-emerald-600 rounded-lg w-full h-full bg-grey shadow-lg text-white text-center p-8">
          <h3 className="bg-green-300 text-black absolute bottom-0 right-2 p-1 rounded">{commentCount}</h3>
          <p>{text}</p>
        </div>
      </a>
    </div>
    


 
   
  
         
    );
}

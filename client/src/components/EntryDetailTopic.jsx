import {useState,useEffect} from 'react';
import EntryEdit from './EntryEdit'
import axios from 'axios';
import { FacebookShareButton,TwitterShareButton } from 'react-share';

// eslint-disable-next-line react/prop-types
export default function EntryDetailTopic({id, text, content, author, deleteStatus,like,dislike,createdAt }) {

  const username = localStorage.getItem('username')
  const [userId,setUserId] = useState('');
  
  const [likeCount, ] = useState(like);
  const [dislikeCount, ] = useState(dislike);
  const [, setIsClicked] = useState(null);
  const [likes,setLikes] = useState([])
  const [dislikes,setDislikes] = useState([])
    const [entryLike,setEntryLike] = useState(0);
    const [entryDislike,setEntryDislike] = useState(0);
    const [entryCommentLike,setEntryCommentLike] = useState(0);
    const [entryCommentDislike,setEntryCommentDislike] = useState(0);
 
    const shareUrl = 'https://ornek.com';
    const [authorId, setAuthorId] = useState('');


    useEffect(() => {
      const fetchAuthorId = async () => {
        try {
          const response = await axios.get('https://kaktus-sozluk-mern-stack-1.onrender.com/api/users');
          const users = response.data;
          
          // Verilen author adına sahip kullanıcının id'sini bul
          const foundUser = users.find(user => user.username === author);
          if (foundUser) {
            setAuthorId(foundUser._id);
          
          }
        } catch (error) {
          console.error('Kullanıcılar alınamadı:', error);
        }
      };
  
      fetchAuthorId();
    }, [author]);  
  

  const updatedUserLikeData = {
    likes ,
    dislikes
};

const updatedData = {
   
    like:  likeCount,
    dislike: dislikeCount,
};
const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const formattedDate = formatDateString(createdAt);
useEffect(() => {
 
    const fetchEntryDetail = async (type) => {
 
      try {
        // URL'den id değerini al
       
        const response = await axios.get(`https://kaktus-sozluk-mern-stack-1.onrender.com/api/entries/${id}?type=${type}`);
        setEntryLike(response.data.like);
        setEntryDislike(response.data.dislike);


      
      } catch (error) {
        console.error('Entry detayı getirme hatası:', error);
      }
     };
    const fetchEntryCommentDetail = async (type) => {
      try {
        // URL'den id değerini al
       
        const responseComment = await axios.get(`https://kaktus-sozluk-mern-stack-1.onrender.com/api/entries/${id}?type=${type}`);
        setEntryCommentLike(responseComment.data.like);
        setEntryCommentDislike(responseComment.data.dislike);
     

      } catch (error) {
        console.error('Entry detayı getirme hatası:', error);
      }
    };
      if(deleteStatus==='entry')
      {    fetchEntryDetail('entry');
    }
 
   else fetchEntryCommentDetail('entrydetails');
     
  }, [entryLike,entryDislike,entryCommentLike,entryCommentDislike]);
 
   useEffect(() => {
    fetch('https://kaktus-sozluk-mern-stack-1.onrender.com/api/users/')
      .then(response => response.json())
      .then(users => {
        const currentUser = users.find(user => user.username === localStorage.getItem('username'));
        if (currentUser) {
          setUserId(currentUser._id);
          setLikes(currentUser.likes);
          setDislikes(currentUser.dislikes);

        }
        
       })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleChangeLike = async (e) => {

        
    // Tıklama durumunu kontrol etmek için bir değişken oluştur
    const isLiked = e ? true : false;

    
    // State'i güncelle
    if (isLiked) {
         setIsClicked(true);
    } else {
         setIsClicked(false);
    }
     try {
        
        // Burada state güncellendikten sonra border'ı kontrol ediyoruz
        if (isLiked) {
             if(updatedUserLikeData.likes.includes(id)){
                updatedUserLikeData.likes =  updatedUserLikeData.likes.filter(item => item !== id)
                updatedData.like = likeCount -1;
                await axios.delete('https://kaktus-sozluk-mern-stack-1.onrender.com/api/users/notification', {
                  data: {
                      userId: authorId,
                      entryId: id,
                      sendUsername: localStorage.getItem('username')
                  }
              });
            }
               else if(updatedUserLikeData.dislikes.includes(id))
        {
            updatedUserLikeData.dislikes =  updatedUserLikeData.dislikes.filter(item => item !== id)
            updatedUserLikeData.likes =  [...likes, id];
            updatedData.like = likeCount + 1;
            updatedData.dislike = dislikeCount -1;
          
          
            await axios.post('https://kaktus-sozluk-mern-stack-1.onrender.com/api/users/notification', {
              userId: authorId,
              entryId: id ,
              sendUsername: localStorage.getItem('username')
          
            });
           
        }
       
        else{
            updatedUserLikeData.likes =[...likes, id]
            updatedData.like = likeCount+1;
            await axios.post('https://kaktus-sozluk-mern-stack-1.onrender.com/api/users/notification', {
              userId: authorId,
              entryId: id ,
              sendUsername: localStorage.getItem('username')

            });
         }
        

        } 
        else {
            if(updatedUserLikeData.dislikes.includes(id)){
                updatedUserLikeData.dislikes =  updatedUserLikeData.dislikes.filter(item => item !== id)
                updatedData.dislike = dislikeCount -1 ;
             }
               else if(updatedUserLikeData.likes.includes(id))
        {
            updatedUserLikeData.likes =  updatedUserLikeData.likes.filter(item => item !== id)
            updatedUserLikeData.dislikes =  [...dislikes, id];
            updatedData.like = likeCount -1;
            updatedData.dislike = dislikeCount +1;
            await axios.delete('https://kaktus-sozluk-mern-stack-1.onrender.com/api/users/notification', {
              data: {
                  userId: authorId,
                  entryId: id,
                  sendUsername: localStorage.getItem('username')

              }
          });
        }
        else{
            updatedUserLikeData.dislikes =[...dislikes, id]
            updatedData.dislike = dislikeCount + 1;
         }
 
        } 
       
        await axios.put(`https://kaktus-sozluk-mern-stack-1.onrender.com/api/users/edit/${userId}`, updatedUserLikeData);

        if (deleteStatus === 'entry') { 
            await axios.put(`https://kaktus-sozluk-mern-stack-1.onrender.com/api/entries/${id}`, updatedData);
            window.location.reload()
        } else {
            await axios.put(`https://kaktus-sozluk-mern-stack-1.onrender.com/api/entries/entrycomment/${id}`, updatedData);
            window.location.reload()
        }
    } catch (error) {
        console.log(error);
    }

    
}
 
 
  return (





    
    
<div className="bg-gradient-to-b from-green-200 to-amber-100 md:flex w-1/2   rounded overflow-hidden shadow-lg m-6">
  <div className="md:flex-shrink-0">
   
  </div>
  <div className="mt-4 md:mt-0 md:ml-6 justify-center">
  <div className='float-right'>
         {username && username === author ?   <EntryEdit id = {id} deleteStatus = {deleteStatus}/>
      :null }
          </div>
    <span href="#" className="block mt-1 text-lg text-gray-900   font-bold">{text}</span>
    
    <p className="mt-2 text-gray-600">{content}</p>
    <div className="pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> <button className={`text-green-600 ${likes.includes(id) ? 'border-2' : ''}`} onClick={() => handleChangeLike(true)}> 
        <svg width="64px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M20.2694 16.265L20.9749 12.1852C21.1511 11.1662 20.3675 10.2342 19.3345 10.2342H14.1534C13.6399 10.2342 13.2489 9.77328 13.332 9.26598L13.9947 5.22142C14.1024 4.56435 14.0716 3.892 13.9044 3.24752C13.7659 2.71364 13.354 2.28495 12.8123 2.11093L12.6673 2.06435C12.3399 1.95918 11.9826 1.98365 11.6739 2.13239C11.3342 2.29611 11.0856 2.59473 10.9935 2.94989L10.5178 4.78374C10.3664 5.36723 10.146 5.93045 9.8617 6.46262C9.44634 7.24017 8.80416 7.86246 8.13663 8.43769L6.69789 9.67749C6.29223 10.0271 6.07919 10.5506 6.12535 11.0844L6.93752 20.4771C7.01201 21.3386 7.73231 22 8.59609 22H13.2447C16.726 22 19.697 19.5744 20.2694 16.265Z" fill="#34a126"></path> 
                <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M2.96767 9.48508C3.36893 9.46777 3.71261 9.76963 3.74721 10.1698L4.71881 21.4063C4.78122 22.1281 4.21268 22.7502 3.48671 22.7502C2.80289 22.7502 2.25 22.1954 2.25 21.5129V10.2344C2.25 9.83275 2.5664 9.5024 2.96767 9.48508Z" fill="#34a126"></path> 
            </g>
        </svg>
        {like} 
    </button>
    <button className={`text-red-600 ${dislikes.includes(id) ? 'border-2' : ''}`} onClick={() => handleChangeLike(false)}> 
        <svg width="64px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M20.2694 8.48505L20.9749 12.5648C21.1511 13.5838 20.3675 14.5158 19.3345 14.5158H14.1534C13.6399 14.5158 13.2489 14.9767 13.332 15.484L13.9947 19.5286C14.1024 20.1857 14.0716 20.858 13.9044 21.5025C13.7659 22.0364 13.354 22.465 12.8123 22.6391L12.6673 22.6856C12.3399 22.7908 11.9826 22.7663 11.6739 22.6176C11.3342 22.4539 11.0856 22.1553 10.9935 21.8001L10.5178 19.9663C10.3664 19.3828 10.146 18.8195 9.8617 18.2874C9.44634 17.5098 8.80416 16.8875 8.13663 16.3123L6.69789 15.0725C6.29223 14.7229 6.07919 14.1994 6.12535 13.6656L6.93752 4.27293C7.01201 3.41139 7.73231 2.75 8.59609 2.75H13.2447C16.726 2.75 19.697 5.17561 20.2694 8.48505Z" fill="#d51532"></path> 
                <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M2.96767 15.2651C3.36893 15.2824 3.71261 14.9806 3.74721 14.5804L4.71881 3.34389C4.78122 2.6221 4.21268 2 3.48671 2C2.80289 2 2.25 2.55474 2.25 3.23726V14.5158C2.25 14.9174 2.5664 15.2478 2.96767 15.2651Z" fill="#d51532"></path> 
            </g>
        </svg>
        {dislike}
    </button></span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{author}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{formattedDate}</span>

    <span className="inline-block bg-gray-200 rounded-full px-5 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> <TwitterShareButton url={shareUrl}>
    <svg
  width="20px"
  height="20px"
  viewBox="0 -4 48 48"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  fill="#000000"
>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    {" "}
    <title>Twitter-color</title> <desc>Created with Sketch.</desc>{" "}
    <defs> </defs>{" "}
    <g id="Icons" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      {" "}
      <g
        id="Color-"
        transform="translate(-300.000000, -164.000000)"
        fill="#00AAEC"
      >
        {" "}
        <path
          d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283"
          id="Twitter"
        >
          {" "}
        </path>{" "}
      </g>{" "}
    </g>{" "}
  </g>
</svg>


    </TwitterShareButton>
    <FacebookShareButton className='ml-2' url={shareUrl}>
           <svg
  fill="#4460A0"
  width="20px"
  height="20px"
  viewBox="0 0 1920 1920"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    {" "}
    <path
      d="M1168.737 487.897c44.672-41.401 113.824-36.889 118.9-36.663l289.354-.113 6.317-417.504L1539.65 22.9C1511.675 16.02 1426.053 0 1237.324 0 901.268 0 675.425 235.206 675.425 585.137v93.97H337v451.234h338.425V1920h451.234v-789.66h356.7l62.045-451.233H1126.66v-69.152c0-54.937 14.214-96.112 42.078-122.058"
      fillRule="evenodd"
    />{" "}
  </g>
</svg>


    </FacebookShareButton> 
    </span>
  </div>
  </div>  
</div>
  )
}

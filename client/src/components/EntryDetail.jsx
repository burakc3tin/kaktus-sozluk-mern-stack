import  { useState, useEffect } from 'react';
import axios from 'axios';
import MenuTop from './MenuTop';
import EntryDetailTopic from './EntryDetailTopic';
 
import { Link } from 'react-router-dom'; // Import Link from React Router

export default function EntryDetail() {
  const [entry, setEntry] = useState(null);
  const [entryComment, setEntryComment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);

 
 
  useEffect(() => {
    
    const fetchEntryDetail = async (type) => {
      try {
        // URL'den id değerini al
        const entryId = window.location.pathname.split('/').pop();
      
        const response = await axios.get(`https://kaktus-sozluk-mern-stack-1.onrender.com/api/entries/${entryId}?type=${type}`);
        setEntry(response.data);
      
      } catch (error) {
        console.error('Entry detayı getirme hatası:', error);
      }
    };

    const fetchEntryCommentDetail = async (type) => {
      try {
        // URL'den id değerini al
        const entryId = window.location.pathname.split('/').pop();
      
        const responseComment = await axios.get(`https://kaktus-sozluk-mern-stack-1.onrender.com/api/entries/${entryId}?type=${type}`);
        setEntryComment(responseComment.data);
    
      } catch (error) {
        console.error('Entry detayı getirme hatası:', error);
      }
    };

    fetchEntryDetail('entry');
    fetchEntryCommentDetail('entrydetails');
  }, []);

  // Pagination hesaplamaları
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const totalPages = Math.ceil((entryComment && entryComment.filter(entryComment => entryComment.entryid === entry._id).length) / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gradient-to-b  from-green-500 to-sky-800 min-h-screen pb-16 text-default-color'>
      <MenuTop id={entry._id} />
      <Link
        to={`/addentrycomment`}
        state={{ entryTopicText: entry.text, entryID: entry._id }}
        className='flex justify-center p-2 cursor-pointer text-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5 hover:bg-green-700 transition duration-300 ease-in-out hover:text-gray-400'
      >
        Entry Ekle
      </Link>
      <div className='flex flex-col items-center'> 
      {entry._id && entry && (
  <EntryDetailTopic
    id={entry._id}
    text={entry.text}
    deleteStatus="entry"
    content={entry.content}
    author={entry.author}
    like={entry.like}
    dislike={entry.dislike}
    createdAt={entry.createdAt}
  />
)}
      {entry._id && entryComment && entryComment 
        .filter(entryComment => entryComment.entryid === entry._id)
        .slice(indexOfFirstEntry, indexOfLastEntry)
        .map(filteredEntryComment => (
          <EntryDetailTopic
            key={filteredEntryComment._id}
            id={filteredEntryComment._id}
            text=''
            deleteStatus="entrydetail"
            content={filteredEntryComment.text}
            author={filteredEntryComment.authorid}
            like={filteredEntryComment.like}
            dislike={filteredEntryComment.dislike}
            createdAt={filteredEntryComment.createdAt}
          />
        ))}</div>
      
      {/* Pagination */}
      <ul className="flex justify-center space-x-2 mt-4">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 bg-gray-600 rounded-md hover:bg-green-500"
            >
              Önceki
            </button>
          </li>
        )}
        {[...Array(totalPages).keys()].map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number + 1)}
              className={`px-3 py-1 rounded-md bg-white text-black hover:bg-green-500 ${currentPage === number + 1 ? 'bg-gray-500' : ''}`}
            >
              {number + 1}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 bg-gray-600 rounded-md hover:bg-green-500"
            >
              Sonraki
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

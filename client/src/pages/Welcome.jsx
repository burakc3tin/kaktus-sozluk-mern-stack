import   { useState, useEffect } from 'react';
import Entry from '../components/Entry';
 import MenuTop from '../components/MenuTop';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntries } from '../redux/entrySlice';

export default function Welcome() {

  const dispatch = useDispatch();
  const entriesData = useSelector((state) => state.entries.entries);
 

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);
   const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(18);

  const authorid = localStorage.getItem('username');
  const isLoggedIn = localStorage.getItem('token') !== null;

   

  // Mevcut sayfadaki girişleri almak için hesaplama fonksiyonu
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entriesData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Sayfa değiştirme fonksiyonu
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className='bg-gradient-to-b from-green-500 to-sky-800 min-h-screen text-default-color'>
      <MenuTop />
      {isLoggedIn && (
        <Link
          to={`/addentry`}
          state={{ author: authorid }}
          className='flex justify-center mt-10 p-2  cursor-pointer text-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 max-w-md mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5 hover:bg-green-700 transition duration-300 ease-in-out hover:text-gray-400'>
          Başlık Ekle
        </Link>
      )}

      <div className='container mx-auto px-4 sm:px-0 '>
        <div className='flex flex-wrap'>
          {currentEntries.map(entry => (
            <Entry key={entry._id} id={entry._id} text={entry.text} author={entry.author} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className='flex justify-center mt-5'>
        <button onClick={prevPage} disabled={currentPage === 1} className='mx-1 py-2 px-4 text-default-color hover:text-white hover:bg-green-500 rounded'>
          Önceki
        </button>
        <ul className='flex'>
          {[...Array(Math.min(Math.ceil(entriesData.length / entriesPerPage), 4)).keys()].map(number => (
            <li key={number} className='cursor-pointer mx-1'>
              <a onClick={() => paginate(number + 1)} className={`block py-2 px-4 text-default-color hover:text-white hover:bg-green-500 rounded ${currentPage === number + 1 ? 'bg-green-500 text-white' : ''}`}>
                {number + 1}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(entriesData.length / entriesPerPage)} className='mx-1 py-2 px-4 text-default-color hover:text-white hover:bg-green-500 rounded'>
          Sonraki
        </button>
      </div>
    </div>
  );
}

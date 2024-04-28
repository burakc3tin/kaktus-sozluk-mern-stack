 import {   Menu, Transition } from '@headlessui/react'
 import { Fragment  } from 'react'
import { useNavigate, Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function EntryEdit({id,deleteStatus}) {
    const navigate = useNavigate();
    
  
    const handleDelete = async () => {
        try {
            let endpoint = '';
            if (deleteStatus === 'entry') {
                endpoint = `https://kaktus-sozluk-mern-stack-1.onrender.com/api/entries/${id}`;
            } else if (deleteStatus === 'entrydetail') {
                endpoint = `https://kaktus-sozluk-mern-stack-1.onrender.com/api/entries/entrycomment/${id}`;
            }
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok === 200) {
                // Başarılı ise kullanıcıyı belirli bir sayfaya yönlendirin veya bir mesaj gösterin
                navigate('/anasayfa')

            } else {
                // Silme başarısız olduysa, hata mesajını kullanıcıya gösterebilirsiniz
                console.error('Silme başarısız:', response.statusText);
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
        if (deleteStatus === 'entry') {
             navigate('/anasayfa')
        } else if (deleteStatus === 'entrydetail') {
            window.location.reload();
        }
     };
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    // eslint-disable-next-line no-redeclare
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
  return (
    <>
     <Menu as="div" className="relative ml-3">
    <div>
      <Menu.Button className="relative flex rounded-full outline-none font-bold  text-black text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2  ">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <span className='bg-white-200'>...</span>
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <button
              href="#"
              onClick={handleDelete}
              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
            >
              ❌Sil 
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
            to={`/updatedentry/${id}`}
            state={{ editStatus: deleteStatus }}

              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
            >
              ➕Düzenle
            </Link>
            
          )}
        </Menu.Item>
        
      </Menu.Items> 
    </Transition>
  </Menu> </>
  )
}

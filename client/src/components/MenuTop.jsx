import { Fragment,useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { randomizeEntries, selectTodaysEntries  } from '../redux/entrySlice';
import axios from 'axios'; 
 
  
 
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MenuTop() {
   const [menuControl,setMenuControl] = useState(true);
   const [kullaniciAdi,  ] = useState(localStorage.getItem('username'));
   const [image,setImage] = useState('');
   const [userId, setUserId] = useState('');
   const [notifiCount, setNotifiCount] = useState(0);
   const dispatch = useDispatch();
 
   useEffect(() => {
    fetch('http://localhost:3000/api/users/')
      .then(response => response.json())
      .then(users => {
        const currentUser = users.find(user => user.username === localStorage.getItem('username'));
        if (currentUser) {
           
          setImage(currentUser.image);
          setUserId(currentUser._id);
          setNotifiCount(currentUser.notificationCount);
        }
       
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [notifiCount]);

  const handleResetNotifications = async () => { 
    
    try {
       await axios.post(`http://localhost:3000/api/users/resetnotification/${userId}`);
     
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    
  }
  }
    useEffect(() => {
    
    const token = localStorage.getItem('token');
   
   
    if (!token) {
        setMenuControl(false);
    }
    else {
      setMenuControl(true);
    }
  }, []);

  const handleLogout = () => {
     localStorage.removeItem('token');
     localStorage.removeItem('username');
     window.location.href = '/anasayfa'; // Giriş sayfasının URL'sini buraya yazın
 
  };
  const handleChangeMix = () => {
    dispatch(randomizeEntries());
  };
  
   
  const handleTodayClick = () => {
    dispatch(selectTodaysEntries());

  };
  return (
    <Disclosure as="nav" className="bg-welcome-page-color text-default-color">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center text-2xl">
                  <img
                    className="h-6 pr-2 w-auto"
                    src="https://www.svgrepo.com/show/400034/cactus.svg"
                    alt="Your Company"
                  /><a href={`/anasayfa`}>Kaktüs Sözlük</a>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
               
            <a
              href="#"
              onClick={handleTodayClick}
              className={classNames(
                'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
            >
              Bugün
            </a>
            <a
              href="#"
              onClick={handleChangeMix}
              className={classNames(
                'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
            >
              Rastgele
            </a>
            {!menuControl && (
              <>
                <a
                  href="/giris"
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  )}
                >
                  Giriş
                </a>
                <a
                  href="/kayit"
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  )}
                >
                  Kayıt
                </a>
              </>
            )}
                    
                  </div>
                </div>
              </div>

              {/* Menü Sağ Kısmı */}
           {menuControl ?   <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <a href="/bildirimler"
                  type="button"
                  onClick={handleResetNotifications}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                    {/* Yeni kısım başlangıcı */}
  <span className="absolute bg-red-500 text-white font-bold text-xs rounded-full right-5 bottom-3 ">{notifiCount}</span>
  {/* Yeni kısım sonu */}
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon   className="h-6 w-6" aria-hidden="true" />
                </a>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={image}
                        alt=""
                      />
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
                          <a
                            href="/profil"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            {kullaniciAdi}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={handleLogout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Çıkış Yap
                          </a>
                        )}  
                      </Menu.Item>
                    </Menu.Items> 
                  </Transition>
                </Menu> 
              </div> :null }
             
            </div>
            <div className='flex justify-center sm:justify-start sm:pl-8  '>Dikenli Gerçekler, Açan Anlamlar</div>


          </div>

          <Disclosure.Panel className="sm:hidden">
  <div className="space-y-1 px-2 pb-3 pt-2">
     
    <a
      href="#"
      className={classNames(
        'text-gray-300 hover:bg-gray-700 hover:text-white',
        'block rounded-md px-3 py-2 text-base font-medium'
      )}
    >
      Bugün
    </a>
    <a
      href="#"
      className={classNames(
        'text-gray-300 hover:bg-gray-700 hover:text-white',
        'block rounded-md px-3 py-2 text-base font-medium'
      )}
    >
      Rastgele
    </a>
    {!menuControl && (
      <>
        <a
          href="/giris"
          className={classNames(
            'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium'
          )}
        >
          Giriş
        </a>
        <a
          href="/kayit"
          className={classNames(
            'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium'
          )}
        >
          Kayıt
        </a>
      </>
    )}
  </div>
</Disclosure.Panel>

        </>
      )}
    </Disclosure>
  )
}

import React, { useContext, useEffect, useState } from 'react';
import { FileListContext } from '@/app/_context/FilesListContext';
import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Menu, Search, Send } from 'lucide-react';
import Image from 'next/image';

function Header() {
  const { user }: any = useKindeBrowserClient();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(FileListContext);

  // Initially set isMobile to false, then update based on window size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      // Define a function to update state based on window size
      const handleResize = () => {
          setIsMobile(window.innerWidth < 640);
      };

      // Set the initial value based on the current window size
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
  }, []);

    return (
        <div className='flex justify-end w-full gap-2 items-center'>
            <div className='flex gap-2 items-center border rounded-md p-1'>
                <Search className='h-4 w-4'/>
                <input type='text' placeholder='Search'/>
            </div>
            <div>
              {
                isMobile?<div/>:<Image src={user?.picture} alt='user' width={30} height={30} className='rounded-full'/>
              }

            </div>

            {
              isMobile?  <Button
              className='gap-2 flex text-sm h-8 hover:bg-blue-700 bg-blue-600'
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          > 
              <Menu className='h-4 w-4'/>
          </Button>:  <Button
                className='gap-2 flex text-sm h-8 hover:bg-blue-700 bg-blue-600'
            > 
                <Send className='h-4 w-4'/>
                Share
            </Button>
            }
           

          
        </div>
    )
}

export default Header;

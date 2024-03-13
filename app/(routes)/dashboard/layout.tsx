"use client"
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav';
import { FileListContext } from '@/app/_context/FilesListContext';

function DashboardLayout(
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>
) {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const [fileList_, setFileList_] = useState();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  useEffect(() => {
      if (user) {
          checkTeam();
      }
  }, [user]);

  const checkTeam = async () => {
      if (typeof user?.email === 'string') {
        const result = await convex.query(api.teams.getTeam, { email: user.email });
        if (!result?.length) {
            router.push('teams/create');
        }
      } else {
        // Handle the scenario when user?.email is undefined
        // You might want to redirect the user, show an error message, etc.
        console.error('User email is undefined');
      }
  };




  return (
      <div>
          <FileListContext.Provider value={{ fileList_, setFileList_,isSidebarOpen,setIsSidebarOpen }}>
              <div className='grid grid-cols-1 md:grid-cols-4'>
                  <div className={`bg-white h-screen fixed w-72 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
                      <SideNav />
                  </div>
                  <div className={`col-span-1 md:col-span-4 ${isSidebarOpen ? 'ml-72' : ''}`}>
                      {children}
                  </div>
              </div>
          </FileListContext.Provider>
      </div>
  );
}

export default DashboardLayout
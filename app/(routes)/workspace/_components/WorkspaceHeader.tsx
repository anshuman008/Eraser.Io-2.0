import { FileListContext } from '@/app/_context/FilesListContext';
import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { FILE } from '../../dashboard/_components/FileList';

function WorkspaceHeader({onSave, onyCanvas, setOnlyCanvas,fileData}:{onSave:any,onyCanvas:any,setOnlyCanvas:any,fileData:FILE}) {

 

  return (
    <div className='p-3 border-b flex flex-col md:flex-row justify-between items-center'>
      <div className='flex gap-2 items-center mb-2 md:mb-0'>
        <Image src={'/logo-1.png'} alt='logo' height={30} width={30} />
        <h2 className='text-sm md:text-md'>{fileData?.fileName}</h2>
      </div>

      <div className='flex items-center gap-2 mb-2 md:mb-0'>
        <Button 
          className={`h-6 text-xs gap-1 md:h-8 md:text-[12px] ${onyCanvas ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-600'}`}
          onClick={()=>setOnlyCanvas(false)}
        >
          Both
        </Button>
        <Button 
          className={`h-6 text-xs gap-1 md:h-8 md:text-[12px] ${onyCanvas ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={()=>setOnlyCanvas(true)}
        >
          Canvas
        </Button>
      </div>

      <div className='flex items-center gap-2'>
        <Button className='h-6 text-xs gap-1 md:h-8 md:text-[12px] bg-yellow-500 hover:bg-yellow-600' onClick={()=>onSave()}>
          <Save className='h-3 w-3 md:h-4 md:w-4' /> Save
        </Button>
        <Button className='h-6 text-xs gap-1 md:h-8 md:text-[12px] bg-blue-600 hover:bg-blue-700'>
          Share <Link className='h-3 w-3 md:h-4 md:w-4' />
        </Button>
      </div>
    </div>
  )
}

export default WorkspaceHeader

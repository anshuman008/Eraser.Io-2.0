"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';

function Workspace({params}:any) {
   const [triggerSave,setTriggerSave]=useState(false);
   const convex=useConvex();
   const [fileData,setFileData]=useState<FILE|any>();
   useEffect(()=>{
    console.log("FILEID",params.fileId)
    params.fileId&&getFileData();
   },[])

   const getFileData=async()=>{
    const result=await convex.query(api.files.getFileById,{_id:params.fileId})
    setFileData(result);
  }

     const [onyCanvas,setOnlyCanvas] = useState(false);

       useEffect(()=>{
         console.log(onyCanvas,'canvas value')  
       },[onyCanvas])
  return (
    <div>
      <WorkspaceHeader fileData={fileData} onSave={()=>setTriggerSave(!triggerSave)} onyCanvas={onyCanvas} setOnlyCanvas={setOnlyCanvas} />

      {/* Workspace Layout with responsive grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        {/* Document with conditionally reduced width for larger screens */}
        {!onyCanvas && (
          <div className='md:col-span-1 lg:col-span-1 h-screen'>
            <Editor onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
            />
          </div>
        )}
        {/* Whiteboard/canvas with conditional full space for larger screens */}
        <div className={`${onyCanvas ? 'md:col-span-3 lg:col-span-4' : 'md:col-span-2 lg:col-span-3'} h-screen border-l`}>
          <Canvas
           onSaveTrigger={triggerSave}
           fileId={params.fileId}
           fileData={fileData}
          />
        </div>
      </div>
    </div>
  )
}

export default Workspace
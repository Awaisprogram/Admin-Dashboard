import React from 'react'

function Loader() {
  return (
    <div>
       <div className="flex h-screen items-center justify-center gap-2  ">
      
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#23A6F0] border-t-transparent"></div>
      <div>Bandage is loading...</div>
    </div>
    </div>
  )
}

export default Loader

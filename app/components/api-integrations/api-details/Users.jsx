import React from 'react'

function Users() {
  return (
    <div>
       <div>
          <h2 className="text-[#001a5f] font-tiempos font-bold ml-2 text-[33px]  font-tiempos">
            <span className="text-blue-500">3.</span> USERS
          </h2>
          <div className="mt-[55px]">
            <h2 className="text-[#001a5f] font-tiempos   font-bold ml-2 text-[33px]  font-sans">
              <span className="text-blue-500">3.1.</span> Create A User
            </h2>
            <p className="ml-[8px] text-[16px] mt-[17px] leading-[27px] color-[black] font-thin">
              <span className="font-bold">Description:</span> Users are created
              through the Simply Noted website.
              <br /> To create an account go to
              <span className="text-blue">
                https://simplynoted.com/account/register.
              </span>
            </p>
          </div>
        </div>
    </div>
  )
}

export default Users;
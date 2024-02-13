
function Authentication() {
  return (
    <div>
        <div>
          <h2 className="text-[#001a5f] font-tiempos  md:mt-[0px] mt-[37px]  font-bold ml-2 md:text-[33px] text-[27px]  font-tiempos ">
            <span className="text-blue-500">2.</span> AUTHENTICATION
          </h2>
          <div className="mt-[55px]">
            <h2 className="text-[#001a5f] font-tiempos font-bold ml-2 md:text-[33px] text-[27px]">
              <span className="text-blue-500">2.1.</span> Retrieve Auth Token
            </h2>
            <div className="">
              <p className="mt-12px text-[16px] leading-[27px] color-[black] mt-[23px]   font-thin m-[8px]">
                <span className="font-bold"> Description:</span> Simply Noted
                uses API keys as bearer tokens to allow access to the API. You
                can get your API key from <br />  page under "Account Details".
                Simply Noted expects for the API key to be included in all API
                requests to the server in a header that looks like the
                following: Authorization: Bear
              </p>
            </div>
          </div>
        </div>   
    </div>
  )
}

export default Authentication
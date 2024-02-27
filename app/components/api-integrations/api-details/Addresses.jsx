import {ExposedAPIsResponse} from '~/data/apiIntegrationData';

function Addresses() {
  return (
    <div>
    <h2 className="text-[#001a5f] font-tiempos md:mt-[0px] mt-[37px]   font-bold ml-2 sm:text-[33px] text-[20px] font-tiempos ">
      <span className="text-blue-500">7.</span> ADDRESSES
    </h2>
    <div className="mt-[55px]">
      <div>
        <h2 className="text-[#001a5f] font-tiempos  font-bold ml-2 sm:text-[33px] text-[20px] font-tiempos ">
          <span className="text-blue-500">7.1.</span> Create An Address
        </h2>
        <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
          <p className="mt-[17px] sm:text-[16px] text-[16px] mt-[22px] api:leading-[27px] leading-[45px] color-[black]  font-thin">
            <b>Description:</b>This endpoint creates an Address. If any
            required properties are missing an error will be returned.
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Endpoint:</b>/addresses
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Method:</b>POST
          </p>
        </div>
      </div>
      <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        Headers:
      </h2>
      <div className='overflow-x-auto'>
      <table className="w-2/4 text-sm table-auto">
        <thead>
          <tr className="text-[15px]">
            <td className="border p-4">Name</td>
            <td className="border p-4">Value</td>
            <td className="border p-4">Required?</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-[14px]">
            <td className="border p-4">Content-Type </td>
            <td className="border p-4">application/json </td>
            <td className="border p-4">Yes</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Authorization</td>
            <td className="border p-4">Bearer TOKEN_HERE</td>
            <td className="border p-4">Yes</td>
          </tr>
        </tbody>
      </table>
      </div>
      <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        Headers:
      </h2>
      <div className='overflow-x-auto'>
      <table className="w-2/4 text-sm table-auto">
        <thead>
          <tr className="text-[15px]">
            <td className="border p-4">Key</td>
            <td className="border p-4">Type</td>
            <td className="border p-4">Required?</td>
            <td className="border p-4">Example</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-[14px]">
            <td className="border p-4">firstName</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Johnny"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">lastName</td>
            <td className="border p-4">String </td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Appleseed"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Authorization</td>
            <td className="border p-4">Bearer TOKEN_HERE</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Appleseed"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">businessName</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"ACME Inc"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">address1</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"123 S Maple Street"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">address2 </td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4"> "Unit 123"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">city</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Metropolis"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">state</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Texas"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">zip</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"12345"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">country</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"United States"</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div>
        <h2 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
          Returns on success:
        </h2>
        <div className="bg-[#f7f7f7] overflow-x-auto p-[28px]">
          <pre>
            {JSON.stringify(
              ExposedAPIsResponse.products.createAnAddress,
              null,
              2,
            )}
          </pre>
        </div>
      </div>
      <div>
        <h2 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
          Example:
        </h2>
        <div className="bg-[#f7f7f7] overflow-x-auto p-[28px]">
          <pre>
            {JSON.stringify(
              ExposedAPIsResponse.products.createAnAddress1,
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
    <div className="mt-[55px]">
      <div>
        <h2 className="text-[#001a5f] font-tiempos  font-bold ml-2 sm:text-[33px] text-[20px] font-tiempos  ">
          <span className="text-blue-500">7.2.</span> Retrieve All
          Addresses
        </h2>
        <div className="leading-[1.5rem] text-xs mt-[21px] ml-[9px]">
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Description:</b> This endpoint gets all Addresses.
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Endpoint:</b> /addresses
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Method:</b> GET
          </p>
        </div>
        <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
          Headers:
        </h2>
        <div className='overflow-x-auto'>
        <table className="w-2/4 text-sm table-auto">
          <thead>
            <tr className="text-[15px]">
              <td className="border p-4">Name</td>
              <td className="border p-4">Value</td>
              <td className="border p-4">Required?</td>
            </tr>
          </thead>
          <tbody>
            <tr className="text-[14px]">
              <td className="border p-4">Content-Type </td>
              <td className="border p-4">application/json</td>
              <td className="border p-4">Yes</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">Authorization</td>
              <td className="border p-4">Bearer TOKEN_HERE</td>
              <td className="border p-4">Yes</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

      <h2 className="font-tiempos text-lg  mt-[13px] font-bold ml-2">
        URL Parameters:
      </h2>
      <div className='overflow-x-auto'>
      <table className="w-2/4 text-sm table-auto">
        <thead>
          <tr className="text-[15px]">
            <td className="border p-4">Parameter</td>
            <td className="border p-4">Type</td>
            <td className="border p-4">Required?</td>
            <td className="border p-4">Example</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-[14px]">
            <td className="border p-4">type</td>
            <td className="border p-4">String</td>
            <td className="border p-4">"return" OR "recipient"</td>
            <td className="border p-4">No</td>
          </tr>
        </tbody>
      </table>

      </div>
      <div>
        <h3 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
          <b>Returns on success:</b>
        </h3>
        <div className="bg-[#f7f7f7] p-[28px] overflow-x-auto">
          <pre>
            {JSON.stringify(
              ExposedAPIsResponse.products.retriveAllAddresses,
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
    <div className="mt-[55px]">
      <div>
        <h2 className="text-[#001a5f] font-tiempos  font-bold ml-2 sm:text-[33px] text-[20px] font-tiempos ">
          <span className="text-blue-500"> 7.3. </span> Retrieve A Single
          Address
        </h2>
        <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Description:</b> This endpoint gets a single Template.
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Endpoint:</b> /templates/:templateId
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Method:</b> GET
          </p>
        </div>
      </div>
      <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        Headers:
      </h2>
      <div className='overflow-x-auto'>
      <table className="w-2/4 text-sm table-auto">
        <thead>
          <tr className="text-[15px]">
            <td className="border p-4">Name</td>
            <td className="border p-4">Value</td>
            <td className="border p-4">Required?</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-[14px]">
            <td className="border p-4">Content-Type</td>
            <td className="border p-4">application/json</td>
            <td className="border p-4">Yes</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Authorization</td>
            <td className="border p-4">Bearer TOKEN_HERE</td>
            <td className="border p-4">Yes</td>
          </tr>
        </tbody>
      </table>

      </div>
      <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        URL Parameters:
      </h2>
      <div className='overflow-x-auto'>
      <table className="w-2/4 text-sm table-auto">
        <thead>
          <tr className="text-[15px]">
            <td className="border p-4">Parameter</td>
            <td className="border p-4">Type</td>
            <td className="border p-4">Required?</td>
            <td className="border p-4">Example</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-[14px]">
            <td className="border p-4">addressId</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"5ea1101e9680607558e3ff77"</td>
          </tr>
        </tbody>
      </table>

      </div>
      <div>
        <h3 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
          <b>Returns on success:</b>
        </h3>
        <div className="bg-[#f7f7f7] overflow-x-auto p-[28px]">
          <pre>
            {JSON.stringify(
              ExposedAPIsResponse.products.singleAddress,
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
    <div className="mt-[55px]">
      <div>
        <h2 className="text-[#001a5f] font-tiempos  font-bold ml-2 sm:text-[33px] text-[20px] font-tiempos ">
          <span className="text-blue-500">7.4.</span> Update An Address
        </h2>
        <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Description:</b> This endpoint updates an address. If any
            required properties are missing an error will be returned.
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Endpoint:</b> /addresses/:addressId
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Method:</b> PUT
          </p>
        </div>
        <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
          Headers:
        </h2>
        <div className='overflow-x-auto'>
        <table className="w-2/4 text-sm table-auto">
          <thead>
            <tr className="text-[15px]">
              <td className="border p-4">Name</td>
              <td className="border p-4">Value</td>
              <td className="border p-4">Required?</td>
            </tr>
          </thead>
          <tbody>
            <tr className="text-[14px]">
              <td className="border p-4">Content-Type </td>
              <td className="border p-4">application/json </td>
              <td className="border p-4">Yes</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">Authorization</td>
              <td className="border p-4">Bearer TOKEN_HERE</td>
              <td className="border p-4">Yes</td>
            </tr>
          </tbody>
        </table>

        </div>
      </div>
      <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        URL Parameters:
      </h2>
      <div className='overflow-x-auto'>
      <table className="w-2/4 text-sm table-auto">
        <thead>
          <tr className="text-[15px]">
            <td className="border p-4">Parameter</td>
            <td className="border p-4">Type</td>
            <td className="border p-4">Required?</td>
            <td className="border p-4">Example</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-[14px]">
            <td className="border p-4">addressId</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"5ea1101e9680607558e3ff77"</td>
          </tr>
        </tbody>
      </table>

      </div>
      <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        Body:
      </h2>
      <div className='overflow-x-auto'>
      <table className="w-2/4 text-xs table-auto">
        <thead>
          <tr className="text-[15px]">
            <td className="border p-4">Key</td>
            <td className="border p-4">Type</td>
            <td className="border p-4">Required?</td>
            <td className="border p-4">Example</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-[14px]">
            <td className="border p-4">firstName</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Johnny"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">lastName</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Appleseed"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">businessName </td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"ACME Inc"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">addressId</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"123 S Maple Street"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">addressId</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Unit 123"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">city</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Metropolis"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">state</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Texas"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">zip</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"12345"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">country</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"United States"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">type</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4"> "recipient" OR "return"</td>
          </tr>
        </tbody>
      </table>

      </div>
      <div>
        <h3 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
          <b>Returns on success:</b>
        </h3>
        <div className="bg-[#f7f7f7] overflow-x-auto p-[28px]">
          <pre>
            {JSON.stringify(
              ExposedAPIsResponse.products.updateAddress,
              null,
              2,
            )}
          </pre>
        </div>
      </div>
      <div>
        <h2 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
          Example:
        </h2>
        <div className="bg-[#f7f7f7] overflow-x-auto p-[28px]">
          <pre>
            {JSON.stringify(
              ExposedAPIsResponse.products.updateAddress1,
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
    <div className="mt-[55px]">
      <div>
        <h2 className="text-[#001a5f] font-tiempos  font-bold ml-2 sm:text-[33px] text-[20px] font-tiempos ">
          <span className="text-blue-500">7.5.</span> Delete A Single
          Address
        </h2>
        <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Description:</b> This endpoint gets a single Template.
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Endpoint:</b>/addresses/:addressId
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Method:</b>DELETE
          </p>
        </div>
      </div>
      <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        Headers:
      </h2>
      <div className='overflow-x-auto'>
      <table className="w-2/4 text-sm table-auto">
        <thead>
          <tr className="text-[15px]">
            <td className="border p-4">Name</td>
            <td className="border p-4">Value</td>
            <td className="border p-4">Required?</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-[14px]">
            <td className="border p-4">Content-Type</td>
            <td className="border p-4">application/json</td>
            <td className="border p-4">Yes</td>
          </tr>
        </tbody>
      </table>
      </div>
      <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        URL Parameters:
      </h2>
      <div className='overflow-x-auto'>
      <table className="w-2/4 text-sm table-auto">
        <thead>
          <tr className="text-[15px]">
            <td className="border p-4">Parameter</td>
            <td className="border p-4">Type</td>
            <td className="border p-4">Required?</td>
            <td className="border p-4">Example</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-[14px]">
            <td className="border p-4">addressId</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"5ea1101e9680607558e3ff77"</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div>
        <h3 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
          <b>Returns on success:</b>
        </h3>
        <div className="bg-[#f7f7f7] overflow-x-auto p-[28px]">
          <pre>
            {JSON.stringify(
              ExposedAPIsResponse.products.deleteSingleAddress,
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Addresses;
import {ExposedAPIsResponse} from '~/data/apiIntegrationData';

function Templates() {
  return (
    <div>
    <h2 className="text-[#001a5f] font-tiempos md:text-[33px] text-[27px] md:mt-[0px] mt-[37px]  font-tiempos   font-bold ml-2">
      <span className="text-blue-500">6.</span> TEMPLATES
    </h2>
    <div className="mt-[55px]">
      <div>
        <h2 className="text-[#001a5f] font-tiempos md:text-[33px] text-[20px]  font-tiempos   font-bold ml-2">
          <span className="text-blue-500"> 6.1.</span> Create A Message
          Template
        </h2>
        <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black] font-thin">
            <b>Description:</b> This endpoint creates a Template. If any
            required properties are missing an error will be returned.
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black] font-thin">
            <b>Endpoint:</b> /templates
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black] font-thin">
            <b>Method:</b>POST
          </p>
        </div>
      </div>
      <h2 className="text-[black] font-tiempos ml-[-2px]  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        Headers:
      </h2>
      <table className="w-2/4  text-sm table-auto">
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
      <div>
        <h2 className="text-[black] font-tiempos ml-[-2px]  mb-[7px] text-[23px] mt-[55px] font-bold ml-2">
          Body:
        </h2>
        <table className="w-2/4  text-sm table-auto">
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
              <td className="border p-4">productId</td>
              <td className="border p-4">String</td>
              <td className="border p-4">Yes</td>
              <td className="border p-4">"4392452522089"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">handwritingStyle </td>
              <td className="border p-4">String</td>
              <td className="border p-4">Yes</td>
              <td className="border p-4">"Tarzan"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">customMessage </td>
              <td className="border p-4">String</td>
              <td className="border p-4">Yes</td>
              <td className="border p-4">"This is my custom message"</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
          Returns on success:
        </h2>
        <div className="bg-[#f7f7f7] p-[28px]">
          <pre>
            {JSON.stringify(
              ExposedAPIsResponse.products.templates,
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
        <div className="bg-[#f7f7f7] p-[28px]">
          <pre>
            {JSON.stringify(
              ExposedAPIsResponse.products.templates1,
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
    <div className="mt-[55px]">
      <div>
        <h2 className="text-[#001a5f] font-tiempos md:text-[33px] text-[27px]  font-tiempos   font-bold ml-2">
          <span className="text-blue-500">6.2.</span> Retrieve All Message
          Templates
        </h2>
        <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Description:</b> This endpoint gets all Message Templates.
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Endpoint:</b> /templates
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Method:</b> GET
          </p>
        </div>

        <h2 className="text-[black] font-tiempos   mb-[7px] text-[23px] mt-[55px] font-bold">
          Headers:
        </h2>
        <table className="w-2/4 ml-[9px] text-sm table-auto">
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
              <td className="border p-4">application/json </td>
              <td className="border p-4">Yes</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">Authorization</td>
              <td className="border p-4">Bearer TOKEN_HERE </td>
              <td className="border p-4">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
          Returns on success:
        </h2>
        <div className="bg-[#f7f7f7] p-[28px]">
          <pre>
            {JSON.stringify(
              ExposedAPIsResponse.products.messageTemplates,
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
    <div className="mt-[55px]">
      <div>
        <h2 className="text-[#001a5f] font-tiempos md:text-[33px] text-[27px]  font-tiempos   font-bold ml-2">
          <span className="text-blue-500"> 6.3.</span> Retrieve A Single
          Template
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
      <h2 className="text-[black] font-tiempos mb-[7px] text-[23px] mt-[55px] font-bold">
        Headers:
      </h2>
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
      <h2 className="text-[black] font-tiempos mb-[7px] text-[23px] mt-[55px] font-bold">
        URL Parameters:
      </h2>
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
            <td className="border p-4">templateId</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"5e1b5123fe1a7f10021c2b04"</td>
          </tr>
        </tbody>
      </table>
      <h2 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
        Returns on success:
      </h2>
      <div className="bg-[#f7f7f7] p-[28px]">
        <pre>
          {JSON.stringify(
            ExposedAPIsResponse.products.singleTemplate,
            null,
            2,
          )}
        </pre>
      </div>
    </div>
    <div className="mt-[55px]">
      <div>
        <h2 className="text-[#001a5f] font-tiempos md:text-[33px] text-[27px]  font-tiempos   font-bold ml-2">
          <span className="text-blue-500"> 6.4.</span> Update A Template
        </h2>
        <div className="leading-[1.5rem] text-sm mt-[21px] ml-[9px]">
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Description:</b> This endpoint updates a Template. If any
            required properties are missing an error will be returned
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Endpoint:</b>/templates/:templateId
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Method:</b>PUT
          </p>
        </div>
      </div>
      <h2 className="text-[black] font-tiempos mb-[7px] text-[23px] mt-[55px] font-bold">
        Headers:
      </h2>
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
      <h2 className="text-[black] font-tiempos mb-[7px] text-[23px] mt-[55px] font-bold">
        URL Parameters:
      </h2>
      <table className="w-2/4 text-sm table-auto">
        <thead>
          <tr>
            <td className="border p-4">Parameter</td>
            <td className="border p-4">Type</td>
            <td className="border p-4">Required?</td>
            <td className="border p-4">Example</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-4">templateId</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"5e1b5123fe1a7f10021c2b04"</td>
          </tr>
        </tbody>
      </table>
      <h2 className="text-[black] font-tiempos mb-[7px] text-[23px] mt-[55px] font-bold">
        Body:
      </h2>
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
            <td className="border p-4">productId</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"4392452522089"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">handwritingStyle</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Stitch"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">customMessage</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"This is my custom message"</td>
          </tr>
        </tbody>
      </table>
      <div>
        <h2 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
          Returns on success:
        </h2>
        <div className="bg-[#f7f7f7] p-[28px]">
          <pre>
            {JSON.stringify(
              ExposedAPIsResponse.products.updateTemplate,
              null,
              2,
            )}
          </pre>
        </div>
      </div>
      <div>
        <div>
          <h2 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
            Returns on success:
          </h2>
          <div className="bg-[#f7f7f7] p-[28px]">
            <pre>
              {JSON.stringify(
                ExposedAPIsResponse.products.updateTemplate,
                null,
                2,
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Templates
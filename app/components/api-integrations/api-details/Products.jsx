import {ExposedAPIsResponse} from '~/data/apiIntegrationData';

function Products() {
  return (
    <div>
          <h2 className="text-[#001a5f] font-tiempos md:text-[33px] text-[27px] md:mt-[0px] mt-[37px]  font-tiempos   font-bold ml-2">
            <span className="text-blue-500">4.</span> PRODUCTS
          </h2>
          <div className="mt-[55px]">
            <div>
              <h2 className="text-[#001a5f] font-tiempos md:text-[33px] text-[27px]  font-tiempos   font-bold ml-2">
                <span className="text-blue-500"> 4.1.</span> Get Standard Cards
              </h2>
              <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black] ml-[8px] font-thin">
                <span className="font-bold ">Description:</span>This endpoint
                gets all standard cards and returns the id, title, and image
                URL.
              </p>
              <p className="mt-[7px] ml-[8px] font-thin text-[16px] mt-[22px] leading-[27px] color-[black]">
                <span className="font-bold">Endpoint:</span> /products
              </p>
              <p className="mt-[7px] ml-[8px] text-[16px] mt-[22px] leading-[27px] color-[black] font-thin">
                <span className="font-bold">Method:</span> GET
              </p>
            </div>
            <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
              Headers:
            </h2>
            <table className="w-2/4	 text-sm text-thin table-auto">
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
                  <td className="border p-4">$Yes</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">Authorization</td>
                  <td className="border p-4">Bearer TOKEN_HERE</td>
                  <td className="border p-4">Yes</td>
                </tr>
              </tbody>
            </table>
            <div>
              <h3 className="mt-[19px] font-tiempos  mb-[7px] text-[23px]">
                <b>Returns on success:</b>
              </h3>
              <div>
                <pre className="bg-[#f7f7f7] p-[28px]">
                  {JSON.stringify(
                    ExposedAPIsResponse.products.getStandardCardsResponse,
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          </div>
          <div className="mt-[55px]">
            <h2 className="text-[#001a5f] font-tiempos  md:text-[33px] text-[27px]  font-tiempos   font-bold ml-2">
              <span className="text-blue-500">4.2.</span> Get All Custom Cards
            </h2>
            <div className="leading-[1.25rem] text-[16px] mt-[22px] leading-[27px] color-[black] font-thin">
              <p className="">Endpoint: /customProducts</p>
              <p className=" text-blue-500">
                Get-https://api.simplynoted.com/api/customProducts?offset=0
              </p>
              <p className="">
                This endpoint will retrieve a list of custom cards, returning up
                to 200 cards for each call.
              </p>
            </div>
            <table className="w-[100%] mt-[10px]	 text-sm text-thin table-auto">
              <thead>
                <tr className="text-[15px]">
                  <td className="border p-4">Method</td>
                  <td className="border p-4">URL</td>
                  <td className="border p-4"> Parameters</td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-[14px]">
                  <td className="border p-4">GET</td>
                  <td className="border p-4">
                    https://api.simplynoted.com/api/customProducts?offset=0
                  </td>
                  <td className="border p-4">
                    offset – Default/Initial value = 0. You will get the next
                    offset value, if any, in response as nextOffset if
                    moreProducts is true. If moreProducts is false, nextOffset
                    will not be returned.
                  </td>
                </tr>
              </tbody>
            </table>
            <h2 className="text-[black] ml-[-2px] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
              Response Sample
            </h2>
          </div>
          <div className="bg-[#f7f7f7] p-[28px]">
            <pre>
              {JSON.stringify(
                ExposedAPIsResponse.products.getAllCustomCardsResponse,
                null,
                2,
              )}
            </pre>
          </div>
          <div className="mt-[55px]">
            <div>
              <h2 className="text-[#001a5f] font-tiempos md:text-[33px] text-[27px] font-tiempos  font-bold ml-2">
                <span className="text-blue-500">4.3.</span> Get Specific Custom
                Cards
              </h2>
            </div>
            <div className="leading-[1.25rem] text-[16px] mt-[22px] leading-[27px] ml-[9px] font-thin">
              <p>This procedure returns details on one or more custom cards.</p>
              <p>
                Example:
                /customProducts?productIds=7036997894249,7036977578089,7036976889961
              </p>
              <p>
                Where the IDs are existing custom card IDs separated by commas.
              </p>
            </div>
          </div>
          <div className="mt-[55px]">
            <div>
              <h2 className="text-[#001a5f] font-tiempos  md:text-[33px] text-[27px] font-tiempos  font-bold ml-2">
                <span className="text-blue-500">4.4.</span> Create Custom Card
              </h2>
              <div className="leading-[29px] text-[16px] mt-[22px] ml-[9px] font-thin">
                <p>
                  <b>Note:</b>The old endpoint, /createcustomcard, and its
                  associated endpoint, /uploadPDF, have been replaced with a
                  single new endpoint: /createcard. The old endpoints will
                  remain usable until November 1, 2023, at which point they will
                  be retired. We strongly recommend you switch to the new
                  endpoint, /createcard. As well, we have released a new
                  endpoint /modifycard, which will allow you to call an existing
                  flat custom card,
                </p>
                <p className="mt-[20px]">
                  <b>Description:</b> This endpoint creates a new Custom Card
                  and returns card details.
                </p>
                <p>
                  <b>Endpoint:</b> /createCard
                </p>
                <p>
                  <b>Method:</b> POST
                </p>
              </div>
            </div>
            <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px]   mt-[61px] font-bold ml-2">
              Headers
            </h2>
            <table className="w-2/4 text-sm	 table-auto">
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
                  <td className="border p-4">$Yes</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">Authorization</td>
                  <td className="border p-4">Bearer TOKEN_HERE</td>
                  <td className="border p-4">Yes</td>
                </tr>
              </tbody>
            </table>
            <div className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
              <h2>Body:</h2>
            </div>
            <table className="min-w-full text-sm table-auto">
              <thead>
                <tr className="text-[15px]">
                  <td className="border p-4">Name</td>
                  <td className="border p-4">Value</td>
                  <td className="border p-4">Required?</td>
                  <td className="border p-4">Example</td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-[14px]">
                  <td className="border p-4">Content-Type</td>
                  <td className="border p-4">application/json</td>
                  <td className="border p-4"></td>
                  <td className="border p-4">$Yes</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">cardName</td>
                  <td className="border p-4">String</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4"> "Happy Birthday"</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">cardType</td>
                  <td className="border p-4">String</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4"> “flat5x7” / “folded5x7”</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">frontImage</td>
                  <td className="border p-4">File</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4">.</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">isHeaderIncluded</td>
                  <td className="border p-4"> Boolean</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4">True</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">isFooterIncluded</td>
                  <td className="border p-4"> Boolean</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4">True</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">header</td>
                  <td className="border p-4">String</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4"> sImage": true</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">footer</td>
                  <td className="border p-4">String</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4">
                    "data": "Yours Sincerely","textAlign":
                    "left","justifyContent": "center","flexDirection":
                    "column","fontType": "Courier New","fontSize":
                    30,"fontColor": "rgb(255, 0, 0)","zoom": "1","isImage":
                    false
                  </td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">headerImage</td>
                  <td className="border p-4">File</td>
                  <td className="border p-4">No</td>
                  <td className="border p-4"></td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">footerImage</td>
                  <td className="border p-4">File</td>
                  <td className="border p-4">No</td>
                  <td className="border p-4"></td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">backImage</td>
                  <td className="border p-4">File</td>
                  <td className="border p-4">No</td>
                  <td className="border p-4">.</td>
                </tr>
              </tbody>
            </table>
            <div>
              <h2 className="mt-[19px] ml-[-2px] font-tiempos font-bold  mb-[7px] text-[23px]">
                Return on Success:
              </h2>
            </div>

            <div className="bg-[#f7f7f7] p-[28px]">
              <pre>
                {JSON.stringify(
                  ExposedAPIsResponse.products.createCustomCard,
                  null,
                  2,
                )}
              </pre>
            </div>
            <div className="text-[black] font-tiempos  ml-[-2px] mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
              <h2>Example</h2>
            </div>
            <div className="bg-[#f7f7f7] p-[28px]">
              <pre>
                {JSON.stringify(
                  ExposedAPIsResponse.products.createCustomCard1,
                  null,
                  2,
                )}
              </pre>
            </div>

            <div className="mt-[7px]">
              <h2 className="text-[black] font-tiempos ml-[-2px]  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
                Error:
              </h2>
            </div>
            <div>
              <table className="min-w-full text-xs table-auto">
                <thead>
                  <tr className="text-[15px]">
                    <td className="border p-4">Status</td>
                    <td className="border p-4">Errors</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-[14px]">
                    <td className="border p-4">400</td>
                    <td className="border p-4">
                      cardType, cardName & frontImage are required fields
                    </td>
                  </tr>
                  <tr className="text-[14px]">
                    <td className="border p-4">400</td>
                    <td className="border p-4">
                      headerImage is required when header has isImage true
                    </td>
                  </tr>
                  <tr className="text-[14px]">
                    <td className="border p-4">400</td>
                    <td className="border p-4">
                      footerImage is required when footer has isImage true
                    </td>
                  </tr>
                  <tr className="text-[14px]">
                    <td className="border p-4">400</td>
                    <td className="border p-4">
                      For flat cardType, isHeaderIncluded, isFooterIncluded,
                      header, and footer are required fields
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-[55px]">
            <div>
              <h2 className="text-[#001a5f] font-tiempos md:text-[33px] text-[27px] font-bold ml-2">
                <span className="text-blue-500">4.5.</span> Modify Custom Card
              </h2>
              <div className="leading-[1.5rem]  ml-[9px] text-sm">
                <p className="mt-[17px] text-[16px] mt-[16px] leading-[27px] color-[black] font-thin">
                  <b>Description:</b> This endpoint creates and saves a new
                  modified Custom Card and returns card details.
                </p>
                <p className="mt-[17px] text-[16px] mt-[16px] leading-[27px] color-[black]  font-thin">
                  <b>Endpoint:</b> /modifyCard
                </p>
                <p className="mt-[17px] text-[16px] mt-[16px] leading-[27px] color-[black]  font-thin">
                  <b>Method:</b> POST
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
                Headers:
              </h2>
            </div>
            <div>
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
            <div>
              <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
                Body:
              </h2>
            </div>
            <table className="min-w-full text-sm table-auto">
              <thead>
                <tr className="text-[15px]">
                  <td className="border p-4">Key</td>
                  <td className="border p-4">Type/Values</td>
                  <td className="border p-4">Required?</td>
                  <td className="border p-4">Example</td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-[14px]">
                  <td className="border p-4">CoriginalCustomCardID</td>
                  <td className="border p-4">String</td>
                  <td className="border p-4"> Yes</td>
                  <td className="border p-4">7046020595817</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">cardName</td>
                  <td className="border p-4">String</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4"> "Happy Birthday Modified 1a"</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">sHeaderIncluded</td>
                  <td className="border p-4"> Boolean</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4"> True</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">isFooterIncluded</td>
                  <td className="border p-4">Boolean</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4">true</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">Header</td>
                  <td className="border p-4"> String</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4">"isImage": true</td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">footer</td>
                  <td className="border p-4"> String</td>
                  <td className="border p-4">Yes</td>
                  <td className="border p-4">
                    "data": "Yours Sincerely","textAlign":
                    "left","justifyContent": "center","flexDirection":
                    "column","fontType": "Courier New","fontSize":
                    30,"fontColor": "rgb(255, 0, 0)","zoom": "1","isImage":
                    false
                  </td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">headerImage</td>
                  <td className="border p-4">File</td>
                  <td className="border p-4">No</td>
                  <td className="border p-4"></td>
                </tr>
                <tr className="text-[14px]">
                  <td className="border p-4">footerImage</td>
                  <td className="border p-4">File</td>
                  <td className="border p-4">No</td>
                  <td className="border p-4"></td>
                </tr>
              </tbody>
            </table>

            <div>
              <div>
                <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
                  Returns on success:
                </h2>
              </div>
              <div className="bg-[#f7f7f7] p-[28px]">
                <pre>
                  {JSON.stringify(
                    ExposedAPIsResponse.products.modifyCustomCard,
                    null,
                    2,
                  )}
                </pre>
              </div>

              <div>
                <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
                  Example
                </h2>
              </div>
              <div className="bg-[#f7f7f7] p-[28px]">
                <pre>
                  {JSON.stringify(
                    ExposedAPIsResponse.products.modifyCustomCard1,
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          </div>
          <div className="mt-[55px]">
            <div>
              <h2 className="text-[#001a5f]  font-tiempos md:text-[33px] text-[27px] font-bold ml-2">
                <spna className="font-italic text-blue-500">4.6.</spna> Delete
                Custom Cards
              </h2>
              <div className="leading-[1.5rem] text-sm mt-[12px]">
                <p className="mt-[17px] text-[16px] mt-[16px] leading-[27px] color-[black]  font-thin">
                  DELETE -
                  /delete-custom-card?productId=7072904347753,7073022279785,123456789000
                </p>
                <p className="mt-[17px] text-[16px] mt-[16px] leading-[27px] color-[black]  font-thin">
                  This endpoint can be used to delete one or more custom cards
                  belonging to the user.
                </p>
              </div>
            </div>
            <table className="min-w-full mt-[10px] text-sm table-auto">
              <thead>
                <tr className="text-[15px]">
                  <td className="border p-4">Method</td>
                  <td className="border p-4">URL</td>
                  <td className="border p-4">Parameters</td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-[14px]">
                  <td className="border p-4">DELETE</td>
                  <td className="border p-4">
                    /delete-custom-card?productId=7072904347753,7073022279785,123456789000
                  </td>
                  <td className="border p-4">productId - productId contains</td>
                </tr>
              </tbody>
            </table>
            <div>
              <h2 className="text-[black] font-tiempos ml-[-2px]  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
                Response Sample
              </h2>
            </div>
            <div className="bg-[#f7f7f7] p-[28px]">
              <pre>
                {JSON.stringify(
                  ExposedAPIsResponse.products.deleteCustomCard,
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>
        </div>
  )
}

export default Products
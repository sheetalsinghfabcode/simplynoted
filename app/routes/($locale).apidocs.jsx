const apidocs = () => {
  return (
    <>
      <div>
        <div className="bg-white">
          <div className="p-[40px]">
            <h1 className="text-[50px] pb-[30px] font-karla text-center mt-[33px] font-extrabold leading-6">
              API Docs
            </h1>
            <p className="text-[#001a5f] max-w-[40rem] font-bold mb-[28px] mt-[21px]  text-2xl text-center mx-auto">
              By using this API you will have full access to the same range of
              features found in our apps and website.
            </p>
          </div>

          <div className="flex  md:gap-[20px] mt-5 mx-5">
            <div className="w-[30%]">
              <ol className="sidebar bg-white text-[14px] text-[#696969] leading-10 font-bold py-[10px] pl-[20px] mx-5p-[20px] sticky border border-solid border-[#ddd]">
                <li>API ENDPOINTS</li>
                <li>
                  AUTHENTICATION
                  <ol>
                    <li>Retrieve Auth Token</li>
                  </ol>
                </li>
                <li>
                  USERS
                  <ol>
                    <li>Create A User</li>
                  </ol>
                </li>
                <li>
                  PRODUCTS
                  <ol>
                    <li>Get Standard Cards</li>
                    <li>Get All Custom Cards</li>
                    <li>Get Specific Custom Cards</li>
                    <li>Create Custom Card</li>
                    <li>Modify Custom Card</li>
                    <li>Delete Custom Cards</li>
                  </ol>
                </li>
                <li>
                  ORDERS
                  <ol>
                    <li>Create An Order</li>
                    <li>Get Orders</li>
                  </ol>
                </li>
                <li>
                  TEMPLATES
                  <ol>
                    <li>Create A Message Template</li>
                    <li>Retrieve All Message Templates</li>
                    <li>Retrieve A Single Template</li>
                    <li>Update A Template</li>
                  </ol>
                </li>
                <li>
                  ADDRESSES
                  <ol>
                    <li>Create An Address</li>
                    <li>Retrieve All Addresses</li>
                    <li>Retrieve A Single Address</li>
                    <li>Update A Address</li>
                    <li>Delete A Single Address</li>
                  </ol>
                </li>
                <li>
                  AVAILABLE HANDWRITING STYLES
                  <ol>
                    <li>Examples</li>
                  </ol>
                </li>
              </ol>
            </div>
            <div className="w-[70%] p-[12px]">
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl font-bold ml-2">
                  1.API ENDPOINTS
                </h2>
                <p className="text-paras mb-[7px] ml-[8px] font-thin mt-[23px]">
                  The production API can be found at:
                  <a href="https://simplynoted.com/pages/api-automation">
                    https://api.simplynoted.com/api
                  </a>
                </p>
                <p className="text-paras ml-[8px] font-thin mt-[20px] mb-[7px]">
                  The test API can be found at
                  <a href="https://testapi.simplynoted.com/api ">
                    <span className="text-red">
                      https://testapi.simplynoted.com/api
                    </span>
                  </a>
                </p>
                <p className="text-paras mt-[19px] font-thin ml-[8px]">
                  All endpoints listed in this documentation refer to those base
                  URLs and build off them. For example, the orders endpoint
                  "/orders" can be found at the endpoint:
                  <a href="https://api.simplynoted.com/api/orders">
                    https://api.simplynoted.com/api/orders
                  </a>
                </p>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
                  2. AUTHENTICATION
                </h2>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
                  2.1. Retrieve Auth Token
                </h2>
                <p className="mt-12px font-thin m-[8px]">
                  <span className="font-bold"> Description:</span> Simply Noted
                  uses API keys as bearer tokens to allow access to the API. You
                  can get your API key from <br />  page under "Account
                  Details". Simply Noted expects for the API key to be included
                  in all API requests to the server in a header that looks like
                  the following: Authorization: Bear
                </p>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
                  3. USERS
                </h2>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
                  3.1. Create A User
                </h2>
                <p className="ml-[8px] font-thin">
                  <span className="font-bold">Description:</span> Users are
                  created through the Simply Noted website. To create an account
                  go to
                  <span className="text-blue">
                    {' '}
                    https://simplynoted.com/account/register.
                  </span>
                </p>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
                  4. PRODUCTS
                </h2>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
                  4.1. Get Standard Cards
                </h2>
                <p className="mt-[7px] ml-[8px] font-thin">
                  <span className="font-bold">Description:</span>This endpoint
                  gets all standard cards and returns the id, title, and image
                  URL.
                </p>
                <p className="mt-[7px] ml-[8px] font-thin">
                  <span className="font-bold">Endpoint:</span> /products
                </p>
                <p className="mt-[7px] ml-[8px] font-thin">
                  <span className="font-bold">Method:</span> GET
                </p>
              </div>
              <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
                Headers
              </h2>
              <table class="w-2/4	 table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4">$Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h3 className="mt-[19px]">
                  <b>Returns on success:</b>
                </h3>
                <pre className="leading-[4.25rem]	 bg-gray-200 p-[22px] overflow-hidden">
                  &#125; "result" [<br />
                  &#123; "id": '4392451768425',
                  <br />
                  "title": "Cactus Thank you",
                  <br />
                  "image":
                  "https://cdn.shopify.com/s/files/1/0275/6457/2777/products/Cactus-Thank-You.jpg?v=1574659292"
                  <br />
                  &#125;, &#123; "id": '4392452522089',
                  <br />
                  "title": "Cactus Thanks So Much",
                  <br />
                  "image":
                  "https://cdn.shopify.com/s/files/1/0275/6457/2777/products/Cactus-Thanks-So-Much.jpg?v=1574659363"
                  <br />
                  &#125;, &#123; "id": '4442013139049',
                  <br />
                  "title": "Dark Red Holiday Card",
                  <br />
                  "image":
                  "https://cdn.shopify.com/s/files/1/0275/6457/2777/products/Red.HolidayCard.jpg?v=1576524937"
                  <br />
                  &#125; ], "errors": []
                  <br />
                  &#125;
                </pre>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
                  4.2. Get All Custom Cards
                </h2>
                <div className="leading-[2.25rem] font-thin">
                  <p className="ml-[8px]">Endpoint: /customProducts</p>
                  <p className="ml-[8px]">
                    Get-https://api.simplynoted.com/api/customProducts?offset=0
                  </p>
                  <p className="ml-[8px]">
                    This endpoint will retrieve a list of custom cards,
                    returning up to 200 cards for each call.
                  </p>
                </div>
              </div>
              <div>
                <table class="min-w-full table-auto">
                  <thead>
                    <tr>
                      <td class="border p-4">Method</td>
                      <td class="border p-4">URL</td>
                      <td class="border p-4">Parameters</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border p-4">GET</td>
                      <td class="border p-4">
                        https://api.simplynoted.com/api/customProducts?offset=0
                      </td>
                      <td class="border p-4">
                        offset – Default/Initial value = 0. You will get the
                        next offset value, if any, in response as nextOffset if
                        moreProducts is true. If moreProducts is fals
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h1>Response Sample</h1>
                <pre className="leading-[4.25rem]	 bg-gray-200 p-[22px] overflow-hidden">
                  &#125; "result": [<br />
                  "products": [ <br />
                  &#123; "id": 7050968727657, <br />
                  "title": "double click", <br />
                  "image":
                  "https://cdn.shopify.com/s/files/1/0275/6457/2777/products/1696329730810.png?v=1696329732",{' '}
                  <br />
                  "type": "customisable card", <br />
                  "createdAt": "2023-10-03T03:42:12-07:00", <br />
                  "updatedAt": "2023-10-03T03:42:13-07:00" <br />
                  &#125; ], "nextOffset": 200, <br />
                  "moreProducts": true <br />
                  ] "errors": [] <br />
                  &#123;
                </pre>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
                  4.3. Get Specific Custom Cards
                </h2>
              </div>
              <div className="leading-[2.25rem] font-thin">
                <p>
                  This procedure returns details on one or more custom cards.
                </p>
                <p>
                  Example:
                  /customProducts?productIds=7036997894249,7036977578089,7036976889961
                </p>
                <p>
                  Where the IDs are existing custom card IDs separated by
                  commas.
                </p>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
                  4.4. Create Custom Card
                </h2>
                <div className="leading-[2.25rem] font-thin">
                  <p>
                    <b>Note:</b>The old endpoint, /createcustomcard, and its
                    associated endpoint, /uploadPDF, have been replaced with a
                    single new endpoint: /createcard. The old endpoints will
                    remain usable until November 1, 2023, at which point they
                    will be retired. We strongly recommend you switch to the new
                    endpoint, /createcard. As well, we have released a new
                    endpoint /modifycard, which will allow you to call an
                    existing flat custom card,
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
              <h2 className="text-[#001a5f] font-karla  mt-[61px] font-bold ml-2">
                Headers
              </h2>
              <table class="w-2/4	 table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4">$Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2>Body:</h2>
              </div>
              <table class="min-w-full table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4"></td>
                    <td class="border p-4">$Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">cardName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> "Happy Birthday"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">cardType</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> “flat5x7” / “folded5x7”</td>
                  </tr>
                  <tr>
                    <td class="border p-4">frontImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">.</td>
                  </tr>
                  <tr>
                    <td class="border p-4">isHeaderIncluded</td>
                    <td class="border p-4"> Boolean</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">True</td>
                  </tr>
                  <tr>
                    <td class="border p-4">isFooterIncluded</td>
                    <td class="border p-4"> Boolean</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">True</td>
                  </tr>
                  <tr>
                    <td class="border p-4">header</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> sImage": true</td>
                  </tr>
                  <tr>
                    <td class="border p-4">footer</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">
                      "data": "Yours Sincerely","textAlign":
                      "left","justifyContent": "center","flexDirection":
                      "column","fontType": "Courier New","fontSize":
                      30,"fontColor": "rgb(255, 0, 0)","zoom": "1","isImage":
                      false
                    </td>
                  </tr>
                  <tr>
                    <td class="border p-4">headerImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4"></td>
                  </tr>
                  <tr>
                    <td class="border p-4">footerImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4"></td>
                  </tr>
                  <tr>
                    <td class="border p-4">backImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">.</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
                  Return on Success:
                </h2>
              </div>
              <pre className="leading-[4.25rem]	 bg-gray-200 p-[22px] overflow-hidden">
                &#125; "result": &#123;
                <br />
                "product":
                <br />
                "id": 7046027575401, <br />
                "title": "Testing Cards", <br />
                "body_html": null, <br />
                "vendor": "SimplyNoted", <br />
                "product_type": "customisable card", <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "handle": "testing-cards", <br />
                "updated_at": "2023-09-13T06:22:29-07:00", <br />
                "published_at": "2023-09-13T06:22:28-07:00", <br />
                "template_suffix": null, <br />
                "published_scope": "web", <br />
                "tags": "customise_card", <br />
                "status": "active", <br />
                "admin_graphql_api_id": "gid://shopify/Product/7046027575401”,{' '}
                <br />
                "images": [ <br />
                &#123; "id": 30856642232425, <br />
                "product_id": 7046027575401,
                <br />
                "position": 1, <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "updated_at": "2023-09-13T06:22:28-07:00", <br />
                "alt": "front_img", <br />
                "width": 495,
                <br />
                "height": 350,
                <br />
                "src":
                "https://cdn.shopify.com/s/files/1/0275/6457/2777/products/1694611344453.jpg?v=1694611348",
                <br />
                "variant_ids": [], <br />
                "admin_graphql_api_id":
                "gid://shopify/ProductImage/30856642232425" <br />
                &#125; ], <br />
                "image": &#123; <br />
                "id": 30856642232425,
                <br />
                "product_id": 7046027575401, <br />
                "position": 1, <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "updated_at": "2023-09-13T06:22:28-07:00", <br />
                "alt": "front_img", <br />
                "width": 495, <br />
                "height": 350, <br />
                "src":
                "https://cdn.shopify.com/s/files/1/0275/6457/2777/products/1694611344453.jpg?v=1694611348",{' '}
                <br />
                "variant_ids": [], "admin_graphql_api_id":
                "gid://shopify/ProductImage/30856642232425" <br />
                &#123; &#123; &#123; "errors": [] <br />
                &#123;
              </pre>
              <div>
                <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
                  Return on Success:
                </h2>
              </div>
              <pre className="leading-[4.25rem]	 bg-gray-200 p-[22px] overflow-hidden">
                &#123; "cardName": "Happy Birthday",
                <br /> "cardType": "flat5x7",
                <br />
                "frontImage": ,<br /> "isHeaderIncluded": true,
                <br /> "isFooterIncluded": true,
                <br /> "header": &#123;
                <br /> "isImage": true
                <br /> &#125; <br />
                "footer": &#123;
                <br />
                "data": "Yours Sincerely", <br />
                "textAlign": "left", <br />
                "justifyContent": "center", <br />
                "flexDirection": "column", <br />
                "fontType": "Trebuchet MS", <br />
                "fontSize": 20, <br />
                "fontColor": "rgb(0, 0, 255)", <br />
                "zoom": "1", <br />
                "isImage": false <br />
                &#125; <br />
                "headerImage": , <br />
                "footerImage": , <br />
                "backImage": , <br />
                &#125;
                <br />
              </pre>
              <div className="mt-[7px]">
                <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
                  Error:
                </h2>
              </div>
              <div>
                <table class="min-w-full table-auto">
                  <thead>
                    <tr>
                      <td class="border p-4">Status</td>
                      <td class="border p-4">Errors</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border p-4">400</td>
                      <td class="border p-4">
                        cardType, cardName & frontImage are required fields
                      </td>
                    </tr>
                    <tr>
                      <td class="border p-4">400</td>
                      <td class="border p-4">
                        headerImage is required when header has isImage true
                      </td>
                    </tr>
                    <tr>
                      <td class="border p-4">400</td>
                      <td class="border p-4">
                        footerImage is required when footer has isImage true
                      </td>
                    </tr>
                    <tr>
                      <td class="border p-4">400</td>
                      <td class="border p-4">
                        For flat cardType, isHeaderIncluded, isFooterIncluded,
                        header, and footer are required fields
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
                  4.5. Modify Custom Card
                </h2>
                <div className="leading-[2.5rem]">
                  <p>
                    <b>Description:</b> This endpoint creates and saves a new
                    modified Custom Card and returns card details.
                  </p>
                  <p>
                    <b>Endpoint:</b> /modifyCard
                  </p>
                  <p>
                    <b>Method:</b> POST
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
                  Headers:
                </h2>
              </div>
              <div>
                <table className="w-2/4 table-auto">
                  <thead>
                    <tr>
                      <td className="border p-4">Name</td>
                      <td className="border p-4">Value</td>
                      <td className="border p-4">Required?</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-4">Content-Type</td>
                      <td className="border p-4">application/json</td>
                      <td className="border p-4">Yes</td>
                    </tr>
                    <tr>
                      <td class="border p-4">Authorization</td>
                      <td className="border p-4">Bearer TOKEN_HERE</td>
                      <td class="border p-4">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
                  Body:
                </h2>
              </div>
              <table class="min-w-full table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Key</td>
                    <td class="border p-4">Type/Values</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">CoriginalCustomCardID</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4"> Yes</td>
                    <td class="border p-4">7046020595817</td>
                  </tr>
                  <tr>
                    <td class="border p-4">cardName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> "Happy Birthday Modified 1a"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">sHeaderIncluded</td>
                    <td class="border p-4"> Boolean</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> True</td>
                  </tr>
                  <tr>
                    <td class="border p-4">isFooterIncluded</td>
                    <td class="border p-4">Boolean</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">true</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Header</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"isImage": true</td>
                  </tr>
                  <tr>
                    <td class="border p-4">footer</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">
                      "data": "Yours Sincerely","textAlign":
                      "left","justifyContent": "center","flexDirection":
                      "column","fontType": "Courier New","fontSize":
                      30,"fontColor": "rgb(255, 0, 0)","zoom": "1","isImage":
                      false
                    </td>
                  </tr>
                  <tr>
                    <td class="border p-4">headerImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4"></td>
                  </tr>
                  <tr>
                    <td class="border p-4">footerImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4"></td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
                  Returns on success:
                </h2>
              </div>
              <pre className="leading-[4.25rem]  p-[22px] bg-gray-200  mt-7px">
                &#123;
                <br />
                "result": &#123;
                <br />
                "product": &#123; <br />
                "id": 70460275754
                <br />
                "title": "Testing Cards", <br />
                "body_html": null, <br />
                "vendor": "SimplyNoted", <br />
                "product_type": "customisable card", <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "handle": "testing-cards", <br />
                "updated_at": "2023-09-13T06:22:29-07:00", <br />
                "published_at": "2023-09-13T06:22:28-07:00", <br />
                "template_suffix": null, <br />
                "published_scope": "web", <br />
                "tags": "customise_card", <br />
                "status": "active", <br />
                "admin_graphql_api_id": "gid://shopify/Product/7046027575401",{' '}
                <br />
                "variants": &#123;
                <br />
                &#123;
                <br />
                "id": 40730910490729, <br />
                "product_id": 7046027575401, <br />
                "title": "2 - 500", <br />
                "price": "4.35", <br />
                "sku": "", <br />
                "position": 1, <br />
                "inventory_policy": "deny", <br />
                "compare_at_price": null, <br />
                "fulfillment_service": "manual", <br />
                "inventory_management": null, <br />
                "option1": "2 - 500", <br />
                "option2": null, <br />
                "option3": null, <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "updated_at": "2023-09-13T06:22:28-07:00", <br />
                "taxable": true, <br />
                "barcode": null, <br />
                "grams": 0, <br />
                "image_id": null, <br />
                "weight": 0, <br />
                "weight_unit": "lb", <br />
                "inventory_item_id": 42829245382761, <br />
                "inventory_quantity": 0, <br />
                "old_inventory_quantity": 0, <br />
                "requires_shipping": true, <br />
                "admin_graphql_api_id":
                "gid://shopify/ProductVariant/40730910490729" <br />
                &#125; <br />
                &#123;
                <br />
                "id": 40730910523497, <br />
                "product_id": 7046027575401, <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "updated_at": "2023-09-13T06:22:28-07:00", <br />
                "inventory_item_id": 42829245415529, <br />
                "admin_graphql_api_id":
                "gid://shopify/ProductVariant/40730910523497" <br />
                &#125;
                <br />
                &#125;
                <br />
                "id": 40730910556265, <br />
                "product_id": 7046027575401, <br />
                &#125;
              </pre>
              <div>
                <pre className="leading-[4.25rem]  p-[22px] bg-gray-200  mt-7px">
                  &#125;
                  <br /> "cardName": "Happy Birthday Modified 1a",
                  <br />
                  "originalCustomCardID": "123123213123",
                  <br /> "isHeaderIncluded": true,
                  <br /> "isFooterIncluded": true,
                  <br /> "header":
                  <br /> &#125; "isImage": true
                  <br /> &#123; "footer"
                  <br /> &#125; "data": "Yours Sincerely",
                  <br />
                  "textAlign": "left",
                  <br /> "justifyContent": "center",
                  <br />
                  "flexDirection": "column",
                  <br /> "fontType": "Trebuchet MS",
                  <br />
                  "fontSize": 20, "fontColor": "rgb(0, 0, 255)", "zoom": "1",
                  "isImage": false &#123;
                  <br /> "headerImage": ,<br /> "footerImage": &#123;
                </pre>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-4xl mt-[16px] font-bold ml-2">
                  4.6.Delete Custom Cards
                </h2>
                <div className="leading-[2.5rem] mt-[12px]">
                  <p className="ml-[9px]">
                    DELETE -
                    /delete-custom-card?productId=7072904347753,7073022279785,123456789000
                  </p>
                  <p className="ml-[9px]">
                    This endpoint can be used to delete one or more custom cards
                    belonging to the user.
                  </p>
                </div>
              </div>
              <table class="min-w-full mt-[5px] table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Method</td>
                    <td class="border p-4">URL</td>
                    <td class="border p-4">Parameters</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">DELETE</td>
                    <td class="border p-4">
                      /delete-custom-card?productId=7072904347753,7073022279785,123456789000
                    </td>
                    <td class="border p-4">productId - productId contains</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
                  Response Sample
                </h2>
              </div>
              <pre className="leading-[4.25rem]  p-[22px] bg-gray-200  mt-7px">
                &#125; "result": <br /> &#125; "successfulDeletions": [ <br />
                "7072904347753", <br />
                "7073022279785" <br />
                ], <br />
                "failedDeletions": [ <br />
                123456789000 <br />
                ] <br />
                &#123; "errors": [] <br />
                &#123;
              </pre>
              <div>
            <h2 className="text-[#001a5f] font-karla text-4xl mt-[61px] font-bold ml-2">
            5. ORDERS
                </h2>
                <h2 className="text-[#001a5f]  font-karla text-4xl mt-[23px] font-bold ml-2">
                5.1. Create An Order
                </h2>
                <div className="leading-[2.5rem] ml-[9px]">
                  <p>
                    <b>Description:</b> This endpoint creates and saves a new
                    modified Custom Card and returns card details.
                  </p>
                  <p>
                    <b>Endpoint:</b> /orders
                  </p>
                  <p>
                    <b>Method:</b> POST
                  </p>
                </div>
              </div>
              <div>
              <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
              Headers:
                </h2>
              </div>
              <table class="w-2/4	 table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4">$Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <div>
              <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
              Headers:
                </h2>
              </div>
              <table class="min-w-full table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">RExample</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">productId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">$Yes</td>
                    <td class="border p-4">"4392452522089"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">giftVariantId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"39532031672425" (Note: See below for more)</td>

                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">	"john@simplynoted.com"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">handwritingStyle	</td>
                    <td class="border p-4">	String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">	"Tarzan"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">customMessage</td>
                    <td class="border p-4">	String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"This is my custom message.Use a hard return for a new line."</td>
                  </tr>
                  <tr>
                    <td class="border p-4">signoff</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">	No</td>
                    <td class="border p-4">	"Yours Sincerely,David"</td>

                  </tr>
                  <tr>
                    <td class="border p-4">AshippingDate</td>
                    <td class="border p-4">	String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"01/01/2020"</td>

                  </tr>
                  <tr>
                    <td class="border p-4">returnAddressId</td>
                    <td class="border p-4">	String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">	"ID_OF_RETURN_ADDRESS"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">returnAddress</td>
                    <td class="border p-4">	Object Return Object</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">See Below</td>
                  </tr>
                  <tr>
                    <td class="border p-4">recipientData</td>
                    <td class="border p-4">	Array Recipient Object</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">See Below</td>
                  </tr>
                </tbody>
              </table>
              <div>
              <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
              Headers:
                </h2>
              </div>
              <table class="min-w-full table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Key</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">FirstName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">$Yes</td>
                    <td class="border p-4">"John"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">LastName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">	Yes</td>
                    <td class="border p-4">"Appleseed"</td>

                  </tr>
                  <tr>
                    <td class="border p-4">Email</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"john@simplynoted.com"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Phone</td>
                    <td class="border p-4">	String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">	"+15555551234"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Address</td>
                    <td class="border p-4">	String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"This is my custom message.Use a hard return for a new line."</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Address 2</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">	No</td>
                    <td class="border p-4">"Suite 100"</td>

                  </tr>
                  <tr>
                    <td class="border p-4">City</td>
                    <td class="border p-4">	String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Metropolis"</td>

                  </tr>
                  <tr>
                    <td class="border p-4">State</td>
                    <td class="border p-4">	String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Smallville"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Country</td>
                    <td class="border p-4">	String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"USA"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Zip</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"12345"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Company</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"ACME, Inc."</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Custom 1</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"My custom value"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Custom 2	</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"Another Ccustom value"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Custom 3</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"And A third"</td>
                  </tr>
                </tbody>
              </table>
            </div>
      
          </div>
        </div>
      </div>
    </>
  );
};

export default apidocs;

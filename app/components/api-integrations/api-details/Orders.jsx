import React from 'react'

function Orders() {
  return (
    <div>
    <h2 className="text-[#001a5f] font-tiempos text-[33px] font-bold ml-2">
      <span className="text-blue-500">5.</span> ORDERS
    </h2>
    <div>
      <div>
        <h2 className="text-[#001a5f] font-tiempos mt-[40px] text-[33px] font-bold ml-2">
          <span className="text-blue-500">5.1.</span> Create An Order
        </h2>
        <div className="leading-[1.5rem] text-sm ml-[9px]">
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Description:</b> This endpoint creates and saves a new
            modified Custom Card and returns card details.
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Endpoint:</b> /orders
          </p>
          <p className="mt-[17px] text-[16px] mt-[22px] leading-[27px] color-[black]  font-thin">
            <b>Method:</b> POST
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-[black] font-tiempos ml-[-2px] mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
          Headers:
        </h2>
      </div>
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
      <div>
        <h2 className="text-[black] ml-[-2px] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
          Body:
        </h2>
      </div>
      <table className="min-w-full text-sm table-auto">
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
            <td className="border p-4">$Yes</td>
            <td className="border p-4">"4392452522089"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">giftVariantId</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">
              "39532031672425" (Note: See below for more)
            </td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">handwritingStyle</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Tarzan"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">customMessage </td>
            <td className="border p-4"> String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">
              "This is my custom message.Use a hard return for a new
              line."
            </td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">signoff</td>
            <td className="border p-4"> String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"Yours Sincerely,David"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">shippingDate</td>
            <td className="border p-4">String</td>
            <td className="border p-4"> No</td>
            <td className="border p-4">"01/01/2020"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">returnAddressId</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"ID_OF_RETURN_ADDRESS"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">returnAddress</td>
            <td className="border p-4">Object Return Object</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4 color-[blue-500]">See Below</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">recipientData</td>
            <td className="border p-4">Array Recipient Object</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4 color-[blue-500]">See Below</td>
          </tr>
        </tbody>
      </table>
      <div>
        <h2 className="text-[black] ml-[-2px] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
          Recipient Object:
        </h2>
      </div>
      <table className="min-w-full text-sm table-auto">
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
            <td className="border p-4">FirstName</td>
            <td className="border p-4">String</td>
            <td className="border p-4">$Yes</td>
            <td className="border p-4">"John"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">LastName</td>
            <td className="border p-4">String</td>
            <td className="border p-4"> Yes</td>
            <td className="border p-4">"Appleseed"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Email</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"john@simplynoted.com"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Phone</td>
            <td className="border p-4"> String</td>
            <td className="border p-4">No</td>
            <td className="border p-4"> "+15555551234"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Address</td>
            <td className="border p-4"> String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"123 S Street"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Address 2</td>
            <td className="border p-4">String</td>
            <td className="border p-4"> No</td>
            <td className="border p-4">"Suite 100"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">City</td>
            <td className="border p-4"> String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Metropolis"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">State</td>
            <td className="border p-4"> String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Smallville"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Country</td>
            <td className="border p-4"> String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"USA"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Zip</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"12345"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Company</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"ACME, Inc."</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Custom 1</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"My custom value"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Custom 2 </td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"Another Ccustom value"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Custom 3</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"And A third"</td>
          </tr>
        </tbody>
      </table>
      <div>
        <h2 className="text-[black] ml-[-2px] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
          Recipient Object:
        </h2>
      </div>
      <table className="min-w-full text-sm table-auto">
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
            <td className="border p-4">FirstName</td>
            <td className="border p-4">String</td>
            <td className="border p-4">$Yes</td>
            <td className="border p-4">"John"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">LastName</td>
            <td className="border p-4">String</td>
            <td className="border p-4"> Yes</td>
            <td className="border p-4">"Appleseed"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Email</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"john@simplynoted.com"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Phone</td>
            <td className="border p-4"> String</td>
            <td className="border p-4">No</td>
            <td className="border p-4"> "+15555551234"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Address</td>
            <td className="border p-4"> String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"123 S Street"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Address 2</td>
            <td className="border p-4">String</td>
            <td className="border p-4"> No</td>
            <td className="border p-4">"Suite 100"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">City</td>
            <td className="border p-4"> String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Metropolis"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">State</td>
            <td className="border p-4"> String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"Smallville"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Country</td>
            <td className="border p-4"> String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"USA"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Zip</td>
            <td className="border p-4">String</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">"12345"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Company</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"ACME, Inc."</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Custom 1</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"My custom value"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Custom 2 </td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"Another Ccustom value"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">Custom 3</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">"And A third"</td>
          </tr>
        </tbody>
      </table>
      <h2 className="text-[black] font-tiempos ml-[-2px]  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        Returns on success:
      </h2>
      <div className="bg-[#f7f7f7] p-[28px] w-[100%]">
        <pre>
          {JSON.stringify(
            ExposedAPIsResponse.products.createAnOrder,
            null,
            2,
          )}
        </pre>
      </div>
      <h2 className="text-[black] font-tiempos ml-[-2px]  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        Example:
      </h2>
      <div className="bg-[#f7f7f7] p-[28px]">
        <pre>
          {JSON.stringify(
            ExposedAPIsResponse.products.createAnOrder1,
            null,
            2,
          )}
        </pre>
      </div>
      <div className="text-[#001a5f] font-tiempos mt-[40px] text-[33px]  ml-[-2px] font-bold ml-2">
        Types of Gift Cards:
      </div>
      <p className="text-[#555] text-[16px] mt-[20px] font-medium">
        1. Starbucks Gift Card
      </p>
      <table className="min-w-[28%] mt-[12px] text-sm table-auto">
        <thead>
          <tr className="text-[15px]">
            <td className="border p-4 text-[black]">Variant</td>
            <td className="border p-4 text-[black]">ID</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-[14px]">
            <td className="border p-4">$5 for $7.95</td>
            <td className="border p-4"> "39532032786537"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">$10 for $12.95</td>
            <td className="border p-4">"39532032819305"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">$25 for $27.95</td>
            <td className="border p-4">"39532032852073"</td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">$50 for $52.95</td>
            <td className="border p-4">"39532032884841"</td>
          </tr>
        </tbody>
      </table>
      <div>
        <p className="text-[#555] text-[16px] mt-[20px] font-medium">
          2. Amazon Gift Card
        </p>
        <table className="min-w-[28%] mt-[12px] text-sm table-auto">
          <thead>
            <tr className="text-[15px]">
              <td className="border p-4 text-[black]">Variant</td>
              <td className="border p-4 text-[black]">ID</td>
            </tr>
          </thead>
          <tbody>
            <tr className="text-[14px]">
              <td className="border p-4">$5 for $7.95</td>
              <td className="border p-4">"39532031672425"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">$10 for $12.95</td>
              <td className="border p-4">"39532031705193"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">$25 for $27.95</td>
              <td className="border p-4">"39532031737961"</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p className="text-[#555] text-[16px] mt-[20px] font-medium">
          3. Visa Gift Card
        </p>
        <table className="min-w-[28%] mt-[12px] text-sm table-auto">
          <thead>
            <tr className="text-[15px]">
              <td className="border p-4 text-[black]">Variant</td>
              <td className="border p-4 text-[black]">ID</td>
            </tr>
          </thead>
          <tbody>
            <tr className="text-[14px]">
              <td className="border p-4">$5 for $7.95</td>
              <td className="border p-4">"39532033146985"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">$10 for $12.95</td>
              <td className="border p-4">"39532033179753"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">$25 for $27.95</td>
              <td className="border p-4">"39532033212521"</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p className="text-[#555] text-[16px] mt-[20px] font-medium">
          4. Home Depot Gift Card
        </p>
        <table className="min-w-[28%] mt-[12px] text-sm table-auto">
          <thead>
            <tr className="text-[15px]">
              <td className="border p-4 text-[black]">Variant</td>
              <td className="border p-4 text-[black]">ID</td>
            </tr>
          </thead>
          <tbody>
            <tr className="text-[14px]">
              <td className="border p-4">$5 for $7.95</td>
              <td className="border p-4">"39532029378665"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">$10 for $12.95</td>
              <td className="border p-4">"39532029411433"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">$25 for $27.95</td>
              <td className="border p-4">"39532029444201"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">$25 for $27.95</td>
              <td className="border p-4">"39532029476969"</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p className="text-[#555] text-[16px] mt-[20px] font-medium">
          5. Lowe’s Gift Card
        </p>
        <table className="min-w-[28%] mt-[12px] text-sm table-auto">
          <thead>
            <tr className="text-[15px]">
              <td className="border p-4 text-[black]">Variant</td>
              <td className="border p-4 text-[black]">ID</td>
            </tr>
          </thead>
          <tbody>
            <tr className="text-[14px]">
              <td className="border p-4">$5 for $7.95</td>
              <td className="border p-4">"39532032262249"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">$10 for $12.95</td>
              <td className="border p-4">"39532032295017"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">$25 for $27.95</td>
              <td className="border p-4">"39532032327785"</td>
            </tr>
            <tr className="text-[14px]">
              <td className="border p-4">$25 for $27.95</td>
              <td className="border p-4">"39532032360553"</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h2 className="text-[#001a5f] font-tiempos mt-[40px] text-[33px] font-bold ml-2">
        <span className="text-blue-500">5.2.</span> Get Orders
      </h2>
      <p className="mt-[17px] text-[16px] mt-[18px] leading-[27px] color-[black]  font-thin">
        <b>Description:</b> This endpoint gets all orders in the account.
      </p>
      <p className="mt-[17px] text-[16px] mt-[15px] leading-[27px] color-[black]  font-thin">
        <b>Endpoint:</b>
        /orders/customer/?offset=0&status=any&fulfillment_status=shipped
      </p>
      <p className="mt-[17px] text-[16px] mt-[15px] leading-[27px] color-[black]  font-thin">
        <b>Method:</b> GET
      </p>
      <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
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
      <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
        Body:
      </h2>
      <table className="min-w-full text-sm table-auto">
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
            <td className="border p-4">offset</td>
            <td className="border p-4">Number</td>
            <td className="border p-4">Yes</td>
            <td className="border p-4">
              0 This call will pull up to 200 orders starting with the
              most recent. The initial call should use 0 as the offset. In
              the return, you will see: moreOrders: “true/false” If true,
              then there are more orders to fetch. You will also see:
              nextOffset “200” (This gives you the correct offset for the
              following call.)
            </td>
          </tr>
          <tr className="text-[14px]">
            <td className="border p-4">status</td>
            <td className="border p-4">String</td>
            <td className="border p-4">No</td>
            <td className="border p-4">
              Filter orders by their status. status = default = open open:
              Show only open orders. closed: Show only closed orders.
              cancelled: Show only cancelled orders. any: Show all orders,
              including archived orders.
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-[15px]">
        <p className="text-[#555] text-[20px] font-medium mb-[6px]">
          In response you will get
        </p>
      </div>
      <div className="bg-[#f7f7f7] p-[28px]">
        <pre>
          {JSON.stringify(
            ExposedAPIsResponse.products.getOrders,
            null,
            2,
          )}
        </pre>
      </div>
      {/* <h2 className="text-[black] font-tiempos  mb-[7px] text-[23px] mt-[61px] font-bold ml-2">
            Returns on success:
          </h2>
          <pre className="leading-7 text-14 color-[black] bg-[#f7f7f7] p-[22px] font-bold overflow-hidden">
            &#123;
            <br />
            "result": &#123;
            <br />
            "orders": [ <br />
            &#123; <br />
            "id": 5465230180457, <br />
            "admin_graphql_api_id": "gid://shopify/Order/5465230180457",
            <br />
            "app_id": 3648771, <br />
            "browser_ip": "127.0.0.1", <br />
            "nextOffset": 200, <br />
            "moreOrders": true <br />
            IF moreOrders is true, then call the API again with the
            nextOffset value <br />
            IF moreOrders is false, there are no further orders to fetch.
            <br />
            Returns on success: <br />
            "result":
            <br />
            &#125; <br />
            "orders": [ <br />
            &#123;
            <br />
            "id": 5465230180457, <br />
            "admin_graphql_api_id": "gid://shopify/Order/5465230180457",
            <br />
            "app_id": 3648771, <br />
            "browser_ip": "127.0.0.1", <br />
            "buyer_accepts_marketing": true, <br />
            "cancel_reason": "other", <br />
            "cancelled_at": "2023-09-25T22:00:48-07:00", <br />
            "cart_token": null, <br />
            "checkout_id": 29872277979241, <br />
            "checkout_token": "db80c9ab5c816b51384d10177724dca7", <br />
            "client_details": &#123; <br />
            "accept_language": null,
            <br />
            "browser_height": null, <br />
            "browser_ip": "127.0.0.1", <br />
            "browser_width": null, <br />
            "session_hash": null, <br />
            "user_agent": null <br />
            &#125; <br />
            "closed_at": null, &#123;
            <br />
            "confirmed": true, <br />
            "contact_email": "fabprojectmanager@gmail.com", <br />
            "created_at": "2023-09-25T21:39:16-07:00", <br />
            "currency": "USD", <br />
            "current_subtotal_price": "12.95", <br />
            "current_subtotal_price_set":
            <br />
            &#125;
            <br />
            &#123;
            <br />
            "shop_money":
            <br /> &#125; <br />
            &#123;
            <br />
            "amount": "12.95", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            &#123; <br />
            "presentment_money": &#123; <br />
            "amount": "12.95", <br />
            "currency_code": "USD" <br />
            &#123; &#125; "current_total_discounts": "4.75", <br />
            "current_total_discounts_set" <br />
            &#125; <br />
            "shop_money": &#123; <br />
            "amount": "4.75", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            "presentment_money": &#123;
            <br />
            "amount": "4.75", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            &#123;
            <br />
            "current_total_duties_set": null, <br />
            "current_total_price": "12.95", <br />
            "current_total_price_set":
            <br />
            &#125; <br />
            "shop_money": &#123; <br />
            "amount": "12.95", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            "presentment_money": &#123; <br />
            "amount": "12.95", <br />
            "currency_code": "USD" <br />
            &#125; <br />
            &#123; <br />
            "current_total_tax": "0.00", <br />
            "current_total_tax_set":
            <br />
            &#125; <br />
            "shop_money": &#123;
            <br />
            "amount": "0.00", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            "presentment_money": &#123;
            <br />
            "amount": "0.00", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            &#123;
            <br />
            "customer_locale": "en-US", <br />
            "device_id": null, <br />
            "discount_codes": [], <br />
            "email": "fabprojectmanager@gmail.com", <br />
            "estimated_taxes": false, <br />
            "financial_status": "pending", <br />
            "fulfillment_status": "restocked", <br />
            "gateway": "manual", <br />
            "landing_site": null, <br />
            "landing_site_ref": null, <br />
            "location_id": 34513649769, <br />
            "merchant_of_record_app_id": null, <br />
            "name": "#31323", <br />
            "note": null, <br />
            "note_attributes": [], <br />
            "number": 30323, <br />
            "order_number": 31323,
            <br />
            "order_status_url":
            "https://simplynoted.com/27564572777/orders/305b8acc44d846ef3fb89e38d53a7644/authenticate?key=feae732fdbe3984a06bff362dff8b89e",
            <br />
            "original_total_duties_set": null, <br />
            "payment_gateway_names": [ <br />
            "manual" <br />
            ], <br />
            "phone": null, <br />
            "presentment_currency": "USD", <br />
            "processed_at": "2023-09-25T21:39:15-07:00", <br />
            "processing_method": "manual", <br />
            "reference": "c899c33646d351c09ccd4a1f9befad79", <br />
            "referring_site": null,
            <br />
            "source_identifier": "c899c33646d351c09ccd4a1f9befad79",{' '}
            <br />
            "source_name": "3648771", <br />
            "source_url": null, <br />
            "subtotal_price": "12.95", <br />
            "subtotal_price_set":
            <br />
            &#125;
            <br />
            "shop_money": &#123;
            <br />
            "amount": "12.95", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            "presentment_money":&#123; <br />
            "amount": "12.95", <br />
            "currency_code": "USD" <br />
            &#125; <br />
            &#123; <br />
            "tags": "", <br />
            "tax_lines": [], <br />
            "taxes_included": false, <br />
            "test": false, <br />
            "token": "305b8acc44d846ef3fb89e38d53a7644", <br />
            "total_discounts": "4.75", <br />
            "total_discounts_set":
            <br />
            &#125; <br />
            "shop_money": &#123; <br />
            "amount": "4.75", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            "presentment_money": &#123; <br />
            "amount": "4.75", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            &#123;
            <br />
            "total_line_items_price": "17.70", <br />
            "total_line_items_price_set":&#125;
            <br />
            "shop_money": &#123;
            <br />
            "amount": "17.70", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            "presentment_money": &#123; <br />
            "amount": "17.70", <br />
            "currency_code": "USD" <br />
            &#125; <br />
            &#123;
            <br />
            "total_outstanding": "12.95", <br />
            "total_price": "12.95", <br />
            "total_price_set": &<br />
            "shop_money":
            <br />
            "amount": "12.95", <br />
            "currency_code": "USD
            <br />
            &#125;
            <br />
            &#123;
            <br />
            "presentment_money": &#123; <br />
            "amount": "12.95", <br />
            "currency_code": "USD" <br />
            &#125; <br />
            &#123; <br />
            "total_shipping_price_set": &#123; <br />
            "shop_money": &#123; <br />
            "amount": "0.00", <br />
            "currency_code": "USD" <br />
            &#125; <br />
            "presentment_money": &#123; <br />
            "amount": "0.00", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            &#123; <br />
            "total_tax": "0.00", <br />
            "total_tax_set": <br />
            "shop_money": <br />
            "amount": "0.00", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            "presentment_money" &#123; <br />
            "amount": "0.00", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            &#123;
            <br />
            "total_tip_received": "0.00", <br />
            "total_weight": 0, <br />
            "updated_at": "2023-09-25T22:00:48-07:00", <br />
            "user_id": null, <br />
            "customer":
            <br />
            &#125; <br />
            &#123;
            <br />
            "id": 6232622891113, <br />
            "email": "fabprojectmanager@gmail.com", <br />
            "accepts_marketing": true, <br />
            "created_at": "2023-04-16T01:45:26-07:00", <br />
            "updated_at": "2023-09-26T05:29:21-07:00", <br />
            "first_name": "Pradeep", <br />
            "last_name": "singh", <br />
            "state": "enabled", <br />
            "note": "", <br />
            "verified_email": false, <br />
            "multipass_identifier": null, <br />
            "tax_exempt": false, <br />
            "phone": null, <br />
            "email_marketing_consent":
            <br />
            &#125;
            <br />
            &#123;
            <br />
            "state": "subscribed", <br />
            "opt_in_level": "single_opt_in", <br />
            "consent_updated_at": "2023-04-16T01:45:27-07:00" <br />
            &#125;
            <br />
            &#123;
            <br />
            "sms_marketing_consent": null, <br />
            "tags": "packageper_40, package_250, subscribe_team", <br />
            "currency": "USD", <br />
            "accepts_marketing_updated_at": "2023-04-16T01:45:27-07:00",
            <br />
            "marketing_opt_in_level": "single_opt_in", <br />
            "tax_exemptions": [], <br />
            "admin_graphql_api_id":
            "gid://shopify/Customer/6232622891113",
            <br />
            "default_address": &#123; <br />
            "id": 8262169165929,
            <br />
            "customer_id": 6232622891113, <br />
            "first_name": "Hiteshi", <br />
            "last_name": "Sharma",
            <br />
            "company": null, <br />
            "address1": "ewfefwf", <br />
            "address2": null, <br />
            "city": "wwwwew",
            <br />
            "province": "Florida",
            <br />
            "country": "United States", <br />
            "zip": "32030", <br />
            "phone": null, <br />
            "name": "Hiteshi Sharma", <br />
            "province_code": "FL",
            <br />
            "country_code": "US", <br />
            "country_name": "United States", <br />
            "default": true <br />
            &#125;
            <br />
            &#123;
            <br />
            "discount_applications": [ <br />
            "target_type": "line_item", <br />
            "type": "manual",
            <br />
            "value": "3.25",
            <br />
            "value_type": "fixed_amount",
            <br />
            "allocation_method": "each",
            <br />
            "target_selection": "explicit",
            <br />
            "title": "Free",
            <br />
            "description": "Custom discount"
            <br />
            &#125;
            <br />
            &#123;
            <br />
            "target_type": "line_item",
            <br />
            "type": "manual", <br />
            "value": "3.25", <br />
            "value_type": "fixed_amount", <br />
            "allocation_method": "each",
            <br />
            "target_selection": "explicit", <br />
            "title": "Free", <br />
            "description": "Custom discount" <br />
            ],
            <br />
            &#125; "fulfillments": [], <br />
            "line_items": [ <br />
            &#123; "id": 13453403390057,
            <br />
            "admin_graphql_api_id":
            "gid://shopify/LineItem/13453403390057",
            <br />
            "fulfillable_quantity": 1,
            <br />
            "fulfillment_service": "manual", <br />
            "fulfillment_status": "restocked", <br />
            "gift_card": false,
            <br />
            "grams": 0,
            <br />
            "name": "Hello! - 1 -99", <br />
            "price": "3.25", <br />
            "price_set":
            <br />
            &#125;
            <br />
            "shop_money": &#123;
            <br />
            "amount": "3.25", <br />
            "currency_code": "USD" <br />
            &#123;
            <br />
            "presentment_money":
            <br />
            "amount": "3.25", <br />
            "currency_code": "USD" <br />
            &#123;
            <br />
            "product_exists": true, <br />
            "product_id": 4372540522601, <br />
            "properties": [ <br />
            &#125; <br />
            "name": "custom_message", <br />
            "value": "644d0a0c30f2731dc68f7ec0" <br />
            &#125; <br />
            &#123; <br />
            "name": "font_selection", <br />
            "value": "Tarzan" <br />
            &#125;
            <br />
            &#123;
            <br />
            "name": "recipient_upload", <br />
            "value":
            "https://simply-noted-recipients.s3.amazonaws.com/643bb5a900870f1f2478dc69_1695703154110.csv"
            <br />
            &#123;
            <br />
            "name": "sender_fullName", <br />
            "value": "John Doe"
            <br />
            &#125;
            <br />
            &#123;
            <br />
            "name": "sender_address1", <br />
            "value": "123 Main St" <br />
            &#125; <br />
            &#123; <br />
            "name": "sender_address2", <br />
            "value": "Apt 101" <br />
            &#125;
            <br />
            &#123;
            <br />
            "name": "sender_city",
            <br />
            "value": "New York" <br />
            &#125;
            <br /> &#123;
            <br />
            "name": "sender_state",
            <br />
            "value": "NY" <br />
            &#125;
            <br />
            &#123;
            <br />
            "name": "sender_zip",
            <br />
            "value": "10001" <br />
            &#125;
            <br />
            &#123;
            <br />
            "name": "sender_country",
            <br />
            "value": "USA" <br />
            &#125;
            <br />
            &#123;
            <br />
            "name": "recipient_fullName", <br />
            "value": "Er. Toshita" <br />
            &#125;
            <br />
            &#123;
            <br />
            "name": "recipient_businessName", <br />
            "value": "test" <br />
            &#125;
            <br />
            &#123;
            <br />
            "name": "recipient_address1", <br />
            "value": "test" <br />
            &#125; <br />
            &#123;
            <br />
            "name": "recipient_address2", <br />
            "value": "test" <br />
            &#125;
            <br />
            &#123;
            <br />
            "name": "recipient_city", <br />
            "value": "test" <br />
            &#125;
            <br />
            &#123; <br />
            "name": "recipient_state", <br />
            "value": "J&K" <br />
            &#125; <br />
            &#123;
            <br />
            "name": "recipient_zip", <br />
            "value": "111111" <br />
            &#125;
            <br />
            &#123;
            <br />
            "name": "recipient_country", <br />
            "value": "India" <br />
            &#125; <br />
            &#123;
            <br />
            "name": "custom_pdf", <br />
            "value": "Not Applicable" <br />
            &#125; <br />
            &#123;
            <br />
            "quantity": 1, "requires_shipping": false, "sku": null,
            "taxable": false, "title": "Hello!", "total_discount": "3.25",
            "total_discount_set": &#125;
            <br />
            &#123;
            <br />
            "shop_money": "amount": "3.25", "currency_code": "USD" &#125;
            <br />
            &#123;
            <br />
            "presentment_money": "amount": "3.25", "currency_code": "USD"
            <br />
            &#125; &#123;
            <br />
            "variant_id": 40699956887657, "variant_inventory_management":
            null, "variant_title": "1 -99", "vendor": "SimplyNoted",
            "tax_lines": [], "duties": [], "discount_allocations": &#125;
            <br />
            [<br />
            &#123;
            <br />
            "amount": "3.25", "amount_set": &#125;
            <br />
            &#123;
            <br />
            "shop_money":
            <br />
            &#123;
            <br />
            "amount": "3.25", "currency_code": "USD" <br />
            &#125;
            <br />
            &#123;
            <br />
            "presentment_money":
            <br />
            &#123;
            <br />
            "amount": "3.25", "currency_code": "USD"
            <br />
            &#125;
            <br />
            &#123;
            <br />
            "discount_application_index": 0 &#125;
            <br />
            ] <br />
            &#123;
            <br />
            "id": 13453403422825, <br />
            "admin_graphql_api_id":
            "gid://shopify/LineItem/13453403422825",
            <br />
            "fulfillable_quantity": 1, <br />
            "fulfillment_service": "manual", <br />
            "fulfillment_status": "restocked", <br />
            "gift_card": false, <br />
            "grams": 0, <br />
            "name": "Postage - Non-US", <br />
            "price": "1.50", <br />
            "price_set":
            <br />
            &#123; <br />
            "shop_money":
            <br /> &#125; <br />
            "amount": "1.50", <br />
            "currency_code": "USD" <br />
            &#123;
            <br />
            "presentment_money": &#123;
            <br />
            "amount": "1.50", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            &#125;
            <br />
            &#123;
            <br />
            "product_exists": true, <br />
            "product_id": 7032044912745, <br />
            "properties": [], <br />
            "quantity": 1, <br />
            "requires_shipping": true, <br />
            "sku": "", <br />
            "taxable": true, <br />
            "title": "Postage", <br />
            "total_discount": "1.50", <br />
            "total_discount_set":
            <br />
            &125;
            <br />
            "shop_money":&123;
            <br />
            "amount": "1.50",
            <br />
            "currency_code": "USD" <br />
            &125;
            <br />
            "presentment_money":&123;
            <br />
            "amount": "1.50", <br />
            "currency_code": "USD" <br />
            &125;
            <br />
            &123;
            <br />
            "variant_id": 40677547802729, <br />
            "variant_inventory_management": null, <br />
            "variant_title": "Non-US", <br />
            "vendor": "simply-noted", <br />
            "tax_lines": [], <br />
            "duties": [], <br />
            "discount_allocations": [ <br />
            &125;
            <br />
            &123;
            <br />
            "amount": "1.50", <br />
            "amount_set": &#123;
            <br />
            "shop_money":&#125; <br />
            &123;
            <br />
            "amount": "1.50",
            <br />
            "currency_code": "USD" v<br />
            &3125;
            <br />
            "presentment_money":&#123;
            <br />
            "amount": "1.50",
            <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            &#123; "discount_application_index": 1 <br />
            &#125; ] <br />
            &#123; <br />
            "id": 13453403455593, <br />
            "admin_graphql_api_id":
            "gid://shopify/LineItem/13453403455593",
            <br />
            "fulfillable_quantity": 1, <br />
            "fulfillment_service": "manual", <br />
            "fulfillment_status": "restocked", <br />
            "gift_card": false, <br />
            "grams": 0, <br />
            "name": "Amazon Gift Card - $10 for $12.95", <br />
            "price": "12.95", <br />
            "price_set": &#123;
            <br />
            "shop_money":&#123;
            <br />
            "amount": "12.95", <br />
            "currency_code": "USD"
            <br />
            &#125;
            <br />
            "presentment_money":
            <br />
            &#123;
            <br />
            "amount": "12.95", <br />
            "currency_code": "USD" <br />
            &#125;
            <br />
            &#123; "product_exists": true, <br />
            "product_id": 6661817729129, <br />
            "properties": [ <br />
            &#125;
            <br />
          </pre> */}
    </div>
  </div>
  )
}

export default Orders
import Modal from 'react-modal';
import {ImCross} from 'react-icons/im';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    // width: '100%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%', // Add your desired width here
    maxHeight: '70vh',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: '50'
  },
};

function Instruction({
  isOpen,
  closeModal,
  title,
  close = false,
  button = false,
  instructions,
  table,
  image,
  body,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
      contentLabel="CSV Instruction Modal"
      ariaHideApp={false}
    >
      <div className="">
        <div className="relative">
          {/* {close && (
            <span
              className="absolute cursor-pointer !leading-[0] right-[10px] text-[40px]"
              onClick={closeModal}
            >
              &times;
            </span>
          )} */}
          {close && (
           <div className="absolute top-[35px] right-[1px] top-[36px] sm:block">
                    <span
                      onClick={closeModal}
                      className="transition text-primary "
                    >
                      <ImCross className="md:mr-[-12px] mr-[-16px] mt-[-51px] text-white text-[22px] p-[5px] bg-[#EF6E6E]" />
                    </span>
                  </div>
          )}
          {image && (
            <div className="flex justify-center">
              <img
                className="w-[15%]"
                src="https://100dayscss.com/codepen/alert.png"
              />
            </div>
          )}
          {title && (
            <h2 className="text-gray-500 font-bold sm:text-3xl text-2xl text-center p-[15px]">
              {title}
            </h2>
          )}
          <div className="flex justify-center">
            {button && (
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 hover:bg-#ef6e6e-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                style={{width: '100%'}}
              >
                Close
              </button>
            )}
          </div>
          <div className="w-full">{body}</div>
          <p className="!text-[#000] font-medium text-[14px]  leading-[160%]">
            {instructions &&
              instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
          </p>{table &&
          <div className="bg-white mt-20 text-black rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead className="bg-blue-800 text-black">
                    <tr className="text-left bg-gray-200">
                      <th className="border border-solid border-black py-2 px-4 font-bold">
                        Field Name
                      </th>
                      <th className="border border-solid border-black py-2 px-4 font-bold">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-solid border-black py-2 px-4">
                        Type*
                      </td>
                      <td className="border border-solid border-black py-2 px-4">
                        “Sender” or “Recipient”
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-solid border-black py-2 px-4">
                        <tr>
                          <td className="border border-solid border-black py-2 px-4">
                            First Name*
                          </td>
                          <td className="border border-solid border-black py-2 px-4">
                            Text
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-solid border-black py-2 px-4">
                            Last Name*
                          </td>
                          <td className="border border-solid border-black py-2 px-4">
                            Text
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-solid border-black py-2 px-4">
                            Address*
                          </td>
                          <td className="border border-solid border-black py-2 px-4">
                            Numbers + Text
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-solid border-black py-2 px-4">
                            Address 2
                          </td>
                          <td className="border border-solid border-black py-2 px-4">
                            Numbers + Text
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-solid border-black py-2 px-4"></td>
                          <td className="border border-solid border-black py-2 px-4">
                            Text
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-solid border-black py-2 px-4">
                            State/Province*
                          </td>
                          <td className="border border-solid border-black py-2 px-4">
                            Please use full names for US States (E.g.,
                            California, not CA)
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-solid border-black py-2 px-4">
                            Postal Code*
                          </td>
                          <td className="border border-solid border-black py-2 px-4">
                            For US addresses, 5 digits are required. For non-US
                            addresses, any postal code may be used.
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-solid border-black py-2 px-4">
                            Country*
                          </td>
                          <td className="border border-solid border-black py-2 px-4">
                            If no country is provided, USA is assumed. USA, US,
                            U.S., U.S.A, United States, and United States of
                            America are all acceptable for US addresses. US
                            postage rates apply for US addresses. Non-US postage
                            rates apply for all other countries.
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-solid border-black py-2 px-4">
                            Phone
                          </td>
                          <td className="border border-solid border-black py-2 px-4">
                            E.g., (801) 444-4444 or 999.222.2222
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-solid border-black py-2 px-4">
                            Email
                          </td>
                          <td className="border border-solid border-black py-2 px-4">
                            name@company.com
                          </td>
                        </tr>
                        Company
                      </td>
                      <td className="border border-solid border-black py-2 px-4">
                        Text
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-solid border-black py-2 px-4">
                        Anniversary
                      </td>
                      <td className="border border-solid border-black py-2 px-4">
                        May be used for anniversary card automation. Format as
                        MM/DD/YYYY - e.g., 05/20/1990
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-solid border-black py-2 px-4">
                        Custom 1
                      </td>
                      <td className="border border-solid border-black py-2 px-4">
                        Text
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>}
        </div>
      </div>
    </Modal>
  );
}

export default Instruction;

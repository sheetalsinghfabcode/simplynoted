import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '100%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%', // Add your desired width here
    maxHeight:'70vh'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};

function Instruction({isOpen, closeModal,title,instructions,table,body}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
      contentLabel="CSV Instruction Modal"
    >
      <div className="relative">
        <span
          className="absolute cursor-pointer !leading-[0] right-[10px] top-[20px]  text-[40px]"
          onClick={closeModal}
        >
          &times;
        </span>
        <h2 className="text-[#001a5f] font-bold text-[30px] text-center mb-4">
        {title}
        </h2>
        <div className='w-full'>
          {body}
        </div>
        <p className="!text-[#000] font-medium text-[14px] font-medium leading-[160%]">
        {instructions && instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </p>
        <div className="bg-white   mt-[20px] text-black overflow-popup rounded-lg overflow-hidden">
          {table &&
          <table className="w-full font-medium text-[14px] text-[#000] px-[10x]">
            <thead clasName="">
              <tr className="text-left">
                <th className="border border-solid border-black py-2 px-4">
                  Field Name
                </th>
                <th className="border border-solid border-black py-2 px-4">
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
                  Please use full names for US States (E.g., California, not CA)
                </td>
              </tr>
              <tr>
                <td className="border border-solid border-black py-2 px-4">
                  Postal Code*
                </td>
                <td className="border border-solid border-black py-2 px-4">
                  For US addresses, 5 digits are required. For non-US addresses,
                  any postal code may be used.
                </td>
              </tr>
              <tr>
                <td className="border border-solid border-black py-2 px-4">
                  Country*
                </td>
                <td className="border border-solid border-black py-2 px-4">
                  If no country is provided, USA is assumed. USA, US, U.S.,
                  U.S.A, United States, and United States of America are all
                  acceptable for US addresses. US postage rates apply for US
                  addresses. Non-US postage rates apply for all other countries.
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
              <tr>
                <td className="border border-solid border-black py-2 px-4">
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
          </table>}
        </div>
      </div>
    </Modal>
  );
}

export default Instruction;

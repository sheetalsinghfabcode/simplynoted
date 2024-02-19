import CircularLoader from '../CircularLoder';
import StripeCardComp from '../StripeCardComp';
import StripeCard from '../wallet/StripeCard';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import location from 'location.json';
import {useState, useEffect} from 'react';

const StripeModal = ({
  loader,
  show,
  onCancel,
  title,
  savedCard,
  StripeKey,
  addCreditModal,
  handlePurchaseCard,
  updateCard,
  formData,
  setFormData,
}) => {
  const stripe = loadStripe(`${StripeKey}`);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fullName = localStorage.getItem('SNFullName');
    const userEmail = localStorage.getItem('SnEmail');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    formData.name = fullName ? fullName : firstName + ' ' + lastName;
    formData.email = userEmail;
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;

    // Validation for state and city fields
    if (name === 'address.state' && value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'State is required.',
      }));
    } else if (name === 'address.city' && value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'City is required.',
      }));
    } else {
      // Clear error if the field is filled
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }

    // Update form data based on field name
    if (name.startsWith('address.')) {
      // If the name starts with 'address.', it's part of the address object
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name.substring(8)]: value,
        },
        // paymentMethodId: paymentMethodId ? paymentMethodId : '',
      }));
    } else {
      // It's not part of the address object, update it directly
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const selectedCountry = location.countries.find(
    (country) => country.country === formData.address.country,
  );

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed inset-0 overflow-y-auto flex items-center justify-center z-50`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="modal-container p-[15px] relative bg-[#fff6f6] w-full max-w-[80%]  md:max-w-[500px] mx-auto rounded shadow-lg z-50 rounded-[10px] overflow-y-auto">
        <span
          className="absolute cursor-pointer !leading-[0] right-[10px] top-[20px]  text-[40px]"
          onClick={onCancel}
        >
          &times;
        </span>
        <div className="modal-content py-4   px-6 h-[395px]">
          <div className="modal-header">
            <h3 className="md:text-[29px] text-[20px] text-center leading-[1.4] w-full max-w-[418px] mx-auto text-[#001a5f] font-semibold">
              {title}
            </h3>
          </div>
          <div className="modal-body h-240px mt-[12px]">
            {loader && (
              <div className="flex items-center justify-center">
                <div className="absolute inset-0 bg-white opacity-50 z-40"></div>
                <div className="z-50">
                  <CircularLoader color="#ef6e6e" />
                </div>
              </div>
            )}

            {!savedCard && (
              <div className="w-[100%] border border-solid border-black p-3 mt-3">
                <div className="grid-rows-2  grid gap-3">
                  <div>
                    <label className='font-bold' htmlFor="">Full Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="name"
                      disabled
                      // placeholder="FullName"
                      value={formData.name}
                      onChange={(e) => handleChange(e)}
                      className="mt-2 border border-solid border-black p-3 w-[100%]"
                    />
                  </div>
                  <div>
                    <label className='font-bold' htmlFor="">Email</label>
                    <input
                      id="email"
                      disabled
                      name="email"
                      type="text"
                      //  placeholder="email"
                      value={formData.email}
                      onChange={(e) => handleChange(e)}
                      className="mt-2 border border-solid border-black p-3 w-[100%]"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="font-bold" htmlFor="">
                    Address
                  </label>
                  <input
                    id="address1"
                    name="address.line1"
                    type="text"
                    placeholder="Address"
                    required
                    value={formData.address.line1}
                    onChange={(e) => handleChange(e)}
                    className="mt-2 border border-solid border-black p-3 w-[100%]"
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="" className="font-bold">
                    Apartment,suite,etc
                  </label>
                  <input
                    id="address2"
                    name="address.line2"
                    type="text"
                    placeholder="Address 2"
                    value={formData.address.line2}
                    onChange={(e) => handleChange(e)}
                    className="mt-2 border border-solid border-black p-3 w-[100%]"
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="" className="font-bold">
                    City
                  </label>
                  <input
                    id="city"
                    name="address.city"
                    type="text"
                    required
                    placeholder="City"
                    value={formData.address.city}
                    onChange={(e) => handleChange(e)}
                    className="mt-2 border border-solid border-black p-3 w-[100%]"
                  />
                  {errors['address.city'] && (
                    <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                      {errors['address.city']}
                    </p>
                  )}
                </div>
                <div className="md:flex grid md:gap-[35px] gap-0 mt-[8px]">
                  <div className="w-full">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <select
                      onChange={(e) => handleChange(e)}
                      value={formData.address.country}
                      itemID="country"
                      name="address.country"
                      id="country"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      {location.countries.map((country) => (
                        <option key={country.country} value={country.country}>
                          {country.country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-gray-700  font-bold mb-2"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <select
                      onChange={(e) => handleChange(e)}
                      value={formData.address.state}
                      name="address.state"
                      className={`appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${
                        errors.state ? 'border-red-500' : ''
                      }`}
                      id="state"
                    >
                      <option value="">Select a state</option>
                      {selectedCountry &&
                        selectedCountry.states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                    {errors['address.state'] && (
                      <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                        {errors['address.state']}
                      </p>
                    )}
                  </div>
                </div>
                <Elements stripe={stripe}>
                  <StripeCard
                    updateCard={updateCard}
                    handlePurchaseCard={handlePurchaseCard}
                    addCreditModal={addCreditModal}
                  />
                </Elements>
              </div>
            )}
            <p className="text-[20px] w-full max-w-[600px] mx-auto text-center leading-[1.4] text-[#001a5f] font-semibold"></p>
          </div>
          <div className="modal-footer w-full flex justify-center items-center gap-[12px] mt-[20px]"></div>
        </div>
      </div>
    </div>
  );
};

export default StripeModal;

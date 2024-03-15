import CircularLoader from '../CircularLoder';
import StripeCardComp from '../StripeCardComp';
import StripeCard from '../wallet/StripeCard';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import location from 'location.json';
import {useState, useEffect} from 'react';
import {ImCross} from 'react-icons/im';

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

  useEffect(() => {
    const fullName = localStorage.getItem('SNFullName');
    const userEmail = localStorage.getItem('SnEmail');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    formData.name = fullName ? fullName : firstName + ' ' + lastName;
    formData.email = userEmail;
  }, []);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email)) {
      newErrors.email = 'Email is required and must be valid';
      isValid = false;
    }

    // Validate address
    if (!formData.address.line1.trim()) {
      newErrors['address.line1'] = 'Address is required';
      isValid = false;
    }
    if (!formData.address.city.trim()) {
      newErrors['address.city'] = 'City is required';
      isValid = false;
    }
    if (!formData.address.country.trim()) {
      newErrors['address.country'] = 'Country is required';
      isValid = false;
    }
    if (!formData.address.state.trim()) {
      newErrors['address.state'] = 'State is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      const firstErrorField = Object.keys(newErrors)[0];
      const firstErrorElement = document.getElementById(firstErrorField);
      if (firstErrorElement) {
        firstErrorElement.focus();
      }
    }

    return isValid;
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    let updatedErrors = {...errors};

    if (name === 'address.state' && value.trim() === '') {
      updatedErrors = {
        ...updatedErrors,
        [name]: 'State is required.',
      };
    } else if (name === 'address.city' && value.trim() === '') {
      updatedErrors = {
        ...updatedErrors,
        [name]: 'City is required.',
      };
    } else {
      delete updatedErrors[name]; // Clear error if the field is filled
    }

    setErrors(updatedErrors);

    if (name.startsWith('address.')) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name.substring(8)]: value,
        },
      }));
    } else {
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
      } fixed inset-0 webkite flex items-center justify-center z-50`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="modal-container py-[15px] px-[24px]  relative bg-[white] w-full max-w-[93%] max-h-[90%]  md:max-w-[568px] mx-auto rounded shadow-lg shadow-lg z-50 overflow-auto">
        <div className="absolute top-[35px] right-0  pr-8 sm:block">
          <button onClick={onCancel} className="transition text-primary ">
            <ImCross className="md:mr-[-12px] mr-[-16px] mt-[-34px] text-white text-[22px] p-[5px] bg-[#EF6E6E]" />
          </button>
        </div>
        <div className="modal-content p ">
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

            <>
              <div className="w-[100%] mt-3">
                {!savedCard && (
                  <div className="mb-11">
                    <div className="grid-rows-2  grid gap-3">
                      <div>
                        <label className="font-bold" htmlFor="">
                          Full Name
                        </label>
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
                        <label className="font-bold" htmlFor="">
                          Email
                        </label>
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
                    <div className="mt-[11px]">
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
                      {errors['address.line1'] && (
                        <p className="text-red-500 mt-2 text-14 font-semibold italic">
                          {errors['address.line1']}
                        </p>
                      )}
                    </div>
                    <div className="mt-[11px]">
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
                    <div className="mt-[11px]">
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
                        className="mt-2 border border-solid h-[46px] border-black p-3 w-[100%]"
                      />
                      {errors['address.city'] && (
                        <p className="text-red-500 mt-2 text-14 font-semibold italic">
                          {errors['address.city']}
                        </p>
                      )}
                    </div>
                    <div className="md:flex grid md:gap-[35px] gap-0 mt-[11px]">
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
                          className="appearance-none border border-black h-[46px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          {location.countries.map((country) => (
                            <option
                              key={country.country}
                              value={country.country}
                            >
                              {country.country}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-full md:mt-[0px] mt-[11px]">
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
                          className={`appearance-none border border-black h-[46px] w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${
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
                          <p className="text-red-500 mt-2 text-14 font-semibold italic">
                            {errors['address.state']}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <Elements stripe={stripe}>
                  <StripeCard
                    onCancel={onCancel}
                    updateCard={updateCard}
                    validateForm={validateForm}
                    handlePurchaseCard={handlePurchaseCard}
                    addCreditModal={addCreditModal}
                  />
                </Elements>
              </div>
            </>
            <p className="text-[20px] w-full max-w-[600px] mx-auto text-center leading-[1.4] text-[#001a5f] font-semibold"></p>
          </div>
          <div className="modal-footer w-full flex justify-center items-center gap-[12px] mt-[20px]"></div>
        </div>
      </div>
    </div>
  );
};

export default StripeModal;

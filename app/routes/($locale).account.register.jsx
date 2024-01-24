import {redirect, json} from '@shopify/remix-oxygen';
import {Form, useActionData} from '@remix-run/react';
import {useState} from 'react';

import {getInputStyleClasses} from '~/lib/utils';
import {Link} from '~/components';

import {doLogin} from './($locale).account.login';

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (customerAccessToken) {
    return redirect(params.locale ? `${params.locale}/account` : '/account');
  }

  return new Response(null);
}

const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context, params}) => {
  const {session, storefront} = context;
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');
  const firstName = formData.get('name');
  const lastName = formData.get('last Name');

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    typeof email !== 'string' ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof password !== 'string'
  ) {
    return badRequest({
      formError: 'Please provide all the fields.',
    });
  }

  try {
    const data = await storefront.mutate(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input: {email, password, firstName, lastName},
      },
    });

    if (!data?.customerCreate?.customer?.id) {
      /**
       * Something is wrong with the user's input.
       */
      throw new Error(data?.customerCreate?.customerUserErrors.join(', '));
    }

    const customerAccessToken = await doLogin(context, {email, password});
    session.set('customerAccessToken', customerAccessToken);

    return redirect(params.locale ? `${params.locale}/account` : '/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    if (storefront.isApiError(error)) {
      return badRequest({
        formError: 'Something went wrong. Please try again later.',
      });
    }

    /**
     * The user did something wrong, but the raw error from the API is not super friendly.
     * Let's make one up.
     */
    return badRequest({
      formError:
        'Sorry. We could not create an account with this email. User might already exist, try to login instead.',
    });
  }
};

export const meta = () => {
  return [{title: 'Register'}];
};

export default function Register() {
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const [nativeFirstNameError, setNativeFirstNameError] = useState(null);
  const [nativeLastNameError, setNativeLastNameError] = useState(null);
  const [nativePasswordError, setNativePasswordError] = useState(null);

  return (
    <div className="flex justify-center sm:mt-12 mt-4 mb-24 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl block text-blue-900 text-2xl">
          Create an Account.
        </h1>
        <img
          className="w-64 mt-3"
          src="https://simplynoted.com/cdn/shop/files/underline-2-img.png"
        />
        {/* TODO: Add onSubmit to validate _before_ submission with native? */}
        <Form
          method="post"
          noValidate
          className="pt-6 pb-8 mt-4 mb-[-175px] space-y-3"
        >
          {actionData?.formError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">{actionData.formError}</p>
            </div>
          )}
          <div>
            <input
              className={`mb-1 h-12 ${getInputStyleClasses(nativeEmailError)}`}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter Email"
              aria-label="Email address"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onBlur={(event) => {
                setNativeEmailError(
                  event.currentTarget.value.length &&
                    !event.currentTarget.validity.valid
                    ? 'Invalid email address'
                    : null,
                );
              }}
            />
            {nativeEmailError && (
              <p className="text-red-500 text-xs">{nativeEmailError} &nbsp;</p>
            )}
          </div>
          <div>
            <input
              className={`mb-1 h-12 ${getInputStyleClasses(
                nativeFirstNameError,
              )}`}
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              required
              placeholder="Enter First Name"
              aria-label="First Name"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onBlur={(event) => {
                setNativeFirstNameError(
                  event.currentTarget.value.length &&
                    !event.currentTarget.validity.valid
                    ? 'Please Enter First Name'
                    : null,
                );
              }}
            />
            {nativeFirstNameError && (
              <p className="text-red-500 text-xs">
                {nativeFirstNameError} &nbsp;
              </p>
            )}
          </div>
          <div>
            <input
              className={`mb-1 h-12 ${getInputStyleClasses(
                nativeLastNameError,
              )}`}
              id="last name"
              name="last Name"
              type="name"
              autoComplete="last Name"
              required
              placeholder="Enter Last Name"
              aria-label="Last Name"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onBlur={(event) => {
                setNativeLastNameError(
                  event.currentTarget.value.length &&
                    !event.currentTarget.validity.valid
                    ? 'Please Enter Last Name'
                    : null,
                );
              }}
            />
            {nativeLastNameError && (
              <p className="text-red-500 text-xs">
                {nativeLastNameError} &nbsp;
              </p>
            )}
          </div>
          <div>
            <input
              className={`mb-1 h-12 ${getInputStyleClasses(
                nativePasswordError,
              )}`}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter Password"
              aria-label="Password"
              minLength={8}
              required
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onBlur={(event) => {
                if (
                  event.currentTarget.validity.valid ||
                  !event.currentTarget.value.length
                ) {
                  setNativePasswordError(null);
                } else {
                  setNativePasswordError(
                    event.currentTarget.validity.valueMissing
                      ? 'Please enter a password'
                      : 'Passwords must be at least 8 characters',
                  );
                }
              }}
            />
            {nativePasswordError && (
              <p className="text-red-500 text-xs">
                {' '}
                {nativePasswordError} &nbsp;
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className=" shadow-custom  shadow-lg h-12  text-contrast  py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
              disabled={
                !!(
                  nativePasswordError ||
                  nativeEmailError ||
                  nativeFirstNameError ||
                  nativeLastNameError
                )
              }
            >
              Create Account
            </button>
          </div>
          <div className="flex items-center mt-8 border-t border-gray-300">
            <p className="align-baseline text-sm mt-6">
              Already have an account? &nbsp;
              <Link className="inline underline" to="/account/login">
                Sign in
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
       
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

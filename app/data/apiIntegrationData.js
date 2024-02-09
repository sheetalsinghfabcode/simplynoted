export const ExposedAPIs = [
  {
    name: 'API ENDPOINTS',
    methods: [],
  },
  {
    name: 'AUTHENTICATION',
    methods: [
      {
        title: 'Retrieve Auth Token',
      },
    ],
  },
  {
    name: 'USERS',
    methods: [
      {
        title: 'Create A User',
      },
    ],
  },
];

export const ExposedAPIsResponse = {
  products: {
    getStandardCardsResponse: {
      result: [
        {
          id: 4392451768425,
          title: 'Cactus Thank you',
          image:
            'https://cdn.shopify.com/s/files/1/0275/6457/2777/products/Cactus-Thank-You.jpg?v=1574659292',
        },
        {
          id: 4392452522089,
          title: 'Cactus Thanks So Much',
          image:
            'https://cdn.shopify.com/s/files/1/0275/6457/2777/products/Cactus-Thanks-So-Much.jpg?v=1574659363',
        },
        {
          id: 4442013139049,
          title: 'Dark Red Holiday Card',
          image:
            'https://cdn.shopify.com/s/files/1/0275/6457/2777/products/Red.HolidayCard.jpg?v=1576524937',
        },
      ],
      errors: [],
    },
    getAllCustomCardsResponse: {
      result: {
        products: [
          {
            id: 7050968727657,
            title: 'double click',
            image:
              'https://cdn.shopify.com/s/files/1/0275/6457/2777/products/1696329730810.png?v=1696329732',
            type: 'customisable card',
            createdAt: '2023-10-03T03:42:12-07:00',
            updatedAt: '2023-10-03T03:42:13-07:00',
          },
        ],
        nextOffset: 200,
        moreProducts: true,
      },
      errors: [],
    },
    createCustomCard: {
      result: {
        product: {
          id: 7046027575401,
          title: 'Testing Cards',
          body_html: null,
          vendor: 'SimplyNoted',
          product_type: 'customisable card',
          created_at: '2023-09-13T06:22:28-07:00',
          handle: 'testing-cards',
          updated_at: '2023-09-13T06:22:29-07:00',
          published_at: '2023-09-13T06:22:28-07:00',
          template_suffix: null,
          published_scope: 'web',
          tags: 'customise_card',
          status: 'active',
          admin_graphql_api_id: 'gid://shopify/Product/7046027575401',
          images: [
            {
              id: 30856642232425,
              product_id: 7046027575401,
              position: 1,
              created_at: '2023-09-13T06:22:28-07:00',
              updated_at: '2023-09-13T06:22:28-07:00',
              alt: 'front_img',
              width: 495,
              height: 350,
              src: 'https://cdn.shopify.com/s/files/1/0275/6457/2777/products/1694611344453.jpg?v=1694611348',
              variant_ids: [],
              admin_graphql_api_id: 'gid://shopify/ProductImage/30856642232425',
            },
          ],
          image: {
            id: 30856642232425,
            product_id: 7046027575401,
            position: 1,
            created_at: '2023-09-13T06:22:28-07:00',
            updated_at: '2023-09-13T06:22:28-07:00',
            alt: 'front_img',
            width: 495,
            height: 350,
            src: 'https://cdn.shopify.com/s/files/1/0275/6457/2777/products/1694611344453.jpg?v=1694611348',
            variant_ids: [],
            admin_graphql_api_id: 'gid://shopify/ProductImage/30856642232425',
          },
        },
      },
      errors: [],
    },
    createCustomCard1: {
      cardName: 'Happy Birthday',
      cardType: 'flat5x7',
      frontImage: '1',
      isHeaderIncluded: true,
      isFooterIncluded: true,
      header: {
        isImage: true,
      },

      footer: {
        data: 'Yours Sincerely',
        textAlign: 'left',
        justifyContent: 'center',
        flexDirection: 'column',
        fontType: 'Trebuchet MS',
        fontSize: 20,
        fontColor: 'rgb(0, 0, 255)',
        zoom: '1',
        isImage: false,
      },

      headerImage: '',
      footerImage: '',
      backImage: '',
    },
    modifyCustomCard: {
      result: {
        product: {
          id: 7046027575401,
          title: 'Testing Cards',
          body_html: null,
          vendor: 'SimplyNoted',
          product_type: 'customisable card',
          created_at: '2023-09-13T06:22:28-07:00',
          handle: 'testing-cards',
          updated_at: '2023-09-13T06:22:29-07:00',
          published_at: '2023-09-13T06:22:28-07:00',
          template_suffix: null,
          published_scope: 'web',
          tags: 'customise_card',
          status: 'active',
          admin_graphql_api_id: 'gid://shopify/Product/7046027575401',
          variants: [
            {
              id: 40730910490729,
              product_id: 7046027575401,
              title: '2 - 500',
              // other variant fields
            },
            {
              id: 40730910523497,
              product_id: 7046027575401,
              created_at: '2023-09-13T06:22:28-07:00',
              updated_at: '2023-09-13T06:22:28-07:00',
              inventory_item_id: 42829245415529,
              admin_graphql_api_id:
                'gid://shopify/ProductVariant/40730910523497',
            },
            {
              id: 40730910556265,
              product_id: 7046027575401,
              // incomplete variant, please provide the necessary fields
            },
          ],
        },
      },
      errors: [],
    },
    modifyCustomCard1: {
      cardName: 'Happy Birthday Modified 1a',
      originalCustomCardID: '123123213123',
      isHeaderIncluded: true,
      isFooterIncluded: true,
      header: {
        isImage: true,
      },
      footer: {
        data: 'Yours Sincerely',
        textAlign: 'left',
        justifyContent: 'center',
        flexDirection: 'column',
        fontType: 'Trebuchet MS',
        fontSize: 20,
        fontColor: 'rgb(0, 0, 255)',
        zoom: '1',
        isImage: false,
      },
      headerImage: '',
      footerImage: '',
    },
    deleteCustomCard: {
      result: {
        successfulDeletions: ['7072904347753', '7073022279785'],
        failedDeletions: [123456789000],
      },

      errors: [],
    },
    createAnOrder: {
      result: 'Order created.',
      errors: [],
    },
    createAnOrder1: {
      productId: 'ID_OF_PRODUCT_YOU_ARE_ORDERING',
      handwritingStyle: 'Tarzan',
      customMessage: 'This is my custom message',
      signoff: 'Yours Sincerely',
      shippingDate: '',
      templateId: 'ID_OF_THE_TEMPLATE_YOU_WANT_TO_USE',
      recipientData: [
        {
          'First Name': 'John',
          'Last Name': 'Appleseed',
          Address: '123 S Street',
          'Address 2': '',
          City: 'Metropolis',
          State: 'Smallville',
          Zip: '12345',
          Phone: '+15555551234',
          Email: 'john@simplynoted.com',
          Company: 'ACME, Inc.',
          'Custom 1': '',
          'Custom 2': '',
          'Custom 3': '',
        },
      ],
    },
    getOrders: {
      nextOffset: 200,
      moreOrders: true,
      comment: [
        'IF moreOrders is true, then call the API again with the nextOffset value',
        'IF moreOrders is false, there are no further orders to fetch.',
      ],
    },
    templates: {
      result: {
        _id: '5e1b61a80d9234514cb1e983a',
        productId: '4460979552361',
        handwritingStyle: 'Tarzan',
        customMessage: 'This is my custom message',
        ownerId: '5e1a6f1d63458234017a962a3',
        updated: '2020-01-01T00:00:00.000Z',
        created: '2020-01-01T00:00:00.000Z',
        __v: 0,
      },

      errors: [],
    },
    templates1: {
      productId: '4460979552361',
      handwritingStyle: 'Tarzan',
      customMessage: 'This is my custom message',
    },
    messageTemplates: {
      result: [
        {
          _id: '5e1b5123fe1a7f10021c2b04',
          productId: '4460979552361',
          handwritingStyle: 'Tarzan',
          customMessage: 'This is my custom message',
          ownerId: '5e1a6f1d616d871237a962a3',
          updated: '2020-01-12T18:00:25.020Z',
          created: '2020-01-12T18:00:25.020Z',
          __v: 0,
        },
        {
          _id: '5e1b61a80d92f711231e983a',
          productId: '4460979552361',
          handwritingStyle: 'Tarzan',
          customMessage: 'This is my custom message 2',
          ownerId: '5e1a6f1d616d871237a962a3',
          updated: '2020-01-12T18:12:56.945Z',
          created: '2020-01-12T18:12:56.945Z',
          __v: 0,
        },
      ],
      errors: [],
    },
    singleTemplate: {
      result: {
        _id: '5e1b5123fe1a7f10021c2b04',
        productId: '4460979552361',
        handwritingStyle: 'Tarzan',
        customMessage: 'This is my custom message',
        ownerId: '5e1a6f1d616d871237a962a3',
        updated: '2020-01-12T18:00:25.020Z',
        created: '2020-01-12T18:00:25.020Z',
        __v: 0,
      },
      errors: [],
    },
    updateTemplate: {
      result: {
        productId: '4392452522089',
        handwritingStyle: 'Stitch',
        customMessage: 'This is my custom message',
      },
      errors: [],
    },
    updateTemplate1: {
      productId: '4392452522089',
      handwritingStyle: 'Stitch',
      customMessage: 'This is my custom message',
    },
    createAnAddress: {
      result: {
        _id: '5ea1101e9680607558e3ff77',
        firstName: 'Johnny',
        lastName: 'Appleseed',
        businessName: 'ACME Inc',
        address1: '123 S Maple Street',
        address2: 'Unit 123',
        city: 'Metropolis',
        state: 'Texas',
        zip: '12345',
        country: 'United States',
        type: 'return',
      },
      errors: [],
    },
    createAnAddress1: {
      firstName: 'Johnny',
      lastName: 'Appleseed',
      businessName: 'ACME Inc',
      address1: '123 S Maple Street',
      address2: 'Unit 123',
      city: 'Metropolis',
      state: 'Texas',
      zip: '12345',
      country: 'United States',
      type: 'return',
    },
    retriveAllAddresses: {
      result: [
        {
          _id: '5ea1101e9680607558e3ff77',
          firstName: 'Johnny',
          lastName: 'Appleseed',
          businessName: 'ACME Inc',
          address1: '123 S Maple Street',
          address2: 'Unit 123',
          city: 'Metropolis',
          state: 'Texas',
          zip: '12345',
          country: 'United States',
          type: 'return',
        },
      ],
      errors: [],
    },
    singleAddress: {
      result: {
        _id: '5ea1101e9680607558e3ff77',
        firstName: 'Johnny',
        lastName: 'Appleseed',
        businessName: 'ACME Inc',
        address1: '123 S Maple Street',
        address2: 'Unit 123',
        city: 'Metropolis',
        state: 'Texas',
        zip: '12345',
        country: 'United States',
        type: 'return',
      },
      errors: [],
    },
    updateAddress: {
      result: {
        _id: '5ea1101e9680607558e3ff77',
        firstName: 'Johnny',
        lastName: 'Appleseed',
        businessName: 'ACME Inc',
        address1: '123 S Maple Street',
        address2: 'Unit 123',
        city: 'Metropolis',
        state: 'Texas',
        zip: '12345',
        country: 'United States',
        type: 'return',
      },
      errors: [],
    },
    updateAddress1: {
      firstName: 'Johnny',
      lastName: 'Appleseed',
      businessName: 'ACME Inc',
      address1: '123 S Maple Street',
      address2: 'Unit 123',
      city: 'Metropolis',
      state: 'Texas',
      zip: '12345',
      country: 'United States',
      type: 'return',
    },
    deleteSingleAddress: {
      result: {
        deletedCount: 1,
      },
      errors: [],
    },
  },
};

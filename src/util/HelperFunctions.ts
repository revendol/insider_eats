class HelperFunctions {
  //
}

export default HelperFunctions;


const assistant = await client.beta.assistants.create({
  model: "gpt-4o",
  instructions: "You are a weather bot. Use the provided functions to answer questions.",
  tools: [
    {
      type: "function",
      function: {
        name: "parseOrderData",
        description: "Parse order data from a given string and output JSON",
        parameters: {
          type: "object",
          properties: {
            orderString: {
              type: "string",
              description: "The order data as a string",
            },
          },
          required: ["orderString"],
        },
        output: {
          type: "object",
          properties: {
            order: {
              type: "object",
              properties: {
                id: { type: "integer" },
                pickUpTime: { type: "string" },
                placedTime: { type: "string" },
                location: {
                  type: "object",
                  properties: {
                    storeNumber: { type: "string" },
                    address: { type: "string" },
                    phone: { type: "string" },
                  },
                },
                guest: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    phone: { type: "string" },
                  },
                },
                payment: {
                  type: "object",
                  properties: {
                    total: { type: "number" },
                    method: { type: "string" },
                    last4: { type: "string" },
                    authTime: { type: "string" },
                    balanceDue: { type: "string" },
                  },
                },
                comments: { type: "string" },
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      quantity: { type: "integer" },
                      price: { type: "number" },
                      total: { type: "number" },
                      comments: { type: "string" },
                    },
                  },
                },
                subtotal: { type: "number" },
                tip: { type: "number" },
                total: { type: "number" },
              },
            },
            productionSheet: {
              type: "object",
              properties: {
                orderNumber: { type: "integer" },
                pickUpTime: { type: "string" },
                customer: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    phone: { type: "string" },
                  },
                },
                comments: { type: "string" },
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      quantity: { type: "integer" },
                      size: { type: "string" },
                      package: { type: "string" },
                      comments: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  ],
});

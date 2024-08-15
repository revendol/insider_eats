// import OpenAI from 'openai';
import envVars from "@shared/env-vars";
import {IMessage, IResponse, IChoices, IToolCalls} from "@customType/controller/OpenAI";
import IOrder from "@customType/controller/Parser";
// const openai = new OpenAI({apiKey: envVars.openAI.apiKey});

class InsiderEatsService {
  sanitizeInput(input: string): string {
    return input.replace(/[\n\t\r]/g, ' ').replace(/\\/g, '\\\\').replace(/\"/g, '\\"');
  }

  async parse(data: string): Promise<IOrder | false> {
    const messages = [{ role: 'system', content: 'Parse order info in JSON from ' + data }];
    const tools = [
      {
        type: "function",
        function: {
          name: "parseOrderData",
          description: "Parse order info in JSON from given string.",
          parameters: {
            type: "object",
            properties: {
              order: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  orderType: { type: "string" },
                  chef: {
                    type: "object",
                    properties: {
                      name: {type: "string"},
                      nationality: {type: "string"}
                    }
                  },
                  pickUpTime: { type: "string" },
                  scheduleType: { type: "string" },
                  deliveryTime: { type: "string" },
                  placedTime: { type: "string" },
                  deliveryFrom: {
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
                      address: {type: "string" },
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
                  currency: { type: "string" },
                  tip: { type: "number" },
                  total: { type: "number" }
                },
              }
            },
            required: ["orderString"],
          },
        },
      },
    ];
    const requestData = JSON.stringify({
      model: 'gpt-4o',
      messages: messages,
      tools: tools,
      tool_choice: 'auto'
    });
    const options = {
      hostname: "api.openai.com",
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${envVars.openAI.apiKey}`, // Replace with your OpenAI API key
      },
    };
    const response : IResponse = await fetch(`https://${options.hostname}${options.path}`, {
      method: options.method,
      headers: options.headers,
      body: requestData,
    }).then((response) => response.json());
    const toolCalls : IToolCalls = response.choices[0].message.tool_calls[0];
    if(toolCalls.function.arguments){
      return JSON.parse(toolCalls.function.arguments).order;
    }
    return false;
  }

  
}

export default new InsiderEatsService();
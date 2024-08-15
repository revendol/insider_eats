import axios from 'axios';
import envVars from "@shared/env-vars";

class CloverRepo {
  // Create order
  async createOrder() {
    // const merchantId: string = 'NVGRDBS685NGM'; 
    const merchantId: string = 'RS6SR6XDC07C1'; 
    const accessToken: string = '48GXEJJWKYPBE:1de4fa75-d201-4629-5f39-bbb5d83790c7';
    //const accessToken: string = 'firsty:b728203f-3a3e-dd22-debe-38124ec7d6f4';
    const url = `https://sandbox.dev.clover.com/v3/merchants/${merchantId}/orders`;

    try {
      const response = await axios.post(
        url,
        { state: 'open' },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating order");
    }
  }
}

export default new CloverRepo();
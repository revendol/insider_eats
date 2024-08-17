// import axios from 'axios';
// import fs from 'fs';
// import puppeteer from 'puppeteer';
// import path from 'path';
// import FormData from 'form-data';
// import { Configuration } from '@alohi/faxplus-api';

// class FaxRepo {
//   async createAndSendPdf() {
//     const accessToken = ''; 
//     const clientId = ''; 
//     const userId = ''; 
    
//     const config = new Configuration({
//       accessToken: accessToken,
//       basePath: 'https://restapi.fax.plus/v3',
//       baseOptions: {
//         headers: {
//           "x-fax-clientid": clientId,
//         }
//       }
//     });

//     const filePath = path.join(__dirname, 'hello-world.pdf');

//     try {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.setContent('<h1>Hello World</h1>');
//       await page.pdf({ path: filePath, format: 'A4' });
//       await browser.close();

//       const formData = new FormData();
//       formData.append('format', 'pdf');
//       formData.append('userId', userId);
//       formData.append('faxFile', fs.createReadStream(filePath));

//       const response = await axios.post(
//         `${config.basePath}/files`, 
//         formData, 
//         {
//           headers: {
//             ...formData.getHeaders(),
//             "x-fax-clientid": clientId,
//             "Authorization": `Bearer ${accessToken}`,
//           }
//         }
//       );

//       console.log('Fax sent successfully:', response.data);
//     } catch (error) {
//       console.error('Error creating and sending PDF:', error);
//       throw new Error("Error creating and sending PDF");
//     } finally {
//       // Clean up: Remove the generated PDF file
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }
//     }
//   }
// }

// export default new FaxRepo();
///////////////////
import axios from 'axios';
import fs from 'fs';
import puppeteer from 'puppeteer';
import path from 'path';
import FormData from 'form-data';
import { Configuration } from '@alohi/faxplus-api';

class FaxRepo {
  async createAndSendPdf(parsedOrder: any) {
    const accessToken = '';
    const clientId = ''; 
    const userId = ''; 
    const recipientFaxNumber = '';
    
    const config = new Configuration({
      accessToken: accessToken,
      basePath: 'https://restapi.fax.plus/v3',
      baseOptions: {
        headers: {
          "x-fax-clientid": clientId,
        }
      }
    });
    const filePath = path.join(__dirname, 'insider-eats.pdf');
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const content = `
        <h1>Order Details</h1>
        <p><strong>Order Id:</strong> ${parsedOrder.order.id}</p>
        <p><strong>Guest Name:</strong> ${parsedOrder.guest.name}</p>
        <p><strong>Guest Name:</strong> ${parsedOrder.guest.name}</p>
      `;
      await page.setContent(content);
      await page.pdf({ path: filePath, format: 'A4' });
      await browser.close();

      const formData = new FormData();
      formData.append('fax_number', recipientFaxNumber); 
      formData.append('files', fs.createReadStream(filePath));
      formData.append('options', JSON.stringify({ resolution: 'high', retries: 3 }));
      
      const response = await axios.post(
        `${config.basePath}/accounts/${userId}/faxes`, 
        formData, 
        {
          headers: {
            ...formData.getHeaders(),
            "x-fax-clientid": clientId,
            "Authorization": `Bearer ${accessToken}`,
          }
        }
      );

      console.log('Fax sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending fax:', error);
      throw new Error("Error sending fax");
    } finally {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }
}

export default new FaxRepo();
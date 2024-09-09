import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import https from 'https';
import axios from 'axios';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // const city = event.queryStringParameters?.city || 'London';
    // // const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Reemplaza esto con tu clave de API de OpenWeather
    // curl --request GET \
	// --url https://weather-api-algobook.p.rapidapi.com/forecast/london \
	// --header 'x-rapidapi-host: weather-api-algobook.p.rapidapi.com' \
	// --header 'x-rapidapi-key: 602ffd8f18mshf57384c19f0af9ep1be829jsna03db079ccf
    // const url = `https://weather-api-algobook.p.rapidapi.com/forecast/${city}`;


    // return new Promise((resolve, reject) => {
    //     https.get(url, (resp) => {
    //         let data = '';

    //         resp.on('data', (chunk) => {
    //             data += chunk;
    //         });

    //         resp.on('end', () => {
    //             const weatherData = JSON.parse(data);
    //             const response: APIGatewayProxyResult = {
    //                 statusCode: 200,
    //                 body: JSON.stringify({
    //                     city: weatherData.name,
    //                     temperature: weatherData.main.temp,
    //                     description: weatherData.weather[0].description,
    //                 }),
    //             };
    //             resolve(response);
    //         });

    //     }).on('error', (err) => {
    //         const response: APIGatewayProxyResult = {
    //             statusCode: 500,
    //             body: JSON.stringify({ error: 'Error retrieving weather data' }),
    //         };
    //         reject(response);
    //     });
    // });

    try {
        const responseAxios = await axios.get('https://weather-api-algobook.p.rapidapi.com/forecast/london', {
            headers: {
                'x-rapidapi-host': 'weather-api-algobook.p.rapidapi.com',
                'x-rapidapi-key': '602ffd8f18mshf57384c19f0af9ep1be829jsna03db079ccf'
            }
        });
        console.log("🚀 ~ handler ~ responseAxios:", responseAxios)
        const weatherData = responseAxios.data;
        const response: APIGatewayProxyResult = {
            statusCode: 200,
            body: JSON.stringify({
                city: weatherData.name,
                temperature: weatherData.main.temp,
                description: weatherData.weather[0].description,
            }),
        };
        return response;

        
    } catch (error) {
        const response: APIGatewayProxyResult = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error retrieving weather data' }),
        };
        return response;
    }
};

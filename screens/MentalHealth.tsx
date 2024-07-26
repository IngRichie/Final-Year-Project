import axios from 'axios';
import cheerio from 'cheerio';

interface Resource {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
}

export const fetchMentalHealthTips = async (): Promise<Resource[]> => {
  const url = 'https://www.mentalhealth.org/'; // Adjust URL if necessary

  const resources: Resource[] = [];

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Log the structure of a target element to identify correct selectors
    console.log("HTML Structure:\n", $.html());

    $('article, .resource-card, .tip-card').each((index, element) => {
      const title = $(element).find('h2, .card-title').text().trim();
      const description = $(element).find('p, .card-description').text().trim();
      const imageUrl = $(element).find('img').attr('src');
      const link = url;

      if (title && description) {
        resources.push({ id: index, title, description, imageUrl, link });
      }
    });
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }

  console.log("Fetched Resources:", resources);
  return resources;
};

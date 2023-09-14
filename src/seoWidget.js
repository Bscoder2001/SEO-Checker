import React, { useState } from 'react';
import axios from 'axios';
import './seoWidget.css'; // Assuming you have a CSS file for styling

const SeoWidget = () => {
  const [url, setUrl] = useState('');
  const [seoData, setSeoData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const username = 'bsubham408@gmail.com'; // Your DataForSEO API username
      const password = 'c8a069a730641afa'; // Your DataForSEO API password
      const credentials = btoa(`${username}:${password}`);
      const apiUrl = 'https://api.dataforseo.com/v3/on_page/id_list';

      // Create an array of tasks (in this case, just one task)
      const tasks = [
        {
          "datetime_from": "2023-01-31 00:00:00 +02:00",
          "datetime_to": "2023-02-01 00:00:00 +02:00",
          "limit": 100,
          "offset": 0,
          "sort": "desc",
          "include_metadata": true
        }
      ];

      const response = await axios.post(apiUrl, tasks, {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json', // Set the content type
        },
      });

      // Assuming DataForSEO returns JSON data, set it to the state
      setSeoData(response.data);

      // Debugging: Log the entire response for inspection
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching SEO data:', error);
    }
  };

  return (
    <div className='mContainer'>
      <h2>SEO Widget</h2>
      <form onSubmit={handleSubmit} className='container'>
        <input
          className='input'
          type="text"
          placeholder="Enter a website URL (e.g., example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="check-seo-button" type="submit">Check SEO</button>
      </form>
      {seoData && (
        <div className="seo-data-container">
          <h3 className="seo-data-title">SEO Data</h3>
          <p className="seo-data-field">Version: {seoData.version || 'Not available'}</p>

          <p className="seo-data-field">Status Message: {seoData.status_message || 'Not available'}</p> 

          <p className="seo-data-field">Status Code: {seoData.status_code || 'Not available'}</p> 
          <p className="seo-data-field">Time: {seoData.time || 'Not available'}</p> 

          <p className="seo-data-field">Status Code: {seoData.tasks[0].status_code || 'Not available'}</p> 
          <p className="seo-data-field">Date-time from {seoData.tasks[0].data.datetime_from
 || 'Not available'}</p>
          <p className='seo-data-field'>Date-time to: {seoData.tasks[0].data.datetime_to
 || 'Not available'}</p>
        </div>
      )}
    </div>
  );
};

export default SeoWidget;

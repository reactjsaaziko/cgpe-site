// Example usage of the city names library
import cityNames, { 
  getAllCities, 
  getCitiesByState, 
  searchCities, 
  getCitiesByFirstLetter, 
  getRandomCities, 
  isValidCity 
} from './cityNames';

// Example 1: Get all cities
console.log('Total cities available:', getAllCities().length);

// Example 2: Get cities by state
const maharashtraCities = getCitiesByState('Maharashtra');
console.log('Maharashtra cities:', maharashtraCities);

// Example 3: Search cities
const searchResults = searchCities('mum');
console.log('Cities containing "mum":', searchResults);

// Example 4: Get cities starting with a letter
const citiesStartingWithM = getCitiesByFirstLetter('M');
console.log('Cities starting with M:', citiesStartingWithM);

// Example 5: Get random cities
const randomCities = getRandomCities(3);
console.log('Random 3 cities:', randomCities);

// Example 6: Validate city
const isValid = isValidCity('Mumbai');
console.log('Is Mumbai a valid city?', isValid);

// Example 7: Use in React component (commented example)
/*
import React, { useState } from 'react';
import { searchCities } from '../utils/cityNames';

const CitySelector = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const results = searchCities(value);
      setFilteredCities(results);
    } else {
      setFilteredCities([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <ul>
        {filteredCities.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};
*/

// Example 8: Use in dropdown (commented example)
/*
import React from 'react';
import { getAllCities } from '../utils/cityNames';

const CityDropdown = () => {
  const cities = getAllCities();

  return (
    <select>
      <option value="">Select a city</option>
      {cities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
};
*/

export default {
  cityNames,
  getAllCities,
  getCitiesByState,
  searchCities,
  getCitiesByFirstLetter,
  getRandomCities,
  isValidCity
};

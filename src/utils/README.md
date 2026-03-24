# City Names Library

A comprehensive library containing major Indian city names with utility functions for easy integration into your application.

## Features

- **300+ Indian Cities**: Comprehensive list of major cities from all states and union territories
- **State-wise Filtering**: Get cities by specific states
- **Search Functionality**: Search cities by name
- **Alphabetical Filtering**: Get cities starting with specific letters
- **Random Selection**: Get random cities for testing or suggestions
- **Validation**: Check if a city name exists in the library

## Installation

The library is located at `frontend/src/utils/cityNames.js` and can be imported directly into your components.

## Usage

### Basic Import

```javascript
import cityNames from '../utils/cityNames';
// or
import { getAllCities, searchCities } from '../utils/cityNames';
```

### Available Functions

#### 1. `getAllCities()`
Returns all cities in the library.

```javascript
import { getAllCities } from '../utils/cityNames';
const cities = getAllCities();
console.log(cities.length); // Total number of cities
```

#### 2. `getCitiesByState(stateName)`
Returns cities for a specific state.

```javascript
import { getCitiesByState } from '../utils/cityNames';
const maharashtraCities = getCitiesByState('Maharashtra');
console.log(maharashtraCities); // ['Mumbai', 'Pune', 'Nagpur', ...]
```

#### 3. `searchCities(searchTerm)`
Searches cities by name (case-insensitive).

```javascript
import { searchCities } from '../utils/cityNames';
const results = searchCities('mum');
console.log(results); // ['Mumbai', 'Malegaon', ...]
```

#### 4. `getCitiesByFirstLetter(letter)`
Returns cities starting with a specific letter.

```javascript
import { getCitiesByFirstLetter } from '../utils/cityNames';
const citiesStartingWithM = getCitiesByFirstLetter('M');
console.log(citiesStartingWithM); // ['Mumbai', 'Mysore', 'Madurai', ...]
```

#### 5. `getRandomCities(count)`
Returns random cities (default: 5).

```javascript
import { getRandomCities } from '../utils/cityNames';
const randomCities = getRandomCities(3);
console.log(randomCities); // ['Delhi', 'Chennai', 'Kolkata']
```

#### 6. `isValidCity(cityName)`
Validates if a city exists in the library.

```javascript
import { isValidCity } from '../utils/cityNames';
const isValid = isValidCity('Mumbai');
console.log(isValid); // true
```

## React Component Examples

### City Dropdown

```javascript
import React from 'react';
import { getAllCities } from '../utils/cityNames';

const CityDropdown = ({ value, onChange }) => {
  const cities = getAllCities();

  return (
    <select value={value} onChange={onChange}>
      <option value="">Select a city</option>
      {cities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
};
```

### City Search with Autocomplete

```javascript
import React, { useState } from 'react';
import { searchCities } from '../utils/cityNames';

const CitySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const results = searchCities(value);
      setFilteredCities(results.slice(0, 10)); // Limit to 10 results
    } else {
      setFilteredCities([]);
    }
  };

  return (
    <div className="city-search">
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />
      {filteredCities.length > 0 && (
        <ul className="search-results">
          {filteredCities.map((city, index) => (
            <li 
              key={index} 
              onClick={() => {
                setSearchTerm(city);
                setFilteredCities([]);
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

### State-wise City Selector

```javascript
import React, { useState } from 'react';
import { getCitiesByState } from '../utils/cityNames';

const StateCitySelector = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const states = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu',
    'West Bengal', 'Gujarat', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh'
  ];

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity('');
  };

  return (
    <div>
      <select 
        value={selectedState} 
        onChange={(e) => handleStateChange(e.target.value)}
      >
        <option value="">Select State</option>
        {states.map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
      </select>

      {selectedState && (
        <select 
          value={selectedCity} 
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select City</option>
          {getCitiesByState(selectedState).map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      )}
    </div>
  );
};
```

## Supported States

The library includes cities from all major Indian states and union territories:

- Maharashtra
- Delhi
- Karnataka
- Telangana
- Tamil Nadu
- West Bengal
- Gujarat
- Uttar Pradesh
- Rajasthan
- Madhya Pradesh
- Andhra Pradesh
- Kerala
- Punjab
- Bihar
- Odisha
- Assam
- Jharkhand
- Chhattisgarh
- Haryana
- Uttarakhand
- Jammu and Kashmir
- Himachal Pradesh
- Tripura
- Manipur
- Mizoram
- Meghalaya
- Nagaland
- Arunachal Pradesh
- Sikkim
- Goa
- Chandigarh
- Puducherry
- Andaman and Nicobar
- Dadra and Nagar Haveli
- Daman and Diu
- Lakshadweep

## Notes

- All city names are in English
- The library focuses on major cities and metropolitan areas
- City names are case-sensitive in the library but search functions are case-insensitive
- The library is optimized for Indian insurance and financial applications

## Contributing

To add more cities or modify existing ones, edit the `cityNames.js` file and update the `cityNames` array and `stateCityMap` object accordingly.

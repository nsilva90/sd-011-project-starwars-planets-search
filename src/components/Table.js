import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/auth';

/**
 * Consultei o video do canal "devmentorlive" para refatorar meu codigo.
 * Link: https://www.youtube.com/watch?v=d1r0aK5awWk
 */

import FilterNumericNumbers from './FilterNumericNumbers';
import Datatable from './datatable';

function Table() {
  const [data, setData] = useState([]);
  const { filters, setFilters } = useAuth();
  const { filterByName: { name } } = filters;

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  const { filterByNumericValues } = filters;

  function search(rows) {
    const minusOne = -1;

    if (filterByNumericValues[0]) {
      const results = [];

      filterByNumericValues.forEach((filters) => {
        const { column, value, comparison } = filters;

        switch (comparison) {
        case 'maior que':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name) > minusOne
                && parseInt(row[column], 0) > parseInt(value, 0)
          )));
          break;
        case 'menor que':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name) > minusOne
                && parseInt(row[column], 0) < parseInt(value, 0)
          )));
          break;
        case 'igual a':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name) > minusOne
                && parseInt(row[column], 0) === parseInt(value, 0)
          )));
          break;
        default:
        }
      });

      if (results[0] && results[1]) {
        const finalFilter = results[0].filter((planet) => (
          results[1].includes(planet)
        ));

        return finalFilter;
      }

      return results[0];
    }

    return rows.filter((row) => (
      row.name.toLowerCase().indexOf(name) > minusOne
    ));
  }

  return (
    <div>
      <input
        type="text"
        value={ name }
        data-testid="name-filter"
        onChange={ (e) => setFilters({
          ...filters,
          filterByName: { name: e.target.value },
        }) }
      />
      <FilterNumericNumbers />
      <div>
        <Datatable data={ search(data) } />
      </div>
    </div>
  );
}

export default Table;

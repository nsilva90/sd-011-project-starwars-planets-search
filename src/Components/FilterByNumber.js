import React, { useState } from 'react';
import { useAuth } from '../Providers/Auth';

function FilterByNumber() {
  const [colFilters, setColFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const { filters, setFilters } = useAuth();

  const [localFilters, setLocalFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  function handleColumnFilter({ target: { value } }) {
    setLocalFilters({
      ...localFilters,
      column: value,
    });
  }

  function handleComparisonFilter({ target: { value } }) {
    setLocalFilters({
      ...localFilters,
      comparison: value,
    });
  }

  function handleValueFilter({ target: { value } }) {
    setLocalFilters({
      ...localFilters,
      value,
    });
  }

  function setFilterOptions() {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, localFilters],
    });
    const newFilters = [];
    const avaliableColFilter = colFilters.filter((col) => (
      col !== localFilters.column
    ));
    avaliableColFilter.forEach((col) => {
      newFilters.push(col);
    });
    setColFilters(newFilters);
    const event = {
      target: { value: newFilters[0] },
    };
    handleColumnFilter(event);
  }

  return (
    <div>
      <select
        onChange={ (event) => handleColumnFilter(event) }
        data-testid="column-filter"
      >
        { colFilters.map((filColumn, index) => (
          <option key={ index }>{filColumn}</option>
        ))}
      </select>
      <select
        onChange={ (event) => handleComparisonFilter(event) }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        onChange={ (event) => handleValueFilter(event) }
        type="number"
        data-testid="value-filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ setFilterOptions }
      >
        Filtrar
      </button>
    </div>
  );
}

export default FilterByNumber;

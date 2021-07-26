import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

const columnFilterOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparisonFilterOptions = ['maior que', 'menor que', 'igual a'];

function Table() {
  const { data } = useContext(GlobalContext);
  const [filters, setFilters] = React.useState({
    columnFilter: '',
    comparisonFilter: '',
    inputNumber: '',
  });
  const [search, setSearch] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: '',
          comparison: '',
          value: '',
        },
      ],
    },
  });

  function changeState({ target: { value } }) {
    setSearch({
      filters: {
        ...search.filters,
        filterByName: {
          name: value,
        },
      },
    });
  }

  function buttonFilter() {
    const { columnFilter, comparisonFilter, inputNumber } = filters;
    setSearch({
      filters: {
        ...search.filters,
        filterByNumericValues: {
          column: columnFilter,
          comparison: comparisonFilter,
          value: inputNumber,
        },
      },
    });
  }

  if (!data) return <p>Loading...</p>;
  const thNames = Object.keys(data[0]).filter((name) => name !== 'residents');
  const filteredByName = data
    .filter((planet) => planet.name.includes(search.filters.filterByName.name));

  const filteredByColumn = filteredByName.filter((planet) => {
    const column = planet[search.filters.filterByNumericValues.column];
    const { comparison, value } = search.filters.filterByNumericValues;

    switch (comparison) {
    case 'maior que':
      return Number(column) > Number(value);
    case 'menor que':
      return Number(column) < Number(value);
    case 'igual a':
      return Number(value) === Number(column);
    default:
      return true;
    }
  });

  return (
    <div>
      <label htmlFor="input">
        <input data-testid="name-filter" id="input" onChange={ changeState } />
      </label>

      <select
        data-testid="column-filter"
        onChange={
          ({ target: { value } }) => setFilters({ ...filters, columnFilter: value })
        }
      >
        {columnFilterOptions.map((optionContent, index) => (
          <option key={ index }>{optionContent}</option>
        ))}
      </select>

      <select
        data-testid="comparison-filter"
        onChange={
          ({ target: { value } }) => setFilters({ ...filters, comparisonFilter: value })
        }
      >
        {comparisonFilterOptions.map((optionContent, index) => (
          <option key={ index }>{optionContent}</option>
        ))}
      </select>

      <input
        data-testid="value-filter"
        onChange={ ({ target: { value } }) => setFilters({
          ...filters,
          inputNumber: value,
        }) }
        type="number"
      />

      <button onClick={ buttonFilter } type="button" data-testid="button-filter">
        Adicionar Filtro
      </button>

      <table>
        <thead>
          <tr>
            {thNames.map((value, index) => (
              <th key={ index }>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredByColumn.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

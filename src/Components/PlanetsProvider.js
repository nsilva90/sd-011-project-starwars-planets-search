import React, { useEffect, useState } from 'react';
import Table from './Table';
import { useAuth } from '../Providers/Auth';
import FilterByNumber from './FilterByNumber';

function PlanetsProvider() {
  const [data, setData] = useState([]);
  const { filters, setFilters } = useAuth();
  const { filterByNumericValues, order } = filters;
  const minusOne = -1;

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  function filteredData(rows) {
    const { filterByName: { name } } = filters;
    const results = [];

    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((filter) => {
        const { column, comparison, value } = filter;

        switch (comparison) {
        case 'maior que':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
          && parseInt(row[column], 0) > parseInt(value, 0)
          )));
          break;
        case 'menor que':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
          && parseInt(row[column], 0) < parseInt(value, 0)
          )));
          break;
        case 'igual a':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
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
      row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
    ));
  }

  const delFilter = () => {
    const savedFilters = filterByNumericValues;
    savedFilters.shift();
    setFilters({
      ...filters,
      filterByNumericValues: savedFilters,
    });
  };

  function sortString(dataNA) {
    if (order.sort === 'ASC') {
      return dataNA.sort((a, b) => {
        if (a.name < b.name) {
          return minusOne;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    return dataNA.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return minusOne;
      }
      return 0;
    });
  }

  function sortNumber(dataNA) {
    console.log(dataNA);
    if (order.sort === 'ASC') {
      return dataNA.sort((a, b) => (
        a.orbital_period.localeCompare(b.orbital_period, undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      ));
    }
    return dataNA.sort((a, b) => b.orbital_period - a.orbital_period);
  }

  // const [buttonClick, setButtonClick] = useState([true, false]);

  function sortData(dataA) {
    if (order.column === 'Name') {
      const DATA = sortString(dataA);

      return DATA;
    }
    const DATA = sortNumber(dataA);

    return DATA;
  }

  const [localSort, setLocalSort] = useState({
    order: {
      column: 'Name',
      sort: 'ASC',
    },
  });

  function sendToUseAuth() {
    console.log({
      ...filters,
      ...localSort,
    });
    setFilters({
      ...filters,
      ...localSort,
    });
  }

  return (
    <div>
      <label htmlFor="name-filter">
        Pesquisar Planeta:
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ (e) => setFilters({
            ...filters,
            filterByName: {
              name: e.target.value,
            },
          }) }
        />
      </label>
      <FilterByNumber />

      {/* Req. 5 e 6 desenvolvido em parceiria com Gabriel Carvalho e Pedro Oliveira */}
      { filterByNumericValues.length > 0
      && (
        filterByNumericValues.map((value, index) => (
          <div data-testid="filter" key={ index }>
            <span>{ `${value.column} ` }</span>
            <span>{ `${value.comparison} ` }</span>
            <span>{ `${value.value} ` }</span>
            <button
              onClick={ delFilter }
              type="button"
            >
              X
            </button>
          </div>
        ))
      )}

      <select
        data-testid="column-sort"
        onChange={ (e) => setLocalSort({
          order: {
            ...localSort.order,
            column: e.target.value,
          },
        }) }
      >
        <option value="Name">Name</option>
        <option value="orbital_period">Orbital Period</option>
      </select>

      <div
        onChange={ (e) => setLocalSort({
          order: {
            ...localSort.order,
            sort: e.target.id,
          },
        }) }
      >
        <label htmlFor="ASC">
          Crescente
          <input
            type="radio"
            name="sort"
            id="ASC"
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="DESC">
          Decrescente
          <input
            type="radio"
            name="sort"
            id="DESC"
            data-testid="column-sort-input-desc"
          />
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ sendToUseAuth }
      >
        Ordernar
      </button>

      <Table dataForTable={ sortData(filteredData(data)) } />
    </div>
  );
}

export default PlanetsProvider;

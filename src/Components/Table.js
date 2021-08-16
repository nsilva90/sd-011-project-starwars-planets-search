import React from 'react';
import PropTypes from 'prop-types';

function Table({ dataForTable }) {
  const columns = dataForTable[0] && Object.keys(dataForTable[0]);

  return (
    <table className="table">
      <thead>
        <tr>
          {dataForTable[0] && columns.map((head, index) => {
            if (head === 'residents') return null;
            return <th className="thead" key={ index }>{head}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataForTable.map((rows, index) => (
          <tr key={ index }>
            {
              columns.map((column) => {
                if (column === 'residents') return null;
                if (column === 'name') {
                  return (
                    <td data-testid="planet-name" key={ `${index} ${rows[column]}` }>
                      {rows[column]}
                    </td>
                  );
                }
                return (
                  <td
                    className="trbody"
                    key={ `${index} ${rows[column]}` }
                  >
                    {rows[column]}
                  </td>);
              })
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  dataForTable: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;

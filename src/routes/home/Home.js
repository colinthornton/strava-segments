import React from 'react';
import PropTypes from 'prop-types';

export default function Home({ segments }) {
  return (
    <div>
      <h1>Kanto Segments</h1>
      <ul>
        {segments.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

Home.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

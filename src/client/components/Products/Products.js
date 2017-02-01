import React from 'react';

export default class Products extends React.Component {
  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/products.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}

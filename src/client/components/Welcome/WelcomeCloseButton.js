import React from 'react';
import { Link } from 'react-router';

const WelcomeCloseButton = () => {
  const styles = {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 9999,
    color: 'grey',
    fontSize: 32,
    textDecoration: 'none'
  };

  return (
    <Link
      to={`${window.simContextPath}/dashboard/`}
      className="glyphicon glyphicon-remove"
      style={styles}
    />
  )
};

export default WelcomeCloseButton

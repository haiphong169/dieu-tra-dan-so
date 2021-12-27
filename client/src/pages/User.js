import React from 'react';
import { useSelector } from 'react-redux';

export default function User() {
  const { name, username } = useSelector((state) => state.user);
  return (
    <div>
      <h2>{localStorage.getItem('name')}</h2>
      <h2>{localStorage.getItem('username')}</h2>
    </div>
  );
}

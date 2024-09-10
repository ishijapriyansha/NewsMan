import React from 'react'
import loader from './loader.gif';

export default function Loader() {
  return (
    <div>
      <img className="my-3 align-center" src={loader} alt="loader"></img>
    </div>
  )
}

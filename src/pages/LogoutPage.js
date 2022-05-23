import React from 'react'

const LogoutPage = (props) => {

  const logout = () => {
    props.auth.signOut();
    props.nav('/');
  }
  return (
    <div className='page'>
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  )
}

export default LogoutPage;
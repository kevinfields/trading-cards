import React from 'react'

const LogoutPage = (props) => {

  const logout = () => {
    props.auth.signOut();
    props.nav('/');
  }
  return (
    <div className='page'>
      <button style={{
        position: 'fixed',
        left: '50vw',
        width:'15vw',
        top: '45vh',
        height: '10vh',
        fontSize: '18pt',
      }}
      onClick={() => logout()}>Sign Out</button>
    </div>
  )
}

export default LogoutPage;
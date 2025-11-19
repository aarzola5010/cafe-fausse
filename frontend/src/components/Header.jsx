import { NavLink } from 'react-router-dom'

export default function Header(){
  return (
    <header>
      <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <h1 style={{margin:0}}>Café Fausse</h1>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/reservations">Reservations</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
        </nav>
      </div>
    </header>
  )
}

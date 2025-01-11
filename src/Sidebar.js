import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="Sidebar">
      <h2><NavLink to="/" className="logo">Rhyme</NavLink></h2>
      <p>
        <NavLink to="/" className={({ isActive }) => isActive? "active": ''}>Ana sayfa</NavLink>
      </p>
      <p>
        <NavLink to="/search" className={({ isActive }) => isActive? "active": ''}>Ara</NavLink>
      </p>
      <p>
        <NavLink to="/about" className={({ isActive }) => isActive? "active": ''}>Proje hakkında</NavLink>
      </p>
    </div>
  );
}

export default Sidebar;

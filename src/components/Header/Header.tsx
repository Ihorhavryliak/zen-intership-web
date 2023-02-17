import { NavLink } from "react-router-dom"


export const Header = () => {
  return (

    <header className="header">
      <div className="container position__relative overflow__hidden">
       <div className="d-flex justify-between">
        <div>
          
          <NavLink to='/'>
          Home</NavLink></div>
        <div>     <NavLink to='/sign-up'>Sign in</NavLink></div>
       </div>
        
      </div>
    </header>
  )
}

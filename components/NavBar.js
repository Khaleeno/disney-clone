import Link from 'next/Link'
import Image from 'next/image'
import logo from '../public/Disney_logo.svg.png'

const NavBar = () => {
  return (
    <div className='navbar'>
      <Link>
        <Image src={logo} alt={"Disney Logo"} width={90} height={50}/>
      </Link>
    </div>
  )
}

export default NavBar 
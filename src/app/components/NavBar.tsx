import HeaderUser from './HeaderUser'
import Link from 'next/link'

const NavBar = () => {

  return (
        <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 w-screen">    
          <header className="p-12 flex w-screen justify-between">
            <Link href="/"><h1 className="text-4xl text-violet-50 font-mono">Ai Recipe Generator</h1></Link>
            <HeaderUser></HeaderUser>
          </header>   
  </div>
  )
}

export default NavBar
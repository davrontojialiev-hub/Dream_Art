import { type FC } from 'react'
import { Hero } from '../components/Hero'
import { Categories } from '../components/Categories'

const Home: FC = () => {
  return (
    <div className="home-page">
      <Hero />
      <Categories />
    </div>
  )
}

export default Home
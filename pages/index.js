import Layout from '../components/Layout'
import Landing from '../components/Landing'
import Service from '../components/Service'
import Brand from '../components/Brand'
import Recomended from '../components/recomended'
import Arrival from '../components/Arrival'
const index = () => {

  return (
    <div>


      <Layout head='Clothes'>
        <Landing />
        <Service />
        <Arrival/>
        <Brand />
        <Recomended />
      </Layout>
    </div>
  )
}

export default index


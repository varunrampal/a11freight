import Layout from "../Components/Layout"
import About from "../Components/About"
import Booking from "../Components/Booking"
import Slider from "../Components/Slider"
import Features from "../Components/Features"


 const Home = () => {
  return (
   
    <Layout>
        <Slider/>
        <Features/>
      <About/>
  
    <Booking/>
      
    </Layout>
   
    
  )

  
}
export default Home
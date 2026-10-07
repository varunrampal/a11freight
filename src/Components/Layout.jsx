import Header from '../Components/Header';
import Footer from '../Components/Footer';
import BannerBottom from '../Components/BannerBottom';
import Testimonials from '../Components/Testimonials';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main>
          {children}
      </main>
      <Testimonials />
      <BannerBottom />
      <Footer />
    </div>
  );
}
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Hero from './sections/Hero'
import Blog from './sections/Blog'
import Admin from './components/Admin/Admin'
import DetailsModal from './components/DetailsModal'
import About from './sections/About'
import CardGrid from './sections/CardGrid'
import PopularOrdes from './sections/PopularOrdes'

// --- ІМПОРТИ НОВИХ СЕКЦІЙ ---
import FurnitureCalculator from './sections/FurnitureCalculator'
import FurnitureCatalog from './sections/FurnitureCatalog'
import Contact from './sections/Contact'
import Gallery from './sections/Gallery'
import Team from './sections/Team' 
import Services from './sections/Services'
import Projects from './sections/Projects'
import Reviews from './sections/Reviews' // <--- ДОДАНО ІМПОРТ ВІДГУКІВ

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* ГОЛОВНА СТОРІНКА */}
          <Route path="/" element={
            <>
              <Hero />
              <Services /> 
              <Projects />
              <PopularOrdes />
              <FurnitureCatalog />
              <Team /> 
              <Reviews /> {/* <--- ВІДГУКИ ТЕПЕР ТУТ */}
              <Gallery />
              <Blog />
              <Contact />
            </>
          } />

          {/* МАРШРУТ ДЛЯ КАЛЬКУЛЯТОРА */}
          <Route path="/calculator" element={<FurnitureCalculator />} />

          {/* РОЗДІЛ "СТОРІНКИ" */}
          <Route path="/UI-Components/Pages/About" element={<About />} />
          <Route path="/UI-Components/Pages/Teams" element={<Team />} />
          <Route path="/UI-Components/Pages/Gallery" element={<Gallery />} />
          <Route path="/UI-Components/Pages/CardGrid" element={<CardGrid />} />
          <Route path="/UI-Components/Pages/PopularOrdes" element={<PopularOrdes />} />

          {/* СЕРВІС ТА КОНТАКТИ */}
          <Route path="/UI-Components/Pages/Service" element={<Services />} /> 
          <Route path="/UI-Components/Pages/Constant" element={<Contact />} />

          {/* БЛОГ ТА ПРОЕКТИ */}
          <Route path="/UI-Components/Blogs" element={<Blog />} />
          <Route path="/UI-Components/Projects" element={<Projects />} />

          {/* ЯКЩО ХОЧЕШ ОКРЕМУ СТОРІНКУ ДЛЯ ВІДГУКІВ, МОЖНА ДОДАТИ ТАК: */}
          {/* <Route path="/UI-Components/Pages/Reviews" element={<Reviews />} /> */}
        </Routes>

        <Admin />
        <DetailsModal />
      </main>

      <Footer />
    </div>
  )
}

export default App

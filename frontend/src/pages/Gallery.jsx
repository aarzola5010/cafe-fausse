import { useState } from 'react'
import Lightbox from '../components/Lightbox.jsx'

// Local images from /public/images/gallery
const IMAGES = [
  '/images/gallery/gallery-cafe-interior.webp',
  '/images/gallery/gallery-ribeye-steak.webp',
  '/images/gallery/gallery-special-event.webp',
]

export default function Gallery(){
  const [lightbox, setLightbox] = useState(null)
  return (
    <div>
      <div className="card" style={{marginBottom:'1rem'}}>
        <h3>Awards & Reviews</h3>
        <ul>
          <li>Culinary Excellence Award – 2022</li>
          <li>Restaurant of the Year – 2023</li>
          <li>Best Fine Dining Experience – Foodie Magazine, 2023</li>
        </ul>
        <blockquote>“Exceptional ambiance and unforgettable flavors.” – Gourmet Review</blockquote>
        <blockquote>“A must-visit restaurant for food enthusiasts.” – The Daily Bite</blockquote>
      </div>

      <div className="gallery">
        {IMAGES.map((src, i)=>(
          <img
            key={i}
            src={src}
            alt={`Gallery ${i+1}`}
            onClick={()=>setLightbox(src)}
          />
        ))}
      </div>

      {lightbox && <Lightbox src={lightbox} onClose={()=>setLightbox(null)} />}
    </div>
  )
}

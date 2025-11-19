import NewsletterForm from '../components/NewsletterForm.jsx'

export default function Home(){
  return (
    <div className="hero">
      <div>
        <h2>Welcome to Café Fausse</h2>
        <p>Fine dining that blends traditional Italian flavors with modern culinary innovation.</p>
        <div className="badges">
          <span className="badge">Culinary Excellence Award — 2022</span>
          <span className="badge">Restaurant of the Year — 2023</span>
          <span className="badge">Best Fine Dining — Foodie Magazine, 2023</span>
        </div>
        <div style={{marginTop:'1rem'}}>
          <strong>Contact</strong>: (202) 555-4567 • 1234 Culinary Ave, Suite 100, Washington, DC 20002
          <br/><strong>Hours</strong>: Mon–Sat 5:00 PM–11:00 PM; Sun 5:00 PM–9:00 PM
        </div>
      </div>

      {/* Local image from /public/images/home */}
      <img
        src="/images/home/home-cafe-fausse.webp"
        alt="Café Fausse interior"
      />

      <NewsletterForm />
    </div>
  )
}

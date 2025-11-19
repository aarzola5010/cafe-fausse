export default function Footer(){
  return (
    <footer>
      <div className="container" style={{display:'grid', gap:'.5rem'}}>
        <div><strong>Contact</strong>: (202) 555-4567 • 1234 Culinary Ave, Suite 100, Washington, DC 20002</div>
        <div><strong>Hours</strong>: Mon–Sat 5:00 PM – 11:00 PM; Sun 5:00 PM – 9:00 PM</div>
        <small>© {new Date().getFullYear()} Café Fausse</small>
      </div>
    </footer>
  )
}

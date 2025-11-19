import ReservationForm from '../components/ReservationForm.jsx'

export default function Reservations(){
  return (
    <div className="grid-2">
      <div>
        <h2>Reserve a Table</h2>
        <p>Choose your date and time, tell us your party size, and we’ll take care of the rest.</p>
        <ReservationForm />
      </div>
      <div className="card">
        <h3>Reservation Policy</h3>
        <ul>
          <li>Reservations available daily during operating hours.</li>
          <li>Online booking assigns one of our 30 tables automatically.</li>
          <li>Call us for parties larger than 12.</li>
        </ul>
      </div>
    </div>
  )
}

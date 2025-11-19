import { useState } from 'react'

export default function ReservationForm(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [guests, setGuests] = useState(2)
  const [datetime, setDatetime] = useState('')
  const [msg, setMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e)=>{
    e.preventDefault()
    setMsg(null)
    setSubmitting(true)
    try{
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, phone, guests, datetime })
      })
      const data = await res.json()
      if(data.ok){
        setMsg({ok:true, text:`Confirmed: table #${data.reservation.table_number} on ${new Date(data.reservation.datetime).toLocaleString()}`})
        setName(''); setEmail(''); setPhone(''); setGuests(2); setDatetime('')
      }else{
        setMsg({ok:false, text:data.error || 'Could not book.'})
      }
    }catch(err){
      setMsg({ok:false, text:'Network error.'})
    }finally{
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{display:'grid', gap:'.6rem'}}>
      <label>Time & Date
        <input className="input" type="datetime-local" value={datetime} onChange={e=>setDatetime(e.target.value)} required />
      </label>
      <label>Number of Guests
        <input className="input" type="number" min="1" max="12" value={guests} onChange={e=>setGuests(parseInt(e.target.value))} required />
      </label>
      <label>Name
        <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
      </label>
      <label>Email
        <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      </label>
      <label>Phone (optional)
        <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} />
      </label>
      <button className="btn" disabled={submitting}>{submitting ? 'Booking…' : 'Book Table'}</button>
      {msg && <div style={{color: msg.ok ? 'green' : 'crimson'}}>{msg.text}</div>}
    </form>
  )
}

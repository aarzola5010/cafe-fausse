import { useState } from 'react'

export default function NewsletterForm(){
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [msg, setMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e)=>{
    e.preventDefault()
    setSubmitting(true)
    setMsg(null)
    try{
      const res = await fetch('/api/newsletter',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, name })
      })
      const data = await res.json()
      if(data.ok){
        setMsg({ok:true, text: data.message})
        setEmail(''); setName('')
      }else{
        setMsg({ok:false, text: data.error || 'Something went wrong.'})
      }
    }catch(err){
      setMsg({ok:false, text:'Network error.'})
    }finally{
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{display:'grid', gap:'.6rem'}}>
      <h3>Join our newsletter</h3>
      <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <button className="btn" disabled={submitting}>{submitting ? 'Submitting…' : 'Subscribe'}</button>
      {msg && <div style={{color: msg.ok ? 'green' : 'crimson'}}>{msg.text}</div>}
    </form>
  )
}

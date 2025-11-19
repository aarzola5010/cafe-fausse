import { useEffect } from 'react'

export default function Lightbox({ src, onClose }){
  useEffect(()=>{
    const onKey = (e)=>{ if(e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'grid', placeItems:'center'}} onClick={onClose}>
      <img src={src} alt="" style={{maxWidth:'90vw', maxHeight:'85vh', borderRadius:'12px'}} onClick={e=>e.stopPropagation()} />
    </div>
  )
}

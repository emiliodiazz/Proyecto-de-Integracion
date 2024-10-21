'use client'

import { useState } from "react"

const CreateForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      })

      const data = await res.json()

      if (data) {
        alert(data.message)
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <section>
      <h2>Registrar usuario formulario</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" onChange={(e: any) => setName(e.target.value)} value={name} required />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={(e: any) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='flex flex-col gap-2'>
          <button type='submit'>Enviar Formulario</button>
        </div>
      </form>
    </section>
  )
}

export { CreateForm }
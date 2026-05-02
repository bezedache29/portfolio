import { personalInfo } from '@/data'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useEffect, useState } from 'react'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactSection() {
  const [isSending, setIsSending] = useState(false)
  const [alert, setAlert] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  useEffect(() => {
    if (!alert) return

    const timer = setTimeout(() => {
      setAlert(null)
    }, 5000)

    return () => clearTimeout(timer)
  }, [alert])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSending) return

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = (formData.get('name') as string)?.trim()
    const email = (formData.get('email') as string)?.trim()
    const subject = (formData.get('subject') as string)?.trim()
    const message = (formData.get('message') as string)?.trim()

    if (!name || !email || !emailRegex.test(email) || !subject || !message || message.length < 10) {
      setAlert({
        type: 'error',
        message: 'Veuillez remplir correctement tous les champs.',
      })
      return
    }

    // Honeypot anti-bot
    if (formData.get('bot_field')) {
      setAlert({
        type: 'error',
        message: 'Message bloqué.',
      })
      return
    }

    setIsSending(true)

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )

      setAlert({
        type: 'success',
        message: 'Message envoyé ! Je te réponds rapidement.',
      })

      form.reset()
      form.querySelector('input')?.focus()
    } catch (error) {
      console.error(error)

      let errorMessage = "Erreur lors de l'envoi. Réessaie plus tard."

      if (error && typeof error === 'object') {
        const err = error as { status?: number; text?: string }

        if (err.status === 429 || err.text?.includes('429')) {
          errorMessage = 'Trop de messages envoyés récemment. Réessaie dans quelques minutes.'
        }
      }

      setAlert({
        type: 'error',
        message: errorMessage,
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className='animate-in fade-in duration-500'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold text-white relative inline-block pb-4'>
          Contact
          <span className='absolute bottom-0 left-0 w-12 h-0.75 bg-yellow-500 rounded-full'></span>
        </h2>
      </div>

      {/* Carte Google Maps */}
      <div className='mb-10 rounded-2xl overflow-hidden border border-white/5 shadow-sm h-87.5 md:h-105'>
        <iframe
          src={personalInfo.mapUrlContact}
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title='Carte de localisation'
          className='filter grayscale-[0.2] contrast-125'
        ></iframe>
      </div>

      <h3 className='text-2xl font-bold text-white mb-6'>Formulaire de contact</h3>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6' noValidate>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='name' className='sr-only'>
              Nom complet
            </label>
            <input
              id='name'
              name='name'
              type='text'
              placeholder='Nom complet'
              required
              className='w-full bg-[#1e1e1f] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:border-yellow-500 focus:outline-none transition-colors'
            />
          </div>

          <div>
            <label htmlFor='email' className='sr-only'>
              Adresse e-mail
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Adresse e-mail'
              required
              className='w-full bg-[#1e1e1f] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:border-yellow-500 focus:outline-none transition-colors'
            />
          </div>
        </div>

        <div>
          <label htmlFor='subject' className='sr-only'>
            Sujet
          </label>
          <input
            id='subject'
            name='subject'
            type='text'
            placeholder='Sujet'
            required
            className='w-full bg-[#1e1e1f] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:border-yellow-500 focus:outline-none transition-colors'
          />
        </div>

        <div>
          <label htmlFor='message' className='sr-only'>
            Votre message
          </label>
          <textarea
            id='message'
            name='message'
            placeholder='Votre message'
            required
            rows={6}
            minLength={10}
            maxLength={3000}
            className='w-full bg-[#1e1e1f] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:border-yellow-500 focus:outline-none transition-colors resize-none'
          ></textarea>
        </div>

        {/* Honeypot */}
        <input type='text' name='bot_field' className='sr-only' tabIndex={-1} autoComplete='off' />

        {/* Zone alerte + bouton */}
        <div className='flex flex-col items-end gap-4'>
          {alert && (
            <div
              className={`w-full p-4 border rounded-xl text-sm flex items-center gap-3 ${
                alert.type === 'success'
                  ? 'bg-green-500/10 border-green-500/40 text-green-400'
                  : 'bg-red-500/10 border-red-500/40 text-red-400'
              }`}
              role='alert'
            >
              {alert.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <p className='font-medium'>{alert.message}</p>
            </div>
          )}

          <button
            type='submit'
            disabled={isSending}
            className={`flex items-center justify-center gap-3 font-medium px-8 py-4 rounded-xl border transition-all duration-300 w-full md:w-auto ${
              isSending
                ? 'bg-[#1e1e1f] text-white/50 border-white/5 cursor-not-allowed'
                : 'bg-[#2b2b2c] hover:bg-yellow-500 text-yellow-500 hover:text-[#1e1e1f] border-white/5 hover:border-yellow-500 group'
            }`}
          >
            {isSending ? (
              <>
                <Loader2 size={18} className='animate-spin' />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send
                  size={18}
                  className='transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1'
                />
                Envoyer le message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

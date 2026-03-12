import React, { createContext, useContext, useState } from 'react'
import translations from './translations'

const LangContext = createContext(null)

function detectLang() {
  const lang = navigator.language || navigator.languages?.[0] || 'en'
  return lang.toLowerCase().startsWith('id') ? 'id' : 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(detectLang)

  const t = translations[lang]
  const toggleLang = () => setLang((l) => (l === 'id' ? 'en' : 'id'))

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

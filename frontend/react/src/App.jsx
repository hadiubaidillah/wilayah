import React, { useEffect, useState } from 'react'
import WilayahSelect from './components/WilayahSelect'
import WilayahInfo from './components/WilayahInfo'
import WilayahMap from './components/WilayahMap'
import AppSwitcher from './components/AppSwitcher'
import BackendSwitcher from './components/BackendSwitcher'
import { getProvinsi, getWilayah } from './api/wilayah'
import { useLang } from './i18n/LangContext'
import './App.css'

export default function App() {
  const { lang, t, toggleLang } = useLang()

  const [provinsi, setProvinsi] = useState([])
  const [kotaList, setKotaList] = useState([])
  const [kecList, setKecList] = useState([])
  const [desaList, setDesaList] = useState([])

  const [selectedProv, setSelectedProv] = useState('')
  const [selectedKota, setSelectedKota] = useState('')
  const [selectedKec, setSelectedKec] = useState('')
  const [selectedDesa, setSelectedDesa] = useState('')

  const [wilayahData, setWilayahData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProvinsi()
      .then((res) => setProvinsi(res.data))
      .catch(() => setError(t.errorProvince))
  }, [])

  useEffect(() => {
    if (error) setError(t.errorProvince)
  }, [lang])

  const handleSelect = async (kode, level) => {
    setError(null)
    setLoading(true)
    try {
      const res = await getWilayah(kode)
      const { data, children } = res.data

      setWilayahData(data)

      if (level === 'prov') {
        setSelectedProv(kode)
        setKotaList(children || [])
        setSelectedKota('')
        setKecList([])
        setSelectedKec('')
        setDesaList([])
        setSelectedDesa('')
      } else if (level === 'kota') {
        setSelectedKota(kode)
        setKecList(children || [])
        setSelectedKec('')
        setDesaList([])
        setSelectedDesa('')
      } else if (level === 'kec') {
        setSelectedKec(kode)
        setDesaList(children || [])
        setSelectedDesa('')
      } else if (level === 'desa') {
        setSelectedDesa(kode)
      }
    } catch {
      setError(t.errorRegion)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <div>
            <h1>{t.appTitle}</h1>
            <p>{t.appSubtitle}</p>
          </div>
          <div className="header-controls">
            <AppSwitcher />
            <BackendSwitcher />
            <button className="lang-switch" onClick={toggleLang} title="Switch language">
              <span className={lang === 'id' ? 'lang-active' : ''}>ID</span>
              <span className="lang-divider">|</span>
              <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
            </button>
            <a className="github-link" href="https://github.com/hadiubaidillah/wilayah" target="_blank" rel="noreferrer" title="GitHub">
              <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="sidebar">
          <div className="select-container">
            <WilayahSelect
              label={t.selectProvince}
              placeholder={t.selectPlaceholder(t.selectProvince)}
              options={provinsi}
              value={selectedProv}
              onChange={(v) => v && handleSelect(v, 'prov')}
            />
            {kotaList.length > 0 && (
              <WilayahSelect
                label={t.selectCity}
                placeholder={t.selectPlaceholder(t.selectCity)}
                options={kotaList}
                value={selectedKota}
                onChange={(v) => v && handleSelect(v, 'kota')}
              />
            )}
            {kecList.length > 0 && (
              <WilayahSelect
                label={t.selectDistrict}
                placeholder={t.selectPlaceholder(t.selectDistrict)}
                options={kecList}
                value={selectedKec}
                onChange={(v) => v && handleSelect(v, 'kec')}
              />
            )}
            {desaList.length > 0 && (
              <WilayahSelect
                label={t.selectVillage}
                placeholder={t.selectPlaceholder(t.selectVillage)}
                options={desaList}
                value={selectedDesa}
                onChange={(v) => v && handleSelect(v, 'desa')}
              />
            )}
          </div>

          {loading && <div className="loading">{t.loading}</div>}
          {error && <div className="error">{error}</div>}
          {wilayahData && <WilayahInfo data={wilayahData} />}
        </div>

        <div className="map-wrapper">
          <WilayahMap wilayah={wilayahData} />
        </div>
      </main>

      <footer className="app-footer">
        <a href="https://github.com/hadiubaidillah/wilayah" target="_blank" rel="noreferrer">
          github.com/hadiubaidillah/wilayah
        </a>
      </footer>
    </div>
  )
}

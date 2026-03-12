import React from 'react'
import { useLang } from '../i18n/LangContext'

export default function WilayahInfo({ data }) {
  const { t } = useLang()
  if (!data) return null

  const level = t.levelLabel[data.kode.length] || 'Wilayah'

  return (
    <div className="wilayah-info">
      <h3>{level}: {data.nama}</h3>
      <table>
        <tbody>
          <tr><td>{t.infoCode}</td><td>{data.kode}</td></tr>
          {data.luas && (
            <tr>
              <td>{t.infoArea}</td>
              <td>{data.luas.toLocaleString()} {t.infoAreaUnit}</td>
            </tr>
          )}
          {data.penduduk && (
            <tr>
              <td>{t.infoPopulation}</td>
              <td>{data.penduduk.toLocaleString()} {t.infoPopulationUnit}</td>
            </tr>
          )}
          <tr><td>{t.infoCoord}</td><td>{data.lat}, {data.lng}</td></tr>
        </tbody>
      </table>
    </div>
  )
}

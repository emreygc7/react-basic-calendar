import React, { useEffect } from 'react'
import '../utils/i18n'
import { useTranslation } from 'react-i18next'

interface Props {
  language: string
}

function Calendar({language = "en"}: Props) {

  const { t, i18n } = useTranslation()
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])
  return (
    <div>{t("January")}</div>
  )
}

export default Calendar
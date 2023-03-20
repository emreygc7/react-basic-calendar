import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      January: "January",
      February: "February",
      March: "March",
      April: "April",
      May: "May",
      June: "June",
      July: "July",
      August: "August",
      September: "September",
      October: "October",
      November: "November",
      December: "December",
    },
  },
  tr: {
    translation: {
      January: "Ocak",
      February: "Şubat",
      March: "Mart",
      April: "Nisan",
      May: "Mayıs",
      June: "Haziran",
      July: "Temmuz",
      August: "Ağustos",
      September: "Eylül",
      October: "Ekim",
      November: "Kasım",
      December: "Aralık",
    },
  },
}


i18next
.use(initReactI18next)
.init({
  lng: 'en', 
  resources
})


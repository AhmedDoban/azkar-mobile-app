import { Zikr } from "../types";

const items: Zikr[] = [
  {
    id: 1,
    ar: {
      prefix: "",
      text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
      suffix: "",
      virtue: "من صلّى على النبي ﷺ صلاة واحدة صلّى الله عليه بها عشرًا.",
      source: "صحيح مسلم 408",
    },
    en: {
      prefix: "",
      text: "O Allah, send prayers and peace upon our Prophet Muhammad.",
      suffix: "",
      virtue:
        "Whoever sends one prayer upon the Prophet ﷺ, Allah sends ten upon him for it.",
      source: "Sahih Muslim 408",
    },
    count: 100,
  },
];

export default items;

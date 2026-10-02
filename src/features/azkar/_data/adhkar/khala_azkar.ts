import { Zikr } from "../types";

const items: Zikr[] = [
  {
    id: 1,
    ar: {
      title: "الذكر عند الخلاء",
      prefix: "",
      text: "(بِسْمِ اللَّه) اللّهُـمَّ إِنِّـي أَعـوذُ بِـكَ مِـنَ الْخُـبْثِ وَالْخَبائِث.",
      suffix: "",
      virtue: "التسمية عند دخول الخلاء ستر ما بين أعين الجن وعورات بني آدم.",
      source: "صحيح البخاري 142، صحيح مسلم 375",
    },
    en: {
      title: "Remembrance when entering the restroom",
      prefix: "",
      text: "(In the name of Allah.) O Allah, I seek refuge in You from the male and female devils.",
      suffix: "",
      virtue:
        "Saying the name of Allah on entering the restroom is a screen between the eyes of the jinn and the private parts of the children of Adam.",
      source: "Sahih al-Bukhari 142, Sahih Muslim 375",
    },
    count: 1,
  },
  {
    id: 2,
    ar: {
      title: "الذكر بعد الخروج من الخلاء",
      prefix: "",
      text: "غُفْـرانَك.",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود 30، جامع الترمذي 7",
    },
    en: {
      title: "Remembrance after leaving the restroom",
      prefix: "",
      text: "I seek Your forgiveness.",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud 30, Jami` at-Tirmidhi 7",
    },
    count: 1,
  },
];

export default items;

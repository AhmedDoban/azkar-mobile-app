import { Zikr } from "../types";

const items: Zikr[] = [
  {
    id: 1,
    ar: {
      prefix: "الذكر قبل الوضوء",
      text: "بِسْمِ ٱللّٰهِ.",
      suffix: "",
      virtue: "لا وضوء لمن لم يذكر اسم الله عليه.",
      source: "سنن أبي داود 101",
    },
    en: {
      prefix: "Remembrance before ablution",
      text: "In the name of Allah.",
      suffix: "",
      virtue:
        "There is no ablution for one who does not mention the name of Allah over it.",
      source: "Sunan Abi Dawud 101",
    },
    count: 1,
  },
  {
    id: 2,
    ar: {
      title: "الذكر بعد الوضوء",
      prefix: "",
      text: "أشْهَدُ أن لا إله إلا اللَّه وحْدَهُ لا شريكَ لهُ ، وأشْهَدُ أنَّ محمداً عَبدُهُ ورسُولُه.\nاللَّهُمَّ اجْعَلْني مِنَ التَّوَّابينَ واجْعَلْنِي من المُتَطَهِّرِينَ.\nسُبْحَانَكَ اللَّهُمَّ وبَحَمْدكَ أشْهدُ أنْ لا إلهَ إلا أنْتَ أَسْتَغْفِرُكَ وأتُوبُ إِلَيْكَ.",
      suffix: "",
      virtue:
        "من توضأ فأحسن الوضوء ثم تشهد فُتحت له أبواب الجنة الثمانية يدخل من أيها شاء.",
      source: "صحيح مسلم 234، جامع الترمذي 55، والنسائي في عمل اليوم والليلة",
    },
    en: {
      title: "Remembrance after ablution",
      prefix: "",
      text: "I bear witness that there is no deity except Allah alone, without partner, and I bear witness that Muhammad is His servant and Messenger.\nO Allah, make me among those who repent often and make me among those who purify themselves.\nGlory and praise be to You, O Allah. I bear witness that there is no deity except You. I seek Your forgiveness and repent to You.",
      suffix: "",
      virtue:
        "Whoever performs ablution well and then says the testimony, the eight gates of Paradise are opened for him to enter through whichever he wishes.",
      source:
        "Sahih Muslim 234, Jami` at-Tirmidhi 55, and an-Nasa'i in `Amal al-Yawm wal-Laylah",
    },
    count: 1,
  },
];

export default items;

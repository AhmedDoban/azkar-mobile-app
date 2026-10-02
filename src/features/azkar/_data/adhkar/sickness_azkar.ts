import { Zikr } from "../types";

const items: Zikr[] = [
  {
    id: 20,
    ar: {
      title: "دعاء من رأى مبتلى",
      prefix: "",
      text: "الحمد للَّه الذي عافاني مما ابتلاك به، وفضلني على كثير ممن خلق تفضيلاً",
      suffix: "",
      virtue: "من قاله عند رؤية مبتلى لم يصبه ذلك البلاء.",
      source: "جامع الترمذي 3432",
    },
    en: {
      title: "Supplication upon seeing someone afflicted",
      prefix: "",
      text: "All praise is for Allah who has spared me from what He has afflicted you with, and has favored me greatly over many of those He created.",
      suffix: "",
      virtue:
        "Whoever says it upon seeing an afflicted person will not be struck by that affliction.",
      source: "Jami` at-Tirmidhi 3432",
    },
    count: 1,
  },
  {
    id: 30,
    ar: {
      title: "الدعاء للمريض في عيادته",
      prefix: "",
      text: "لا بأس، طهور إن شاء اللَّه",
      suffix:
        "ما من عبد مسلم يعود مريضاً لم يحضر أجله فيقول سبع مرات: أسأل اللَّه العظيم رب العرش العظيم أن يشفيك، إلا عوفي.",
      virtue: "",
      source: "صحيح البخاري 3616، سنن أبي داود 3106",
    },
    en: {
      title: "Supplication for the sick when visiting them",
      prefix: "",
      text: "No harm; it is a purification, if Allah wills.",
      suffix:
        'No Muslim servant visits a sick person whose appointed time has not come and says seven times: "I ask Allah the Mighty, Lord of the Mighty Throne, to cure you," except that he is cured.',
      virtue: "",
      source: "Sahih al-Bukhari 3616, Sunan Abi Dawud 3106",
    },
    count: 1,
  },
  {
    id: 31,
    ar: {
      title: "دعاء المريض الذي يئس من حياته",
      prefix: "",
      text: "اللَّهم اغفر لي وارحمني وألحقني بالرفيق الأعلى",
      suffix: "",
      virtue: "",
      source: "صحيح البخاري 5674",
    },
    en: {
      title: "Supplication of the sick person who has despaired of life",
      prefix: "",
      text: "O Allah, forgive me, have mercy on me, and join me with the Highest Companion.",
      suffix: "",
      virtue: "",
      source: "Sahih al-Bukhari 5674",
    },
    count: 1,
  },
  {
    id: 41,
    ar: {
      title: "الدعاء إذا أحسست بوجع في جسدك",
      prefix: "ضع يدك على الذي تألَّم من جسدك وقل:",
      text: "بسم اللَّه",
      suffix: "",
      virtue: "",
      source: "صحيح مسلم 2202",
    },
    en: {
      title: "Supplication when you feel pain in your body",
      prefix: "Place your hand on the part of your body that hurts and say:",
      text: "In the name of Allah.",
      suffix: "",
      virtue: "",
      source: "Sahih Muslim 2202",
    },
    count: 3,
  },
  {
    id: 42,
    ar: {
      prefix: "",
      text: "أعوذُ باللَّه وقُدْرَتِهِ من شَرِّ مَا أَجِدُ وَأُحَاذِرُ.",
      suffix: "",
      virtue: "",
      source: "صحيح مسلم 2202",
    },
    en: {
      prefix: "",
      text: "I seek refuge in Allah and His power from the evil of what I feel and what I fear.",
      suffix: "",
      virtue: "",
      source: "Sahih Muslim 2202",
    },
    count: 7,
  },
];

export default items;

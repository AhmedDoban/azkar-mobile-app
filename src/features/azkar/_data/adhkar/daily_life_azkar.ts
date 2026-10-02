import { Zikr } from "../types";

const items: Zikr[] = [
  {
    id: 8,
    ar: {
      title: "دعاء زيارة القبور",
      prefix: "",
      text: "السلام عليكم أهل الديار من المؤمنين والمسلمين، وإنا إن شاء اللَّه بكم لاحقون، ويرحم اللَّه المستقدمين منا والمستأخرين، أسأل اللَّه لنا ولكم العافية.",
      suffix: "",
      virtue: "",
      source: "صحيح مسلم",
    },
    en: {
      title: "Supplication when visiting graves",
      prefix: "",
      text: "Peace be upon you, O inhabitants of these dwellings, from among the believers and the Muslims. We will, if Allah wills, join you. May Allah have mercy on those of us who have gone before and those who come later. I ask Allah for well-being for us and for you.",
      suffix: "",
      virtue: "",
      source: "Sahih Muslim",
    },
    count: 1,
  },
  {
    id: 18,
    ar: {
      title: "ما يقال في المجلس قبل القيام",
      prefix: "",
      text: "رب اغفر لي وتب عليّ إنك أنت التواب الغفور",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود",
    },
    en: {
      title: "What is said in a gathering before rising",
      prefix: "",
      text: "My Lord, forgive me and accept my repentance; indeed You are the Accepter of repentance, the Most Forgiving.",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud",
    },
    count: 100,
  },
  {
    id: 19,
    ar: {
      title: "كفارة المجلس",
      prefix: "",
      text: "سبحانك اللَّهم وبحمدك، أشهد أن لا إله إلا أنت، أستغفرك وأتوب إليك",
      suffix: "",
      virtue: "من قالها في آخر مجلسه غُفر له ما كان في مجلسه ذلك.",
      source: "جامع الترمذي 3433",
    },
    en: {
      title: "Expiation of the gathering",
      prefix: "",
      text: "Glory be to You, O Allah, and praise be to You. I bear witness that there is no deity except You. I seek Your forgiveness and repent to You.",
      suffix: "",
      virtue:
        "Whoever says it at the end of a gathering is forgiven for whatever occurred in that gathering.",
      source: "Jami` at-Tirmidhi 3433",
    },
    count: 1,
  },
  {
    id: 21,
    ar: {
      title: "دعاء الغضب",
      prefix: "",
      text: "أعوذ باللَّه من الشيطان الرجيم",
      suffix: "",
      virtue: "لو قالها الغاضب لذهب عنه ما يجد.",
      source: "صحيح البخاري 3282، صحيح مسلم 2610",
    },
    en: {
      title: "Supplication when angry",
      prefix: "",
      text: "I seek refuge in Allah from Satan the accursed.",
      suffix: "",
      virtue: "If the angry person says it, what he feels will leave him.",
      source: "Sahih al-Bukhari 3282, Sahih Muslim 2610",
    },
    count: 1,
  },
  {
    id: 25,
    ar: {
      title: "دعاء العطاس",
      prefix: "",
      text: "إذا عطس أحدكم فليقل: الحمد للَّه، وليقل له أخوه أو صاحبه: يرحمك اللَّه، فإذا قال له: يرحمك اللَّه، فليقل: يهديكم اللَّه ويصلح بالكم.",
      suffix: "",
      virtue: "",
      source: "صحيح البخاري 6224",
    },
    en: {
      title: "Supplication upon sneezing",
      prefix: "",
      text: 'When one of you sneezes, let him say: "All praise is for Allah." And let his brother or companion say to him: "May Allah have mercy on you." When he says to him, "May Allah have mercy on you," let him say: "May Allah guide you and set your affairs right."',
      suffix: "",
      virtue: "",
      source: "Sahih al-Bukhari 6224",
    },
    count: 1,
  },
  {
    id: 26,
    ar: {
      title: "الدعاء عند إفطار الصائم",
      prefix: "",
      text: "ذهب الظمأ، وابتلت العروق، وثبت الأجر إن شاء اللَّه",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود 2357",
    },
    en: {
      title: "Supplication when breaking the fast",
      prefix: "",
      text: "The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud 2357",
    },
    count: 1,
  },
  {
    id: 27,
    ar: {
      title: "الدعاء إذا أفطر عند أهل بيت",
      prefix: "",
      text: "أفطر عندكم الصائمون، وأكل طعامكم الأبرار، وصلت عليكم الملائكة",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود 3854",
    },
    en: {
      title: "Supplication when breaking the fast with a household",
      prefix: "",
      text: "May those who fast break their fast with you, may the righteous eat your food, and may the angels send blessings upon you.",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud 3854",
    },
    count: 1,
  },
  {
    id: 32,
    ar: {
      title: "ما يعوذ به الأولاد",
      prefix: "",
      text: "أعيذكما بكلمات اللَّه التامة من كل شيطان وهامة، ومن كل عين لامة",
      suffix: "",
      virtue:
        "كان النبي صلى اللَّه عليه وسلم يعوذ بها الحسن والحسين، وقال: إن أباكما كان يعوذ بها إسماعيل وإسحاق.",
      source: "صحيح البخاري 3371",
    },
    en: {
      title: "Seeking protection for children",
      prefix: "",
      text: "I seek protection for you both in the perfect words of Allah from every devil and every poisonous creature, and from every evil eye.",
      suffix: "",
      virtue:
        "The Prophet ﷺ used to seek protection for al-Hasan and al-Husayn with it, and said: Your father (Ibrahim) used to seek protection with it for Isma`il and Ishaq.",
      source: "Sahih al-Bukhari 3371",
    },
    count: 1,
  },
  {
    id: 37,
    ar: {
      title: "دعاء دخول السوق",
      prefix: "",
      text: "لا إله إلا اللَّه وحده لا شريك له، له الملك وله الحمد، يحيي ويميت، وهو حي لا يموت، بيده الخير، وهو على كل شيء قدير.\nبسم اللَّه، اللَّهم إني أسألك خير هذه السوق، وخير ما فيها، وأعوذ بك من شرها وشر ما فيها، اللَّهم إني أعوذ بك أن أصيب بها يميناً فاجرةً، أو صفقة خاسرة.",
      suffix: "",
      virtue:
        "كتب اللَّه له ألف ألف حسنة، ومحا عنه ألف ألف سيئة، ورفع له ألف ألف درجة، وفي رواية: وبنى له بيتاً في الجنة.",
      source: "جامع الترمذي 3428",
    },
    en: {
      title: "Supplication upon entering the market",
      prefix: "",
      text: "There is no deity except Allah alone, without partner. To Him belongs the dominion and to Him belongs all praise. He gives life and causes death, and He is Ever-Living and does not die. In His hand is all good, and He is over all things competent.\nIn the name of Allah. O Allah, I ask You for the good of this market and the good of what is in it, and I seek refuge in You from its evil and the evil of what is in it. O Allah, I seek refuge in You from swearing a false oath in it or making a losing deal.",
      suffix: "",
      virtue:
        "Allah records for him a million good deeds, erases from him a million bad deeds, and raises him a million degrees; in another narration: and He builds for him a house in Paradise.",
      source: "Jami` at-Tirmidhi 3428",
    },
    count: 1,
  },
  {
    id: 39,
    ar: {
      title: "الدعاء عند سماع أصوات الحيوانات",
      prefix: "الدعاء عند صياح الديك:",
      text: "اللَّهم إني أسألك من فضلك.\nالدعاء عند صياح الديك ونهيق الحمار ونباح الكلاب: أعوذ باللَّه من الشيطان الرجيم.",
      suffix:
        "((إذا سمعتم نُباحَ الكلاب ونهيق الحمير بالليل فتعوذوا باللَّه فإنهن يَرَيْنَ ما لا ترون)). صحيح (صحيح سنن أبي داود 3/961)",
      virtue:
        "إذا سمعتم صياح الديك من الليل فاسألوا اللَّه من فضله فإنها رأت ملكاً، وإذا سمعتم نهيق الحمار فتعوذوا باللَّه من الشيطان فإنها رأت شيطاناً.",
      source: "صحيح البخاري 3303، صحيح مسلم 2729، سنن أبي داود",
    },
    en: {
      title: "Supplication upon hearing the sounds of animals",
      prefix: "Supplication upon hearing a rooster crow:",
      text: "O Allah, I ask You of Your bounty.\nSupplication upon hearing a rooster crow, a donkey bray or dogs bark: I seek refuge in Allah from Satan the accursed.",
      suffix:
        '"When you hear dogs barking or donkeys braying at night, seek refuge in Allah, for they see what you do not see." Authentic (Sahih Sunan Abi Dawud 3/961)',
      virtue:
        "When you hear a rooster crow at night, ask Allah of His bounty, for it has seen an angel; and when you hear a donkey bray, seek refuge in Allah from Satan, for it has seen a devil.",
      source: "Sahih al-Bukhari 3303, Sahih Muslim 2729, Sunan Abi Dawud",
    },
    count: 1,
  },
];

export default items;

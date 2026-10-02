import { Zikr } from "../types";

const items: Zikr[] = [
  {
    id: 3,
    ar: {
      title: "دعاء الكرب",
      prefix: "",
      text: "لا إله إلا اللَّه العظيم الحليم، لا إله إلا اللَّه رب العرش العظيم، لا إله إلا اللَّه رب السماوات، ورب الأرض ورب العرش الكريم\nاللَّهم رحمتك أرجو فلا تكلني إلى نفسي طرفة عين وأصلح لي شأني كله، لا إله إلا أنت\nلا إله إلا أنت سبحانك إني كنت من الظالمين\nاللَّه اللَّه ربي لا أشرك به شيئا",
      suffix: "",
      virtue: "",
      source: "صحيح البخاري، سنن أبي داود، جامع الترمذي",
    },
    en: {
      title: "Supplication in times of distress",
      prefix: "",
      text: "There is no deity except Allah, the Mighty, the Forbearing. There is no deity except Allah, Lord of the Mighty Throne. There is no deity except Allah, Lord of the heavens, Lord of the earth and Lord of the Noble Throne.\nO Allah, it is Your mercy that I hope for, so do not leave me to myself even for the blink of an eye, and set right all my affairs. There is no deity except You.\nThere is no deity except You, glory be to You; indeed, I have been of the wrongdoers.\nAllah, Allah is my Lord; I do not associate anything with Him.",
      suffix: "",
      virtue: "",
      source: "Sahih al-Bukhari, Sunan Abi Dawud, Jami` at-Tirmidhi",
    },
    count: 1,
  },
  {
    id: 4,
    ar: {
      title: "دعاء الهم والحزن",
      prefix: "",
      text: "اللَّهم إني عبدك ابن عبدك ابن أمتك ناصيتي بيدك ماض في حكمك، عدل في قضاؤك أسألك بكل اسم هو لك سميت به نفسك أو أنزلته في كتابك، أو علمته أحداً من خلقك أو استأثرت به في علم الغيب عندك أن تجعل القرآن ربيع قلبي، ونور صدري وجلاء حزني وذهاب همي.\nاللَّهم إني أعوذ بك من الهم والحزن والعجز والكسل والبخل والجبن، وضلع الدين وغلبة الرجال.",
      suffix: "",
      virtue:
        "ورد أن من قال الدعاء الأول أذهب الله همه وحزنه وأبدله مكانه فرحًا.",
      source: "مسند أحمد، صحيح البخاري",
    },
    en: {
      title: "Supplication for worry and grief",
      prefix: "",
      text: "O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand, Your judgment upon me is assured, and Your decree concerning me is just. I ask You by every name that belongs to You, with which You named Yourself, or revealed in Your Book, or taught to any of Your creation, or kept to Yourself in the knowledge of the unseen with You, that You make the Quran the spring of my heart, the light of my chest, the removal of my sorrow and the departure of my worry.\nO Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from miserliness and cowardice, and from the burden of debt and being overpowered by men.",
      suffix: "",
      virtue:
        "It is reported that whoever says the first supplication, Allah will remove his worry and grief and replace it with joy.",
      source: "Musnad Ahmad, Sahih al-Bukhari",
    },
    count: 1,
  },
  {
    id: 5,
    ar: {
      title: "دعاء قضاء الدين",
      prefix: "",
      text: "اللَّهم اكفنى بحلالك عن حرامك وأغننى بفضلك عمن سواك.",
      suffix: "",
      virtue:
        "علّمه النبي صلى الله عليه وسلم لمكاتَبٍ، وأخبر أنه لو كان عليه مثل جبل دَينًا أدّاه الله عنه.",
      source: "جامع الترمذي 3563",
    },
    en: {
      title: "Supplication for settling debt",
      prefix: "",
      text: "O Allah, suffice me with what You have made lawful against what You have made unlawful, and make me independent by Your bounty of all besides You.",
      suffix: "",
      virtue:
        "The Prophet (peace and blessings be upon him) taught it and said that even if one had a debt like a mountain, Allah would settle it for him.",
      source: "Jami` at-Tirmidhi 3563",
    },
    count: 1,
  },
  {
    id: 16,
    ar: {
      title: "دعـاء من استصعب عليه أمر",
      prefix: "",
      text: "اللَّهم لا سهل إلا ما جعلته سهلا وأنت تجعل الحزن إذا شئت سهلا.",
      suffix: "",
      virtue: "",
      source: "صحيح ابن حبان",
    },
    en: {
      title: "Supplication for one facing a difficult matter",
      prefix: "",
      text: "O Allah, nothing is easy except what You make easy, and You make the difficult easy if You wish.",
      suffix: "",
      virtue: "",
      source: "Sahih Ibn Hibban",
    },
    count: 1,
  },
  {
    id: 29,
    ar: {
      title: "دعاء من أصيب بمصيبة",
      prefix: "",
      text: "إنا للَّه وإنا إليه راجعون، اللَّهم أجرني في مصيبتي واخلف لي خيرا منها.",
      suffix: "",
      virtue: "ما من مسلم تصيبه مصيبة فيقول ذلك إلا أخلف الله له خيرًا منها.",
      source: "صحيح مسلم 918",
    },
    en: {
      title: "Supplication for one struck by a calamity",
      prefix: "",
      text: "Indeed, we belong to Allah, and indeed to Him we will return. O Allah, reward me in my affliction and replace it for me with something better.",
      suffix: "",
      virtue:
        "No Muslim is struck by a calamity and says this except that Allah replaces it for him with something better.",
      source: "Sahih Muslim 918",
    },
    count: 1,
  },
  {
    id: 33,
    ar: {
      title: "دعاء لقاء العدو وذي السلطان",
      prefix: "",
      text: "حسبنا اللَّه ونعم الوكيل\nاللَّهم إنا نجعلك في نحورهم ونعوذ بك من شرورهم\nاللَّهم أنت عضدي، وأنت نصيري، بك أجول وبك أصول وبك أقاتل",
      suffix: "",
      virtue: "",
      source: "صحيح البخاري، سنن أبي داود",
    },
    en: {
      title: "Supplication when meeting an enemy or a person in authority",
      prefix: "",
      text: "Allah is sufficient for us, and He is the best Disposer of affairs.\nO Allah, we place You before them and seek refuge in You from their evils.\nO Allah, You are my support and You are my helper. By You I move, by You I attack, and by You I fight.",
      suffix: "",
      virtue: "",
      source: "Sahih al-Bukhari, Sunan Abi Dawud",
    },
    count: 1,
  },
];

export default items;

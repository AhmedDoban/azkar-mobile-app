import { Zikr } from "../types";

const items: Zikr[] = [
  {
    id: 1,
    ar: {
      prefix:
        "ما يقال عند سماع الأذان\nيَقُولُ مِثْلَ مَا يَقُولُ الـمُؤَذِّنُ إلاَّ فِي حَيَّ عَلَى الصَّلاةِ وَحَيَّ عَلَى الفَلاَحِ فَيَقُولُ:",
      text: "لاَ حَوْلَ وَلا قُوَّةَ إلاَّ باللَّهِ.",
      suffix: "",
      virtue: "من قال ذلك خالصًا من قلبه دخل الجنة.",
      source: "صحيح مسلم 385",
    },
    en: {
      prefix:
        'What is said upon hearing the adhan\nOne repeats what the muezzin says, except at "Come to prayer" and "Come to success", where one says:',
      text: "There is no might and no power except by Allah.",
      suffix: "",
      virtue: "Whoever says this sincerely from the heart will enter Paradise.",
      source: "Sahih Muslim 385",
    },
    count: 1,
  },
  {
    id: 2,
    ar: {
      prefix:
        "عنْ سَعْدِ بْن أَبي وقَّاصٍ رضِيَ اللَّه عنْهُ عَن النبي صَلّى اللَّهُ عَلَيْهِ وسَلَّم أَنَّهُ قَالَ: مَنْ قَال حِينَ يسْمعُ المُؤذِّنَ :",
      text: "أَشْهَد أَنْ لا إِله إِلاَّ اللَّه وحْدهُ لا شَريك لهُ ، وَأَنَّ مُحمَّداً عبْدُهُ وَرسُولُهُ ، رضِيتُ بِاللَّهِ ربًّا ، وبمُحَمَّدٍ رَسُولاً ، وبالإِسْلامِ دِينًا",
      suffix: "غُفِر لَهُ ذَنْبُهُ. رواه مسلم.",
      virtue: "من قاله حين يسمع المؤذن غُفر له ذنبه.",
      source: "صحيح مسلم 386",
    },
    en: {
      prefix:
        "Sa`d ibn Abi Waqqas (may Allah be pleased with him) reported that the Prophet (peace and blessings be upon him) said: Whoever says upon hearing the muezzin:",
      text: "I bear witness that there is no deity except Allah alone, without partner, and that Muhammad is His servant and Messenger. I am pleased with Allah as Lord, with Muhammad as Messenger, and with Islam as religion.",
      suffix: "his sins will be forgiven. Narrated by Muslim.",
      virtue:
        "Whoever says it upon hearing the muezzin will have his sins forgiven.",
      source: "Sahih Muslim 386",
    },
    count: 1,
  },
  {
    id: 3,
    ar: {
      prefix:
        "عَنْ عبْدِ اللَّهِ بْنِ عَمرِو بْنِ العاصِ رضِيَ اللَّه عنْهُما أَنه سَمِع رسُولَ اللَّهِ صَلّى اللَّهُ عَلَيْهِ وسَلَّم يقُولُ :",
      text: "إِذا سمِعْتُمُ النِّداءَ فَقُولُوا مِثْلَ ما يَقُولُ ، ثُمَّ صَلُّوا علَيَّ ، فَإِنَّهُ مَنْ صَلَّى علَيَّ صَلاةً صَلَّى اللَّه عَلَيْهِ بِهَا عشْراً ، ثُمَّ سلُوا اللَّه لي الْوسِيلَةَ ، فَإِنَّهَا مَنزِلَةٌ في الجنَّةِ لا تَنْبَغِي إِلاَّ لعَبْدٍ منْ عِباد اللَّه وَأَرْجُو أَنْ أَكُونَ أَنَا هُو ، فَمنْ سَأَل ليَ الْوسِيلَة حَلَّتْ لَهُ الشَّفاعَةُ.",
      suffix: "رواه مسلم.",
      virtue:
        "من صلى على النبي ﷺ صلاة صلى الله عليه بها عشرًا، ومن سأل له الوسيلة حلت له الشفاعة.",
      source: "صحيح مسلم 384",
    },
    en: {
      prefix:
        "`Abdullah ibn `Amr ibn al-`As (may Allah be pleased with them both) heard the Messenger of Allah (peace and blessings be upon him) say:",
      text: "When you hear the call, say what he says, then send blessings upon me, for whoever sends one blessing upon me, Allah sends ten upon him. Then ask Allah to grant me al-Wasilah, for it is a station in Paradise befitting only one of Allah's servants, and I hope that I will be him. Whoever asks for al-Wasilah for me, intercession becomes due for him.",
      suffix: "Narrated by Muslim.",
      virtue:
        "Whoever sends one blessing upon the Prophet (peace and blessings be upon him), Allah sends ten upon him, and whoever asks for al-Wasilah for him becomes entitled to his intercession.",
      source: "Sahih Muslim 384",
    },
    count: 1,
  },
  {
    id: 4,
    ar: {
      prefix:
        "عَنْ جابرٍ بن عبد اللَّه رضَي اللَّه عنهما أَنَّ رَسُولَ اللَّهِ صَلّى اللَّهُ عَلَيْهِ وسَلَّم قَالَ : من قَال حِين يسْمعُ النِّداءَ :",
      text: "اللَّهُمَّ رَبَّ هذِهِ الدَّعوةِ التَّامَّةِ ، والصَّلاةِ الْقَائِمةِ، آت مُحَمَّداً الْوسِيلَةَ ، والْفَضِيلَة، وابْعثْهُ مقَامًا محْمُوداً الَّذي وعَدْتَه",
      suffix: "حلَّتْ لَهُ شَفَاعتي يوْم الْقِيامِة. رواه البخاري.",
      virtue: "من قاله حين يسمع النداء حلت له شفاعة النبي ﷺ يوم القيامة.",
      source: "صحيح البخاري 614",
    },
    en: {
      prefix:
        "Jabir ibn `Abdullah (may Allah be pleased with them both) reported that the Messenger of Allah (peace and blessings be upon him) said: Whoever says upon hearing the call:",
      text: "O Allah, Lord of this perfect call and the prayer about to be established, grant Muhammad al-Wasilah and al-Fadilah, and raise him to the praised station that You have promised him,",
      suffix:
        "my intercession will be due for him on the Day of Resurrection. Narrated by al-Bukhari.",
      virtue:
        "Whoever says it upon hearing the call will be granted the Prophet's intercession on the Day of Resurrection.",
      source: "Sahih al-Bukhari 614",
    },
    count: 1,
  },
  {
    id: 5,
    ar: {
      title: "ما يقال بعد سماع الأذان",
      prefix: "",
      text: "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ.\nاللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، والصَّلاةِ القَائِمَةِ، آتِ مُـحَمَّداً الوَسِيْلَةَ والفَضِيْلَةَ، وابْعَثْهُ مَقَاماً مَـحْمُوداً الَّذِي وَعَدْتَهُ، إنَّكَ لا تُخْلِفُ الـمِيْعَادِ.",
      suffix: "",
      virtue:
        "من قال دعاء الوسيلة حين يسمع النداء حلت له شفاعة النبي ﷺ يوم القيامة.",
      source: "صحيح البخاري 614، وزيادة «إنك لا تخلف الميعاد» عند البيهقي",
    },
    en: {
      title: "What is said after hearing the adhan",
      prefix: "",
      text: "O Allah, send prayers, peace and blessings upon our master Muhammad.\nO Allah, Lord of this perfect call and the prayer about to be established, grant Muhammad al-Wasilah and al-Fadilah, and raise him to the praised station that You have promised him. Indeed, You do not break Your promise.",
      suffix: "",
      virtue:
        "Whoever says the supplication for al-Wasilah upon hearing the call will be granted the Prophet's intercession on the Day of Resurrection.",
      source:
        'Sahih al-Bukhari 614; the addition "Indeed, You do not break Your promise" is reported by al-Bayhaqi',
    },
    count: 1,
  },
  {
    id: 6,
    ar: {
      prefix:
        "ما يقال بين الأذان والإقامة\nما بين الأذان والإقامة فالدعاء عندئذٍ مرغّب فيه ومستحب.",
      text: "قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: الدُّعَاءُ لَا يُرَدُّ بَيْنَ الْأَذَانِ وَالْإِقَامَةِ. قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: إِنَّ الدُّعَاءَ لَا يُرَدُّ بَيْنَ الْأَذَانِ وَالْإِقَامَةِ فَادْعُوا.",
      suffix: "",
      virtue: "الدعاء بين الأذان والإقامة لا يُرد.",
      source: "سنن أبي داود 521، جامع الترمذي 212",
    },
    en: {
      prefix:
        "What is said between the adhan and the iqamah\nThe time between the adhan and the iqamah is one in which supplication is encouraged and recommended.",
      text: "The Messenger of Allah (peace and blessings be upon him) said: Supplication is not rejected between the adhan and the iqamah. The Messenger of Allah (peace and blessings be upon him) said: Indeed, supplication is not rejected between the adhan and the iqamah, so supplicate.",
      suffix: "",
      virtue:
        "Supplication made between the adhan and the iqamah is not rejected.",
      source: "Sunan Abi Dawud 521, Jami` at-Tirmidhi 212",
    },
    count: 1,
  },
  {
    id: 7,
    ar: {
      title: "نص صيغة الأذان",
      prefix: "",
      text: "اللَّهُ أكْبَرُ ، اللَّهُ أكْبَرُ\nاللَّهُ أكْبَرُ ، اللَّهُ أكْبَرُ\nأشْهَدُ أنْ لا إلَهَ إلاَّ اللَّهُ\nأشْهَدُ أنْ لا إلَهَ إلاَّ اللَّهُ\nأشْهَدُ أنَّ مُحَمَّداً رَسُولُ اللَّهِ\nأشْهَدُ أنَّ مُحَمَّداً رَسُولُ اللَّهِ\nحَيَّ عَلَى الصَّلاةِ\nحَيَّ عَلَى الصَّلاةِ\nحَيَّ عَلَى الفَلاحِ\nحَيَّ عَلَى الفَلاحِ\nاللَّهُ أكْبَرُ ، اللَّهُ أكْبَرُ\nلاَ إلَهَ إلاَّ اللَّهُ",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود",
    },
    en: {
      title: "The wording of the adhan",
      prefix: "",
      text: "Allah is the Greatest, Allah is the Greatest\nAllah is the Greatest, Allah is the Greatest\nI bear witness that there is no deity except Allah\nI bear witness that there is no deity except Allah\nI bear witness that Muhammad is the Messenger of Allah\nI bear witness that Muhammad is the Messenger of Allah\nCome to prayer\nCome to prayer\nCome to success\nCome to success\nAllah is the Greatest, Allah is the Greatest\nThere is no deity except Allah",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud",
    },
    count: 1,
  },
  {
    id: 8,
    ar: {
      title: "نص صيغة أذان الفجر",
      prefix: "",
      text: "اللَّهُ أكْبَرُ ، اللَّهُ أكْبَرُ\nاللَّهُ أكْبَرُ ، اللَّهُ أكْبَرُ\nأشْهَدُ أنْ لا إلَهَ إلاَّ اللَّهُ\nأشْهَدُ أنْ لا إلَهَ إلاَّ اللَّهُ\nأشْهَدُ أنَّ مُحَمَّداً رَسُولُ اللَّهِ\nأشْهَدُ أنَّ مُحَمَّداً رَسُولُ اللَّهِ\nحَيَّ عَلَى الصَّلاةِ\nحَيَّ عَلَى الصَّلاةِ\nحَيَّ عَلَى الفَلاحِ\nحَيَّ عَلَى الفَلاحِ\nالصلاةُ خيرٌ مِنَ النوم\nالصلاةُ خيرٌ من النوم\nاللَّهُ أكْبَرُ ، اللَّهُ أكْبَرُ\nلاَ إلَهَ إلاَّ اللَّهُ",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود",
    },
    en: {
      title: "The wording of the Fajr adhan",
      prefix: "",
      text: "Allah is the Greatest, Allah is the Greatest\nAllah is the Greatest, Allah is the Greatest\nI bear witness that there is no deity except Allah\nI bear witness that there is no deity except Allah\nI bear witness that Muhammad is the Messenger of Allah\nI bear witness that Muhammad is the Messenger of Allah\nCome to prayer\nCome to prayer\nCome to success\nCome to success\nPrayer is better than sleep\nPrayer is better than sleep\nAllah is the Greatest, Allah is the Greatest\nThere is no deity except Allah",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud",
    },
    count: 1,
  },
  {
    id: 9,
    ar: {
      title: "نص صيغة الإقامة",
      prefix: "",
      text: "اللَّهُ أكْبَرُ ، اللَّهُ أكْبَرُ\nأشْهَدُ أنْ لا إلَهَ إلاَّ اللَّهُ\nأشْهَدُ أنَّ مُحَمَّداً رَسُولُ اللَّهِ\nحَيَّ عَلَى الصَّلاةِ\nحَيَّ عَلَى الفَلاحِ\nقد قامت الصلاةُ\nقد قامت الصلاةُ\nاللَّهُ أكْبَرُ ، اللَّهُ أكْبَرُ\nلاَ إلَهَ إلاَّ اللَّهُ",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود",
    },
    en: {
      title: "The wording of the iqamah",
      prefix: "",
      text: "Allah is the Greatest, Allah is the Greatest\nI bear witness that there is no deity except Allah\nI bear witness that Muhammad is the Messenger of Allah\nCome to prayer\nCome to success\nThe prayer has been established\nThe prayer has been established\nAllah is the Greatest, Allah is the Greatest\nThere is no deity except Allah",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud",
    },
    count: 1,
  },
];

export default items;

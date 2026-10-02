import { Zikr } from "../types";

const items: Zikr[] = [
  {
    id: 1,
    ar: {
      prefix: "أَعُوذُ بِاللَّهِ مِنْ الشَّيْطَانِ الرَّجِيمِ",
      text: "اللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ.",
      suffix: "[آية الكرسي - البقرة 255]",
      virtue:
        "من قرأ آية الكرسي، وُكِّل به من الله حافظ، ولا يقربه شيطان حتى يصبح.",
      source: "صحيح البخاري 2311",
    },
    en: {
      prefix: "I seek refuge in Allah from Satan, the accursed.",
      text: "Allah—there is no deity except Him, the Ever-Living, the Sustainer of all. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what is behind them, and they encompass nothing of His knowledge except what He wills. His Throne extends over the heavens and the earth, and preserving them does not tire Him. And He is the Most High, the Most Great.",
      suffix: "[Ayat al-Kursi - Al-Baqarah 255]",
      virtue:
        "Whoever recites Ayat al-Kursi will have a guardian from Allah protecting them, and Satan will not come near them until morning.",
      source: "Sahih al-Bukhari 2311",
    },
    count: 1,
  },
  {
    id: 2,
    ar: {
      prefix: "أَعُوذُ بِاللَّهِ مِنْ الشَّيْطَانِ الرَّجِيمِ",
      text: "آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ. لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَّسِينَآ أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ.",
      suffix: "[البقرة 285 - 286]",
      virtue: "من قرأ الآيتين من آخر سورة البقرة في ليلة كفتاه.",
      source: "صحيح البخاري 5009",
    },
    en: {
      prefix: "I seek refuge in Allah from Satan, the accursed.",
      text: 'The Messenger has believed in what was revealed to him from his Lord, and so have the believers. All of them have believed in Allah, His angels, His books and His messengers, [saying]: "We make no distinction between any of His messengers." And they say: "We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the final destination." Allah does not burden a soul beyond its capacity. It will have [the reward of] what it has earned, and it will bear [the consequence of] what it has incurred. "Our Lord, do not take us to task if we forget or err. Our Lord, do not lay upon us a burden like that which You laid upon those before us. Our Lord, do not burden us with that which we have no strength to bear. Pardon us, forgive us and have mercy upon us. You are our Protector, so give us victory over the disbelieving people."',
      suffix: "[Al-Baqarah 285 - 286]",
      virtue:
        "Whoever recites the last two verses of Surat al-Baqarah at night, they will suffice him.",
      source: "Sahih al-Bukhari 5009",
    },
    count: 1,
  },
  {
    id: 3,
    ar: {
      prefix: "بِسْمِ اللَّهِ الرَّحْمنِ الرَّحِيم",
      text: "قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ.",
      suffix: "",
      virtue:
        "تُقرأ ثلاث مرات صباحًا ومساءً مع المعوذتين، وقد ورد أن ذلك يكفي من كل شيء.",
      source: "جامع الترمذي 3575",
    },
    en: {
      prefix: "In the name of Allah, the Most Gracious, the Most Merciful.",
      text: "Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.",
      suffix: "",
      virtue:
        "Reciting it three times in the morning and evening together with Al-Falaq and An-Nas is reported to suffice a person against everything.",
      source: "Jami` at-Tirmidhi 3575",
    },
    count: 3,
  },
  {
    id: 4,
    ar: {
      prefix: "بِسْمِ اللَّهِ الرَّحْمنِ الرَّحِيم",
      text: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.",
      suffix: "",
      virtue:
        "تُقرأ ثلاث مرات صباحًا ومساءً مع الإخلاص والناس، وقد ورد أن ذلك يكفي من كل شيء.",
      source: "جامع الترمذي 3575",
    },
    en: {
      prefix: "In the name of Allah, the Most Gracious, the Most Merciful.",
      text: "Say: I seek refuge in the Lord of daybreak, from the evil of what He has created, and from the evil of darkness when it settles, and from the evil of those who blow on knots, and from the evil of an envier when he envies.",
      suffix: "",
      virtue:
        "It is recited three times in the morning and evening with Al-Ikhlas and An-Nas, and it is reported that they suffice a person against everything.",
      source: "Jami` at-Tirmidhi 3575",
    },
    count: 3,
  },
  {
    id: 5,
    ar: {
      prefix: "بِسْمِ اللَّهِ الرَّحْمنِ الرَّحِيم",
      text: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ.",
      suffix: "",
      virtue:
        "تُقرأ ثلاث مرات صباحًا ومساءً مع الإخلاص والفلق، وقد ورد أن ذلك يكفي من كل شيء.",
      source: "جامع الترمذي 3575",
    },
    en: {
      prefix: "In the name of Allah, the Most Gracious, the Most Merciful.",
      text: "Say: I seek refuge in the Lord of mankind, the King of mankind, the God of mankind, from the evil of the whisperer who withdraws, who whispers in the hearts of mankind, from among the jinn and mankind.",
      suffix: "",
      virtue:
        "It is recited three times in the morning and evening with Al-Ikhlas and Al-Falaq, and it is reported that they suffice a person against everything.",
      source: "Jami` at-Tirmidhi 3575",
    },
    count: 3,
  },
  {
    id: 6,
    ar: {
      prefix: "",
      text: "أَمْسَيْـنا وَأَمْسـى المـلكُ للَّه وَالحَمدُ للَّه ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذهِ اللَّـيْلَةِ وَخَـيرَ ما بَعْـدَهـا ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذهِ اللَّـيْلةِ وَشَرِّ ما بَعْـدَهـا ، رَبِّ أَعـوذُ بِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر.",
      suffix: "",
      virtue:
        "ورد هذا الدعاء من أذكار الصباح والمساء، ويتضمن سؤال خير الليلة والاستعاذة من شرها ومن عذاب النار والقبر.",
      source: "صحيح مسلم",
    },
    en: {
      prefix: "",
      text: "We have entered the evening and the dominion belongs to Allah. Praise belongs to Allah. There is no deity except Allah alone, without partner. To Him belongs the dominion and praise, and He is capable of all things. My Lord, I ask You for the good of this night and the good that follows it, and I seek refuge in You from the evil of this night and the evil that follows it. My Lord, I seek refuge in You from laziness and the weakness of old age. My Lord, I seek refuge in You from punishment in the Fire and punishment in the grave.",
      suffix: "",
      virtue:
        "This is an established morning and evening supplication containing requests for the good of the night and protection from its evil and from the punishment of the Fire and the grave.",
      source: "Sahih Muslim",
    },
    count: 1,
  },
  {
    id: 7,
    ar: {
      prefix: "",
      text: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُ بِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ .",
      suffix: "",
      virtue:
        "هذا هو سيد الاستغفار، وقد ورد أن من قاله موقنًا به في النهار ثم مات قبل أن يمسي دخل الجنة، ومن قاله في الليل ثم مات قبل أن يصبح دخل الجنة.",
      source: "صحيح البخاري 6306",
    },
    en: {
      prefix: "",
      text: "O Allah, You are my Lord. There is no deity except You. You created me and I am Your servant. I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your blessings upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.",
      suffix: "",
      virtue:
        "This is the Master of seeking forgiveness. Whoever says it with certainty during the day and dies before evening, or says it at night and dies before morning, is promised Paradise.",
      source: "Sahih al-Bukhari 6306",
    },
    count: 1,
  },
  {
    id: 8,
    ar: {
      prefix: "",
      text: "رَضيـتُ بِاللَّهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى اللَّه عليه وسلم نَبِيّـاً.",
      suffix: "",
      virtue:
        "من قالها ثلاثًا حين يصبح وحين يمسي كان حقًّا على الله أن يرضيه يوم القيامة.",
      source: "سنن أبي داود 5072",
    },
    en: {
      prefix: "",
      text: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace and blessings be upon him) as my Prophet.",
      suffix: "",
      virtue:
        "Whoever says it three times in the morning and evening, it is a right upon Allah to please him on the Day of Resurrection.",
      source: "Sunan Abi Dawud 5072",
    },
    count: 3,
  },
  {
    id: 9,
    ar: {
      prefix: "",
      text: "اللّهُـمَّ إِنِّـي أَمسيتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللَّهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك.",
      suffix: "",
      virtue: "من قالها أربع مرات حين يصبح أو يمسي أعتقه الله من النار.",
      source: "سنن أبي داود 5069",
    },
    en: {
      prefix: "",
      text: "O Allah, I have entered the evening calling You to witness, and calling the bearers of Your Throne, Your angels and all of Your creation to witness, that You are Allah, there is no deity except You alone, without partner, and that Muhammad is Your servant and Your Messenger.",
      suffix: "",
      virtue:
        "Whoever says it four times in the morning or evening, Allah will free him from the Fire.",
      source: "Sunan Abi Dawud 5069",
    },
    count: 4,
  },
  {
    id: 10,
    ar: {
      prefix: "",
      text: "اللّهُـمَّ ما أَمسى بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر.",
      suffix: "",
      virtue: "من قاله حين يمسي فقد أدّى شكر ليلته.",
      source: "سنن أبي داود 5073",
    },
    en: {
      prefix: "",
      text: "O Allah, whatever blessing has come to me or to any of Your creation this evening is from You alone, without partner. So to You belongs all praise and to You belongs all thanks.",
      suffix: "",
      virtue:
        "Whoever says it in the evening has fulfilled the gratitude due for his night.",
      source: "Sunan Abi Dawud 5073",
    },
    count: 1,
  },
  {
    id: 11,
    ar: {
      prefix: "",
      text: "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.",
      suffix: "",
      virtue:
        "من قالها حين يصبح وحين يمسي سبع مرات كفاه الله ما أهمّه من أمر الدنيا والآخرة.",
      source: "سنن أبي داود",
    },
    en: {
      prefix: "",
      text: "Allah is sufficient for me. There is no deity except Him. Upon Him I rely, and He is the Lord of the Mighty Throne.",
      suffix: "",
      virtue:
        "Whoever says it seven times in the morning and evening, Allah will suffice him in whatever concerns him of this world and the Hereafter.",
      source: "Sunan Abi Dawud",
    },
    count: 7,
  },
  {
    id: 12,
    ar: {
      prefix: "",
      text: "بِسـمِ اللَّهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم.",
      suffix: "",
      virtue: "من قالها ثلاث مرات حين يصبح وحين يمسي لم يضره شيء.",
      source: "سنن أبي داود 5088",
    },
    en: {
      prefix: "",
      text: "In the name of Allah, with whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.",
      suffix: "",
      virtue:
        "Whoever says it three times in the morning and evening, nothing will harm him.",
      source: "Sunan Abi Dawud 5088",
    },
    count: 3,
  },
  {
    id: 13,
    ar: {
      prefix: "",
      text: "اللّهُـمَّ بِكَ أَمْسَـينا وَبِكَ أَصْـبَحْنا، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ الْمَصِيرُ.",
      suffix: "",
      virtue: "",
      source: "جامع الترمذي",
    },
    en: {
      prefix: "",
      text: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the final return.",
      suffix: "",
      virtue: "",
      source: "Jami` at-Tirmidhi",
    },
    count: 1,
  },
  {
    id: 14,
    ar: {
      prefix: "",
      text: "أَمْسَيْنَا عَلَى فِطْرَةِ الإسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ المُشْرِكِينَ.",
      suffix: "",
      virtue: "",
      source: "مسند أحمد",
    },
    en: {
      prefix: "",
      text: "We have entered the evening upon the natural religion of Islam, upon the word of sincerity, upon the religion of our Prophet Muhammad (peace and blessings be upon him), and upon the way of our father Ibrahim, who was upright and a Muslim, and he was not of the polytheists.",
      suffix: "",
      virtue: "",
      source: "Musnad Ahmad",
    },
    count: 1,
  },
  {
    id: 15,
    ar: {
      prefix: "",
      text: "سُبْحـانَ اللَّهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه.",
      suffix: "",
      virtue:
        "هذه الكلمات تعدل في الثواب كثيرًا من الذكر، فقد قال النبي ﷺ إنها لو وُزنت بما قيل منذ الصباح لوزنته.",
      source: "صحيح مسلم 2726",
    },
    en: {
      prefix: "",
      text: "Glory be to Allah and praise be to Him, as many times as the number of His creation, as much as pleases Him, as much as the weight of His Throne, and as much as the ink of His words.",
      suffix: "",
      virtue:
        "These words carry great reward; the Prophet ﷺ said that if they were weighed against all the remembrance said since the morning, they would outweigh it.",
      source: "Sahih Muslim 2726",
    },
    count: 3,
  },
  {
    id: 16,
    ar: {
      prefix: "",
      text: "اللّهُـمَّ عافِـني في بَدَنـي ، اللّهُـمَّ عافِـني في سَمْـعي ، اللّهُـمَّ عافِـني في بَصَـري ، لا إلهَ إلاّ أَنْـتَ.",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود 5090",
    },
    en: {
      prefix: "",
      text: "O Allah, grant me well-being in my body. O Allah, grant me well-being in my hearing. O Allah, grant me well-being in my sight. There is no deity except You.",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud 5090",
    },
    count: 3,
  },
  {
    id: 17,
    ar: {
      prefix: "",
      text: "اللّهُـمَّ إِنّـي أَعـوذُ بِكَ مِنَ الْكُـفر ، وَالفَـقْر ، وَأَعـوذُ بِكَ مِنْ عَذابِ القَـبْر ، لا إلهَ إلاّ أَنْـتَ.",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود 5090",
    },
    en: {
      prefix: "",
      text: "O Allah, I seek refuge in You from disbelief and poverty, and I seek refuge in You from the punishment of the grave. There is no deity except You.",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud 5090",
    },
    count: 3,
  },
  {
    id: 18,
    ar: {
      prefix: "",
      text: "اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في الدُّنْـيا وَالآخِـرَة ، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في ديني وَدُنْـيايَ وَأهْـلي وَمالـي ، اللّهُـمَّ اسْتُـرْ عـوْراتي وَآمِـنْ رَوْعاتـي ، اللّهُـمَّ احْفَظْـني مِن بَـينِ يَدَيَّ وَمِن خَلْفـي وَعَن يَمـيني وَعَن شِمـالي ، وَمِن فَوْقـي ، وَأَعـوذُ بِعَظَمَـتِكَ أَن أُغْـتالَ مِن تَحْتـي.",
      suffix: "",
      virtue: "كان النبي ﷺ لا يدع هؤلاء الدعوات حين يمسي وحين يصبح.",
      source: "سنن أبي داود 5074",
    },
    en: {
      prefix: "",
      text: "O Allah, I ask You for pardon and well-being in this world and the Hereafter. O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family and my wealth. O Allah, cover my faults and calm my fears. O Allah, protect me from in front of me and behind me, from my right and my left, and from above me, and I seek refuge in Your greatness from being struck down from beneath me.",
      suffix: "",
      virtue:
        "The Prophet ﷺ never left these supplications in the evening and the morning.",
      source: "Sunan Abi Dawud 5074",
    },
    count: 1,
  },
  {
    id: 19,
    ar: {
      prefix: "",
      text: "يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أسْتَغِيثُ أصْلِحْ لِي شَأنِي كُلَّهُ وَلاَ تَكِلْنِي إلَى نَفْسِي طَـرْفَةَ عَيْنٍ.",
      suffix: "",
      virtue: "",
      source: "مستدرك الحاكم",
    },
    en: {
      prefix: "",
      text: "O Ever-Living, O Sustainer of all, by Your mercy I seek help. Set right all my affairs, and do not leave me to myself even for the blink of an eye.",
      suffix: "",
      virtue: "",
      source: "Al-Mustadrak of al-Hakim",
    },
    count: 3,
  },
  {
    id: 20,
    ar: {
      prefix: "",
      text: "أَمْسَيْنا وَأَمْسَى الْمُلْكُ للَّهِ رَبِّ الْعَالَمِينَ، اللَّهُمَّ إِنِّي أسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ فَتْحَهَا ونَصْرَهَا، ونُوْرَهَا وبَرَكَتهَا، وَهُدَاهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهَا وَشَرِّ مَا بَعْدَهَا.",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود 5084",
    },
    en: {
      prefix: "",
      text: "We have entered the evening and the dominion belongs to Allah, Lord of the worlds. O Allah, I ask You for the good of this night: its opening, its victory, its light, its blessing and its guidance. And I seek refuge in You from the evil of what is in it and the evil of what comes after it.",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud 5084",
    },
    count: 1,
  },
  {
    id: 21,
    ar: {
      prefix: "",
      text: "اللّهُـمَّ عالِـمَ الغَـيْبِ وَالشّـهادَةِ فاطِـرَ السّماواتِ وَالأرْضِ رَبَّ كـلِّ شَـيءٍ وَمَليـكَه ، أَشْهَـدُ أَنْ لا إِلـهَ إِلاّ أَنْت ، أَعـوذُ بِكَ مِن شَـرِّ نَفْسـي وَمِن شَـرِّ الشَّيْـطانِ وَشِرْكِهِ ، وَأَنْ أَقْتَـرِفَ عَلـى نَفْسـي سوءاً أَوْ أَجُـرَّهُ إِلـى مُسْـلِم.",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود",
    },
    en: {
      prefix: "",
      text: "O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Sovereign of all things, I bear witness that there is no deity except You. I seek refuge in You from the evil of my own soul, from the evil of Satan and his call to associate partners with You, and from committing wrong against myself or bringing it upon a Muslim.",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud",
    },
    count: 1,
  },
  {
    id: 22,
    ar: {
      prefix: "",
      text: "أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق.",
      suffix: "",
      virtue: "من قالها حين يمسي لم يضره شيء.",
      source: "صحيح مسلم 2709",
    },
    en: {
      prefix: "",
      text: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
      suffix: "",
      virtue: "Whoever says it in the evening, nothing will harm him.",
      source: "Sahih Muslim 2709",
    },
    count: 3,
  },
  {
    id: 23,
    ar: {
      prefix: "",
      text: "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد.",
      suffix: "",
      virtue: "",
      source: "",
    },
    en: {
      prefix: "",
      text: "O Allah, send prayers, peace and blessings upon our Prophet Muhammad.",
      suffix: "",
      virtue: "",
      source: "",
    },
    count: 10,
  },
  {
    id: 24,
    ar: {
      prefix: "",
      text: "اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ ، وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُهُ.",
      suffix: "",
      virtue: "",
      source: "مسند أحمد",
    },
    en: {
      prefix: "",
      text: "O Allah, we seek refuge in You from knowingly associating anything with You, and we seek Your forgiveness for what we do not know.",
      suffix: "",
      virtue: "",
      source: "Musnad Ahmad",
    },
    count: 3,
  },
  {
    id: 25,
    ar: {
      prefix: "",
      text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ، وَقَهْرِ الرِّجَالِ.",
      suffix: "",
      virtue: "",
      source: "سنن أبي داود",
    },
    en: {
      prefix: "",
      text: "O Allah, I seek refuge in You from worry and grief, I seek refuge in You from incapacity and laziness, I seek refuge in You from cowardice and miserliness, and I seek refuge in You from being overwhelmed by debt and from being subdued by men.",
      suffix: "",
      virtue: "",
      source: "Sunan Abi Dawud",
    },
    count: 3,
  },
  {
    id: 26,
    ar: {
      prefix: "",
      text: "أسْتَغْفِرُ اللَّهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهِ.",
      suffix: "",
      virtue: "من قالها غُفر له وإن كان فرّ من الزحف.",
      source: "جامع الترمذي 3577",
    },
    en: {
      prefix: "",
      text: "I seek the forgiveness of Allah the Almighty, besides whom there is no deity, the Ever-Living, the Sustainer of all, and I repent to Him.",
      suffix: "",
      virtue:
        "Whoever says it will be forgiven, even if he had fled from the battlefield.",
      source: "Jami` at-Tirmidhi 3577",
    },
    count: 3,
  },
  {
    id: 27,
    ar: {
      prefix: "",
      text: "يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ.",
      suffix: "",
      virtue: "",
      source: "سنن ابن ماجه",
    },
    en: {
      prefix: "",
      text: "O my Lord, to You belongs all praise as befits the majesty of Your Face and the greatness of Your authority.",
      suffix: "",
      virtue: "",
      source: "Sunan Ibn Majah",
    },
    count: 3,
  },
  {
    id: 28,
    ar: {
      prefix: "",
      text: "لَا إلَه إلّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
      suffix: "",
      virtue:
        "من قالها في يوم مائة مرة كانت له عدل عشر رقاب، وكُتبت له مائة حسنة، ومُحيت عنه مائة سيئة، وكانت له حرزًا من الشيطان يومه ذلك حتى يمسي.",
      source: "صحيح البخاري 3293",
    },
    en: {
      prefix: "",
      text: "There is no deity except Allah alone, without partner. To Him belongs the dominion and to Him belongs all praise, and He is capable of all things.",
      suffix: "",
      virtue:
        "Whoever says it one hundred times in a day will have the reward of freeing ten slaves, one hundred good deeds will be written for him, one hundred bad deeds will be erased, and it will be a protection for him from Satan that day until evening.",
      source: "Sahih al-Bukhari 3293",
    },
    count: 100,
  },
  {
    id: 29,
    ar: {
      prefix: "",
      text: "اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ ، عَلَيْكَ تَوَكَّلْتُ ، وَأَنْتَ رَبُّ الْعَرْشِ الْعَظِيمِ , مَا شَاءَ اللَّهُ كَانَ ، وَمَا لَمْ يَشَأْ لَمْ يَكُنْ ، وَلا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ , أَعْلَمُ أَنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ، وَأَنَّ اللَّهَ قَدْ أَحَاطَ بِكُلِّ شَيْءٍ عِلْمًا , اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي ، وَمِنْ شَرِّ كُلِّ دَابَّةٍ أَنْتَ آخِذٌ بِنَاصِيَتِهَا ، إِنَّ رَبِّي عَلَى صِرَاطٍ مُسْتَقِيمٍ.",
      suffix: "",
      virtue: "",
      source: "",
    },
    en: {
      prefix: "",
      text: "O Allah, You are my Lord. There is no deity except You. Upon You I rely, and You are the Lord of the Mighty Throne. Whatever Allah wills happens, and whatever He does not will does not happen. There is no power and no strength except with Allah, the Most High, the Most Great. I know that Allah is capable of all things, and that Allah encompasses all things in knowledge. O Allah, I seek refuge in You from the evil of my own soul and from the evil of every creature whose forelock You hold. Indeed, my Lord is on a straight path.",
      suffix: "",
      virtue: "",
      source: "",
    },
    count: 1,
  },
  {
    id: 30,
    ar: {
      prefix: "",
      text: "سُبْحـانَ اللَّهِ وَبِحَمْـدِهِ.",
      suffix: "",
      virtue:
        "من قال حين يصبح وحين يمسي: سبحان الله وبحمده مائة مرة، لم يأتِ أحد يوم القيامة بأفضل مما جاء به إلا أحد قال مثل ما قال أو زاد عليه.",
      source: "صحيح مسلم 2692",
    },
    en: {
      prefix: "",
      text: "Glory be to Allah and praise be to Him.",
      suffix: "",
      virtue:
        "Whoever says it one hundred times in the morning and evening, no one will come on the Day of Resurrection with anything better, except someone who said the same or more.",
      source: "Sahih Muslim 2692",
    },
    count: 100,
  },
];

export default items;

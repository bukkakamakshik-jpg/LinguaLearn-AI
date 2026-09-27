export interface Story {
  id: string;
  stageId: string;
  title: string;
  emoji: string;
  level: string;
  summary: string;
  paragraphs: {
    english: string;
    native: string;
  }[];
  vocabulary: {
    word: string;
    meaning: string;
    telugu: string;
  }[];
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export const STORIES: Story[] = [
  {
    id: 'story-1',
    stageId: 'basic',
    title: 'The Thirsty Crow',
    emoji: '🦅',
    level: 'Basic',
    summary: 'A clever crow uses pebbles to raise the water level in a pitcher on a hot summer afternoon.',
    paragraphs: [
      {
        english: 'On a very hot summer afternoon, a thirsty crow flew across the fields in search of water.',
        native: 'ఒక వేసవి మధ్యాహ్నం, ఒక దాహంతో ఉన్న కాకి నీటి కోసం పొలాల మీదుగా ఎగిరింది.'
      },
      {
        english: 'For a long time, he could not find any water. He felt very weak and lost all hope.',
        native: 'చాలా సేపు వరకు అతనికి నీరు దొరకలేదు. అతడు చాలా నీరసంగా భావించాడు మరియు ఆశ కోల్పోయాడు.'
      },
      {
        english: 'Suddenly, he saw a water pitcher under a tall mango tree. He flew straight down to it.',
        native: 'అకస్మాత్తుగా, ఒక ఎత్తైన మామిడి చెట్టు కింద ఒక నీటి కూజాను చూశాడు. నేరుగా దాని వద్దకు ఎగిరాడు.'
      },
      {
        english: 'Inside the pitcher, there was a little water at the bottom. His beak could not reach it.',
        native: 'కూజా అడుగున కొద్దిగా నీరు ఉంది. అతని ముక్కు దానిని చేరలేకపోయింది.'
      },
      {
        english: 'The clever crow looked around and saw small pebbles on the ground. He picked them up one by one with his beak.',
        native: 'తెలివైన కాకి చుట్టూ చూసి నేలపై ఉన్న చిన్న గులకరాళ్లను చూశాడు. ముక్కుతో ఒక్కొక్కటిగా ఎత్తి కూజాలో వేశాడు.'
      },
      {
        english: 'As more pebbles filled the pitcher, the water rose to the top. The crow drank the cool water happily and flew away.',
        native: 'రాళ్ళు పడటంతో నీటి మట్టం పైకి వచ్చింది. కాకి సంతోషంగా నీరు తాగి ఎగిరిపోయింది.'
      }
    ],
    vocabulary: [
      { word: 'Thirsty', meaning: 'Needing water to drink', telugu: 'దాహం' },
      { word: 'Pitcher', meaning: 'A large clay container for holding liquids', telugu: 'నీటి కూజా' },
      { word: 'Pebbles', meaning: 'Small, rounded stones', telugu: 'గులకరాళ్లు' },
      { word: 'Beak', meaning: 'The hard pointed mouth of a bird', telugu: 'పక్షి ముక్కు' }
    ],
    quizQuestions: [
      {
        question: 'Why was the crow flying across the fields?',
        options: ['Looking for water', 'Looking for food', 'Playing with friends', 'Building a nest'],
        correctAnswer: 'Looking for water',
        explanation: 'The crow was very thirsty on a hot summer day and searched for water.',
      },
      {
        question: 'What was the problem with the water in the pitcher?',
        options: ['It was at the very bottom', 'It was too hot', 'It was dirty', 'The pitcher was broken'],
        correctAnswer: 'It was at the very bottom',
        explanation: 'His beak could not reach the bottom of the pitcher.',
      },
      {
        question: 'How did the crow solve the problem?',
        options: [
          'By dropping pebbles into the pitcher',
          'By breaking the pitcher',
          'By calling other birds',
          'By waiting for rain'
        ],
        correctAnswer: 'By dropping pebbles into the pitcher',
        explanation: 'Dropping pebbles raised the water level so he could drink.',
      }
    ]
  },
  {
    id: 'story-2',
    stageId: 'beginner',
    title: 'Ravi’s First Day at School',
    emoji: '🎒',
    level: 'Beginner',
    summary: 'Ravi feels nervous on his first day at a new school, but makes wonderful friends through kindness.',
    paragraphs: [
      {
        english: 'Ravi wore his neat blue uniform and packed his new school bag with colorful pencils and notebooks.',
        native: 'రవి తన నీలిరంగు యూనిఫాం ధరించి, రంగురంగుల పెన్సిళ్లు మరియు నోట్‌బుక్‌లతో తన కొత్త స్కూల్ బ్యాగ్‌ను సర్దుకున్నాడు.'
      },
      {
        english: 'His mother walked him to the school gate with a warm smile. "Be brave, Ravi. You will make great friends!" she said.',
        native: 'అతని తల్లి చిరునవ్వుతో పాఠశాల గేటు వరకు నడిపించింది. "ధైర్యంగా ఉండు రవి, నువ్వు మంచి స్నేహితులను చేసుకుంటావు!" అని చెప్పింది.'
      },
      {
        english: 'During recess, Ravi sat alone under the banyan tree. Another boy named Arjun approached and shared his lunchbox.',
        native: 'విరామ సమయంలో, రవి మర్రిచెట్టు కింద ఒంటరిగా కూర్చున్నాడు. అర్జున్ అనే మరో బాలుడు వచ్చి తన లంచ్‌బాక్స్‌ను పంచుకున్నాడు.'
      },
      {
        english: 'Together they played hide-and-seek. By evening, Ravi came home excited and told his parents that school was wonderful!',
        native: 'ఇద్దరూ కలిసి దాగుడుమూతలు ఆడారు. సాయంత్రానికి రవి ఎంతో ఉత్సాహంగా ఇంటికి వచ్చి స్కూల్ అద్భుతంగా ఉందని చెప్పాడు!'
      }
    ],
    vocabulary: [
      { word: 'Uniform', meaning: 'Distinctive clothing worn by school students', telugu: 'ఏకరూప దుస్తులు' },
      { word: 'Recess', meaning: 'A break period between school classes', telugu: 'విరామ సమయం' },
      { word: 'Brave', meaning: 'Having or showing courage', telugu: 'ధైర్యవంతుడు' }
    ],
    quizQuestions: [
      {
        question: 'Who encouraged Ravi at the school gate?',
        options: ['His mother', 'His teacher', 'His brother', 'The bus driver'],
        correctAnswer: 'His mother',
        explanation: 'His mother gave him encouraging words with a smile.',
      },
      {
        question: 'What game did Ravi and Arjun play?',
        options: ['Hide-and-seek', 'Cricket', 'Chess', 'Football'],
        correctAnswer: 'Hide-and-seek',
        explanation: 'They enjoyed playing hide-and-seek during recess.',
      }
    ]
  },
  {
    id: 'story-3',
    stageId: 'intermediate',
    title: 'The Whispering Lighthouse',
    emoji: '🏮',
    level: 'Intermediate',
    summary: 'An old lighthouse keeper teaches a young apprentice how sound waves and maritime codes keep sailors safe.',
    paragraphs: [
      {
        english: 'Perched high on the jagged coastal cliffs, the ancient white lighthouse stood steadfast against tempestuous waves.',
        native: 'తీరప్రాంత కొండల పైభాగంలో, పురాతన తెల్లని లైట్‌హౌస్ ఉవ్వెత్తున లేచే అలలను ఎదుర్కొంటూ స్థిరంగా నిలిచింది.'
      },
      {
        english: 'Marcus, an experienced keeper of forty years, taught Maya how to calibrate the optical lenses and decipher foghorn frequencies.',
        native: 'నలభై ఏళ్ల అనుభవజ్ఞుడైన మార్కస్, ఆప్టికల్ లెన్స్‌లను క్రమాంకనం చేయడం మరియు ఫాగ్‌హార్న్ ఫ్రీక్వెన్సీలను ఎలా అర్థం చేసుకోవాలో మాయకు నేర్పించాడు.'
      },
      {
        english: 'One foggy night, a cargo vessel lost radar navigation. By adjusting the light beam rhythmically, Marcus and Maya guided the ship safely into port.',
        native: 'ఒక పొగమంచు రాత్రి, ఒక సరుకు రవాణా ఓడ రాడార్ నావిగేషన్‌ను కోల్పోయింది. కాంతి కిరణాన్ని లయబద్ధంగా సర్దుబాటు చేయడం ద్వారా, వారు ఓడను సురక్షితంగా ఓడరేవులోకి నడిపించారు.'
      }
    ],
    vocabulary: [
      { word: 'Steadfast', meaning: 'Firm and unwavering', telugu: 'దృఢమైన' },
      { word: 'Tempestuous', meaning: 'Characterized by violent storms', telugu: 'తుఫానుతో కూడిన' },
      { word: 'Apprentice', meaning: 'A person learning a trade from a skilled employer', telugu: 'శిష్యుడు / అనుభవశూన్యుడు' }
    ],
    quizQuestions: [
      {
        question: 'Where was the lighthouse located?',
        options: ['On jagged coastal cliffs', 'In a quiet valley', 'On an island volcano', 'Near a desert river'],
        correctAnswer: 'On jagged coastal cliffs',
        explanation: 'It was perched high on jagged coastal cliffs overlooking tempestuous waves.',
      },
      {
        question: 'How did they rescue the cargo vessel in the fog?',
        options: [
          'By adjusting the light beam rhythmically',
          'By firing flare guns',
          'By sending a rescue helicopter',
          'By sounding an alarm bell'
        ],
        correctAnswer: 'By adjusting the light beam rhythmically',
        explanation: 'Rhythmic adjustment of the light beam guided the ship into the port safely.',
      }
    ]
  }
];

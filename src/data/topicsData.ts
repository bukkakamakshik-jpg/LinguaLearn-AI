import { TopicLesson, Question, Difficulty } from '../types';

export const BASIC_TOPIC_LESSONS: Record<number, TopicLesson> = {
  // Level 1: Alphabet and basic words
  1: {
    id: 1,
    levelNumber: 1,
    stageId: 'basic',
    title: 'Alphabet & Basic Words',
    category: 'vocabulary',
    summary: 'The English alphabet has 26 letters: 5 vowels (A, E, I, O, U) and 21 consonants. Words are formed by combining these letters.',
    rules: [
      'Vowels are: A, E, I, O, U (Telugu: అచ్చులు - Achulu).',
      'Consonants are all the other 21 letters (Telugu: హల్లులు - Hallulu).',
      'Every English word contains at least one vowel sound (or vowel letter/Y).',
      'Words start with a capital letter at the beginning of a sentence.'
    ],
    examples: [
      { english: 'A for Apple', native: 'A అంటే యాపిల్ (Apple)', note: 'Starts with vowel A' },
      { english: 'B for Ball', native: 'B అంటే బంతి (Ball)', note: 'Starts with consonant B' },
      { english: 'Cat', native: 'పిల్లి (Cat)', note: 'Three-letter C-V-C word' },
      { english: 'Sun', native: 'సూర్యుడు (Sun)', note: 'Vowel U in the middle' }
    ],
    questions: {
      low: [
        {
          id: '1-l-1',
          type: 'image_choice',
          prompt: 'Look at the picture and identify the word:',
          questionText: 'What is this fruit?',
          emoji: '🍎',
          options: ['Apple', 'Banana', 'Mango', 'Orange'],
          correctAnswer: 'Apple',
          explanation: '🍎 is an Apple. It begins with the vowel letter A.',
          nativeMeaning: 'ఇది యాపిల్ పండు (Apple)'
        },
        {
          id: '1-l-2',
          type: 'multiple_choice',
          prompt: 'Which of the following is a vowel?',
          questionText: 'Choose the vowel letter:',
          options: ['B', 'D', 'E', 'K'],
          correctAnswer: 'E',
          explanation: 'E is one of the 5 English vowels (A, E, I, O, U).',
          nativeMeaning: 'E ఒక అచ్చు (Vowel)'
        },
        {
          id: '1-l-3',
          type: 'image_type',
          prompt: 'Type the spelling of this animal:',
          questionText: 'Write the name of this object/animal in lowercase or uppercase:',
          emoji: '🐱',
          correctAnswer: 'cat',
          explanation: 'The animal shown is a Cat (C-A-T).',
          nativeMeaning: 'పిల్లి (Cat)'
        }
      ],
      medium: [
        {
          id: '1-m-1',
          type: 'fill_in_the_blank',
          prompt: 'Fill in the missing vowel to make a word for ☀️:',
          questionText: 'S ___ N',
          options: ['U', 'E', 'A', 'I'],
          correctAnswer: 'U',
          explanation: 'SUN is spelled S-U-N, meaning the bright star in our solar system.',
          nativeMeaning: 'సూర్యుడు (SUN)'
        },
        {
          id: '1-m-2',
          type: 'scramble_sentence',
          prompt: 'Arrange the scrambled letters to spell the vehicle 🚗:',
          questionText: 'R / A / C',
          correctAnswer: ['C', 'A', 'R'],
          explanation: 'C-A-R spells CAR.',
          nativeMeaning: 'కారు (Car)'
        },
        {
          id: '1-m-3',
          type: 'match_pairs',
          prompt: 'Match English letter with its picture sound:',
          questionText: 'Connect the matching pairs:',
          pairs: [
            { left: 'A is for', right: '🍎 Apple' },
            { left: 'B is for', right: '🍌 Banana' },
            { left: 'C is for', right: '🚗 Car' }
          ],
          correctAnswer: 'match_all',
          explanation: 'Great job matching letter sounds with their vocabulary words!',
          nativeMeaning: 'అక్షరాలను సరైన పదాలతో జతపరచండి'
        }
      ],
      high: [
        {
          id: '1-h-1',
          type: 'multiple_choice',
          prompt: 'Count the vowels in the word "BEAUTIFUL":',
          questionText: 'How many vowels are present in "BEAUTIFUL"?',
          options: ['3', '4', '5', '6'],
          correctAnswer: '5',
          explanation: '"B-E-A-U-T-I-F-U-L" has 5 vowels: E, A, U, I, U.',
          nativeMeaning: 'BEAUTIFUL పదంలో 5 అచ్చులు ఉన్నాయి.'
        },
        {
          id: '1-h-2',
          type: 'scramble_sentence',
          prompt: 'Arrange the words to form a correct greeting sentence:',
          questionText: 'morning / Good / teacher / my',
          correctAnswer: ['Good', 'morning', 'my', 'teacher'],
          explanation: '"Good morning my teacher" is the polite formal greeting.',
          nativeMeaning: 'నా ఉపాధ్యాయునికి శుభోదయం'
        },
        {
          id: '1-h-3',
          type: 'grammar_correction',
          prompt: 'Find the spelling and capital letter mistake:',
          questionText: 'Select the correctly capitalized word:',
          options: ['apple', 'Apple', 'aPPLE', 'appLE'],
          correctAnswer: 'Apple',
          explanation: 'Standard capitalization capitalizes only the first letter when beginning a sentence.',
          nativeMeaning: 'సరైన ఆంగ్ల అక్షర రూపం'
        }
      ]
    }
  },

  // Level 2: Nouns (Naming Words)
  2: {
    id: 2,
    levelNumber: 2,
    stageId: 'basic',
    title: 'Nouns (Naming Words)',
    category: 'grammar',
    summary: 'A noun is a word that names a person, place, animal, or thing. In Telugu, it is known as నామవాచకం (Naamavaachakam).',
    rules: [
      'Person: Boy, Teacher, Doctor, Ravi, Sita (వ్యక్తి పేరు)',
      'Place: School, Hyderabad, Park, India (స్థలం పేరు)',
      'Animal/Bird: Dog, Elephant, Peacock (జంతువు / పక్షి పేరు)',
      'Thing: Book, Pen, Chair, Computer (వస్తువు పేరు)'
    ],
    examples: [
      { english: 'Ravi is a good boy.', native: 'రవి మంచి బాలుడు.', note: '"Ravi" and "boy" are nouns.' },
      { english: 'The dog plays in the garden.', native: 'కుక్క తోటలో ఆడుకుంటుంది.', note: '"dog" and "garden" are nouns.' },
      { english: 'I read a book.', native: 'నేను పుస్తకం చదువుతున్నాను.', note: '"book" is a noun (thing).' }
    ],
    questions: {
      low: [
        {
          id: '2-l-1',
          type: 'multiple_choice',
          prompt: 'Identify the noun in the given options:',
          questionText: 'Which word is a noun (naming word)?',
          options: ['Run', 'School', 'Quickly', 'Beautiful'],
          correctAnswer: 'School',
          explanation: '"School" is a place, so it is a noun! (Run is a verb, Quickly is an adverb, Beautiful is an adjective).',
          nativeMeaning: 'పాఠశాల (School) ఒక స్థల నామవాచకం'
        },
        {
          id: '2-l-2',
          type: 'image_choice',
          prompt: 'What kind of noun is shown below?',
          questionText: 'What is this object?',
          emoji: '📖',
          options: ['Book (Thing)', 'Jump (Action)', 'Fast (Adverb)', 'Red (Color)'],
          correctAnswer: 'Book (Thing)',
          explanation: 'A book is a tangible thing, therefore it is a noun.',
          nativeMeaning: 'పుస్తకం ఒక నామవాచకం (వస్తువు)'
        },
        {
          id: '2-l-3',
          type: 'multiple_choice',
          prompt: 'Find the person noun:',
          questionText: 'Which of these names a person?',
          options: ['Doctor', 'Hospital', 'Medicine', 'Sick'],
          correctAnswer: 'Doctor',
          explanation: '"Doctor" is a person who treats patients.',
          nativeMeaning: 'వైద్యుడు (Doctor) - వ్యక్తి పేరు'
        }
      ],
      medium: [
        {
          id: '2-m-1',
          type: 'fill_in_the_blank',
          prompt: 'Choose the correct noun to complete the sentence:',
          questionText: 'The faithful ___ barks loudly at night.',
          emoji: '🐶',
          options: ['dog', 'run', 'happy', 'sleep'],
          correctAnswer: 'dog',
          explanation: '"dog" is the subject noun performing the action.',
          nativeMeaning: 'కుక్క (dog) రాత్రి పూట మొరుగుతుంది.'
        },
        {
          id: '2-m-2',
          type: 'scramble_sentence',
          prompt: 'Form a sentence using the nouns "Ravi" and "park":',
          questionText: 'to / Ravi / the / went / park',
          correctAnswer: ['Ravi', 'went', 'to', 'the', 'park'],
          explanation: '"Ravi went to the park" has two nouns: Ravi (person) and park (place).',
          nativeMeaning: 'రవి పార్కుకు వెళ్ళాడు.'
        },
        {
          id: '2-m-3',
          type: 'image_type',
          prompt: 'Identify this vehicle noun and type its name:',
          questionText: 'Write the noun for this transport:',
          emoji: '🚗',
          correctAnswer: 'car',
          explanation: '"Car" is a vehicle noun.',
          nativeMeaning: 'కారు (Car) - ఒక వస్తువు/వాహనం'
        }
      ],
      high: [
        {
          id: '2-h-1',
          type: 'multiple_choice',
          prompt: 'Find all the nouns in this sentence: "The teacher wrote notes on the board."',
          questionText: 'How many nouns are in this sentence?',
          options: ['1', '2', '3', '4'],
          correctAnswer: '3',
          explanation: 'There are 3 nouns: "teacher" (person), "notes" (thing), and "board" (thing).',
          nativeMeaning: 'ఉపాధ్యాయుడు, నోట్స్, బోర్డు - మూడు నామవాచకాలు.'
        },
        {
          id: '2-h-2',
          type: 'grammar_correction',
          prompt: 'Spot which word is NOT a noun in this list:',
          questionText: 'Choose the odd one out:',
          options: ['Elephant', 'Hyderabad', 'Honesty', 'Singing'],
          correctAnswer: 'Singing',
          explanation: '"Singing" is an action verb / participle (unless acting as a gerund here). Elephant, Hyderabad, and Honesty (abstract noun) are distinct nouns.',
          nativeMeaning: 'సింగింగ్ (Singing) అనేది క్రియా పదం.'
        },
        {
          id: '2-h-3',
          type: 'scramble_sentence',
          prompt: 'Arrange the sentence with subject noun and object noun:',
          questionText: 'mango / eats / sweet / A / Priya',
          correctAnswer: ['Priya', 'eats', 'a', 'sweet', 'mango'],
          explanation: '"Priya" is the subject noun, "mango" is the object noun.',
          nativeMeaning: 'ప్రియ తీపి మామిడిపండు తింటుంది.'
        }
      ]
    }
  },

  // Level 3: Pronouns
  3: {
    id: 3,
    levelNumber: 3,
    stageId: 'basic',
    title: 'Pronouns (He, She, It, They)',
    category: 'grammar',
    summary: 'A pronoun is a word used in place of a noun to avoid repeating the noun again and again. In Telugu: సర్వనామం (Sarvanaamam).',
    rules: [
      'I (నేను), We (మేము/మనం)',
      'You (నువ్వు/మీరు)',
      'He (అతడు - for boys/men)',
      'She (ఆమె - for girls/women)',
      'It (ఇది/అది - for animals/things)',
      'They (వారు/అవి - for plural people/things)'
    ],
    examples: [
      { english: 'Ravi is my friend. He is kind.', native: 'రవి నా స్నేహితుడు. అతడు దయగలవాడు.', note: '"He" replaces Ravi.' },
      { english: 'Sita loves reading. She reads books.', native: 'సీత పుస్తకాలు చదువుతుంది. ఆమె చదువుకుంటుంది.', note: '"She" replaces Sita.' },
      { english: 'This is a dog. It is barking.', native: 'ఇది ఒక కుక్క. అది మొరుగుతోంది.', note: '"It" replaces dog.' }
    ],
    questions: {
      low: [
        {
          id: '3-l-1',
          type: 'multiple_choice',
          prompt: 'Choose the correct pronoun for a boy named "Kiran":',
          questionText: 'Kiran is playing. ___ is very fast.',
          options: ['He', 'She', 'It', 'They'],
          correctAnswer: 'He',
          explanation: 'We use "He" for boys and men.',
          nativeMeaning: 'అతడు (He)'
        },
        {
          id: '3-l-2',
          type: 'multiple_choice',
          prompt: 'Choose the correct pronoun for Sita:',
          questionText: 'Sita is singing. ___ has a sweet voice.',
          options: ['He', 'She', 'It', 'We'],
          correctAnswer: 'She',
          explanation: 'We use "She" for girls and women.',
          nativeMeaning: 'ఆమె (She)'
        },
        {
          id: '3-l-3',
          type: 'multiple_choice',
          prompt: 'Which pronoun replaces "a car"?',
          questionText: 'The car is new. ___ is red in color.',
          options: ['He', 'She', 'It', 'I'],
          correctAnswer: 'It',
          explanation: '"It" is used for objects, things, and animals.',
          nativeMeaning: 'అది (It)'
        }
      ],
      medium: [
        {
          id: '3-m-1',
          type: 'fill_in_the_blank',
          prompt: 'Replace the nouns with plural pronoun:',
          questionText: 'Ravi and Suresh are running. ___ are winning the race.',
          options: ['They', 'We', 'He', 'It'],
          correctAnswer: 'They',
          explanation: 'When talking about two or more other people, use "They".',
          nativeMeaning: 'వారు (They)'
        },
        {
          id: '3-m-2',
          type: 'scramble_sentence',
          prompt: 'Reorder the sentence with pronoun subject:',
          questionText: 'students / We / are / good',
          correctAnswer: ['We', 'are', 'good', 'students'],
          explanation: '"We are good students."',
          nativeMeaning: 'మేము మంచి విద్యార్థులము.'
        },
        {
          id: '3-m-3',
          type: 'grammar_correction',
          prompt: 'Correct the pronoun error:',
          questionText: 'Which sentence uses pronouns correctly?',
          options: [
            'My mother is doctor. He works hard.',
            'My mother is a doctor. She works hard.',
            'My mother is a doctor. It works hard.',
            'My mother is a doctor. They works hard.'
          ],
          correctAnswer: 'My mother is a doctor. She works hard.',
          explanation: 'Mother is female, so "She" is the correct pronoun.',
          nativeMeaning: 'సరైన సర్వనామం "She"'
        }
      ],
      high: [
        {
          id: '3-h-1',
          type: 'multiple_choice',
          prompt: 'Identify the object pronoun in: "The teacher gave HIM a gold star."',
          questionText: 'Which word is the object pronoun?',
          options: ['teacher', 'gave', 'him', 'star'],
          correctAnswer: 'him',
          explanation: '"him" is the objective form of "he".',
          nativeMeaning: 'అతనికి (Him) - ఆబ్జెక్ట్ ప్రొనౌన్'
        },
        {
          id: '3-h-2',
          type: 'scramble_sentence',
          prompt: 'Form the sentence using possessive pronoun:',
          questionText: 'book / This / is / mine',
          correctAnswer: ['This', 'book', 'is', 'mine'],
          explanation: '"This book is mine" uses possessive pronoun "mine".',
          nativeMeaning: 'ఈ పుస్తకం నాది.'
        },
        {
          id: '3-h-3',
          type: 'fill_in_the_blank',
          prompt: 'Choose the correct reflexive pronoun:',
          questionText: 'She completed the entire project by ___.',
          options: ['herself', 'himself', 'itself', 'themselves'],
          correctAnswer: 'herself',
          explanation: 'For "She", the reflexive pronoun is "herself".',
          nativeMeaning: 'ఆమె స్వయంగా (herself)'
        }
      ]
    }
  },

  // Level 4: Verbs (Action Words)
  4: {
    id: 4,
    levelNumber: 4,
    stageId: 'basic',
    title: 'Verbs (Action Words)',
    category: 'grammar',
    summary: 'A verb expresses an action, occurrence, or state of being. Without a verb, a sentence cannot be complete! In Telugu: క్రియ (Kriya).',
    rules: [
      'Physical actions: Run, Walk, Eat, Read, Play, Sing (శారీరక పనులు)',
      'Mental actions: Think, Learn, Remember, Believe',
      'State of being: Is, Am, Are, Be'
    ],
    examples: [
      { english: 'Birds fly in the sky.', native: 'పక్షులు ఆకాశంలో ఎగురుతాయి.', note: '"fly" is the action verb.' },
      { english: 'I drink fresh milk.', native: 'నేను తాజా పాలు తాగుతాను.', note: '"drink" is the verb.' },
      { english: 'She sings melodiously.', native: 'ఆమె శ్రావ్యంగా పాడుతుంది.', note: '"sings" is the verb.' }
    ],
    questions: {
      low: [
        {
          id: '4-l-1',
          type: 'image_choice',
          prompt: 'What action is happening here?',
          questionText: 'What is the action verb?',
          emoji: '🏃',
          options: ['Run', 'Sleep', 'Sit', 'Eat'],
          correctAnswer: 'Run',
          explanation: 'The person is running. "Run" is an action verb.',
          nativeMeaning: 'పరుగెత్తడం (Run)'
        },
        {
          id: '4-l-2',
          type: 'multiple_choice',
          prompt: 'Identify the verb in this sentence:',
          questionText: '"The boy eats an apple."',
          options: ['boy', 'eats', 'an', 'apple'],
          correctAnswer: 'eats',
          explanation: '"eats" describes the action that the boy is doing.',
          nativeMeaning: 'తినడం (eats) క్రియ'
        },
        {
          id: '4-l-3',
          type: 'image_choice',
          prompt: 'What action is this?',
          questionText: 'Identify the verb:',
          emoji: '📖',
          options: ['Read', 'Cook', 'Fly', 'Swim'],
          correctAnswer: 'Read',
          explanation: 'Opening and going through a book is "Read".',
          nativeMeaning: 'చదవడం (Read)'
        }
      ],
      medium: [
        {
          id: '4-m-1',
          type: 'fill_in_the_blank',
          prompt: 'Choose the correct action verb:',
          questionText: 'Fish ___ in the water.',
          options: ['swim', 'swims', 'flying', 'ran'],
          correctAnswer: 'swim',
          explanation: 'Plural noun "Fish" takes plural base verb "swim".',
          nativeMeaning: 'చేపలు నీటిలో ఈదుతాయి (swim).'
        },
        {
          id: '4-m-2',
          type: 'scramble_sentence',
          prompt: 'Form a sentence with subject, verb, and object:',
          questionText: 'cricket / plays / He / daily',
          correctAnswer: ['He', 'plays', 'cricket', 'daily'],
          explanation: '"He plays cricket daily."',
          nativeMeaning: 'అతడు రోజూ క్రికెట్ ఆడతాడు.'
        },
        {
          id: '4-m-3',
          type: 'grammar_correction',
          prompt: 'Find the verb error:',
          questionText: 'Which sentence has the correct verb form?',
          options: [
            'She go to school every day.',
            'She goes to school every day.',
            'She gone to school every day.',
            'She going to school every day.'
          ],
          correctAnswer: 'She goes to school every day.',
          explanation: 'Third person singular (He/She/It) requires "goes" in simple present tense.',
          nativeMeaning: 'ఆమె ప్రతిరోజూ పాఠశాలకు వెళుతుంది.'
        }
      ],
      high: [
        {
          id: '4-h-1',
          type: 'multiple_choice',
          prompt: 'Distinguish transitive vs intransitive verb:',
          questionText: 'In "She laughed loudly", what kind of verb is "laughed"?',
          options: ['Intransitive (no direct object)', 'Transitive', 'Helping verb', 'Passive verb'],
          correctAnswer: 'Intransitive (no direct object)',
          explanation: '"Laughed" does not require or take a direct object; it makes complete sense on its own.',
          nativeMeaning: 'ఇంట్రాన్సిటివ్ వెర్బ్ (అకర్మక క్రియ)'
        },
        {
          id: '4-h-2',
          type: 'scramble_sentence',
          prompt: 'Build the sentence with auxiliary and main verb:',
          questionText: 'studying / am / English / I / now',
          correctAnswer: ['I', 'am', 'studying', 'English', 'now'],
          explanation: '"I am studying English now."',
          nativeMeaning: 'నేను ఇప్పుడు ఇంగ్లీష్ చదువుతున్నాను.'
        },
        {
          id: '4-h-3',
          type: 'fill_in_the_blank',
          prompt: 'Choose the correct irregular past tense verb:',
          questionText: 'Yesterday, they ___ to the zoo.',
          options: ['went', 'goed', 'goes', 'going'],
          correctAnswer: 'went',
          explanation: 'The past tense of "go" is the irregular verb "went".',
          nativeMeaning: 'నిన్న వారు జూ కి వెళ్లారు (went).'
        }
      ]
    }
  },

  // Level 10: Articles (A, An, The)
  10: {
    id: 10,
    levelNumber: 10,
    stageId: 'basic',
    title: 'Articles (A, An, The)',
    category: 'grammar',
    summary: 'Articles are words that define a noun as specific or unspecific. Use "A" before consonant sounds, "An" before vowel sounds, and "The" for specific items.',
    rules: [
      'Use "A" before singular nouns starting with a consonant sound (e.g., a boy, a car, a university).',
      'Use "An" before singular nouns starting with a vowel sound (A, E, I, O, U) (e.g., an apple, an elephant, an hour).',
      'Use "The" when talking about a specific thing, or unique things (e.g., the sun, the moon, the Ganga).'
    ],
    examples: [
      { english: 'I have a pen.', native: 'నా దగ్గర ఒక పెన్ను ఉంది.', note: 'General consonant sound' },
      { english: 'She ate an orange.', native: 'ఆమె ఒక నారింజ పండు తిన్నది.', note: 'Vowel sound "O"' },
      { english: 'The sun rises in the east.', native: 'సూర్యుడు తూర్పున ఉదయిస్తాడు.', note: 'Unique celestial object' }
    ],
    questions: {
      low: [
        {
          id: '10-l-1',
          type: 'fill_in_the_blank',
          prompt: 'Choose the right article for 🍎:',
          questionText: 'This is ___ apple.',
          emoji: '🍎',
          options: ['a', 'an', 'the', 'no article'],
          correctAnswer: 'an',
          explanation: '"Apple" begins with a vowel sound (a), so we use "an".',
          nativeMeaning: 'యాపిల్ ముందు "an" వస్తుంది.'
        },
        {
          id: '10-l-2',
          type: 'fill_in_the_blank',
          prompt: 'Choose the right article for 🚗:',
          questionText: 'He drives ___ car.',
          emoji: '🚗',
          options: ['a', 'an', 'the', 'some'],
          correctAnswer: 'a',
          explanation: '"Car" starts with consonant sound /k/, so we use "a".',
          nativeMeaning: 'కారు ముందు "a" వస్తుంది.'
        },
        {
          id: '10-l-3',
          type: 'fill_in_the_blank',
          prompt: 'Choose the right article for ☀️:',
          questionText: '___ sun gives us heat and light.',
          emoji: '☀️',
          options: ['The', 'A', 'An', 'Many'],
          correctAnswer: 'The',
          explanation: 'The sun is unique and universal, so we use "The".',
          nativeMeaning: 'సూర్యుని ముందు "The" వస్తుంది.'
        }
      ],
      medium: [
        {
          id: '10-m-1',
          type: 'fill_in_the_blank',
          prompt: 'Notice the silent H vowel sound:',
          questionText: 'We waited for ___ hour at the station.',
          options: ['an', 'a', 'the', 'two'],
          correctAnswer: 'an',
          explanation: 'Even though "hour" starts with letter H, it is pronounced with a vowel sound /aʊər/ (silent H), so we use "an hour".',
          nativeMeaning: 'ఒక గంట సమయం (an hour)'
        },
        {
          id: '10-m-2',
          type: 'scramble_sentence',
          prompt: 'Arrange the sentence with article and noun:',
          questionText: 'saw / elephant / in / zoo / the / I / an',
          correctAnswer: ['I', 'saw', 'an', 'elephant', 'in', 'the', 'zoo'],
          explanation: '"I saw an elephant in the zoo."',
          nativeMeaning: 'నేను జూలో ఒక ఏనుగును చూశాను.'
        },
        {
          id: '10-m-3',
          type: 'grammar_correction',
          prompt: 'Find the article mistake:',
          questionText: 'Which sentence is grammatically correct?',
          options: [
            'He is a honest man.',
            'He is an honest man.',
            'He is the honest man.',
            'He is honest man.'
          ],
          correctAnswer: 'He is an honest man.',
          explanation: '"Honest" has a silent H and begins with vowel sound /ɒ/, requiring "an".',
          nativeMeaning: 'అతడు నిజాయితీపరుడైన వ్యక్తి.'
        }
      ],
      high: [
        {
          id: '10-h-1',
          type: 'multiple_choice',
          prompt: 'Identify why "university" takes "a" instead of "an":',
          questionText: 'Why do we say "a university" and NOT "an university"?',
          options: [
            'Because it starts with a consonant sound /juː/ like "you"',
            'Because it is a big place',
            'Because it is plural',
            'Because it is an exception with no rule'
          ],
          correctAnswer: 'Because it starts with a consonant sound /juː/ like "you"',
          explanation: 'Articles depend on SOUND, not spelling! "University" begins with the consonant sound /j/ (y-sound).',
          nativeMeaning: 'యూనివర్సిటీ యకార శబ్దంతో మొదలవుతుంది.'
        },
        {
          id: '10-h-2',
          type: 'fill_in_the_blank',
          prompt: 'Fill in the blanks with appropriate articles:',
          questionText: 'She gave me ___ gift. ___ gift was wrapped in gold paper.',
          options: ['a / The', 'the / A', 'an / The', 'a / A'],
          correctAnswer: 'a / The',
          explanation: 'First mention is indefinite ("a gift"), second mention refers to that specific gift ("The gift").',
          nativeMeaning: 'మొదటి సారి a, నిర్దిష్టంగా చెప్పినప్పుడు The.'
        },
        {
          id: '10-h-3',
          type: 'grammar_correction',
          prompt: 'Choose the sentence with correct zero article usage:',
          questionText: 'Which sentence correctly avoids unnecessary articles?',
          options: [
            'The gold is a precious metal.',
            'Gold is a precious metal.',
            'A gold is a precious metal.',
            'An gold is a precious metal.'
          ],
          correctAnswer: 'Gold is a precious metal.',
          explanation: 'Material/uncountable nouns in general statements do not take "the".',
          nativeMeaning: 'సాధారణంగా బంగారం గురించి చెప్పేటప్పుడు ఆర్టికల్ వాడకూడదు.'
        }
      ]
    }
  },

  // Level 13: Simple Sentence Structure
  13: {
    id: 13,
    levelNumber: 13,
    stageId: 'basic',
    title: 'Simple Sentence Structure',
    category: 'sentence_formation',
    summary: 'A basic English sentence follows the S-V-O order: Subject + Verb + Object. (In Telugu it is usually Subject + Object + Verb: కర్త + కర్మ + క్రియ).',
    rules: [
      'Subject (Who or what does the action)',
      'Verb (What is happening)',
      'Object (Who or what receives the action)',
      'English: S + V + O (I + eat + an apple)',
      'Telugu: S + O + V (నేను + యాపిల్ + తింటాను)'
    ],
    examples: [
      { english: 'I go to school.', native: 'నేను పాఠశాలకు వెళ్తాను.', note: 'S: I, V: go, O: school' },
      { english: 'Ravi plays football.', native: 'రవి ఫుట్‌బాల్ ఆడతాడు.', note: 'S: Ravi, V: plays, O: football' },
      { english: 'She reads a story.', native: 'ఆమె ఒక కథ చదువుతుంది.', note: 'S: She, V: reads, O: story' }
    ],
    questions: {
      low: [
        {
          id: '13-l-1',
          type: 'scramble_sentence',
          prompt: 'Arrange the words to form a correct English sentence:',
          questionText: 'school / I / to / go',
          correctAnswer: ['I', 'go', 'to', 'school'],
          explanation: 'English structure is Subject (I) + Verb (go) + Object (to school).',
          nativeMeaning: 'నేను పాఠశాలకు వెళ్తాను.'
        },
        {
          id: '13-l-2',
          type: 'scramble_sentence',
          prompt: 'Rearrange these scrambled words:',
          questionText: 'plays / football / He',
          correctAnswer: ['He', 'plays', 'football'],
          explanation: 'Subject (He) + Verb (plays) + Object (football).',
          nativeMeaning: 'అతడు ఫుట్‌బాల్ ఆడతాడు.'
        },
        {
          id: '13-l-3',
          type: 'multiple_choice',
          prompt: 'Identify the Subject in: "The birds sing sweetly in the morning."',
          questionText: 'What is the subject of this sentence?',
          options: ['The birds', 'sing', 'sweetly', 'morning'],
          correctAnswer: 'The birds',
          explanation: '"The birds" are the ones performing the action of singing.',
          nativeMeaning: 'కర్త (Subject) పక్షులు'
        }
      ],
      medium: [
        {
          id: '13-m-1',
          type: 'scramble_sentence',
          prompt: 'Put these words in order:',
          questionText: 'an / eats / everyday / apple / She',
          correctAnswer: ['She', 'eats', 'an', 'apple', 'everyday'],
          explanation: '"She eats an apple everyday."',
          nativeMeaning: 'ఆమె ప్రతిరోజూ ఒక యాపిల్ తింటుంది.'
        },
        {
          id: '13-m-2',
          type: 'grammar_correction',
          prompt: 'Fix the word order error:',
          questionText: 'Which sentence has the correct English SVO order?',
          options: [
            'I school go.',
            'I to go school.',
            'I go to school.',
            'School go I.'
          ],
          correctAnswer: 'I go to school.',
          explanation: 'Telugu speakers often mistakenly translate word-for-word ("I school go"). In English, the verb "go" comes before "school".',
          nativeMeaning: 'ఇంగ్లీష్‌లో క్రియ (go) స్థలానికి ముందే వస్తుంది.'
        },
        {
          id: '13-m-3',
          type: 'fill_in_the_blank',
          prompt: 'Complete the sentence with the correct verb:',
          questionText: 'My mother ___ delicious food for the family.',
          options: ['cooks', 'cook', 'cooking', 'cooked yesterday'],
          correctAnswer: 'cooks',
          explanation: 'Singular subject "mother" takes "cooks" in simple present tense.',
          nativeMeaning: 'మా అమ్మ రుచికరమైన వంట చేస్తుంది.'
        }
      ],
      high: [
        {
          id: '13-h-1',
          type: 'scramble_sentence',
          prompt: 'Arrange the complex sentence structure:',
          questionText: 'exam / hard / because / studied / passed / Ravi / the / he',
          correctAnswer: ['Ravi', 'passed', 'the', 'exam', 'because', 'he', 'studied', 'hard'],
          explanation: 'Main clause + subordinating conjunction "because" + dependent clause.',
          nativeMeaning: 'రవి కష్టపడి చదివినందున పరీక్షలో ఉత్తీర్ణుడయ్యాడు.'
        },
        {
          id: '13-h-2',
          type: 'multiple_choice',
          prompt: 'Identify the indirect object in: "She gave me a beautiful flower."',
          questionText: 'Which word is the indirect object?',
          options: ['She', 'gave', 'me', 'flower'],
          correctAnswer: 'me',
          explanation: '"me" is the recipient (indirect object); "flower" is the direct object.',
          nativeMeaning: 'నాకు (me) - పరోక్ష కర్మ'
        },
        {
          id: '13-h-3',
          type: 'grammar_correction',
          prompt: 'Identify the sentence fragment:',
          questionText: 'Which of the following is NOT a complete sentence?',
          options: [
            'Because the rain was heavy.',
            'It rained heavily.',
            'We stayed at home.',
            'The weather is pleasant.'
          ],
          correctAnswer: 'Because the rain was heavy.',
          explanation: '"Because the rain was heavy" is a dependent clause without an independent main clause.',
          nativeMeaning: 'ఇది అసంపూర్ణ వాక్యం (Sentence fragment).'
        }
      ]
    }
  },

  // Level 23: Is / Am / Are
  23: {
    id: 23,
    levelNumber: 23,
    stageId: 'basic',
    title: 'Is / Am / Are Usage',
    category: 'grammar',
    summary: 'The helping verbs "is, am, are" indicate present state of being or ongoing continuous actions.',
    rules: [
      'Use "Am" ONLY with "I" (I am a student / నేను విద్యార్థిని).',
      'Use "Is" with singular subjects: He, She, It, Ravi, the cat (అతడు/ఆమె/అది).',
      'Use "Are" with plural subjects & you: You, We, They, the students (మీరు/మేము/వారు).'
    ],
    examples: [
      { english: 'I am a student.', native: 'నేను ఒక విద్యార్థిని.', note: 'Am with I' },
      { english: 'She is my sister.', native: 'ఆమె నా సోదరి.', note: 'Is with She' },
      { english: 'They are playing in the ground.', native: 'వారు మైదానంలో ఆడుకుంటున్నారు.', note: 'Are with They' }
    ],
    questions: {
      low: [
        {
          id: '23-l-1',
          type: 'fill_in_the_blank',
          prompt: 'Choose the correct helping verb for "I":',
          questionText: 'I ___ a student.',
          options: ['am', 'is', 'are', 'was'],
          correctAnswer: 'am',
          explanation: 'We always use "am" with the first-person singular pronoun "I".',
          nativeMeaning: 'నేను ఒక విద్యార్థిని (I am a student)'
        },
        {
          id: '23-l-2',
          type: 'fill_in_the_blank',
          prompt: 'Choose the correct helping verb for "He":',
          questionText: 'He ___ my best friend.',
          options: ['is', 'am', 'are', 'were'],
          correctAnswer: 'is',
          explanation: 'Singular third-person "He" pairs with "is".',
          nativeMeaning: 'అతడు నా ప్రాణస్నేహితుడు.'
        },
        {
          id: '23-l-3',
          type: 'fill_in_the_blank',
          prompt: 'Choose the correct helping verb for "They":',
          questionText: 'They ___ playing football.',
          options: ['are', 'is', 'am', 'be'],
          correctAnswer: 'are',
          explanation: 'Plural pronoun "They" takes "are".',
          nativeMeaning: 'వారు ఫుట్‌బాల్ ఆడుతున్నారు.'
        }
      ],
      medium: [
        {
          id: '23-m-1',
          type: 'fill_in_the_blank',
          prompt: 'Select the verb for compound subject:',
          questionText: 'Ravi and Sita ___ going to the library.',
          options: ['are', 'is', 'am', 'was'],
          correctAnswer: 'are',
          explanation: 'Two people joined by "and" make a plural subject, requiring "are".',
          nativeMeaning: 'రవి మరియు సీత లైబ్రరీకి వెళ్తున్నారు.'
        },
        {
          id: '23-m-2',
          type: 'grammar_correction',
          prompt: 'Fix the sentence error:',
          questionText: 'Select the correct sentence:',
          options: [
            'You is a clever person.',
            'You am a clever person.',
            'You are a clever person.',
            'You be a clever person.'
          ],
          correctAnswer: 'You are a clever person.',
          explanation: '"You" always takes "are" in the present tense, whether singular or plural.',
          nativeMeaning: 'నువ్వు తెలివైన వ్యక్తివి.'
        },
        {
          id: '23-m-3',
          type: 'scramble_sentence',
          prompt: 'Order the sentence correctly:',
          questionText: 'doctor / is / a / She / hospital / in / the',
          correctAnswer: ['She', 'is', 'a', 'doctor', 'in', 'the', 'hospital'],
          explanation: '"She is a doctor in the hospital."',
          nativeMeaning: 'ఆమె ఆసుపత్రిలో వైద్యురాలు.'
        }
      ],
      high: [
        {
          id: '23-h-1',
          type: 'fill_in_the_blank',
          prompt: 'Watch out for collective noun agreement:',
          questionText: 'The team ___ ready for the national championship.',
          options: ['is', 'are', 'am', 'were'],
          correctAnswer: 'is',
          explanation: 'In standard American/prescriptive grammar, "the team" acting as a single unit takes singular "is".',
          nativeMeaning: 'జట్టు ఛాంపియన్‌షిప్‌కు సిద్ధంగా ఉంది.'
        },
        {
          id: '23-h-2',
          type: 'grammar_correction',
          prompt: 'Spot the correct negative inversion question:',
          questionText: 'Which question is properly formulated?',
          options: [
            'Aren’t I invited to the party?',
            'Amn’t I invited to the party?',
            'Is not I invited to the party?',
            'Are I not invited to the party?'
          ],
          correctAnswer: 'Aren’t I invited to the party?',
          explanation: 'In colloquial standard English contraction, "Aren’t I?" is the established question tag / negative inversion.',
          nativeMeaning: 'నన్ను ఆహ్వానించలేదా?'
        },
        {
          id: '23-h-3',
          type: 'scramble_sentence',
          prompt: 'Form the interrogative question sentence:',
          questionText: 'class / the / Are / ready / students / for ?',
          correctAnswer: ['Are', 'the', 'students', 'ready', 'for', 'class ?'],
          explanation: '"Are the students ready for class?"',
          nativeMeaning: 'విద్యార్థులు తరగతికి సిద్ధంగా ఉన్నారా?'
        }
      ]
    }
  },

  // Level 26: Basic Sentence Correction (NLP Practice)
  26: {
    id: 26,
    levelNumber: 26,
    stageId: 'basic',
    title: 'Basic Sentence Correction',
    category: 'nlp_practice',
    summary: 'Sentence correction is a key NLP task. Learn how to detect missing auxiliary verbs, incorrect tenses, and subject-verb disagreement.',
    rules: [
      'Missing auxiliary verb: "I going school" ❌ → "I am going to school" ✅',
      'Double past tense: "He did not went" ❌ → "He did not go" ✅',
      'Third person singular s/es: "He speak English" ❌ → "He speaks English" ✅',
      'Unnecessary preposition: "Order for food" ❌ → "Order food" ✅'
    ],
    examples: [
      { english: 'I am going to school.', native: 'నేను పాఠశాలకు వెళ్తున్నాను.', note: 'Always include "am" with -ing' },
      { english: 'She speaks English fluently.', native: 'ఆమె అనర్గళంగా ఇంగ్లీష్ మాట్లాడుతుంది.', note: 'Third person -s rule' },
      { english: 'He did not call me.', native: 'అతడు నాకు ఫోన్ చేయలేదు.', note: '"did" takes base verb' }
    ],
    questions: {
      low: [
        {
          id: '26-l-1',
          type: 'grammar_correction',
          prompt: 'Correct this common student mistake: "I going school."',
          questionText: 'Which is the correct sentence?',
          options: [
            'I going school.',
            'I am going to school.',
            'I is going to school.',
            'I goes to school.'
          ],
          correctAnswer: 'I am going to school.',
          explanation: 'Continuous action requires the auxiliary verb "am" and preposition "to".',
          nativeMeaning: 'సరైన వాక్యం: "I am going to school."'
        },
        {
          id: '26-l-2',
          type: 'grammar_correction',
          prompt: 'Correct this: "He have a new bicycle."',
          questionText: 'What is the corrected sentence?',
          options: [
            'He has a new bicycle.',
            'He having a new bicycle.',
            'He is have a new bicycle.',
            'He had have a new bicycle.'
          ],
          correctAnswer: 'He has a new bicycle.',
          explanation: 'Singular pronoun "He" takes "has", not "have".',
          nativeMeaning: 'అతని దగ్గర కొత్త సైకిల్ ఉంది (He has...)'
        },
        {
          id: '26-l-3',
          type: 'multiple_choice',
          prompt: 'Identify which sentence is completely error-free:',
          questionText: 'Choose the correct sentence:',
          options: [
            'The sun rises in east.',
            'The sun rises in the east.',
            'Sun rise in the east.',
            'The sun is rise in east.'
          ],
          correctAnswer: 'The sun rises in the east.',
          explanation: 'Directions (the east) and unique bodies (the sun) require article "the", and singular sun takes "rises".',
          nativeMeaning: 'సూర్యుడు తూర్పున ఉదయిస్తాడు.'
        }
      ],
      medium: [
        {
          id: '26-m-1',
          type: 'grammar_correction',
          prompt: 'Correct the double past tense error: "She did not came yesterday."',
          questionText: 'What is the correct form?',
          options: [
            'She did not come yesterday.',
            'She did not comes yesterday.',
            'She was not came yesterday.',
            'She does not came yesterday.'
          ],
          correctAnswer: 'She did not come yesterday.',
          explanation: 'After the auxiliary "did", the verb must always be in its base form ("come").',
          nativeMeaning: 'did తర్వాత బేస్ వెర్బ్ (come) మాత్రమే రావాలి.'
        },
        {
          id: '26-m-2',
          type: 'scramble_sentence',
          prompt: 'Arrange into the correct sentence with proper punctuation:',
          questionText: 'homework / completed / has / She / her',
          correctAnswer: ['She', 'has', 'completed', 'her', 'homework'],
          explanation: '"She has completed her homework."',
          nativeMeaning: 'ఆమె తన హోంవర్క్ పూర్తి చేసింది.'
        },
        {
          id: '26-m-3',
          type: 'fill_in_the_blank',
          prompt: 'Choose the correct form to avoid redundancy:',
          questionText: 'Please ___ the document once again.',
          options: ['repeat', 'repeat again', 're-repeat again', 'repeating again'],
          correctAnswer: 'repeat',
          explanation: '"Repeat" already means to do or say something again. Saying "repeat again" is a redundant error.',
          nativeMeaning: '"Repeat" అనగానే మళ్ళీ చెప్పడం అని అర్థం.'
        }
      ],
      high: [
        {
          id: '26-h-1',
          type: 'grammar_correction',
          prompt: 'Correct the sentence error: "One of my friend are an engineer."',
          questionText: 'What is the grammatically accurate sentence?',
          options: [
            'One of my friends is an engineer.',
            'One of my friends are an engineer.',
            'One of my friend is an engineer.',
            'One of my friend are engineer.'
          ],
          correctAnswer: 'One of my friends is an engineer.',
          explanation: '"One of..." requires plural noun ("friends") followed by singular verb ("is") agreeing with "One".',
          nativeMeaning: 'నా స్నేహితుల్లో ఒకరు ఇంజనీర్.'
        },
        {
          id: '26-h-2',
          type: 'multiple_choice',
          prompt: 'Analyze this sentence: "Neither Ravi nor his brothers ___ present."',
          questionText: 'Which verb correctly completes the sentence?',
          options: ['were', 'was', 'is', 'has'],
          correctAnswer: 'were',
          explanation: 'With "Neither... nor", the verb agrees with the closer subject ("his brothers" = plural, so "were").',
          nativeMeaning: 'సమీప కర్త (brothers) బహువచనం కాబట్టి were వస్తుంది.'
        },
        {
          id: '26-h-3',
          type: 'scramble_sentence',
          prompt: 'Construct the grammatically accurate conditional sentence:',
          questionText: 'hard / If / study / you / will / pass / you',
          correctAnswer: ['If', 'you', 'study', 'hard', 'you', 'will', 'pass'],
          explanation: '"If you study hard you will pass" (First conditional).',
          nativeMeaning: 'నువ్వు కష్టపడి చదివితే ఉత్తీర్ణుడవుతావు.'
        }
      ]
    }
  },

  // Level 30: Basic Sentence Building (Milestone!)
  30: {
    id: 30,
    levelNumber: 30,
    stageId: 'basic',
    title: 'Basic Sentence Building',
    category: 'sentence_formation',
    summary: 'Congratulations on reaching Level 30! Assemble everything you learned: nouns, verbs, adjectives, prepositions, and punctuation to build complete, expressive sentences.',
    rules: [
      'Start with a capital letter and end with a period (.), question mark (?), or exclamation mark (!).',
      'Use adjectives before nouns to give more detail (e.g. "a sweet red apple").',
      'Use prepositions to show location or time (e.g. "in the morning", "on the table").',
      'Check subject-verb agreement.'
    ],
    examples: [
      { english: 'The clever student solved the difficult quiz.', native: 'తెలివైన విద్యార్థి కష్టమైన క్విజ్ సాధించాడు.', note: 'Rich sentence structure' },
      { english: 'We love learning new languages every single day.', native: 'మేము ప్రతిరోజూ కొత్త భాషలను నేర్చుకోవడానికి ఇష్టపడతాము.', note: 'Expressive speech' }
    ],
    questions: {
      low: [
        {
          id: '30-l-1',
          type: 'scramble_sentence',
          prompt: 'Build this basic sentence about learning:',
          questionText: 'love / I / English / learning',
          correctAnswer: ['I', 'love', 'learning', 'English'],
          explanation: '"I love learning English."',
          nativeMeaning: 'నేను ఇంగ్లీష్ నేర్చుకోవడాన్ని ఇష్టపడుతున్నాను.'
        },
        {
          id: '30-l-2',
          type: 'fill_in_the_blank',
          prompt: 'Complete the sentence with an adjective:',
          questionText: 'The ___ peacock danced gracefully.',
          emoji: '🦚',
          options: ['beautiful', 'run', 'yesterday', 'quickly'],
          correctAnswer: 'beautiful',
          explanation: '"beautiful" is an adjective describing the peacock.',
          nativeMeaning: 'అందమైన నెమలి (beautiful peacock)'
        },
        {
          id: '30-l-3',
          type: 'image_type',
          prompt: 'Type the word for this place of learning:',
          questionText: 'Write the name of this place:',
          emoji: '🏫',
          correctAnswer: 'school',
          explanation: 'It is a school (S-C-H-O-O-L).',
          nativeMeaning: 'పాఠశాల (School)'
        }
      ],
      medium: [
        {
          id: '30-m-1',
          type: 'scramble_sentence',
          prompt: 'Build the full sentence with subject, verb, and prepositional phrase:',
          questionText: 'morning / rises / in / The / east / every / sun / the',
          correctAnswer: ['The', 'sun', 'rises', 'in', 'the', 'east', 'every', 'morning'],
          explanation: '"The sun rises in the east every morning."',
          nativeMeaning: 'ప్రతి ఉదయం సూర్యుడు తూర్పున ఉదయిస్తాడు.'
        },
        {
          id: '30-m-2',
          type: 'grammar_correction',
          prompt: 'Find the complete and correct sentence:',
          questionText: 'Which sentence has perfect grammar and punctuation?',
          options: [
            'Lumi is my friendly AI tutor.',
            'lumi is my friendly ai tutor',
            'Lumi are my friendly AI tutor.',
            'Lumi is my friendly AI tutor'
          ],
          correctAnswer: 'Lumi is my friendly AI tutor.',
          explanation: 'Starts with capital letter, singular verb "is", and ends with a period.',
          nativeMeaning: 'లూమి నా స్నేహపూర్వక AI ట్యూటర్.'
        },
        {
          id: '30-m-3',
          type: 'match_pairs',
          prompt: 'Connect words to their parts of speech in this sentence:',
          questionText: 'In: "The smart boy answered quickly."',
          pairs: [
            { left: 'boy', right: 'Noun' },
            { left: 'smart', right: 'Adjective' },
            { left: 'answered', right: 'Verb' },
            { left: 'quickly', right: 'Adverb' }
          ],
          correctAnswer: 'match_all',
          explanation: 'Excellent job identifying the grammatical building blocks!',
          nativeMeaning: 'భాషా భాగాలను గుర్తించడం'
        }
      ],
      high: [
        {
          id: '30-h-1',
          type: 'scramble_sentence',
          prompt: 'Construct the milestone victory sentence:',
          questionText: 'completed / I / have / basic / the / stage / successfully / !',
          correctAnswer: ['I', 'have', 'successfully', 'completed', 'the', 'basic', 'stage', '!'],
          explanation: '"I have successfully completed the basic stage!"',
          nativeMeaning: 'నేను బేసిక్ స్టేజ్ ను విజయవంతంగా పూర్తి చేశాను!'
        },
        {
          id: '30-h-2',
          type: 'multiple_choice',
          prompt: 'Evaluate sentence complexity:',
          questionText: '"Although it was raining, the children continued playing football." What type of sentence is this?',
          options: ['Complex sentence', 'Simple sentence', 'Compound sentence', 'Imperative sentence'],
          correctAnswer: 'Complex sentence',
          explanation: 'It has an independent clause ("the children continued playing football") and a dependent clause introduced by "Although".',
          nativeMeaning: 'కాంప్లెక్స్ వాక్యం (Complex sentence)'
        },
        {
          id: '30-h-3',
          type: 'fill_in_the_blank',
          prompt: 'Fill in the conjunction:',
          questionText: 'Language learning requires patience ___ daily practice.',
          options: ['and', 'but', 'because', 'so that'],
          correctAnswer: 'and',
          explanation: '"and" connects two complementary requirements.',
          nativeMeaning: 'భాష నేర్చుకోవడానికి సహనం మరియు రోజూ సాధన అవసరం.'
        }
      ]
    }
  }
};

// Fallback topic generator for any level from 1 to 150
export function getTopicLessonForLevel(levelNumber: number, stageId: string, levelTitle: string): TopicLesson {
  if (BASIC_TOPIC_LESSONS[levelNumber]) {
    return BASIC_TOPIC_LESSONS[levelNumber];
  }

  // Dynamically generate structured lesson content for any level
  return {
    id: levelNumber,
    levelNumber,
    stageId: stageId as any,
    title: levelTitle,
    category: levelNumber % 2 === 0 ? 'grammar' : 'vocabulary',
    summary: `In this level, you will explore "${levelTitle}". Practice real-world usage, linguistic rules, and sentence structures tailored for ${stageId} stage learners.`,
    rules: [
      `Master key patterns and expressions related to ${levelTitle}.`,
      `Understand proper grammar, sentence cohesion, and word usage.`,
      `Learn native meaning equivalents and cultural contexts.`,
      `Apply what you learn in interactive exercises.`
    ],
    examples: [
      { english: `We practice ${levelTitle} regularly.`, native: `మేము క్రమం తప్పకుండా సాధన చేస్తాము.`, note: 'Standard usage example' },
      { english: `Can you explain ${levelTitle} in simple words?`, native: `మీరు దీనిని సులభమైన పదాలలో వివరించగలరా?`, note: 'Conversational sentence' }
    ],
    questions: {
      low: [
        {
          id: `${levelNumber}-l-1`,
          type: 'multiple_choice',
          prompt: `What is the primary concept behind "${levelTitle}"?`,
          questionText: `Choose the most accurate statement about ${levelTitle}:`,
          options: [
            `It helps build clear and effective communication skills.`,
            `It is only used in formal writing.`,
            `It has no grammar rules.`,
            `It is an ancient unused form.`
          ],
          correctAnswer: `It helps build clear and effective communication skills.`,
          explanation: `Consistent mastery of ${levelTitle} enhances both spoken and written fluency.`,
          nativeMeaning: `సమర్థవంతమైన కమ్యూనికేషన్ కోసం ఇది అవసరం.`
        },
        {
          id: `${levelNumber}-l-2`,
          type: 'fill_in_the_blank',
          prompt: `Complete the sentence related to ${levelTitle}:`,
          questionText: `Daily practice is the key to ___ any language skill.`,
          options: ['mastering', 'forget', 'lost', 'sleep'],
          correctAnswer: 'mastering',
          explanation: 'Daily practice leads to mastery of language skills.',
          nativeMeaning: 'రోజూ సాధన చేయడం వల్ల ప్రావీణ్యం లభిస్తుంది.'
        },
        {
          id: `${levelNumber}-l-3`,
          type: 'scramble_sentence',
          prompt: 'Rearrange to form a proper sentence:',
          questionText: 'practice / brings / Daily / success',
          correctAnswer: ['Daily', 'practice', 'brings', 'success'],
          explanation: '"Daily practice brings success."',
          nativeMeaning: 'రోజువారీ సాధన విజయాన్ని తెస్తుంది.'
        }
      ],
      medium: [
        {
          id: `${levelNumber}-m-1`,
          type: 'grammar_correction',
          prompt: `Select the sentence with accurate grammatical agreement:`,
          questionText: `Which sentence is properly constructed?`,
          options: [
            `Every student has completed their lesson on ${levelTitle}.`,
            `Every student have completed their lesson on ${levelTitle}.`,
            `Every students has completed their lesson.`,
            `Every student are completing their lesson.`
          ],
          correctAnswer: `Every student has completed their lesson on ${levelTitle}.`,
          explanation: `"Every student" is singular and takes singular auxiliary "has".`,
          nativeMeaning: `ప్రతి విద్యార్థి తన పాఠాన్ని పూర్తి చేశాడు.`
        },
        {
          id: `${levelNumber}-m-2`,
          type: 'scramble_sentence',
          prompt: 'Arrange into an active sentence:',
          questionText: 'confidence / Learning / languages / boosts / our',
          correctAnswer: ['Learning', 'languages', 'boosts', 'our', 'confidence'],
          explanation: '"Learning languages boosts our confidence."',
          nativeMeaning: 'భాషలు నేర్చుకోవడం మన ఆత్మవిశ్వాసాన్ని పెంచుతుంది.'
        },
        {
          id: `${levelNumber}-m-3`,
          type: 'fill_in_the_blank',
          prompt: 'Select the appropriate connector:',
          questionText: `She studied carefully ___ she wanted to excel in ${levelTitle}.`,
          options: ['because', 'although', 'unless', 'despite'],
          correctAnswer: 'because',
          explanation: '"because" states the reason for studying carefully.',
          nativeMeaning: 'ఆమె రాణించాలనుకున్నందున (because)'
        }
      ],
      high: [
        {
          id: `${levelNumber}-h-1`,
          type: 'multiple_choice',
          prompt: `Identify the nuanced rhetorical tone in this expression:`,
          questionText: `"Hard work today yields eloquent expressions tomorrow." What is the main message?`,
          options: [
            'Consistent effort produces long-term language fluency.',
            'Grammar is unimportant.',
            'Speaking is harder than writing.',
            'Languages cannot be learned quickly.'
          ],
          correctAnswer: 'Consistent effort produces long-term language fluency.',
          explanation: 'The sentence highlights that diligence today leads to eloquence tomorrow.',
          nativeMeaning: 'నేటి కృషి రేపటి ప్రావీణ్యానికి దారితీస్తుంది.'
        },
        {
          id: `${levelNumber}-h-2`,
          type: 'scramble_sentence',
          prompt: 'Build the advanced complex sentence:',
          questionText: 'flourishes / where / curiosity / Knowledge / guides / learning',
          correctAnswer: ['Knowledge', 'flourishes', 'where', 'curiosity', 'guides', 'learning'],
          explanation: '"Knowledge flourishes where curiosity guides learning."',
          nativeMeaning: 'జిజ్ఞాస ఉన్న చోట జ్ఞానం వర్ధిల్లుతుంది.'
        },
        {
          id: `${levelNumber}-h-3`,
          type: 'grammar_correction',
          prompt: 'Choose the sentence with flawless syntax:',
          questionText: 'Which version demonstrates advanced linguistic precision?',
          options: [
            'Having mastered the rules, she spoke with natural fluency.',
            'Having master the rules, she spoke with natural fluency.',
            'Mastered the rules, she spoken with natural fluency.',
            'Having mastering the rules, she speaks with natural fluency.'
          ],
          correctAnswer: 'Having mastered the rules, she spoke with natural fluency.',
          explanation: 'The perfect participle clause ("Having mastered") correctly modifies the subject "she".',
          nativeMeaning: 'నియమాలను నేర్చుకున్న తర్వాత, ఆమె సహజంగా మాట్లాడింది.'
        }
      ]
    }
  };
}

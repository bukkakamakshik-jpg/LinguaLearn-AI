export interface VocabItem {
  id: string;
  category: string;
  word: string;
  telugu: string;
  hindi: string;
  spanish: string;
  emoji: string;
  exampleSentence: string;
  pronunciation: string;
}

export const VOCABULARY_CATEGORIES = [
  'Fruits', 'Vegetables', 'Animals', 'Birds', 'Body Parts',
  'Family Members', 'School & Classroom', 'Clothes', 'Colors', 'Numbers',
  'Days & Months', 'Food & Drinks', 'Vehicles & Transport', 'Places in Town', 'Jobs & Professions',
  'Household Objects', 'Nature & Plants', 'Weather & Seasons', 'Emotions & Feelings', 'Daily Activities',
  'Sports & Games', 'Technology', 'Common Verbs', 'Common Adjectives'
] as const;

export const VOCABULARY_ITEMS: VocabItem[] = [
  // Fruits
  { id: 'v1', category: 'Fruits', word: 'Apple', telugu: 'యాపిల్ / సీమరేగు', hindi: 'सेब (Seb)', spanish: 'Manzana', emoji: '🍎', exampleSentence: 'An apple a day keeps the doctor away.', pronunciation: 'AP-uhl' },
  { id: 'v2', category: 'Fruits', word: 'Banana', telugu: 'అరటిపండు', hindi: 'केला (Kela)', spanish: 'Plátano', emoji: '🍌', exampleSentence: 'Monkeys love to eat bananas.', pronunciation: 'buh-NAN-uh' },
  { id: 'v3', category: 'Fruits', word: 'Mango', telugu: 'మామిడి పండు', hindi: 'आम (Aam)', spanish: 'Mango', emoji: '🥭', exampleSentence: 'Mango is known as the king of fruits.', pronunciation: 'MANG-goh' },
  { id: 'v4', category: 'Fruits', word: 'Orange', telugu: 'నారింజ', hindi: 'संतरा (Santara)', spanish: 'Naranja', emoji: '🍊', exampleSentence: 'Oranges are rich in Vitamin C.', pronunciation: 'OR-inj' },
  { id: 'v5', category: 'Fruits', word: 'Grapes', telugu: 'ద్రాక్ష', hindi: 'अंगूर (Angoor)', spanish: 'Uvas', emoji: '🍇', exampleSentence: 'These purple grapes are very sweet.', pronunciation: 'grayps' },
  { id: 'v6', category: 'Fruits', word: 'Watermelon', telugu: 'పుచ్చకాయ', hindi: 'तरबूज (Tarbooj)', spanish: 'Sandía', emoji: '🍉', exampleSentence: 'Watermelon is refreshing in summer.', pronunciation: 'WAW-ter-mel-un' },

  // Vegetables
  { id: 'v7', category: 'Vegetables', word: 'Potato', telugu: 'బంగాళాదుంప', hindi: 'आलू (Aaloo)', spanish: 'Patata', emoji: '🥔', exampleSentence: 'Potato chips are crispy and tasty.', pronunciation: 'poh-TAY-toh' },
  { id: 'v8', category: 'Vegetables', word: 'Tomato', telugu: 'టమోటా', hindi: 'टमाटर (Tamaatar)', spanish: 'Tomate', emoji: '🍅', exampleSentence: 'Red tomatoes make great soup.', pronunciation: 'tuh-MAY-toh' },
  { id: 'v9', category: 'Vegetables', word: 'Carrot', telugu: 'క్యారెట్', hindi: 'गाजर (Gaajar)', spanish: 'Zanahoria', emoji: '🥕', exampleSentence: 'Rabbits eat fresh orange carrots.', pronunciation: 'KAIR-uht' },
  { id: 'v10', category: 'Vegetables', word: 'Onion', telugu: 'ఉల్లిపాయ', hindi: 'प्याज (Pyaaz)', spanish: 'Cebolla', emoji: '🧅', exampleSentence: 'Chopping an onion can make your eyes water.', pronunciation: 'UHN-yuhn' },

  // Animals
  { id: 'v11', category: 'Animals', word: 'Dog', telugu: 'కుక్క', hindi: 'कुत्ता (Kutta)', spanish: 'Perro', emoji: '🐶', exampleSentence: 'The faithful dog barks at strangers.', pronunciation: 'dawg' },
  { id: 'v12', category: 'Animals', word: 'Cat', telugu: 'పిల్లి', hindi: 'बिल्ली (Billi)', spanish: 'Gato', emoji: '🐱', exampleSentence: 'The soft cat sleeps on the sofa.', pronunciation: 'kat' },
  { id: 'v13', category: 'Animals', word: 'Elephant', telugu: 'ఏనుగు', hindi: 'हाथी (Haathi)', spanish: 'Elefante', emoji: '🐘', exampleSentence: 'An elephant has large ears and a long trunk.', pronunciation: 'EL-uh-fuhnt' },
  { id: 'v14', category: 'Animals', word: 'Lion', telugu: 'సింహం', hindi: 'शेर (Sher)', spanish: 'León', emoji: '🦁', exampleSentence: 'The lion roars loudly in the forest.', pronunciation: 'LY-uhn' },

  // Birds
  { id: 'v15', category: 'Birds', word: 'Peacock', telugu: 'నెమలి', hindi: 'मोर (Mor)', spanish: 'Pavo real', emoji: '🦚', exampleSentence: 'The peacock dances gracefully in the rain.', pronunciation: 'PEE-kok' },
  { id: 'v16', category: 'Birds', word: 'Parrot', telugu: 'చిలుక', hindi: 'तोता (Tota)', spanish: 'Loro', emoji: '🦜', exampleSentence: 'The green parrot repeats human words.', pronunciation: 'PAIR-uht' },
  { id: 'v17', category: 'Birds', word: 'Crow', telugu: 'కాకి', hindi: 'कौआ (Kauwa)', spanish: 'Cuervo', emoji: '🦅', exampleSentence: 'The clever crow dropped stones into the pitcher.', pronunciation: 'kroh' },

  // Body Parts
  { id: 'v18', category: 'Body Parts', word: 'Eyes', telugu: 'కళ్ళు', hindi: 'आँखें (Aankhein)', spanish: 'Ojos', emoji: '👀', exampleSentence: 'We see the beautiful world with our eyes.', pronunciation: 'eyez' },
  { id: 'v19', category: 'Body Parts', word: 'Hand', telugu: 'చేయి', hindi: 'हाथ (Haath)', spanish: 'Mano', emoji: '✋', exampleSentence: 'Raise your hand to ask a question.', pronunciation: 'hand' },
  { id: 'v20', category: 'Body Parts', word: 'Heart', telugu: 'గుండె', hindi: 'दिल (Dil)', spanish: 'Corazón', emoji: '❤️', exampleSentence: 'The heart pumps blood through our body.', pronunciation: 'hahrt' },

  // Family Members
  { id: 'v21', category: 'Family Members', word: 'Mother', telugu: 'అమ్మ', hindi: 'माँ / माता (Maa)', spanish: 'Madre', emoji: '👩', exampleSentence: 'My mother cooks delicious food for us.', pronunciation: 'MUHTH-er' },
  { id: 'v22', category: 'Family Members', word: 'Father', telugu: 'నాన్న', hindi: 'पिताजी (Pita)', spanish: 'Padre', emoji: '👨', exampleSentence: 'Father helped me ride my bicycle.', pronunciation: 'FAH-ther' },
  { id: 'v23', category: 'Family Members', word: 'Brother', telugu: 'సోదరుడు / అన్నయ్య', hindi: 'भाई (Bhai)', spanish: 'Hermano', emoji: '👦', exampleSentence: 'My brother plays cricket with me.', pronunciation: 'BRUHTH-er' },

  // School & Classroom
  { id: 'v24', category: 'School & Classroom', word: 'School', telugu: 'పాఠశాల', hindi: 'स्कूल / विद्यालय (Vidyalay)', spanish: 'Escuela', emoji: '🏫', exampleSentence: 'I go to school every morning at 8 AM.', pronunciation: 'skool' },
  { id: 'v25', category: 'School & Classroom', word: 'Book', telugu: 'పుస్తకం', hindi: 'किताब (Kitaab)', spanish: 'Libro', emoji: '📖', exampleSentence: 'Open your English book to page ten.', pronunciation: 'book' },
  { id: 'v26', category: 'School & Classroom', word: 'Teacher', telugu: 'ఉపాధ్యాయుడు', hindi: 'अध्यापक / शिक्षक (Shikshak)', spanish: 'Profesor', emoji: '🧑‍🏫', exampleSentence: 'Our teacher explains grammar very clearly.', pronunciation: 'TEE-cher' },

  // Vehicles
  { id: 'v27', category: 'Vehicles & Transport', word: 'Car', telugu: 'కారు', hindi: 'गाड़ी / कार (Car)', spanish: 'Coche', emoji: '🚗', exampleSentence: 'We drove the car across the mountain bridge.', pronunciation: 'kahr' },
  { id: 'v28', category: 'Vehicles & Transport', word: 'Train', telugu: 'రైలు', hindi: 'रेलगाड़ी (Train)', spanish: 'Tren', emoji: '🚆', exampleSentence: 'The express train arrived on time.', pronunciation: 'trayn' },
  { id: 'v29', category: 'Vehicles & Transport', word: 'Aeroplane', telugu: 'విమానం', hindi: 'हवाई जहाज (Hawai Jahaz)', spanish: 'Avión', emoji: '✈️', exampleSentence: 'The aeroplane soared high in the cloudy sky.', pronunciation: 'AIR-uh-playn' },

  // Nature & Weather
  { id: 'v30', category: 'Weather & Seasons', word: 'Rain', telugu: 'వర్షం', hindi: 'बारिश (Baarish)', spanish: 'Lluvia', emoji: '🌧️', exampleSentence: 'The cool rain made the garden green.', pronunciation: 'rayn' },
  { id: 'v31', category: 'Weather & Seasons', word: 'Sun', telugu: 'సూర్యుడు', hindi: 'सूर्य / सूरज (Sooraj)', spanish: 'Sol', emoji: '☀️', exampleSentence: 'The sun shines brightly in the morning.', pronunciation: 'suhn' },

  // Emotions
  { id: 'v32', category: 'Emotions & Feelings', word: 'Happy', telugu: 'సంతోషం', hindi: 'खुश (Khush)', spanish: 'Feliz', emoji: '😊', exampleSentence: 'She felt very happy after scoring top marks.', pronunciation: 'HAP-ee' },
  { id: 'v33', category: 'Emotions & Feelings', word: 'Excited', telugu: 'ఉత్సాహం', hindi: 'उत्साहित (Utsahit)', spanish: 'Emocionado', emoji: '🤩', exampleSentence: 'The children were excited about the picnic.', pronunciation: 'ek-SY-tid' },
];

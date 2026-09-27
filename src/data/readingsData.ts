export interface ReadingPassage {
  id: string;
  stageId: string;
  title: string;
  topic: string;
  estimatedMinutes: number;
  content: string;
  audioKeySentence: string;
  keyPoints: string[];
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'read-1',
    stageId: 'basic',
    title: 'The Honeybee and the Flower',
    topic: 'Nature & Insects',
    estimatedMinutes: 2,
    content: `Honeybees are small, hardworking insects that play a vital role in our ecosystem. Every sunny morning, worker bees fly from flower to flower collecting sweet nectar and pollen. As they land on petals, pollen sticks to their tiny fuzzy legs. When they move to another blossom, they pollinate the plant, allowing fruits and vegetables to grow. Inside the beehive, worker bees transform nectar into delicious golden honey. Without honeybees, many of the foods we love, like apples, strawberries, and almonds, would not exist!`,
    audioKeySentence: 'Honeybees are small, hardworking insects that collect nectar and make delicious honey.',
    keyPoints: [
      'Worker bees collect sweet nectar and pollen.',
      'Bees help plants pollinate to produce fruits and vegetables.',
      'They store transformed nectar as honey inside the hive.'
    ],
    questions: [
      {
        id: 'rq-1',
        question: 'What do bees collect from flowers?',
        options: ['Sweet nectar and pollen', 'Leaves and bark', 'Water and soil', 'Seeds and roots'],
        correctAnswer: 'Sweet nectar and pollen',
        explanation: 'Bees visit flowers specifically to collect nectar and pollen.',
      },
      {
        id: 'rq-2',
        question: 'Why are bees important for fruits like apples and strawberries?',
        options: [
          'They pollinate flowers so fruits can grow',
          'They eat harmful pests',
          'They water the roots',
          'They build nests in fruit trees'
        ],
        correctAnswer: 'They pollinate flowers so fruits can grow',
        explanation: 'Bees transfer pollen between flowers, allowing fertilization and fruit growth.',
      },
      {
        id: 'rq-3',
        question: 'True or False: Without bees, many delicious foods would not exist.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'True, bees pollinate numerous fruit, vegetable, and nut crops essential to our food supply.',
      }
    ]
  },
  {
    id: 'read-2',
    stageId: 'beginner',
    title: 'How Renewable Energy Powers Our World',
    topic: 'Science & Environment',
    estimatedMinutes: 3,
    content: `Renewable energy comes from natural sources that constantly replenish themselves, such as sunlight, wind, and flowing water. Unlike fossil fuels like coal and petroleum, renewable energy does not emit harmful greenhouse gases into our atmosphere. Solar panels capture energy directly from sun rays and convert it into clean electricity for homes and schools. Giant wind turbines placed on hills or offshore ocean waters harness the kinetic energy of wind currents. By investing in renewable technology, communities protect our planet while creating sustainable jobs for the future.`,
    audioKeySentence: 'Renewable energy from sun and wind protects our planet by providing clean electricity without pollution.',
    keyPoints: [
      'Renewable sources replenish naturally (sun, wind, water).',
      'Solar panels convert sunlight directly into electricity.',
      'Wind turbines capture kinetic wind energy without greenhouse emissions.'
    ],
    questions: [
      {
        id: 'rq-4',
        question: 'What is a major advantage of renewable energy over fossil fuels?',
        options: [
          'It does not emit harmful greenhouse gases',
          'It only works at night',
          'It is completely free to construct',
          'It runs out very quickly'
        ],
        correctAnswer: 'It does not emit harmful greenhouse gases',
        explanation: 'Renewable energy generates power cleanly without polluting the atmosphere.',
      },
      {
        id: 'rq-5',
        question: 'How do solar panels work?',
        options: [
          'They convert sun rays into electricity',
          'They burn coal to create steam',
          'They trap wind currents',
          'They pump underground petroleum'
        ],
        correctAnswer: 'They convert sun rays into electricity',
        explanation: 'Solar photovoltaic cells absorb sunlight and convert it into electrical current.',
      }
    ]
  }
];

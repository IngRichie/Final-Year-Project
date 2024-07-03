// healthTips.ts

export interface HealthTip {
  id: number;
  topic: string;
  content: string;
}

const healthTips: HealthTip[] = [
  {
    id: 1,
    topic: "Managing Stress",
    content:
      "Practice deep breathing exercises and take regular breaks to relax.",
  },
  {
    id: 2,
    topic: "Improving Sleep",
    content:
      "Maintain a consistent sleep schedule and create a relaxing bedtime routine.",
  },
  {
    id: 3,
    topic: "Sleep Well",
    content: "Maintain a regular sleep schedule to improve mental well-being.",
  },
  {
    id: 4,
    topic: "Stay Active",
    content:
      "Engage in regular physical activity for at least 30 minutes a day.",
  },
  {
    id: 5,
    topic: "Connect with Others",
    content:
      "Socialize with friends and family to boost your mood and mental health.",
  },
  {
    id: 6,
    topic: "Limit Screen Time",
    content: "Reduce screen time before bed for better sleep quality.",
  },
  {
    id: 7,
    topic: "Practice Gratitude",
    content: "Keep a gratitude journal to focus on positive aspects of life.",
  },
  {
    id: 8,
    topic: "Set Realistic Goals",
    content: "Set achievable goals to maintain motivation and reduce stress.",
  },
  {
    id: 9,
    topic: "Mindfulness Meditation",
    content:
      "Practice mindfulness meditation to improve focus and reduce anxiety.",
  },
  {
    id: 10,
    topic: "Learn Something New",
    content: "Engage in lifelong learning activities to stimulate the mind.",
  },
  {
    id: 11,
    topic: "Seek Professional Help",
    content:
      "Don't hesitate to seek help from a mental health professional if needed.",
  },
  {
    id: 12,
    topic: "Stay Hydrated",
    content:
      "Drink plenty of water throughout the day for optimal physical and mental health.",
  },
  {
    id: 13,
    topic: "Take Breaks",
    content: "Take regular breaks during work or study to refresh your mind.",
  },
  {
    id: 14,
    topic: "Practice Deep Breathing",
    content:
      "Practice deep breathing exercises to reduce stress and promote relaxation.",
  },
  {
    id: 15,
    topic: "Maintain a Balanced Diet",
    content:
      "Eat a balanced diet rich in nutrients to support mental and physical well-being.",
  },
  // Add more health tips as needed
];

export default healthTips;

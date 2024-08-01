import { MentalHealthTip } from "../types";

const images = {
  selfCompassion: require('../assets/tipsImages/self compassion.png'),
  regularExercise: require('../assets/tipsImages/regular exercise.png'),
  healthyDiet: require('../assets/tipsImages/healthy diet.png'),
  creativeActivities: require('../assets/tipsImages/creative activities.png'),
  disconnectFromTech: require('../assets/tipsImages/disconnect from tech.png'),
  qualitySleep: require('../assets/tipsImages/quality sleep.png'),
  mindfulMeditation: require('../assets/tipsImages/mindful meditation.png'),
  helpingOthers: require('../assets/tipsImages/helping others.png'),
  familyAndFriends: require('../assets/tipsImages/family and friends.png'),
  playfulness: require('../assets/tipsImages/playfullness.png'),
  expressGratitude: require('../assets/tipsImages/express gratitude.png'),
  practiceDeepBreathing: require('../assets/tipsImages/practice deep breathing.png'),
  engageInHobbies: require('../assets/tipsImages/hobbie.png'),
  stayHydrated: require('../assets/tipsImages/water.png'),
  limitCaffeineAlcohol: require('../assets/tipsImages/coffee and alcohol.png'),
  connectWithNature: require('../assets/tipsImages/nature.png'),
  journalizing: require('../assets/tipsImages/Journalizying.png'),
  seekSupport: require('../assets/tipsImages/seek support.png'),
  practiceForgiveness: require('../assets/tipsImages/practice forgiveness.png'),
  laughOften: require('../assets/tipsImages/laugh often.png'),
  stayOrganized: require('../assets/tipsImages/stay organized.png'),
  practiceYoga: require('../assets/tipsImages/practice yoga.png'),
  limitScreenTime: require('../assets/tipsImages/disconnect from tech.png'),
  limitNewsConsumption: require('../assets/tipsImages/limit news consomtion.png'),
  spendTimeWithPets: require('../assets/tipsImages/spend time with pets.png'),
};

const mentalHealthTips: MentalHealthTip[] = [
  {
    tip: "Practice Self-Compassion",
    description: "Treat yourself with kindness and avoid harsh self-criticism to build resilience.",
    image: images.selfCompassion,
  },
  {
    tip: "Regular Exercise",
    description: "Engage in physical activities, such as walking for 30 minutes daily, to boost your mood and overall health.",
    image: images.regularExercise,
  },
  {
    tip: "Healthy Diet",
    description: "Eat nutritious meals and stay hydrated to improve energy levels and focus. Limit caffeine and alcohol intake.",
    image: images.healthyDiet,
  },
  {
    tip: "Creative Activities",
    description: "Try new recipes, write, paint, or engage in any creative activity to boost your mental well-being.",
    image: images.creativeActivities,
  },
  {
    tip: "Disconnect from Technology",
    description: "Take breaks from screens to reduce stress and improve mental health.",
    image: images.disconnectFromTech,
  },
  {
    tip: "Quality Sleep",
    description: "Ensure you get enough good-quality sleep, as it significantly impacts both mental and physical health.",
    image: images.qualitySleep,
  },
  {
    tip: "Mindfulness and Meditation",
    description: "Practice mindfulness and meditation to stay present, reduce stress, and improve emotional health.",
    image: images.mindfulMeditation,
  },
  {
    tip: "Volunteer",
    description: "Helping others can provide a sense of purpose and improve your mental health.",
    image: images.helpingOthers,
  },
  {
    tip: "Positive Social Interactions",
    description: "Spend quality time with friends and family to combat loneliness and improve your mental health.",
    image: images.familyAndFriends,
  },
  {
    tip: "Laughter and Play",
    description: "Incorporate humor and playfulness into your life to reduce anxiety and increase happiness.",
    image: images.playfulness,
  },
  {
    tip: "Express Gratitude",
    description: "Regularly noting things you are thankful for can boost your mental health.",
    image: images.expressGratitude,
  },
  {
    tip: "Practice Deep Breathing",
    description: "Engage in deep breathing exercises to help reduce stress and promote relaxation.",
    image: images.practiceDeepBreathing,
  },
  {
    tip: "Engage in Hobbies",
    description: "Spend time on activities you enjoy to improve your mood and overall well-being.",
    image: images.engageInHobbies,
  },
  {
    tip: "Stay Hydrated",
    description: "Drink plenty of water throughout the day to maintain energy levels and focus.",
    image: images.stayHydrated,
  },
  {
    tip: "Limit Caffeine and Alcohol",
    description: "Be mindful of your intake as they can affect your mood and well-being.",
    image: images.limitCaffeineAlcohol,
  },
  {
    tip: "Connect with Nature",
    description: "Spend time outdoors to boost your mental health and reduce stress.",
    image: images.connectWithNature,
  },
  {
    tip: "Journalizing",
    description: "Writing down your thoughts and feelings can help process emotions and reduce stress.",
    image: images.journalizing,
  },
  {
    tip: "Seek Support",
    description: "Reach out to friends, family, or a mental health professional when you need help.",
    image: images.seekSupport,
  },
  {
    tip: "Practice Forgiveness",
    description: "Let go of grudges to improve your mental and emotional well-being.",
    image: images.practiceForgiveness,
  },
  {
    tip: "Laugh Often",
    description: "Find humor in everyday situations to reduce stress and increase joy.",
    image: images.laughOften,
  },
  {
    tip: "Stay Organized",
    description: "Keep your living and working spaces tidy to reduce stress and improve focus.",
    image: images.stayOrganized,
  },
  {
    tip: "Practice Yoga",
    description: "Engage in yoga to improve flexibility, reduce stress, and promote mental clarity.",
    image: images.practiceYoga,
  },
  {
    tip: "Limit Screen Time",
    description: "Reduce the amount of time spent on electronic devices to decrease stress.",
    image: images.limitScreenTime,
  },
  {
    tip: "Limit News Consumption",
    description: "Avoid overexposure to negative news to maintain a positive mindset.",
    image: images.limitNewsConsumption,
  },
  {
    tip: "Spend Time with Pets",
    description: "Interacting with animals can reduce stress and increase happiness.",
    image: images.spendTimeWithPets,
  },
];

export default mentalHealthTips;

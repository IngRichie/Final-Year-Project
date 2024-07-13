import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock data
const mockData = [
  {
    id: '1',
    title: 'Understanding Anxiety',
    description: 'Learn about the symptoms, causes, and treatments for anxiety disorders.',
    imageUrl: 'https://example.com/anxiety.jpg',
    link: 'https://www.example.com/anxiety',
  },
  {
    id: '2',
    title: 'Dealing with Depression',
    description: 'A comprehensive guide to understanding and managing depression.',
    imageUrl: 'https://example.com/depression.jpg',
    link: 'https://www.example.com/depression',
  },
  {
    id: '3',
    title: 'Meditation for Mental Health',
    description: 'Discover the benefits of meditation and how it can improve your mental health.',
    imageUrl: 'https://example.com/meditation.jpg',
    link: 'https://www.example.com/meditation',
  },
  {
    id: '4',
    title: 'Mindfulness Exercises',
    description: 'Practical exercises to help you practice mindfulness in your daily life.',
    imageUrl: 'https://example.com/mindfulness.jpg',
    link: 'https://www.example.com/mindfulness',
  },
];

export const fetchMentalHealthResources = async (): Promise<any[]> => {
  try {
  
    await AsyncStorage.setItem('mentalHealthResources', JSON.stringify(mockData));
    return mockData;
  } catch (error) {
    console.error('Error fetching mental health resources:', error);
    return [];
  }
};

export const getCachedMentalHealthResources = async (): Promise<any[]> => {
  try {
    const cachedData = await AsyncStorage.getItem('mentalHealthResources');
    return cachedData ? JSON.parse(cachedData) : [];
  } catch (error) {
    console.error('Error getting cached mental health resources:', error);
    return [];
  }
};

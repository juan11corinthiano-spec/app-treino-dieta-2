// Tipos do aplicativo de treino e dieta

export type ExperienceLevel = 'iniciante' | 'intermediario' | 'avancado';
export type Goal = 'perda-peso' | 'ganho-massa' | 'definicao' | 'saude';
export type AgeGroup = '18-25' | '26-35' | '36-45' | '46-55' | '56+';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  ageGroup: AgeGroup;
  experienceLevel: ExperienceLevel;
  goal: Goal;
  weight: number;
  height: number;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  level: ExperienceLevel;
  ageGroup: AgeGroup;
  days: WorkoutDay[];
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutLog {
  id: string;
  userId: string;
  workoutId: string;
  exerciseId: string;
  date: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: string[];
}

export interface DietPlan {
  id: string;
  goal: Goal;
  dailyCalories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: Meal[];
}

export interface BodyMetrics {
  id: string;
  userId: string;
  date: string;
  weight: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  legs?: number;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  content: string;
  type: 'conquista' | 'duvida' | 'experiencia';
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

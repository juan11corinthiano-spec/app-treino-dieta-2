// Sistema de conquistas e gamificação
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  category: 'treino' | 'dieta' | 'progresso' | 'comunidade';
  unlocked: boolean;
  unlockedAt?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'first-workout',
    title: 'Primeiro Treino',
    description: 'Complete seu primeiro treino',
    icon: '🎯',
    requirement: 1,
    category: 'treino',
    unlocked: false,
  },
  {
    id: 'week-warrior',
    title: 'Guerreiro Semanal',
    description: 'Complete todos os treinos da semana',
    icon: '💪',
    requirement: 7,
    category: 'treino',
    unlocked: false,
  },
  {
    id: 'month-champion',
    title: 'Campeão do Mês',
    description: 'Treine por 30 dias consecutivos',
    icon: '🏆',
    requirement: 30,
    category: 'treino',
    unlocked: false,
  },
  {
    id: 'diet-master',
    title: 'Mestre da Dieta',
    description: 'Siga sua dieta por 7 dias',
    icon: '🥗',
    requirement: 7,
    category: 'dieta',
    unlocked: false,
  },
  {
    id: 'weight-loss-5kg',
    title: 'Primeira Meta',
    description: 'Perca 5kg',
    icon: '⚖️',
    requirement: 5,
    category: 'progresso',
    unlocked: false,
  },
  {
    id: 'community-helper',
    title: 'Ajudante da Comunidade',
    description: 'Ajude 10 pessoas na comunidade',
    icon: '🤝',
    requirement: 10,
    category: 'comunidade',
    unlocked: false,
  },
  {
    id: 'consistency-king',
    title: 'Rei da Consistência',
    description: 'Treine por 90 dias consecutivos',
    icon: '👑',
    requirement: 90,
    category: 'treino',
    unlocked: false,
  },
  {
    id: 'strength-beast',
    title: 'Fera da Força',
    description: 'Aumente sua carga em 50%',
    icon: '🦍',
    requirement: 50,
    category: 'progresso',
    unlocked: false,
  },
];

export function checkAchievements(
  workoutCount: number,
  dietDays: number,
  weightLoss: number,
  communityHelps: number
): Achievement[] {
  return achievements.map(achievement => {
    let progress = 0;
    
    switch (achievement.category) {
      case 'treino':
        progress = workoutCount;
        break;
      case 'dieta':
        progress = dietDays;
        break;
      case 'progresso':
        progress = weightLoss;
        break;
      case 'comunidade':
        progress = communityHelps;
        break;
    }
    
    if (progress >= achievement.requirement && !achievement.unlocked) {
      return {
        ...achievement,
        unlocked: true,
        unlockedAt: new Date().toISOString(),
      };
    }
    
    return achievement;
  });
}

import { DietPlan, Goal } from './types';

// Planos alimentares personalizados por objetivo
export const dietPlans: DietPlan[] = [
  {
    id: 'perda-peso',
    goal: 'perda-peso',
    dailyCalories: 1800,
    protein: 140,
    carbs: 150,
    fats: 60,
    meals: [
      {
        name: 'Café da Manhã',
        calories: 400,
        protein: 30,
        carbs: 40,
        fats: 12,
        foods: [
          '3 ovos mexidos',
          '2 fatias de pão integral',
          '1 banana',
          'Café sem açúcar',
        ],
      },
      {
        name: 'Lanche da Manhã',
        calories: 200,
        protein: 20,
        carbs: 15,
        fats: 8,
        foods: [
          '1 iogurte grego natural',
          '1 colher de pasta de amendoim',
          '10 amêndoas',
        ],
      },
      {
        name: 'Almoço',
        calories: 600,
        protein: 45,
        carbs: 50,
        fats: 20,
        foods: [
          '150g de frango grelhado',
          '4 colheres de arroz integral',
          'Salada verde à vontade',
          '2 colheres de feijão',
          '1 colher de azeite',
        ],
      },
      {
        name: 'Lanche da Tarde',
        calories: 250,
        protein: 25,
        carbs: 20,
        fats: 8,
        foods: [
          '1 shake de whey protein',
          '1 maçã',
          '5 castanhas',
        ],
      },
      {
        name: 'Jantar',
        calories: 350,
        protein: 20,
        carbs: 25,
        fats: 12,
        foods: [
          '120g de peixe grelhado',
          'Legumes cozidos',
          'Salada verde',
          '1 batata doce pequena',
        ],
      },
    ],
  },
  {
    id: 'ganho-massa',
    goal: 'ganho-massa',
    dailyCalories: 3000,
    protein: 180,
    carbs: 400,
    fats: 80,
    meals: [
      {
        name: 'Café da Manhã',
        calories: 650,
        protein: 40,
        carbs: 80,
        fats: 18,
        foods: [
          '4 ovos mexidos',
          '3 fatias de pão integral',
          '1 banana',
          '2 colheres de pasta de amendoim',
          'Suco de laranja natural',
        ],
      },
      {
        name: 'Lanche da Manhã',
        calories: 400,
        protein: 30,
        carbs: 50,
        fats: 10,
        foods: [
          '1 shake de whey protein',
          '1 banana',
          '2 colheres de aveia',
          '1 colher de mel',
        ],
      },
      {
        name: 'Almoço',
        calories: 900,
        protein: 60,
        carbs: 120,
        fats: 25,
        foods: [
          '200g de carne vermelha magra',
          '6 colheres de arroz integral',
          '4 colheres de feijão',
          'Salada verde',
          '1 batata doce média',
          '1 colher de azeite',
        ],
      },
      {
        name: 'Lanche Pré-Treino',
        calories: 350,
        protein: 20,
        carbs: 50,
        fats: 8,
        foods: [
          '1 sanduíche de peito de peru',
          '1 banana',
          'Café',
        ],
      },
      {
        name: 'Lanche Pós-Treino',
        calories: 400,
        protein: 40,
        carbs: 60,
        fats: 5,
        foods: [
          '1 shake de whey protein',
          '1 banana',
          '2 colheres de maltodextrina',
        ],
      },
      {
        name: 'Jantar',
        calories: 300,
        protein: 30,
        carbs: 40,
        fats: 14,
        foods: [
          '150g de frango grelhado',
          '4 colheres de arroz integral',
          'Legumes cozidos',
          'Salada verde',
        ],
      },
    ],
  },
  {
    id: 'definicao',
    goal: 'definicao',
    dailyCalories: 2200,
    protein: 160,
    carbs: 200,
    fats: 65,
    meals: [
      {
        name: 'Café da Manhã',
        calories: 450,
        protein: 35,
        carbs: 45,
        fats: 14,
        foods: [
          '3 ovos mexidos',
          '2 fatias de pão integral',
          '1 banana',
          '1 colher de pasta de amendoim',
        ],
      },
      {
        name: 'Lanche da Manhã',
        calories: 250,
        protein: 25,
        carbs: 20,
        fats: 10,
        foods: [
          '1 shake de whey protein',
          '10 amêndoas',
          '1 maçã',
        ],
      },
      {
        name: 'Almoço',
        calories: 700,
        protein: 50,
        carbs: 70,
        fats: 22,
        foods: [
          '180g de frango grelhado',
          '5 colheres de arroz integral',
          '3 colheres de feijão',
          'Salada verde à vontade',
          '1 colher de azeite',
        ],
      },
      {
        name: 'Lanche Pré-Treino',
        calories: 300,
        protein: 20,
        carbs: 40,
        fats: 8,
        foods: [
          '1 iogurte grego',
          '2 colheres de aveia',
          '1 banana',
        ],
      },
      {
        name: 'Lanche Pós-Treino',
        calories: 250,
        protein: 30,
        carbs: 25,
        fats: 3,
        foods: [
          '1 shake de whey protein',
          '1 fruta',
        ],
      },
      {
        name: 'Jantar',
        calories: 250,
        protein: 0,
        carbs: 0,
        fats: 8,
        foods: [
          '150g de peixe grelhado',
          'Legumes cozidos',
          'Salada verde à vontade',
        ],
      },
    ],
  },
  {
    id: 'saude',
    goal: 'saude',
    dailyCalories: 2000,
    protein: 120,
    carbs: 220,
    fats: 65,
    meals: [
      {
        name: 'Café da Manhã',
        calories: 450,
        protein: 25,
        carbs: 55,
        fats: 15,
        foods: [
          '2 ovos mexidos',
          '2 fatias de pão integral',
          '1 fruta',
          '1 copo de leite desnatado',
        ],
      },
      {
        name: 'Lanche da Manhã',
        calories: 200,
        protein: 15,
        carbs: 25,
        fats: 8,
        foods: [
          '1 iogurte natural',
          '1 colher de granola',
          '5 castanhas',
        ],
      },
      {
        name: 'Almoço',
        calories: 650,
        protein: 40,
        carbs: 70,
        fats: 20,
        foods: [
          '150g de proteína magra (frango, peixe ou carne)',
          '5 colheres de arroz integral',
          '3 colheres de feijão',
          'Salada variada',
          'Legumes cozidos',
        ],
      },
      {
        name: 'Lanche da Tarde',
        calories: 250,
        protein: 20,
        carbs: 30,
        fats: 8,
        foods: [
          '1 sanduíche natural',
          '1 fruta',
        ],
      },
      {
        name: 'Jantar',
        calories: 450,
        protein: 20,
        carbs: 40,
        fats: 14,
        foods: [
          '120g de proteína magra',
          '3 colheres de arroz integral ou 1 batata doce',
          'Salada verde',
          'Legumes',
        ],
      },
    ],
  },
];

export function getDietPlan(goal: Goal): DietPlan | undefined {
  return dietPlans.find(plan => plan.goal === goal);
}

export function calculateMacros(weight: number, goal: Goal): { protein: number; carbs: number; fats: number; calories: number } {
  let protein = 0;
  let carbs = 0;
  let fats = 0;

  switch (goal) {
    case 'perda-peso':
      protein = weight * 2.2; // 2.2g por kg
      fats = weight * 0.8; // 0.8g por kg
      carbs = weight * 2; // 2g por kg
      break;
    case 'ganho-massa':
      protein = weight * 2.5; // 2.5g por kg
      fats = weight * 1; // 1g por kg
      carbs = weight * 5; // 5g por kg
      break;
    case 'definicao':
      protein = weight * 2.4; // 2.4g por kg
      fats = weight * 0.9; // 0.9g por kg
      carbs = weight * 2.5; // 2.5g por kg
      break;
    case 'saude':
      protein = weight * 1.8; // 1.8g por kg
      fats = weight * 0.9; // 0.9g por kg
      carbs = weight * 3; // 3g por kg
      break;
  }

  const calories = (protein * 4) + (carbs * 4) + (fats * 9);

  return {
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fats),
    calories: Math.round(calories),
  };
}

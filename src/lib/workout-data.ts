import { WorkoutPlan, ExperienceLevel, AgeGroup } from './types';

// Dados de treinos adaptados por nível e idade
export const workoutPlans: WorkoutPlan[] = [
  // INICIANTE - 18-25 anos
  {
    id: 'iniciante-18-25',
    name: 'Treino Iniciante (18-25 anos)',
    level: 'iniciante',
    ageGroup: '18-25',
    days: [
      {
        day: 'Segunda-feira',
        focus: 'Peito e Tríceps',
        exercises: [
          { id: '1', name: 'Supino Reto', muscleGroup: 'Peito', sets: 3, reps: '10-12', rest: '60s', notes: 'Comece com carga leve' },
          { id: '2', name: 'Supino Inclinado com Halteres', muscleGroup: 'Peito', sets: 3, reps: '10-12', rest: '60s' },
          { id: '3', name: 'Crucifixo', muscleGroup: 'Peito', sets: 3, reps: '12-15', rest: '45s' },
          { id: '4', name: 'Tríceps Pulley', muscleGroup: 'Tríceps', sets: 3, reps: '12-15', rest: '45s' },
          { id: '5', name: 'Tríceps Testa', muscleGroup: 'Tríceps', sets: 3, reps: '10-12', rest: '60s' },
        ],
      },
      {
        day: 'Quarta-feira',
        focus: 'Costas e Bíceps',
        exercises: [
          { id: '6', name: 'Puxada Frontal', muscleGroup: 'Costas', sets: 3, reps: '10-12', rest: '60s' },
          { id: '7', name: 'Remada Curvada', muscleGroup: 'Costas', sets: 3, reps: '10-12', rest: '60s' },
          { id: '8', name: 'Remada Cavalinho', muscleGroup: 'Costas', sets: 3, reps: '12-15', rest: '45s' },
          { id: '9', name: 'Rosca Direta', muscleGroup: 'Bíceps', sets: 3, reps: '10-12', rest: '45s' },
          { id: '10', name: 'Rosca Martelo', muscleGroup: 'Bíceps', sets: 3, reps: '10-12', rest: '45s' },
        ],
      },
      {
        day: 'Sexta-feira',
        focus: 'Pernas e Ombros',
        exercises: [
          { id: '11', name: 'Agachamento Livre', muscleGroup: 'Pernas', sets: 3, reps: '10-12', rest: '90s', notes: 'Foque na técnica' },
          { id: '12', name: 'Leg Press', muscleGroup: 'Pernas', sets: 3, reps: '12-15', rest: '60s' },
          { id: '13', name: 'Cadeira Extensora', muscleGroup: 'Pernas', sets: 3, reps: '12-15', rest: '45s' },
          { id: '14', name: 'Desenvolvimento com Halteres', muscleGroup: 'Ombros', sets: 3, reps: '10-12', rest: '60s' },
          { id: '15', name: 'Elevação Lateral', muscleGroup: 'Ombros', sets: 3, reps: '12-15', rest: '45s' },
        ],
      },
    ],
  },
  // INICIANTE - 46-55 anos
  {
    id: 'iniciante-46-55',
    name: 'Treino Iniciante (46-55 anos)',
    level: 'iniciante',
    ageGroup: '46-55',
    days: [
      {
        day: 'Segunda-feira',
        focus: 'Corpo Superior',
        exercises: [
          { id: '16', name: 'Supino na Máquina', muscleGroup: 'Peito', sets: 2, reps: '12-15', rest: '90s', notes: 'Aquecimento de 5 min antes' },
          { id: '17', name: 'Puxada Frontal', muscleGroup: 'Costas', sets: 2, reps: '12-15', rest: '90s' },
          { id: '18', name: 'Desenvolvimento na Máquina', muscleGroup: 'Ombros', sets: 2, reps: '12-15', rest: '90s' },
          { id: '19', name: 'Rosca Direta', muscleGroup: 'Bíceps', sets: 2, reps: '12-15', rest: '60s' },
          { id: '20', name: 'Tríceps Pulley', muscleGroup: 'Tríceps', sets: 2, reps: '12-15', rest: '60s' },
        ],
      },
      {
        day: 'Quinta-feira',
        focus: 'Corpo Inferior',
        exercises: [
          { id: '21', name: 'Leg Press', muscleGroup: 'Pernas', sets: 2, reps: '12-15', rest: '90s', notes: 'Evite amplitude excessiva' },
          { id: '22', name: 'Cadeira Extensora', muscleGroup: 'Pernas', sets: 2, reps: '12-15', rest: '60s' },
          { id: '23', name: 'Cadeira Flexora', muscleGroup: 'Pernas', sets: 2, reps: '12-15', rest: '60s' },
          { id: '24', name: 'Panturrilha no Leg', muscleGroup: 'Panturrilha', sets: 2, reps: '15-20', rest: '45s' },
          { id: '25', name: 'Prancha Isométrica', muscleGroup: 'Core', sets: 2, reps: '20-30s', rest: '60s' },
        ],
      },
    ],
  },
  // INTERMEDIÁRIO - 26-35 anos
  {
    id: 'intermediario-26-35',
    name: 'Treino Intermediário (26-35 anos)',
    level: 'intermediario',
    ageGroup: '26-35',
    days: [
      {
        day: 'Segunda-feira',
        focus: 'Peito e Tríceps',
        exercises: [
          { id: '26', name: 'Supino Reto', muscleGroup: 'Peito', sets: 4, reps: '8-10', rest: '90s', notes: 'Progressão de carga semanal' },
          { id: '27', name: 'Supino Inclinado', muscleGroup: 'Peito', sets: 4, reps: '8-10', rest: '90s' },
          { id: '28', name: 'Crucifixo Inclinado', muscleGroup: 'Peito', sets: 3, reps: '10-12', rest: '60s' },
          { id: '29', name: 'Paralelas', muscleGroup: 'Tríceps', sets: 3, reps: '8-12', rest: '60s' },
          { id: '30', name: 'Tríceps Testa', muscleGroup: 'Tríceps', sets: 3, reps: '10-12', rest: '60s' },
          { id: '31', name: 'Tríceps Corda', muscleGroup: 'Tríceps', sets: 3, reps: '12-15', rest: '45s' },
        ],
      },
      {
        day: 'Terça-feira',
        focus: 'Costas e Bíceps',
        exercises: [
          { id: '32', name: 'Barra Fixa', muscleGroup: 'Costas', sets: 4, reps: '6-10', rest: '90s' },
          { id: '33', name: 'Remada Curvada', muscleGroup: 'Costas', sets: 4, reps: '8-10', rest: '90s' },
          { id: '34', name: 'Puxada Triângulo', muscleGroup: 'Costas', sets: 3, reps: '10-12', rest: '60s' },
          { id: '35', name: 'Remada Unilateral', muscleGroup: 'Costas', sets: 3, reps: '10-12', rest: '60s' },
          { id: '36', name: 'Rosca Direta', muscleGroup: 'Bíceps', sets: 4, reps: '8-10', rest: '60s' },
          { id: '37', name: 'Rosca Alternada', muscleGroup: 'Bíceps', sets: 3, reps: '10-12', rest: '45s' },
        ],
      },
      {
        day: 'Quinta-feira',
        focus: 'Pernas',
        exercises: [
          { id: '38', name: 'Agachamento Livre', muscleGroup: 'Pernas', sets: 4, reps: '8-10', rest: '120s' },
          { id: '39', name: 'Leg Press 45°', muscleGroup: 'Pernas', sets: 4, reps: '10-12', rest: '90s' },
          { id: '40', name: 'Stiff', muscleGroup: 'Posterior', sets: 3, reps: '10-12', rest: '90s' },
          { id: '41', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '12-15', rest: '60s' },
          { id: '42', name: 'Cadeira Flexora', muscleGroup: 'Posterior', sets: 3, reps: '12-15', rest: '60s' },
          { id: '43', name: 'Panturrilha em Pé', muscleGroup: 'Panturrilha', sets: 4, reps: '15-20', rest: '45s' },
        ],
      },
      {
        day: 'Sexta-feira',
        focus: 'Ombros e Abdômen',
        exercises: [
          { id: '44', name: 'Desenvolvimento com Barra', muscleGroup: 'Ombros', sets: 4, reps: '8-10', rest: '90s' },
          { id: '45', name: 'Elevação Lateral', muscleGroup: 'Ombros', sets: 4, reps: '12-15', rest: '60s' },
          { id: '46', name: 'Elevação Frontal', muscleGroup: 'Ombros', sets: 3, reps: '12-15', rest: '60s' },
          { id: '47', name: 'Crucifixo Inverso', muscleGroup: 'Ombros', sets: 3, reps: '12-15', rest: '60s' },
          { id: '48', name: 'Abdominal Supra', muscleGroup: 'Abdômen', sets: 3, reps: '15-20', rest: '45s' },
          { id: '49', name: 'Prancha', muscleGroup: 'Core', sets: 3, reps: '45-60s', rest: '60s' },
        ],
      },
    ],
  },
  // AVANÇADO - 26-35 anos
  {
    id: 'avancado-26-35',
    name: 'Treino Avançado (26-35 anos)',
    level: 'avancado',
    ageGroup: '26-35',
    days: [
      {
        day: 'Segunda-feira',
        focus: 'Peito',
        exercises: [
          { id: '50', name: 'Supino Reto', muscleGroup: 'Peito', sets: 5, reps: '6-8', rest: '120s', notes: 'Carga progressiva' },
          { id: '51', name: 'Supino Inclinado', muscleGroup: 'Peito', sets: 4, reps: '8-10', rest: '90s' },
          { id: '52', name: 'Supino Declinado', muscleGroup: 'Peito', sets: 4, reps: '8-10', rest: '90s' },
          { id: '53', name: 'Crucifixo Inclinado', muscleGroup: 'Peito', sets: 4, reps: '10-12', rest: '60s' },
          { id: '54', name: 'Crossover', muscleGroup: 'Peito', sets: 3, reps: '12-15', rest: '45s' },
          { id: '55', name: 'Pullover', muscleGroup: 'Peito', sets: 3, reps: '12-15', rest: '60s' },
        ],
      },
      {
        day: 'Terça-feira',
        focus: 'Costas',
        exercises: [
          { id: '56', name: 'Levantamento Terra', muscleGroup: 'Costas', sets: 5, reps: '5-6', rest: '180s', notes: 'Técnica perfeita' },
          { id: '57', name: 'Barra Fixa', muscleGroup: 'Costas', sets: 4, reps: '8-12', rest: '90s' },
          { id: '58', name: 'Remada Curvada', muscleGroup: 'Costas', sets: 4, reps: '8-10', rest: '90s' },
          { id: '59', name: 'Puxada Frontal', muscleGroup: 'Costas', sets: 4, reps: '10-12', rest: '60s' },
          { id: '60', name: 'Remada Cavalinho', muscleGroup: 'Costas', sets: 4, reps: '10-12', rest: '60s' },
          { id: '61', name: 'Pulldown Reto', muscleGroup: 'Costas', sets: 3, reps: '12-15', rest: '45s' },
        ],
      },
      {
        day: 'Quarta-feira',
        focus: 'Pernas (Quadríceps)',
        exercises: [
          { id: '62', name: 'Agachamento Livre', muscleGroup: 'Pernas', sets: 5, reps: '6-8', rest: '180s' },
          { id: '63', name: 'Agachamento Frontal', muscleGroup: 'Pernas', sets: 4, reps: '8-10', rest: '120s' },
          { id: '64', name: 'Leg Press', muscleGroup: 'Pernas', sets: 4, reps: '10-12', rest: '90s' },
          { id: '65', name: 'Hack Machine', muscleGroup: 'Pernas', sets: 4, reps: '10-12', rest: '90s' },
          { id: '66', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 4, reps: '12-15', rest: '60s' },
          { id: '67', name: 'Afundo Búlgaro', muscleGroup: 'Pernas', sets: 3, reps: '10-12', rest: '60s' },
        ],
      },
      {
        day: 'Quinta-feira',
        focus: 'Ombros e Trapézio',
        exercises: [
          { id: '68', name: 'Desenvolvimento Militar', muscleGroup: 'Ombros', sets: 5, reps: '6-8', rest: '120s' },
          { id: '69', name: 'Desenvolvimento Arnold', muscleGroup: 'Ombros', sets: 4, reps: '8-10', rest: '90s' },
          { id: '70', name: 'Elevação Lateral', muscleGroup: 'Ombros', sets: 4, reps: '12-15', rest: '60s' },
          { id: '71', name: 'Elevação Frontal', muscleGroup: 'Ombros', sets: 4, reps: '12-15', rest: '60s' },
          { id: '72', name: 'Crucifixo Inverso', muscleGroup: 'Ombros', sets: 4, reps: '12-15', rest: '60s' },
          { id: '73', name: 'Encolhimento', muscleGroup: 'Trapézio', sets: 4, reps: '12-15', rest: '60s' },
        ],
      },
      {
        day: 'Sexta-feira',
        focus: 'Pernas (Posterior) e Panturrilha',
        exercises: [
          { id: '74', name: 'Stiff', muscleGroup: 'Posterior', sets: 5, reps: '8-10', rest: '120s' },
          { id: '75', name: 'Mesa Flexora', muscleGroup: 'Posterior', sets: 4, reps: '10-12', rest: '90s' },
          { id: '76', name: 'Cadeira Flexora', muscleGroup: 'Posterior', sets: 4, reps: '12-15', rest: '60s' },
          { id: '77', name: 'Levantamento Terra Romeno', muscleGroup: 'Posterior', sets: 4, reps: '8-10', rest: '90s' },
          { id: '78', name: 'Panturrilha em Pé', muscleGroup: 'Panturrilha', sets: 5, reps: '15-20', rest: '60s' },
          { id: '79', name: 'Panturrilha Sentado', muscleGroup: 'Panturrilha', sets: 4, reps: '15-20', rest: '45s' },
        ],
      },
      {
        day: 'Sábado',
        focus: 'Braços',
        exercises: [
          { id: '80', name: 'Rosca Direta', muscleGroup: 'Bíceps', sets: 4, reps: '8-10', rest: '60s' },
          { id: '81', name: 'Rosca Alternada', muscleGroup: 'Bíceps', sets: 4, reps: '10-12', rest: '60s' },
          { id: '82', name: 'Rosca Scott', muscleGroup: 'Bíceps', sets: 4, reps: '10-12', rest: '60s' },
          { id: '83', name: 'Paralelas', muscleGroup: 'Tríceps', sets: 4, reps: '8-12', rest: '90s' },
          { id: '84', name: 'Tríceps Testa', muscleGroup: 'Tríceps', sets: 4, reps: '10-12', rest: '60s' },
          { id: '85', name: 'Tríceps Corda', muscleGroup: 'Tríceps', sets: 4, reps: '12-15', rest: '45s' },
        ],
      },
    ],
  },
];

export function getWorkoutPlan(level: ExperienceLevel, ageGroup: AgeGroup): WorkoutPlan | undefined {
  return workoutPlans.find(plan => plan.level === level && plan.ageGroup === ageGroup) 
    || workoutPlans.find(plan => plan.level === level);
}

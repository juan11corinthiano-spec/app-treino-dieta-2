'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/lib/types';
import { getWorkoutPlan } from '@/lib/workout-data';
import { getDietPlan, calculateMacros } from '@/lib/diet-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  Users, 
  Calendar,
  Target,
  Flame,
  Activity,
  ChevronRight,
  Trophy,
  Clock
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (!storedProfile) {
      router.push('/onboarding');
    } else {
      setProfile(JSON.parse(storedProfile));
      setLoading(false);
    }
  }, [router]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const workoutPlan = getWorkoutPlan(profile.experienceLevel, profile.ageGroup);
  const dietPlan = getDietPlan(profile.goal);
  const macros = calculateMacros(profile.weight, profile.goal);

  const goalLabels = {
    'perda-peso': 'Perda de Peso',
    'ganho-massa': 'Ganho de Massa',
    'definicao': 'Definição Muscular',
    'saude': 'Saúde Geral',
  };

  const levelLabels = {
    'iniciante': 'Iniciante',
    'intermediario': 'Intermediário',
    'avancado': 'Avançado',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">FitLife</h1>
                <p className="text-sm text-muted-foreground">Olá, {profile.name}!</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                localStorage.removeItem('userProfile');
                router.push('/onboarding');
              }}
            >
              Editar Perfil
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4" />
                Objetivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{goalLabels[profile.goal]}</div>
              <p className="text-xs text-blue-100 mt-1">Nível: {levelLabels[profile.experienceLevel]}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Calorias Diárias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{macros.calories}</div>
              <p className="text-xs text-purple-100 mt-1">kcal por dia</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Treinos/Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workoutPlan?.days.length || 0}</div>
              <p className="text-xs text-green-100 mt-1">dias de treino</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Progresso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-orange-100 mt-1">Complete treinos</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Principais */}
        <Tabs defaultValue="treino" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1">
            <TabsTrigger value="treino" className="flex items-center gap-2 py-3">
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Treino</span>
            </TabsTrigger>
            <TabsTrigger value="dieta" className="flex items-center gap-2 py-3">
              <Apple className="w-4 h-4" />
              <span className="hidden sm:inline">Dieta</span>
            </TabsTrigger>
            <TabsTrigger value="progresso" className="flex items-center gap-2 py-3">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Progresso</span>
            </TabsTrigger>
            <TabsTrigger value="comunidade" className="flex items-center gap-2 py-3">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Comunidade</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Treino */}
          <TabsContent value="treino" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Seu Plano de Treino
                </CardTitle>
                <CardDescription>
                  Treino {levelLabels[profile.experienceLevel]} adaptado para {profile.ageGroup} anos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {workoutPlan?.days.map((day, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{day.day}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{day.focus}</Badge>
                            <span className="text-xs">{day.exercises.length} exercícios</span>
                          </CardDescription>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                          Iniciar
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {day.exercises.slice(0, 3).map((exercise, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm p-2 rounded bg-gray-50 dark:bg-gray-800">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-600">
                                {idx + 1}
                              </div>
                              <span className="font-medium">{exercise.name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{exercise.sets}x{exercise.reps}</span>
                              <Clock className="w-3 h-3" />
                              <span>{exercise.rest}</span>
                            </div>
                          </div>
                        ))}
                        {day.exercises.length > 3 && (
                          <p className="text-xs text-center text-muted-foreground pt-2">
                            +{day.exercises.length - 3} exercícios
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Dicas de Progressão */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Progressão de Carga Segura
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✅ Aumente 2-5% da carga quando conseguir completar todas as séries com facilidade</p>
                <p>✅ Priorize a técnica correta antes de aumentar o peso</p>
                <p>✅ Descanse adequadamente entre as séries ({profile.experienceLevel === 'iniciante' ? '60-90s' : profile.experienceLevel === 'intermediario' ? '60-120s' : '90-180s'})</p>
                <p>✅ Registre seus treinos para acompanhar a evolução</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Dieta */}
          <TabsContent value="dieta" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-green-600" />
                  Seu Plano Alimentar
                </CardTitle>
                <CardDescription>
                  Dieta personalizada para {goalLabels[profile.goal]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Macros */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Proteínas</p>
                        <p className="text-3xl font-bold text-blue-600">{macros.protein}g</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 dark:bg-green-950 border-green-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Carboidratos</p>
                        <p className="text-3xl font-bold text-green-600">{macros.carbs}g</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Gorduras</p>
                        <p className="text-3xl font-bold text-orange-600">{macros.fats}g</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Refeições */}
                <div className="space-y-3">
                  {dietPlan?.meals.map((meal, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base">{meal.name}</CardTitle>
                            <CardDescription className="text-xs mt-1">
                              {meal.calories} kcal | P: {meal.protein}g | C: {meal.carbs}g | G: {meal.fats}g
                            </CardDescription>
                          </div>
                          <Badge variant="outline">{meal.foods.length} itens</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1 text-sm">
                          {meal.foods.map((food, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              {food}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dicas Nutricionais */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Flame className="w-5 h-5 text-green-600" />
                  Dicas Nutricionais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>💧 Beba pelo menos 2-3 litros de água por dia</p>
                <p>🥗 Priorize alimentos naturais e minimamente processados</p>
                <p>⏰ Mantenha horários regulares para as refeições</p>
                <p>🍎 Inclua frutas e vegetais em todas as refeições</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Progresso */}
          <TabsContent value="progresso" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Acompanhe sua Evolução
                </CardTitle>
                <CardDescription>
                  Registre suas medidas e acompanhe seu progresso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Peso Atual */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Peso Atual</span>
                    <span className="text-2xl font-bold text-purple-600">{profile.weight} kg</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Registre seu peso semanalmente para acompanhar a evolução
                  </p>
                </div>

                {/* Treinos Completados */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Treinos Completados</span>
                    <span className="text-2xl font-bold text-blue-600">0/{workoutPlan?.days.length || 0}</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Complete seus treinos semanais para melhores resultados
                  </p>
                </div>

                {/* Consistência */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Consistência Semanal</span>
                    <span className="text-2xl font-bold text-green-600">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Mantenha a consistência para alcançar seus objetivos
                  </p>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                  Registrar Medidas
                </Button>
              </CardContent>
            </Card>

            {/* Gráfico Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Evolução de Peso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Registre suas medidas para ver o gráfico</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Comunidade */}
          <TabsContent value="comunidade" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  Comunidade FitLife
                </CardTitle>
                <CardDescription>
                  Compartilhe experiências e conquistas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                  Criar Nova Postagem
                </Button>

                {/* Posts Placeholder */}
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            U
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Usuário {i}</p>
                            <p className="text-xs text-muted-foreground">Há 2 horas</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-3">
                          {i === 1 && "Completei minha primeira semana de treino! Sentindo a diferença 💪"}
                          {i === 2 && "Dica: aumentar a ingestão de proteína fez toda diferença nos meus resultados"}
                          {i === 3 && "Alguém tem dicas para melhorar o agachamento? Ainda sinto dificuldade na técnica"}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <Trophy className="w-4 h-4" />
                            <span>{Math.floor(Math.random() * 20) + 5}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <Users className="w-4 h-4" />
                            <span>{Math.floor(Math.random() * 10) + 2} comentários</span>
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

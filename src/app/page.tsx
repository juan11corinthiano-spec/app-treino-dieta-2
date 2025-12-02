'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/lib/types';
import { getWorkoutPlan } from '@/lib/workout-data';
import { getDietPlan, calculateMacros } from '@/lib/diet-data';
import { achievements, checkAchievements } from '@/lib/achievements';
import { saveData, getDataByKey } from '@/lib/storage';
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
  Clock,
  Download,
  Bell,
  UserCog
} from 'lucide-react';
import { AchievementsDisplay } from '@/components/custom/achievements-display';
import { MetricsForm } from '@/components/custom/metrics-form';
import { CommunityFeed } from '@/components/custom/community-feed';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [bodyMetrics, setBodyMetrics] = useState<any[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<any[]>([]);
  const [userAchievements, setUserAchievements] = useState(achievements);
  const [showMetricsForm, setShowMetricsForm] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedProfile = localStorage.getItem('userProfile');
    if (!storedProfile) {
      router.push('/onboarding');
    } else {
      setProfile(JSON.parse(storedProfile));
      loadData();
      setLoading(false);
    }
  }, [router]);

  const loadData = () => {
    const metrics = getDataByKey('bodyMetrics') || [];
    const logs = getDataByKey('workoutLogs') || [];
    const savedAchievements = getDataByKey('achievements') || [];
    
    setBodyMetrics(metrics);
    setWorkoutLogs(logs);
    
    // Atualizar conquistas
    const updated = checkAchievements(
      logs.length,
      0, // dietDays - implementar contador
      metrics.length > 0 ? metrics[0].weight - metrics[metrics.length - 1]?.weight : 0,
      0 // communityHelps - implementar contador
    );
    setUserAchievements(updated);
  };

  const handleMetricsSaved = () => {
    loadData();
    setShowMetricsForm(false);
  };

  const exportReport = () => {
    const report = {
      profile,
      bodyMetrics,
      workoutLogs,
      achievements: userAchievements.filter(a => a.unlocked),
      generatedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gymflow-relatorio-${format(new Date(), 'yyyy-MM-dd')}.json`;
    a.click();
  };

  // Não renderizar nada até que o componente esteja montado no cliente
  if (!mounted || loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#00ff41] mx-auto mb-4 shadow-[0_0_20px_rgba(0,255,65,0.5)]"></div>
          <p className="text-gray-400">Carregando seu treino...</p>
        </div>
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

  const completedWorkouts = workoutLogs.length;
  const totalWorkouts = workoutPlan?.days.length || 0;
  const workoutProgress = totalWorkouts > 0 ? (completedWorkouts / totalWorkouts) * 100 : 0;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-gray-900 to-black p-2 rounded-lg border border-gray-800 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <Dumbbell className="w-6 h-6 text-gray-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-100">GymFlow</h1>
                <p className="text-sm text-gray-400">Olá, {profile.name}! 👋</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-gray-900 text-gray-400 hover:text-gray-200 transition-all border border-transparent hover:border-gray-800"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportReport}
                className="border-[#00ff41]/40 bg-[#00ff41]/5 text-[#00ff41] hover:bg-[#00ff41]/15 hover:border-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem('userProfile');
                  router.push('/onboarding');
                }}
                className="border-[#ff6b00]/40 bg-[#ff6b00]/5 text-[#ff6b00] hover:bg-[#ff6b00]/15 hover:border-[#ff6b00] hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all"
              >
                <UserCog className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[#00ff41]/10 to-[#00ff41]/5 border-[#00ff41]/30 shadow-[0_0_30px_rgba(0,255,65,0.15)] hover:shadow-[0_0_40px_rgba(0,255,65,0.25)] transition-all hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-300">
                <Target className="w-4 h-4 text-[#00ff41]" />
                Objetivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#00ff41]">{goalLabels[profile.goal]}</div>
              <p className="text-xs text-gray-400 mt-1">Nível: {levelLabels[profile.experienceLevel]}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#ff6b00]/10 to-[#ff6b00]/5 border-[#ff6b00]/30 shadow-[0_0_30px_rgba(255,107,0,0.15)] hover:shadow-[0_0_40px_rgba(255,107,0,0.25)] transition-all hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-300">
                <Flame className="w-4 h-4 text-[#ff6b00]" />
                Calorias Diárias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#ff6b00]">{macros.calories}</div>
              <p className="text-xs text-gray-400 mt-1">kcal por dia</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] transition-all hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-300">
                <Activity className="w-4 h-4 text-purple-400" />
                Treinos/Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">{workoutPlan?.days.length || 0}</div>
              <p className="text-xs text-gray-400 mt-1">dias de treino</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] transition-all hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-300">
                <Trophy className="w-4 h-4 text-cyan-400" />
                Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">
                {userAchievements.filter(a => a.unlocked).length}/{userAchievements.length}
              </div>
              <p className="text-xs text-gray-400 mt-1">desbloqueadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Principais */}
        <Tabs defaultValue="treino" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-black/50 border border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
            <TabsTrigger value="treino" className="flex items-center gap-2 py-3 text-gray-400 data-[state=active]:bg-[#00ff41] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all">
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Treino</span>
            </TabsTrigger>
            <TabsTrigger value="dieta" className="flex items-center gap-2 py-3 text-gray-400 data-[state=active]:bg-[#ff6b00] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all">
              <Apple className="w-4 h-4" />
              <span className="hidden sm:inline">Dieta</span>
            </TabsTrigger>
            <TabsTrigger value="progresso" className="flex items-center gap-2 py-3 text-gray-400 data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Progresso</span>
            </TabsTrigger>
            <TabsTrigger value="comunidade" className="flex items-center gap-2 py-3 text-gray-400 data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Comunidade</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Treino */}
          <TabsContent value="treino" className="space-y-4">
            <Card className="bg-black/50 border-[#00ff41]/20 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-100">
                  <Calendar className="w-5 h-5 text-[#00ff41]" />
                  Seu Plano de Treino
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Treino {levelLabels[profile.experienceLevel]} adaptado para {profile.ageGroup} anos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {workoutPlan?.days.map((day, index) => (
                  <Card key={index} className="bg-black/30 border-l-4 border-l-[#00ff41] border-[#00ff41]/20 hover:shadow-[0_0_30px_rgba(0,255,65,0.2)] transition-all hover:scale-[1.02]">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg text-gray-100">{day.day}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="bg-[#00ff41]/20 text-[#00ff41] border-[#00ff41]/30">
                              {day.focus}
                            </Badge>
                            <span className="text-xs text-gray-400">{day.exercises.length} exercícios</span>
                          </CardDescription>
                        </div>
                        <Button size="sm" className="bg-[#00ff41] hover:bg-[#00ff41]/90 text-black font-semibold shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-all">
                          Iniciar
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {day.exercises.slice(0, 7).map((exercise, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm p-3 rounded-lg bg-[#00ff41]/5 border border-[#00ff41]/10 hover:bg-[#00ff41]/10 hover:border-[#00ff41]/20 hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-[#00ff41] flex items-center justify-center text-xs font-bold text-black shadow-[0_0_15px_rgba(0,255,65,0.3)]">
                                {idx + 1}
                              </div>
                              <span className="font-medium text-gray-200">{exercise.name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <span className="font-semibold text-[#00ff41]">{exercise.sets}x{exercise.reps}</span>
                              <Clock className="w-3 h-3" />
                              <span>{exercise.rest}</span>
                            </div>
                          </div>
                        ))}
                        {day.exercises.length > 7 && (
                          <p className="text-xs text-center text-gray-500 pt-2">
                            +{day.exercises.length - 7} exercícios
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Dicas de Progressão */}
            <Card className="bg-gradient-to-r from-[#00ff41]/10 to-black border-[#00ff41]/30 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-gray-100">
                  <TrendingUp className="w-5 h-5 text-[#00ff41]" />
                  Progressão de Carga Segura
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-300">
                <p>✅ Aumente 2-5% da carga quando conseguir completar todas as séries com facilidade</p>
                <p>✅ Priorize a técnica correta antes de aumentar o peso</p>
                <p>✅ Descanse adequadamente entre as séries ({profile.experienceLevel === 'iniciante' ? '60-90s' : profile.experienceLevel === 'intermediario' ? '60-120s' : '90-180s'})</p>
                <p>✅ Registre seus treinos para acompanhar a evolução</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Dieta */}
          <TabsContent value="dieta" className="space-y-4">
            <Card className="bg-black/50 border-[#ff6b00]/20 shadow-[0_0_30px_rgba(255,107,0,0.1)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-100">
                  <Apple className="w-5 h-5 text-[#ff6b00]" />
                  Seu Plano Alimentar
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Dieta personalizada para {goalLabels[profile.goal]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Macros */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-[#ff6b00]/10 to-[#ff6b00]/5 border-[#ff6b00]/30 shadow-[0_0_20px_rgba(255,107,0,0.15)] hover:shadow-[0_0_30px_rgba(255,107,0,0.25)] transition-all">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Proteínas</p>
                        <p className="text-4xl font-bold text-[#ff6b00]">{macros.protein}g</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Carboidratos</p>
                        <p className="text-4xl font-bold text-purple-400">{macros.carbs}g</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Gorduras</p>
                        <p className="text-4xl font-bold text-cyan-400">{macros.fats}g</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Refeições */}
                <div className="space-y-3">
                  {dietPlan?.meals.map((meal, index) => (
                    <Card key={index} className="bg-black/30 border-l-4 border-l-[#ff6b00] border-[#ff6b00]/20 hover:shadow-[0_0_30px_rgba(255,107,0,0.2)] transition-all hover:scale-[1.01]">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base text-gray-100">{meal.name}</CardTitle>
                            <CardDescription className="text-xs mt-1 text-gray-400">
                              {meal.calories} kcal | P: {meal.protein}g | C: {meal.carbs}g | G: {meal.fats}g
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-[#ff6b00]/10 border-[#ff6b00]/30 text-[#ff6b00]">{meal.foods.length} itens</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1 text-sm text-gray-300">
                          {meal.foods.map((food, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#ff6b00] shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
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
            <Card className="bg-gradient-to-r from-[#ff6b00]/10 to-black border-[#ff6b00]/30 shadow-[0_0_30px_rgba(255,107,0,0.1)]">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-gray-100">
                  <Flame className="w-5 h-5 text-[#ff6b00]" />
                  Dicas Nutricionais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-300">
                <p>💧 Beba pelo menos 2-3 litros de água por dia</p>
                <p>🥗 Priorize alimentos naturais e minimamente processados</p>
                <p>⏰ Mantenha horários regulares para as refeições</p>
                <p>🍎 Inclua frutas e vegetais em todas as refeições</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Progresso */}
          <TabsContent value="progresso" className="space-y-4">
            {/* Conquistas */}
            <AchievementsDisplay achievements={userAchievements} />

            {/* Métricas Atuais */}
            <Card className="bg-black/50 border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-gray-100">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    Suas Métricas
                  </CardTitle>
                  <Button
                    onClick={() => setShowMetricsForm(!showMetricsForm)}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    {showMetricsForm ? 'Cancelar' : 'Registrar Medidas'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {showMetricsForm ? (
                  <MetricsForm onSave={handleMetricsSaved} />
                ) : (
                  <>
                    {/* Peso Atual */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">Peso Atual</span>
                        <span className="text-2xl font-bold text-purple-400">
                          {bodyMetrics.length > 0 ? bodyMetrics[bodyMetrics.length - 1].weight : profile.weight} kg
                        </span>
                      </div>
                      <Progress value={workoutProgress} className="h-2" />
                      <p className="text-xs text-gray-400 mt-2">
                        {bodyMetrics.length} medições registradas
                      </p>
                    </div>

                    {/* Treinos Completados */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">Treinos Completados</span>
                        <span className="text-2xl font-bold text-purple-400">{completedWorkouts}/{totalWorkouts}</span>
                      </div>
                      <Progress value={workoutProgress} className="h-2" />
                      <p className="text-xs text-gray-400 mt-2">
                        {Math.round(workoutProgress)}% da meta semanal
                      </p>
                    </div>

                    {/* Consistência */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">Consistência Semanal</span>
                        <span className="text-2xl font-bold text-purple-400">
                          {Math.round(workoutProgress)}%
                        </span>
                      </div>
                      <Progress value={workoutProgress} className="h-2" />
                      <p className="text-xs text-gray-400 mt-2">
                        Mantenha a consistência para alcançar seus objetivos
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Comunidade */}
          <TabsContent value="comunidade" className="space-y-4">
            <CommunityFeed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

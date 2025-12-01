'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile, ExperienceLevel, Goal, AgeGroup } from '@/lib/types';
import { Dumbbell, Target, User, Weight } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    experienceLevel: '' as ExperienceLevel,
    goal: '' as Goal,
  });

  const handleSubmit = () => {
    const ageNum = parseInt(formData.age);
    let ageGroup: AgeGroup = '26-35';
    
    if (ageNum >= 18 && ageNum <= 25) ageGroup = '18-25';
    else if (ageNum >= 26 && ageNum <= 35) ageGroup = '26-35';
    else if (ageNum >= 36 && ageNum <= 45) ageGroup = '36-45';
    else if (ageNum >= 46 && ageNum <= 55) ageGroup = '46-55';
    else if (ageNum >= 56) ageGroup = '56+';

    const profile: UserProfile = {
      id: Date.now().toString(),
      name: formData.name,
      age: ageNum,
      ageGroup,
      experienceLevel: formData.experienceLevel,
      goal: formData.goal,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('userProfile', JSON.stringify(profile));
    router.push('/');
  };

  const experienceLevels = [
    { value: 'iniciante', label: 'Iniciante', desc: 'Nunca treinei ou treino há menos de 6 meses' },
    { value: 'intermediario', label: 'Intermediário', desc: 'Treino há 6 meses a 2 anos' },
    { value: 'avancado', label: 'Avançado', desc: 'Treino há mais de 2 anos' },
  ];

  const goals = [
    { value: 'perda-peso', label: 'Perda de Peso', desc: 'Reduzir gordura corporal', icon: Weight },
    { value: 'ganho-massa', label: 'Ganho de Massa', desc: 'Aumentar músculos', icon: Dumbbell },
    { value: 'definicao', label: 'Definição', desc: 'Manter massa e reduzir gordura', icon: Target },
    { value: 'saude', label: 'Saúde Geral', desc: 'Melhorar condicionamento', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
              <Dumbbell className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bem-vindo ao FitLife
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Vamos personalizar seu treino e dieta em {step}/3 passos
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Passo 1: Informações Básicas */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div>
                <Label htmlFor="name" className="text-base font-semibold">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 h-12"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="age" className="text-base font-semibold">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="weight" className="text-base font-semibold">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="height" className="text-base font-semibold">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="mt-2 h-12"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.age || !formData.weight || !formData.height}
                className="w-full h-12 text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Próximo
              </Button>
            </div>
          )}

          {/* Passo 2: Nível de Experiência */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <Label className="text-lg font-semibold">Qual seu nível de experiência?</Label>
              <div className="grid gap-3">
                {experienceLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setFormData({ ...formData, experienceLevel: level.value as ExperienceLevel })}
                    className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                      formData.experienceLevel === level.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-semibold text-base">{level.label}</div>
                    <div className="text-sm text-muted-foreground mt-1">{level.desc}</div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!formData.experienceLevel}
                  className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {/* Passo 3: Objetivo */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <Label className="text-lg font-semibold">Qual seu objetivo principal?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goals.map((goal) => {
                  const Icon = goal.icon;
                  return (
                    <button
                      key={goal.value}
                      onClick={() => setFormData({ ...formData, goal: goal.value as Goal })}
                      className={`p-4 rounded-lg border-2 text-center transition-all hover:scale-105 ${
                        formData.goal === goal.value
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="font-semibold text-base">{goal.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{goal.desc}</div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.goal}
                  className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  Começar
                </Button>
              </div>
            </div>
          )}

          {/* Indicador de Progresso */}
          <div className="flex justify-center gap-2 pt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-16 rounded-full transition-all ${
                  i <= step ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

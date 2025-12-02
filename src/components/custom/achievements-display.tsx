'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Achievement } from '@/lib/achievements';
import { Trophy, Lock } from 'lucide-react';

interface AchievementsDisplayProps {
  achievements: Achievement[];
}

export function AchievementsDisplay({ achievements }: AchievementsDisplayProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Conquistas
          </CardTitle>
          <Badge variant="secondary" className="text-base">
            {unlockedCount}/{totalCount} ({progress}%)
          </Badge>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            Todas
          </Button>
          <Button
            size="sm"
            variant={filter === 'unlocked' ? 'default' : 'outline'}
            onClick={() => setFilter('unlocked')}
          >
            Desbloqueadas
          </Button>
          <Button
            size="sm"
            variant={filter === 'locked' ? 'default' : 'outline'}
            onClick={() => setFilter('locked')}
          >
            Bloqueadas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`transition-all hover:scale-105 ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-300'
                  : 'opacity-60 grayscale'
              }`}
            >
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2 relative">
                  {achievement.icon}
                  {!achievement.unlocked && (
                    <Lock className="w-6 h-6 absolute top-0 right-0 text-gray-400" />
                  )}
                </div>
                <h3 className="font-semibold text-sm mb-1">{achievement.title}</h3>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && achievement.unlockedAt && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    Desbloqueada
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

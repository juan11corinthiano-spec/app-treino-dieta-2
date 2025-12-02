'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, Save } from 'lucide-react';
import { saveData, getDataByKey } from '@/lib/storage';

interface MetricsFormProps {
  onSave?: () => void;
}

export function MetricsForm({ onSave }: MetricsFormProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [arms, setArms] = useState('');
  const [legs, setLegs] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const metrics = getDataByKey('bodyMetrics') || [];
    const newMetric = {
      id: Date.now().toString(),
      date: date.toISOString(),
      weight: parseFloat(weight),
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
      chest: chest ? parseFloat(chest) : undefined,
      waist: waist ? parseFloat(waist) : undefined,
      hips: hips ? parseFloat(hips) : undefined,
      arms: arms ? parseFloat(arms) : undefined,
      legs: legs ? parseFloat(legs) : undefined,
    };

    saveData('bodyMetrics', [...metrics, newMetric]);

    // Reset form
    setWeight('');
    setBodyFat('');
    setChest('');
    setWaist('');
    setHips('');
    setArms('');
    setLegs('');

    if (onSave) onSave();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar Medidas</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal mt-2"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Peso (kg) *</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="bodyFat">% Gordura</Label>
              <Input
                id="bodyFat"
                type="number"
                step="0.1"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="chest">Peitoral (cm)</Label>
              <Input
                id="chest"
                type="number"
                step="0.1"
                value={chest}
                onChange={(e) => setChest(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="waist">Cintura (cm)</Label>
              <Input
                id="waist"
                type="number"
                step="0.1"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="hips">Quadril (cm)</Label>
              <Input
                id="hips"
                type="number"
                step="0.1"
                value={hips}
                onChange={(e) => setHips(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="arms">Braços (cm)</Label>
              <Input
                id="arms"
                type="number"
                step="0.1"
                value={arms}
                onChange={(e) => setArms(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="legs">Pernas (cm)</Label>
              <Input
                id="legs"
                type="number"
                step="0.1"
                value={legs}
                onChange={(e) => setLegs(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
            <Save className="w-4 h-4 mr-2" />
            Salvar Medidas
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

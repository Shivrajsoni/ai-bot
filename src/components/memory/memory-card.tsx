'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';

export default function MemoryCard() {
  const [open, setOpen] = useState(false);
  const [memory, setMemory] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('memory');
    if (stored) {
      setMemory(stored);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('memory', memory);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 items-center border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Open Memory
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] rounded-xl border border-emerald-500 shadow-2xl backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-emerald-700">
            🧠 Memory Card
          </DialogTitle>
        </DialogHeader>

        <Textarea
          value={memory}
          onChange={(e) => setMemory(e.target.value)}
          placeholder="e.g., respond in casual tone with GenZ humor..."
          className="min-h-[120px] text-sm border-2 border-emerald-400 focus:ring-emerald-500"
        />

        <DialogFooter className="gap-2 sm:justify-end mt-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-emerald-600 text-white hover:bg-emerald-700">
            Save Memory
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
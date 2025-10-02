import { Users, AlertCircle } from 'lucide-react';

interface VacancyCounterProps {
  totalVacancies: number;
  remainingVacancies: number;
}

export function VacancyCounter({ totalVacancies, remainingVacancies }: VacancyCounterProps) {
  const filledPercentage = ((totalVacancies - remainingVacancies) / totalVacancies) * 100;

  return (
    <div className="bg-gradient-to-br from-rose-50 to-amber-50 border-2 border-rose-300 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Users className="text-rose-600" size={28} />
        <h3 className="text-2xl font-bold text-gray-900">Status das Vagas</h3>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 font-semibold">Vagas preenchidas</span>
          <span className="text-2xl font-bold text-rose-600">
            {totalVacancies - remainingVacancies}/{totalVacancies}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${filledPercentage}%` }}
          />
        </div>
      </div>

      <div className="bg-amber-100 border border-amber-400 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={20} />
        <div>
          <p className="text-amber-900 font-bold">
            Restam apenas {remainingVacancies} vagas disponíveis!
          </p>
          <p className="text-amber-800 text-sm mt-1">
            Garanta a sua antes que esgotem
          </p>
        </div>
      </div>
    </div>
  );
}

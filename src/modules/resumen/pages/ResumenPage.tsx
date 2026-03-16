import { useEffect, useState } from "react";
import { moneyFormat } from "../../../utils/money";
import { toast } from "react-toastify";
import { getCustomDateRange, getDateRangeByType } from "../../../utils/date";
import {
  EARNINGS_TYPE_LABELS,
  EARNINGS_TYPES_OPTIONS,
} from "../../../constants/resumen";
import { fetchEarnings } from "../../../api/note";

const initialRanges = {
  from: "",
  to: "",
};

export default function ResumenPage() {
  // ESTADOS
  const [earningType, setEarningType] = useState("today");
  const [amount, setAmount] = useState(0);
  const [customDateRange, setCustomDateRange] = useState(initialRanges);

  // HANDLES
  const handleChangeType = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setEarningType(value);
    if (value === "custom") {
      setAmount(0);
      return;
    }

    const dateRange = getDateRangeByType(value);
    const newAmount = await fetchEarnings(dateRange.from, dateRange.to);
    if (newAmount === null) {
      toast.error("Ocurrio un error al obtener las ganancias");
      return;
    } else setAmount(newAmount);
  };

  const handleChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCustomDateRange((prev) => ({ ...prev, [id]: value }));
  };

  // EFECTOS
  useEffect(() => {
    const initialEarnings = async () => {
      const dateRange = getDateRangeByType("today");
      const newAmount = await fetchEarnings(dateRange.from, dateRange.to);
      if (newAmount === null)
        toast.error("Ocurrio un error al obtener las ganancias");
      else setAmount(newAmount);
    };
    initialEarnings();
  }, []);

  useEffect(() => {
    const getCustomEarnings = async () => {
      if (customDateRange.from.trim() && customDateRange.to.trim()) {
        const dateRange = getCustomDateRange(
          customDateRange.from,
          customDateRange.to,
        );
        const newAmount = await fetchEarnings(dateRange.from, dateRange.to);
        if (newAmount === null)
          toast.error("Ocurrio un error al obtener las ganancias");
        else setAmount(newAmount);
      }
    };
    getCustomEarnings();
  }, [customDateRange]);

  // VISTA
  return (
    <main className="mx-auto flex flex-col max-w-2xl p-2 gap-2 items-center">
      <h1 className="text-2xl font-bold text-center">
        Ganancias de {EARNINGS_TYPE_LABELS[earningType]}
      </h1>

      <select
        value={earningType}
        className="border p-2 rounded bg-white"
        onChange={handleChangeType}
      >
        {EARNINGS_TYPES_OPTIONS.map((option) => (
          <option key={option.id} value={option.value} className="capitalize">
            {option.name}
          </option>
        ))}
      </select>

      {earningType === "custom" && (
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex flex-col items-center">
            <label htmlFor="from">Desde:</label>
            <input
              type="date"
              name="from"
              id="from"
              className="bg-white"
              onChange={handleChangeRange}
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="to">Hasta:</label>
            <input
              type="date"
              name="to"
              id="to"
              className="bg-white"
              onChange={handleChangeRange}
            />
          </div>
        </div>
      )}

      <div className="mt-4 text-5xl font-bold text-green-600">
        {moneyFormat(amount)}
      </div>
    </main>
  );
}

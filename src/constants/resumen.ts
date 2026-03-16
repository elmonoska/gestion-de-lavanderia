// tipos de ganancias
export const EARNINGS_TYPES_OPTIONS = [
  {id: 1, name: 'Hoy', value: 'today'},
  {id: 2, name: 'Ayer', value: 'yesterday'},
  {id: 3, name: 'Semana', value: 'week'},
  {id: 4, name: 'Semana Pasada', value: 'lastweek'},
  {id: 5, name: 'Mes', value: 'month'},
  {id: 6, name: 'Mes Pasado', value: 'lastmonth'},
  {id: 7, name: 'Personalizado', value: 'custom'},
]
export const EARNINGS_TYPE_LABELS = Object.fromEntries(
  EARNINGS_TYPES_OPTIONS.map(option => [option.value, option.name])
);

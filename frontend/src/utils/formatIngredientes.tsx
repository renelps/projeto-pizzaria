export function FormatIngredientes(ingredientes: string[], qtd: number): string {
  const preview = ingredientes.slice(0, qtd).join(', ');
  return ingredientes.length > 3 ? preview + '...' : preview;
}

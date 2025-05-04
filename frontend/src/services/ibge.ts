export async function buscarEstados(): Promise<{ nome: string; sigla: string }[]> {
  const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  const data = await res.json();
  return data.map((estado: any) => ({ nome: estado.nome, sigla: estado.sigla }));
}

export async function buscarCidades(uf: string): Promise<string[]> {
  const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  const data = await res.json();
  return data.map((cidade: any) => cidade.nome);
}

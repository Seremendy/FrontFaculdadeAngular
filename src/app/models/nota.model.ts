export interface Nota {
  notaID?: number;
  notaValor: number;
  alunoID: number;
  disciplinaID: number;
  
  // Opcionais para facilitar a exibição na tabela sem fazer muitas buscas
  alunoNome?: string;
  nomeDisciplina?: string;
}
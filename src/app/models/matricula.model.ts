export interface Matricula {
  matriculaID?: number;
  alunoID: number;
  cursoID: number;
  dataMatricula: string;
  matriculaAtiva?: boolean; // <--- Adicione a interrogação (?)
  
  // Campos opcionais de visualização
  alunoNome?: string;
  nomeCurso?: string;
}
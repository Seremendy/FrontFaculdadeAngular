export interface Matricula {
matriculaAtiva: any;
  matriculaID?: number;
  alunoID: number;
  cursoID: number; // Ou turmaID, dependendo da tua regra de negócio
  dataMatricula: string;
  
  // Opcionais para listagem (caso venha o objeto aninhado do backend)
  alunoNome?: string;
  nomeCurso?: string;
}
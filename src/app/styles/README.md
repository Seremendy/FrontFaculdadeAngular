# 🎨 Sistema de Design Global - Faculdade Angular

## Visão Geral

Este projeto utiliza um **sistema centralizado de variáveis CSS** para garantir:
- ✅ Consistência visual em toda a aplicação
- ✅ Manutenção simplificada (cores/espaçamentos em um único lugar)
- ✅ Reutilização de componentes CSS padrão
- ✅ Desenvolvimento mais rápido e padronizado

---

## 📁 Estrutura de Arquivos

```
src/
├── styles.css                          # Estilos globais (importa variáveis)
└── app/styles/
    ├── variables.css                   # Variáveis CSS centralizadas ⭐
    ├── STYLE-GUIDE.html               # Guia visual (abra no navegador)
    ├── template-list.html             # Template para listas
    └── template-form.html             # Template para formulários
```

---

## 🎯 Como Usar

### 1️⃣ **Em Componentes HTML - Use Classes Globais**

Em vez de criar CSS novo, reutilize as classes globais:

```html
<!-- ✅ CORRETO -->
<div class="page-container">
  <div class="page-header">
    <h2>Minha Página</h2>
    <button class="btn btn-primary">Novo</button>
  </div>

  <div class="card">
    <table class="table">
      <!-- seu conteúdo -->
    </table>
  </div>
</div>
```

### 2️⃣ **Em CSS de Componentes - Use Variáveis**

Se precisar adicionar estilos específicos, use as variáveis:

```css
/* app/pages/meu-componente/meu-componente.component.css */

.meu-elemento {
  padding: var(--spacing-md);
  background-color: var(--color-bg-light);
  border-radius: var(--radius-md);
  color: var(--color-text-dark);
  transition: all var(--transition-base);
}

.meu-elemento:hover {
  box-shadow: var(--shadow-lg);
}

/* ❌ NUNCA faça assim */
.meu-elemento {
  padding: 16px;           /* Use var(--spacing-md) */
  background: #f8f9fa;     /* Use var(--color-bg-light) */
  border-radius: 8px;      /* Use var(--radius-md) */
  color: #2c3e50;          /* Use var(--color-text-dark) */
}
```

---

## 🎨 Variáveis Disponíveis

### Cores
```css
var(--color-primary)          /* #3498db - Azul */
var(--color-primary-hover)    /* #2980b9 - Azul Escuro */
var(--color-primary-light)    /* #ecf0f1 - Azul Claro */

var(--color-success)          /* #2ecc71 - Verde */
var(--color-danger)           /* #e74c3c - Vermelho */
var(--color-warning)          /* #f39c12 - Laranja */

var(--color-text-dark)        /* #2c3e50 - Texto Escuro */
var(--color-text-light)       /* #7f8c8d - Texto Claro */
var(--color-bg-white)         /* #ffffff - Fundo Branco */
var(--color-bg-light)         /* #f8f9fa - Fundo Cinza */
var(--color-bg-lighter)       /* #f4f7f6 - Fundo Cinza Claro */
```

### Espaçamentos (múltiplos de 8px)
```css
var(--spacing-xs)     /* 4px */
var(--spacing-sm)     /* 8px */
var(--spacing-md)     /* 16px */
var(--spacing-lg)     /* 24px */
var(--spacing-xl)     /* 32px */
var(--spacing-xxl)    /* 40px */
```

### Tipografia
```css
var(--font-family)
var(--font-size-sm)   /* 0.85rem */
var(--font-size-base) /* 1rem */
var(--font-size-lg)   /* 1.25rem */
var(--font-size-xl)   /* 1.5rem */
var(--font-size-xxl)  /* 1.8rem */

var(--font-weight-normal)   /* 400 */
var(--font-weight-medium)   /* 500 */
var(--font-weight-bold)     /* 600 */
var(--font-weight-heavy)    /* 700 */
```

### Bordas & Sombras
```css
var(--radius-sm)      /* 4px */
var(--radius-md)      /* 8px */
var(--radius-lg)      /* 12px */
var(--radius-full)    /* 9999px - Pills */

var(--shadow-sm)      /* Sombra leve */
var(--shadow-md)      /* Sombra média */
var(--shadow-lg)      /* Sombra grande */
var(--shadow-xl)      /* Sombra muito grande */
```

### Transições
```css
var(--transition-fast)    /* 0.15s */
var(--transition-base)    /* 0.3s */
var(--transition-slow)    /* 0.5s */
```

---

## 🔧 Classes Globais Disponíveis

### Containers
```html
<div class="page-container">...</div>     <!-- Padding + max-width -->
<div class="card">...</div>               <!-- Cartão com sombra -->
```

### Headers
```html
<div class="page-header">
  <h2>Título</h2>
  <div class="page-actions">
    <button class="btn">...</button>
  </div>
</div>
```

### Botões
```html
<!-- Variantes -->
<button class="btn btn-primary">Primário</button>
<button class="btn btn-success">Sucesso</button>
<button class="btn btn-danger">Perigo</button>

<!-- Tamanhos -->
<button class="btn btn-sm btn-primary">Pequeno</button>
<button class="btn btn-lg btn-primary">Grande</button>

<!-- Outline -->
<button class="btn btn-outline btn-outline-primary">Outline</button>
```

### Tabelas
```html
<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Coluna</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dados</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Formulários
```html
<div class="form-container">
  <div class="form-group">
    <label class="form-label required">Campo:</label>
    <input class="form-control" type="text">
    <span class="form-help">Texto de ajuda</span>
  </div>

  <div class="form-row">
    <div class="form-group">...</div>
    <div class="form-group">...</div>
  </div>

  <div class="form-actions">
    <button class="btn btn-primary">Salvar</button>
  </div>
</div>
```

### Badges & Estados
```html
<span class="badge badge-success">Ativo</span>
<span class="badge badge-danger">Inativo</span>

<p class="text-success">Mensagem de sucesso</p>
<p class="text-danger">Mensagem de erro</p>
<p class="text-muted">Texto desabilitado</p>
```

### Alerts
```html
<div class="alert alert-success">✓ Sucesso!</div>
<div class="alert alert-danger">✗ Erro</div>
<div class="alert alert-warning">⚠ Aviso</div>
<div class="alert alert-info">ℹ Informação</div>
```

---

## 📋 Checklist ao Criar Novo Componente

- [ ] Use a classe `page-container` para envolver conteúdo
- [ ] Use `page-header` com h2 para títulos principais
- [ ] Use classes `btn`, `btn-primary`, `btn-sm`, etc. para botões
- [ ] Use `card` para cartões de conteúdo
- [ ] Use `table` + `table-container` para tabelas
- [ ] Use `form-container` + `form-group` para formulários
- [ ] **Nunca** use cores/números hardcoded - sempre use variáveis
- [ ] Não customize estilos - se faltar algo, adicione em `styles.css`
- [ ] Atualize um componente? Verifique se outros podem usar o mesmo estilo

---

## 🚀 Exemplos Práticos

### Exemplo 1: Página de Listagem

```html
<!-- src/app/pages/aluno-list/aluno-list.component.html -->
<div class="page-container">
  <div class="page-header">
    <h2>👨‍🎓 Gerenciamento de Alunos</h2>
    <div class="page-actions">
      <button class="btn btn-primary" (click)="novo()">
        + Novo Aluno
      </button>
    </div>
  </div>

  <div class="card">
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          @for (aluno of alunos; track aluno.id) {
            <tr>
              <td>{{ aluno.nome }}</td>
              <td>{{ aluno.email }}</td>
              <td>
                @if (aluno.ativo) {
                  <span class="badge badge-success">Ativo</span>
                } @else {
                  <span class="badge badge-danger">Inativo</span>
                }
              </td>
              <td>
                <div class="table-actions">
                  <button class="btn btn-sm btn-primary" (click)="editar(aluno.id)">Editar</button>
                  <button class="btn btn-sm btn-danger" (click)="deletar(aluno.id)">Excluir</button>
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
</div>
```

```css
/* src/app/pages/aluno-list/aluno-list.component.css */
/* Coloque aqui APENAS estilos específicos do componente */
/* Para estilos comuns, use classes globais */
```

### Exemplo 2: Formulário de Criação

```html
<!-- src/app/pages/aluno-create/aluno-create.component.html -->
<div class="page-container">
  <div class="form-container">
    <h2>🎓 Novo Aluno</h2>

    <form [formGroup]="form" (ngSubmit)="salvar()">
      <div class="form-group">
        <label class="form-label required">Nome Completo:</label>
        <input 
          type="text"
          class="form-control"
          formControlName="nome"
          placeholder="Digite o nome completo">
        @if (form.get('nome')?.invalid && form.get('nome')?.touched) {
          <span class="form-error-message">Nome é obrigatório</span>
        }
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label required">Email:</label>
          <input 
            type="email"
            class="form-control"
            formControlName="email">
        </div>
        <div class="form-group">
          <label class="form-label">Telefone:</label>
          <input 
            type="tel"
            class="form-control"
            formControlName="telefone">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Observações:</label>
        <textarea 
          class="form-control"
          formControlName="observacoes">
        </textarea>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-outline btn-outline-primary" (click)="cancelar()">
          ✕ Cancelar
        </button>
        <button type="submit" class="btn btn-success" [disabled]="form.invalid">
          💾 Salvar
        </button>
      </div>
    </form>
  </div>
</div>
```

---

## 🐛 Troubleshooting

**P: Meu botão não tem a cor certa**
R: Verifique se está usando `class="btn btn-primary"` (não apenas `btn-primary`)

**P: Os espaçamentos ficam inconsistentes**
R: Use sempre as variáveis de spacing: `padding: var(--spacing-md)`

**P: Quero adicionar uma nova cor**
R: Adicione em `src/app/styles/variables.css` no `:root`, não no arquivo do componente

**P: Por que meu CSS não está sendo aplicado?**
R: Verifique se a prioridade não está sendo sobrescrita. Evite `!important` - use classes mais específicas

---

## 📚 Ver o Guia Completo

Abra `src/app/styles/STYLE-GUIDE.html` no navegador para ver todos os componentes e cores em ação!

```bash
# Desenvolvimento
ng serve

# Depois acesse
http://localhost:4200/assets/styles/STYLE-GUIDE.html
# Ou abra direto em seu editor
```

---

**Dúvidas?** Consulte este guia ou veja os templates em `template-list.html` e `template-form.html`

# BakeryApp

Aplicativo móvel híbrido para venda de produtos de panificadora com desconto especial para itens próximos à data de vencimento.

## Funcionalidades

- Login com Google
- Lista de produtos com informações detalhadas
- Exibição de preços originais e com desconto
- Indicador de dias até o vencimento
- Pull-to-refresh para atualizar lista de produtos

## Configuração do Projeto

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure o Google Sign-In:
   - Acesse o [Google Cloud Console](https://console.cloud.google.com)
   - Crie um novo projeto ou selecione um existente
   - Ative a API do Google Sign-In
   - Configure as credenciais OAuth 2.0
   - Adicione seu Web Client ID no arquivo `src/services/auth.ts`

## Executando o Aplicativo

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Tecnologias Utilizadas

- React Native
- TypeScript
- React Navigation
- Google Sign-In
- Expo Vector Icons

## Estrutura do Projeto

```
src/
  ├── assets/         # Imagens e recursos
  ├── components/     # Componentes reutilizáveis
  ├── navigation/     # Configuração de navegação
  ├── screens/        # Telas do aplicativo
  ├── services/       # Serviços (auth, produtos)
  └── types/          # Definições de tipos TypeScript
```

## Próximos Passos

- [ ] Implementar busca de produtos
- [ ] Adicionar filtros por categoria
- [ ] Implementar carrinho de compras
- [ ] Adicionar sistema de pagamento
- [ ] Implementar notificações push para novos produtos 

Criar um projeto no Google Cloud Console:
Acesse https://console.cloud.google.com/
Crie um novo projeto
Vá para "APIs e Serviços" > "Credenciais"
Clique em "Criar Credenciais" > "ID do cliente OAuth"
Selecione "Aplicativo iOS" e "Aplicativo Android"
Para iOS, você precisará do Bundle ID do seu app
Para Android, você precisará do Package Name e SHA-1
Obter os IDs de cliente:
Depois de criar as credenciais, você receberá:
iOS Client ID
Android Client ID
Web Client ID
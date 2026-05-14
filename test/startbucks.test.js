/**
 * @file Testes unitários da função validarListaPedidos
 * @author Ismael
 * @date 2026-05-13
 */

import assert from 'node:assert';
import { describe, it } from 'node:test';
import { contabilizarQuantidadedeCafe } from '../src/startbucks.js';

describe('Testes para gestao de cafeteria', () => {
    it('TC 1 - Ao menos 1 café na lista', () => {
        // Padrao triple A (Arrange, Act, Assert)
        // Arrange > Organizar o teste, criar os objetos, definir as variáveis
        const listaPedidos = [ // aqui eh um array de objetos
            { nome: 'café', valor: 5.00 },
            { nome: 'bolo de cenoura', valor: 10.00 },
            { nome: 'café com leite', valor: 7.00 }
        ];

        // Act > Executar a ação que queremos testar
        const retornoEsperado = contabilizarQuantidadedeCafe(listaPedidos);

        // Assert > Verificar se o resultado é o esperado
        assert.equal(retornoEsperado, 1);
    })

    it('TC 2 - Não ter nenhum café na lista', () => {
        // Padrao triple A (Arrange, Act, Assert)
        // Arrange > Organizar o teste, criar os objetos, definir as variáveis
        const listaPedidos = [ // aqui eh um array de objetos
            { nome: 'bolo de cenoura', valor: 10.00 },
            { nome: 'café com leite', valor: 7.00 },
            { nome: 'cappuccino', valor: 9.00 },
            { nome: 'suco de laranja', valor: 8.00 },
            { nome: 'pão de queijo', valor: 4.50 },
            { nome: 'croissant', valor: 12.00 },
            { nome: 'chocolate quente', valor: 9.50 },
            { nome: 'café expresso', valor: 6.00 },
            { nome: 'café americano', valor: 7.50 },
            { nome: 'café gelado', valor: 10.00 },
            { nome: 'torrada com manteiga', valor: 6.00 },
            { nome: 'café com chocolate', valor: 10.50 },
            { nome: 'brownie', valor: 8.50 },
            { nome: 'café coado', valor: 5.50 }
        ];
        // Act > Executar a ação que queremos testar
        const retornoEsperado = contabilizarQuantidadedeCafe(listaPedidos);

        // Assert > Verificar se o resultado é o esperado
        assert.equal(retornoEsperado, 0);
    })

    it('TC 3 - Ter 2 ou mais', () => {
        // Padrao triple A (Arrange, Act, Assert)
        // Arrange > Organizar o teste, criar os objetos, definir as variáveis
        const listaPedidos = [ // aqui eh um array de objetos
            { nome: 'café', valor: 5.00 },
            { nome: 'bolo de cenoura', valor: 10.00 },
            { nome: 'café', valor: 7.00 },
            { nome: 'cappuccino', valor: 9.00 },
            { nome: 'suco de laranja', valor: 8.00 },
            { nome: 'pão de queijo', valor: 4.50 },
            { nome: 'croissant', valor: 12.00 },
            { nome: 'chocolate quente', valor: 9.50 },
            { nome: 'café', valor: 6.00 },
            { nome: 'café', valor: 7.50 },
            { nome: 'café', valor: 10.00 },
            { nome: 'torrada com manteiga', valor: 6.00 },
            { nome: 'café com chocolate', valor: 10.50 },
            { nome: 'brownie', valor: 8.50 },
            { nome: 'café coado', valor: 5.50 }
        ];
        // Act > Executar a ação que queremos testar
        const retornoEsperado = contabilizarQuantidadedeCafe(listaPedidos);

        // Assert > Verificar se o resultado é o esperado
        assert.equal(retornoEsperado, 5);
    })
})
/**
 * @file Testes da função contabilizarQuantidadedeItems - Sintaxe Playwright
 * @author Ismael
 * @date 2026-05-13
 */

/** ativar push */

import { test, expect } from '@playwright/test';
import { contabilizarQuantidadedeItems } from '../src/startbucks.js';

test.describe('Testes para gestao de cafeteria', () => {

    test('TC 1 - Ao menos 1 café na lista', () => {
        const listaPedidos = [
            { nome: 'café', valor: 5.00 },
            { nome: 'bolo de cenoura', valor: 10.00 },
            { nome: 'café com leite', valor: 7.00 }
        ];
        const itemPesquisado = 'café';

        const retornoEsperado = contabilizarQuantidadedeItems(listaPedidos, itemPesquisado);

        expect(retornoEsperado).toBe(1);
    });

    test('TC 2 - Não ter nenhum café na lista', () => {
        const listaPedidos = [
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
        const itemPesquisado = 'café';

        const retornoEsperado = contabilizarQuantidadedeItems(listaPedidos, itemPesquisado);

        expect(retornoEsperado).toBe(0);
    });

    test('TC 3 - Ter 2 ou mais', () => {
        const listaPedidos = [
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
        const itemPesquisado = 'café';

        const retornoEsperado = contabilizarQuantidadedeItems(listaPedidos, itemPesquisado);

        expect(retornoEsperado).toBe(5);
    });

    test('TC 4 - Retornar uma lista vazia', () => {
        const listaPedidos = [];
        const itemPesquisado = 'café';

        const retornoEsperado = contabilizarQuantidadedeItems(listaPedidos, itemPesquisado);

        expect(retornoEsperado).toBe(0);
    });

    test('TC 5 - Testar café null', () => {
        const listaPedidos = null;

        expect(() => contabilizarQuantidadedeItems(listaPedidos, 'café'))
            .toThrow('Informe a lista de pedidos');
    });

    test('TC 6 - Testar café com maiúsculas', () => {
        const listaPedidos = [
            { nome: 'café', valor: 5.00 },
            { nome: 'bolo de cenoura', valor: 10.00 },
            { nome: 'CAFÉ', valor: 7.00 },
            { nome: 'cappuccino', valor: 9.00 },
            { nome: 'suco de laranja', valor: 8.00 },
            { nome: 'pão de queijo', valor: 4.50 },
            { nome: 'croissant', valor: 12.00 },
            { nome: 'chocolate quente', valor: 9.50 },
            { nome: 'CaFé', valor: 6.00 },
            { nome: 'CaFé', valor: 7.50 },
            { nome: 'CaFé', valor: 10.00 },
            { nome: 'torrada com manteiga', valor: 6.00 },
            { nome: 'café com chocolate', valor: 10.50 },
            { nome: 'brownie', valor: 8.50 },
            { nome: 'café coado', valor: 5.50 },
            { nome: 'cafe', valor: 5.50 }
        ];
        const itemPesquisado = 'café';

        const retornoEsperado = contabilizarQuantidadedeItems(listaPedidos, itemPesquisado);

        expect(retornoEsperado).toBe(5);
    });

    test('TC 7 - Filtrar por um item de pedidos vazia', () => {
        const listaPedidos = [
            { nome: 'café', valor: 5.00 },
            { nome: 'bolo de cenoura', valor: 10.00 },
            { nome: 'café com leite', valor: 7.00 },
            { nome: 'café', valor: 5.00 }
        ];
        const itemPesquisado = 'bolo de cenoura';

        const retornoEsperado = contabilizarQuantidadedeItems(listaPedidos, itemPesquisado);

        expect(retornoEsperado).toBe(1);
    });

});
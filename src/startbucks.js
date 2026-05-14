/**
 * @file Função para contabilizar a quantidade de cafés em uma lista de pedidos
 * @author Ismael
 * @date 2026-05-13
 */

export function contabilizarQuantidadedeCafe(listaPedidos) {
    if (listaPedidos === null || listaPedidos === undefined) {
        throw new Error('Informe a lista de pedidos');
    }

    let quantidade = 0;
    for (const pedido of listaPedidos) {
        if (pedido.nome.toLowerCase() == 'café') {
            quantidade++;
        }
    }
    return quantidade;
}
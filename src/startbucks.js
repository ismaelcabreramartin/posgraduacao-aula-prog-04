/**
 * @file Função para contabilizar a quantidade de cafés em uma lista de pedidos
 * @author Ismael
 * @date 2026-05-13
 */

export function contabilizarQuantidadedeCafe(listaPedidos) {
    let quantidade = 0;
    for (const pedido of listaPedidos) {
        if (pedido.nome === 'café') {
            quantidade++;
        }
    }
    return quantidade;
}
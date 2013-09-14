package br.com.lawyer.core.base;

import java.io.Serializable;

/**
 * Descreve o contrato de uma entidade que possui uma chave (IUID)
 *
 * @author Deividi Cavarzan
 *
 */
public interface IUID<T extends Serializable> {

    /**
     * Retorna a chave prim�ria da entidade.
     *
     * @return a chave prim�ria da entidade.
     */
    public T getUid();

}

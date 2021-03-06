package br.com.lawyer.core.entity;

import br.com.lawyer.core.entity.enumerated.TipoDocumento;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.Serializable;

@Embeddable
public class Documento implements Serializable {

    @Enumerated (EnumType.ORDINAL)
    private TipoDocumento tipoIdentificacao;

    @Column (length = 20)
    private String identificacao;

    @Override
    public int hashCode () {
        final int prime = 31;
        int result = 1;
        result = prime * result
                + ((identificacao == null) ? 0 : identificacao.hashCode());
        result = prime * result + ((tipoIdentificacao == null) ? 0 : tipoIdentificacao.hashCode());
        return result;
    }

    @Override
    public boolean equals (Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Documento other = (Documento) obj;
        if (identificacao == null) {
            if (other.identificacao != null)
                return false;
        } else if (!identificacao.equals(other.identificacao))
            return false;
        if (tipoIdentificacao != other.tipoIdentificacao)
            return false;
        return true;
    }

    public TipoDocumento getTipoIdentificacao () {
        return tipoIdentificacao;
    }

    public void setTipoIdentificacao (TipoDocumento tipo) {
        this.tipoIdentificacao = tipo;
    }

    public String getIdentificacao () {
        return identificacao;
    }

    public void setIdentificacao (String identificacao) {
        this.identificacao = identificacao;
    }
}

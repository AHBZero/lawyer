package br.com.lawyer.web.delegate.impl;

import br.com.lawyer.core.entity.Empresa;
import br.com.lawyer.core.exception.BusinessException;
import br.com.lawyer.core.service.EmpresaService;
import br.com.lawyer.web.base.BaseDelegate;
import br.com.lawyer.web.delegate.EmpresaDelegate;
import br.com.lawyer.web.vo.EmpresaVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Deividi
 * @since 26/09/2013
 */
@Service
public class EmpresaDelegateImpl extends BaseDelegate<Empresa, EmpresaVO> implements EmpresaDelegate {

    @Autowired
    private EmpresaService empresaService;

    @Transactional
    @Override
    public Page<EmpresaVO> findEmpresaPorPagina (String query, int page, int limit) {
        PageRequest pageRequest = new PageRequest(page, limit);
        Page<Empresa> empresas = empresaService.buscarPorRazaoSocialOuNomeFantasiaLike(query, pageRequest);
        return getVO(empresas, pageRequest);
    }

    @Override
    @Transactional
    public EmpresaVO salvar (EmpresaVO empresaVO) throws BusinessException {
        Empresa empresa = empresaService.salvar(empresaVO.parse());
        return getVO(empresa);
    }

    @Override
    @Transactional
    public void deletar (String uid) throws BusinessException {
        empresaService.deletarEmpresa(uid);
    }

    @Override
    @Transactional
    public EmpresaVO atualizar (EmpresaVO empresaVO, String uid) throws BusinessException {
        Empresa empresa = empresaService.atualizar(empresaVO.parse());
        return getVO(empresa);
    }

    @Override
    public EmpresaVO buscarPorUid (String uid) {
        Empresa empresa = empresaService.findOne(uid);
        return getVO(empresa);
    }
}
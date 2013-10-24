package br.com.lawyer.web.api;

import br.com.lawyer.core.exception.BusinessException;
import br.com.lawyer.web.annotation.ApiController;
import br.com.lawyer.web.delegate.IResponsavelDelegate;
import br.com.lawyer.web.vo.ResponsavelVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

/**
 * @author Deividi
 * @since 22/10/2013
 */
@ApiController
public class ResponsavelController {

    @Autowired
    private IResponsavelDelegate responsavelDelegate;

    @RequestMapping (value = "/responsaveis", method = RequestMethod.GET)
    public @ResponseBody
    Page list(
            @RequestParam (value = "q", required = false) String query,
            @RequestParam (value = "field", required = false, defaultValue = "pessoa") String field,
            @RequestParam (value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "limit", defaultValue = "25", required = false) int limit) throws BusinessException {
        return responsavelDelegate.findResponsavelPorPagina(query, field, page, limit);
    }

    @Secured ({"ROLE_LAWYER", "ROLE_MANAGER"})
    @RequestMapping(value = "/responsaveis", method = RequestMethod.POST)
    public @ResponseBody
    ResponsavelVO salvarUsuario(@RequestBody ResponsavelVO pessoaVO) {
        return responsavelDelegate.salvar(pessoaVO);
    }

    @Secured({"ROLE_LAWYER", "ROLE_MANAGER"})
    @RequestMapping(value = "/responsaveis/{uid}", method = RequestMethod.DELETE)
    public ResponseEntity excluir(@PathVariable ("uid") String uid) {
        responsavelDelegate.deletar(uid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Secured({"ROLE_LAWYER", "ROLE_MANAGER"})
    @RequestMapping(value = "/responsaveis/{uid}", method = RequestMethod.PUT)
    public @ResponseBody ResponsavelVO update(@PathVariable("uid") String uid, @RequestBody ResponsavelVO pessoaVO) throws BusinessException {
        return responsavelDelegate.atualizar(pessoaVO, uid);
    }

    @RequestMapping(value = "/responsaveis/{uid}", method = RequestMethod.GET)
    public @ResponseBody ResponsavelVO findOne(@PathVariable("uid") String uid) {
        return responsavelDelegate.buscarPorUid(uid);
    }

}

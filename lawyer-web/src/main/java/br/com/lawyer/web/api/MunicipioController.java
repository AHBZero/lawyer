package br.com.lawyer.web.api;

import br.com.lawyer.web.annotation.ApiController;
import br.com.lawyer.web.delegate.IMunicipioDelegate;
import br.com.lawyer.web.vo.MunicipioVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author Deividi
 * @since 07/10/2013
 */
@ApiController
public class MunicipioController {

    @Autowired
    private IMunicipioDelegate municipioDelegate;

    @RequestMapping (value = "/municipios", method = RequestMethod.GET)
    public @ResponseBody List<MunicipioVO> findByQuery(@RequestParam(value = "q", required = false) String query) {
        return municipioDelegate.buscaPorNome(query);
    }
}

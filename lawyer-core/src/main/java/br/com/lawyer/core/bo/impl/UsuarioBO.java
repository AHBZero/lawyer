package br.com.lawyer.core.bo.impl;

import br.com.lawyer.core.authentication.LawyerAuthenticationToken;
import br.com.lawyer.core.base.BaseBO;
import br.com.lawyer.core.bo.IUsuarioBO;
import br.com.lawyer.core.entity.Usuario;
import br.com.lawyer.core.exception.BusinessException;
import br.com.lawyer.core.repository.IUsuarioRepository;
import br.com.lawyer.core.util.LawyerStringUtils;
import br.com.lawyer.core.util.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * @author Deividi Cavarzan
 */
@Service
public class UsuarioBO extends BaseBO<String, Usuario, IUsuarioRepository> implements IUsuarioBO {

    /**
     * Construtor
     *
     * @param dao - DAO que ser� utilizado referente a entidade manipulada
     */
    @Autowired
    public UsuarioBO (IUsuarioRepository dao) {
        super(dao);
    }

    /**
     * Realiza a autentica��o do usuario com base na entidade informada e no manager que implementa a regra de autentica��o.
     * Qualquer exce��o de negocio na autentica��o lan�a uma {@link BadCredentialsException} em runtime.
     * @param user
     * @param manager
     * @return
     * @throws BusinessException
     * @throws BadCredentialsException
     */
    @Override
    public Usuario authenticate (Usuario user, AuthenticationManager manager) throws BusinessException {

        if (LawyerStringUtils.containStringBlank(user.getEmail(), user.getSenha())) {
            throw new BadCredentialsException("Usuario / Senha nao informado.");
        }

        String password = PasswordEncoder.encodePassword(user.getSenha(), user.getEmail());

        Usuario usuario = getDAO().findByProperty("email", user.getEmail());

        LawyerAuthenticationToken auth = new LawyerAuthenticationToken(user.getEmail(), password, usuario);
        auth = (LawyerAuthenticationToken) manager.authenticate(auth);

        if (auth.isAuthenticated()) {

            // Insere nosso token na sess�o para ficar disponpivel para consulta.
            SecurityContextHolder.getContext().setAuthentication(auth);
            usuario.setHashAutenticacao(auth.getToken());

        } else {
            throw new BadCredentialsException("Usu�rio n�o foi autenticado.");
        }

        return usuario;
    }


}

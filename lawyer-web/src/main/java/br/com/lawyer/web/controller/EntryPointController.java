package br.com.lawyer.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Deividi Cavarzan
 * Classe que processa os contextos iniciais da aplicação.
 */
@Controller
public class EntryPointController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home() {
        return "index";
    }

    @RequestMapping(value = "/{page}", method = RequestMethod.GET)
    public String page(@PathVariable("page") String page) {
        return page == null ? "index" : page;
    }

}

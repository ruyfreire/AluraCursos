// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nodejs$1.0.0/src/app/views/livros/atualiza/atualizado.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><meta charset=\"UTF-8\"><title>Servidor NodeJS</title></head><body>");

  component_globals_tag({}, out);

  out.w("<h1>Atualizar livro</h1>");

  var for__6 = 0;

  marko_forEach(data.livro, function(livro) {
    var keyscope__7 = "[" + ((for__6++) + "]");

    out.w("<form action=\"/livros/atualiza\" method=\"post\"><input type=\"hidden\" id=\"id\" name=\"id\" value=\"" +
      marko_escapeXmlAttr(livro.id) +
      "\"><div><label for=\"titulo\">Titulo:</label><input type=\"text\" id=\"titulo\" name=\"titulo\" placeholder=\"coloque o titulo\" value=\"" +
      marko_escapeXmlAttr(livro.titulo) +
      "\"></div><div><label for=\"preco\">Preço:</label><input type=\"text\" id=\"preco\" name=\"preco\" placeholder=\"150.25\" value=\"" +
      marko_escapeXmlAttr(livro.preco) +
      "\"></div><div><label for=\"descricao\">Descrição:</label><textarea cols=\"20\" rows=\"10\" id=\"descricao\" name=\"descricao\" placeholder=\"fale sobre o livro\">" +
      marko_escapeXml(livro.descricao) +
      "</textarea></div><input type=\"submit\" value=\"Atualizar\"></form>");
  });

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "20");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nodejs$1.0.0/src/app/views/livros/atualiza/atualizado.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };

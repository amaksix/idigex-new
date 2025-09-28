import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$6 } from './Footer1-3CTnESX3.mjs';
import { _ as _sfc_main$4, a as _sfc_main$3$1, b as _sfc_main$2$1, c as _sfc_main$1$1, d as _sfc_main$5 } from './Contact-BLlOCDVB.mjs';
import { resolveComponent, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './server.mjs';
import './nuxt-link-BfyZFAyt.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@intlify/utils';
import 'vue-router';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "creative-agency",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Creative Agency`,
      bodyAttrs: {
        class: "main-bg"
      },
      link: [
        {
          rel: "stylesheet",
          href: "/assets/css/base.css"
        }
      ],
      script: [
        { src: "/assets/js/TweenMax.min.js" },
        { src: "/assets/js/charming.min.js" },
        { src: "/assets/js/smoother-script.js", defer: true }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$3;
      const _component_CommonNavbar = _sfc_main$2;
      const _component_CommonMenu = _sfc_main$1;
      const _component_CreativeAgencyHeader = _sfc_main$4;
      const _component_CreativeAgencyAbout = _sfc_main$3$1;
      const _component_CreativeAgencyServices = _sfc_main$2$1;
      const _component_CreativeAgencyWorks = _sfc_main$1$1;
      const _component_CreativeAgencyAwards = resolveComponent("CreativeAgencyAwards");
      const _component_CreativeAgencyTestimonials = resolveComponent("CreativeAgencyTestimonials");
      const _component_CreativeAgencyTeam = resolveComponent("CreativeAgencyTeam");
      const _component_CreativeAgencyContact = _sfc_main$5;
      const _component_CommonFooter1 = _sfc_main$6;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg"><div class="main-box main-bg ontop">`);
      _push(ssrRenderComponent(_component_CreativeAgencyHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyServices, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyWorks, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyAwards, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyTestimonials, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyTeam, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CreativeAgencyContact, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/creative-agency.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=creative-agency-DwOmuI8o.mjs.map

import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1$1, c as _sfc_main$4 } from './Footer1-3CTnESX3.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useHead, a as useI18n } from './server.mjs';
import { _ as _sfc_main$5 } from './PrivacyPolicy-BxpF1nLd.mjs';
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

const _sfc_main$1 = {
  __name: "Form",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const form = ref({
      name: "",
      email: "",
      message: ""
    });
    const success = ref(false);
    const error = ref(false);
    const notSending = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "contact section-padding" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-8"><div class="full-width"><div class="sec-head text-center mb-80"><h3 class="text-u fz-50">${ssrInterpolate(unref(t)("contact.title"))}</h3></div><form><div class="messages"></div><div class="controls row"><div class="col-lg-6"><div class="form-group mb-30"><input${ssrRenderAttr("value", form.value.name)} id="form_name" type="text" name="name"${ssrRenderAttr("placeholder", unref(t)("contact.form.name"))} required></div></div><div class="col-lg-6"><div class="form-group mb-30"><input${ssrRenderAttr("value", form.value.email)} id="form_email" type="email" name="email"${ssrRenderAttr("placeholder", unref(t)("contact.form.email"))} required></div></div><div class="col-12"><div class="form-group"><textarea id="form_message" name="message"${ssrRenderAttr("placeholder", unref(t)("contact.form.message"))} rows="4" required>${ssrInterpolate(form.value.message)}</textarea></div><div class="text-center"><div class="mt-30 hover-this cursor-pointer">`);
      if (notSending.value) {
        _push(`<button type="submit"><span class="hover-anim"><span class="text">${ssrInterpolate(unref(t)("contact.form.button"))}</span></span></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></form>`);
      if (success.value) {
        _push(`<div id="mail-message" class="pop-up-message"><h6>${ssrInterpolate(unref(t)("contact.messages.success"))}</h6><div class="close-icon-container"><span class="close-icon"><i></i><i></i></span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="pop-up-message"><h6>${ssrInterpolate(unref(t)("contact.messages.error"))}</h6><div class="close-icon-container"><span class="close-icon"><i></i><i></i></span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contact/Form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "IDigex",
      bodyAttrs: {
        class: "main-bg"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$3;
      const _component_CommonNavbar = _sfc_main$2;
      const _component_CommonMenu = _sfc_main$1$1;
      const _component_ContactForm = _sfc_main$1;
      const _component_CommonFooter1 = _sfc_main$4;
      const _component_CommonPrivacyPolicy = _sfc_main$5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg">`);
      _push(ssrRenderComponent(_component_ContactForm, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, { subBg: true }, null, _parent));
      _push(ssrRenderComponent(_component_CommonPrivacyPolicy, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-eUt12M_E.mjs.map

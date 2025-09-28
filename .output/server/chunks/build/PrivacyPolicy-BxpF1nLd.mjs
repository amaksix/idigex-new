import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { a as useI18n } from './server.mjs';

const _sfc_main = {
  __name: "PrivacyPolicy",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "haprivacy valign" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-12"><div style="${ssrRenderStyle({ "height": "80vh", "padding-top": "5vh", "padding-bottom": "5vh" })}" class="menu-links privacy-container"><h2 class="main-title mb-50">${ssrInterpolate(unref(t)("privacy_policy.title"))}</h2><ul class="main-menu rest"><!--[-->`);
      ssrRenderList(11, (index) => {
        _push(`<li><div class="o-hidden"><h6 class="text-u fw-600 mb-10">${ssrInterpolate(unref(t)(`privacy_policy.items.${index - 1}.heading`))}</h6><p class="fw-400 fz-18">`);
        if (index === 10) {
          _push(`<span>${ssrInterpolate(unref(t)("privacy_policy.items.9.body"))}: <a href="mailto:idigexlv@gmail.com">idigexlv@gmail.com</a></span>`);
        } else {
          _push(`<span>${ssrInterpolate(unref(t)(`privacy_policy.items.${index - 1}.body`))}</span>`);
        }
        _push(`</p></div></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/PrivacyPolicy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=PrivacyPolicy-BxpF1nLd.mjs.map

import { _ as _sfc_main$3$1, a as _sfc_main$2$1, b as _sfc_main$1$1, c as _sfc_main$8 } from './Footer1-Dc6O2o_6.mjs';
import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useHead, _ as _export_sfc, a as useI18n, b as useLocalePath } from './server.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BfyZFAyt.mjs';
import { _ as _imports_0$2 } from './virtual_public-C_fBSvlm.mjs';
import { _ as _sfc_main$9 } from './PrivacyPolicy-k3lPkLIN.mjs';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$7 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: "header-project3 bg-img d-flex align-items-end",
        "data-background": "/imgs/works/full/Project_6_1.jpg",
        "data-overlay-dark": "9"
      }, _attrs))}><div class="container"><div class="row"><div class="col-12"><div class="caption"><h1>FinanceLabs</h1></div></div></div></div></header>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/FinanceLabs/Header.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "TopContent",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="info mb-80 pb-20 bord-thin-bottom"><div class="row"><div class="col-md-6 col-lg-3"><div class="item mb-30"><span class="opacity-8 mb-5">${ssrInterpolate(unref(t)("all_projects.category_label", "Kategorija :"))}</span><h6>${ssrInterpolate(unref(t)("financelabs.category"))}</h6></div></div><div class="col-md-6 col-lg-3"><div class="item mb-30"><span class="opacity-8 mb-5">${ssrInterpolate(unref(t)("all_projects.client_label", "Client :"))}</span><h6>FinanceLabs</h6></div></div><div class="col-md-6 col-lg-3"><div class="item mb-30"><span class="opacity-8 mb-5">${ssrInterpolate(unref(t)("all_projects.year_label", "Gads:"))}</span><h6>2024</h6></div></div><div class="col-md-6 col-lg-3"><div class="item"><span class="opacity-8 mb-5">${ssrInterpolate(unref(t)("all_projects.field_label", "Darb\u012Bbas sf\u0113ra:"))}</span><h6>${ssrInterpolate(unref(t)("financelabs.field"))}</h6></div></div></div></div><div class="row justify-content-center"><div class="col-lg-11"><div class="row"><div class="col-lg-5"><h4 class="mb-50">01 . ${ssrInterpolate(unref(t)("financelabs.task_title"))}</h4></div><div class="col-lg-7"><div class="text"><h5 class="mb-30 fw-400 line-height-40">${ssrInterpolate(unref(t)("financelabs.task_description"))}</h5></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/FinanceLabs/TopContent.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _imports_0$1 = publicAssetsURL("/imgs/works/full/Project_6_2.jpg");
const _imports_1 = publicAssetsURL("/imgs/works/full/Project_6_3.jpg");
const _sfc_main$5 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "img-column" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-6"><div class="img md-mb30"><img${ssrRenderAttr("src", _imports_0$1)} alt=""></div></div><div class="col-lg-6"><div class="img"><img${ssrRenderAttr("src", _imports_1)} alt=""></div></div></div></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/FinanceLabs/ImageColumn.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$4 = {
  __name: "BottomContent",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-11"><div class="row"><div class="col-lg-5"><h4 class="mb-50">02 . ${ssrInterpolate(unref(t)("financelabs.solution_title"))}</h4></div><div class="col-lg-7"><div class="text"><p class="fz-18">${ssrInterpolate(unref(t)("financelabs.solution_description"))}</p></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/FinanceLabs/BottomContent.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/imgs/works/full/Project_6.jpg");
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "section-padding pt-0 pb-0" }, _attrs))}><div class="container"><div class="img"><img${ssrRenderAttr("src", _imports_0)} alt=""></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/FinanceLabs/BottomImage.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = {
  __name: "Content2",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-11"><div class="row"><div class="col-lg-5"><h4 class="mb-50">03 . ${ssrInterpolate(unref(t)("financelabs.result_title"))}</h4></div><div class="col-lg-7"><div class="text"><p class="fz-18">${ssrInterpolate(unref(t)("financelabs.result_description"))}</p></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/FinanceLabs/Content2.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "NextProject",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "next-project section-padding sub-bg" }, _attrs))}><div class="contact-container"><div class="container"><div class="row"><div class="col-12"><div class="text-center"><h6 class="sub-title fz-18">${ssrInterpolate(unref(t)("next_project"))}</h6><div class="inline"><div class="d-flex align-items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/projects/ViaBon"),
        class: "animsition-link fz-70 fw-700 stroke"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`VIABon`);
          } else {
            return [
              createTextVNode("VIABon")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="ml-15"><img${ssrRenderAttr("src", _imports_0$2)} alt="" class="icon-img-70"></span></div></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/FinanceLabs/NextProject.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "FinanceLabs",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `Project FinanceLabs`,
      bodyAttrs: {
        class: "main-bg"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$3$1;
      const _component_CommonNavbar = _sfc_main$2$1;
      const _component_CommonMenu = _sfc_main$1$1;
      const _component_ProjectFinanceLabsHeader = _sfc_main$7;
      const _component_ProjectFinanceLabsTopContent = _sfc_main$6;
      const _component_ProjectFinanceLabsImageColumn = __nuxt_component_5;
      const _component_ProjectFinanceLabsBottomContent = _sfc_main$4;
      const _component_ProjectFinanceLabsBottomImage = __nuxt_component_7;
      const _component_ProjectFinanceLabsContent2 = _sfc_main$2;
      const _component_ProjectFinanceLabsNextProject = _sfc_main$1;
      const _component_CommonFooter1 = _sfc_main$8;
      const _component_CommonPrivacyPolicy = _sfc_main$9;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg"><div class="main-box main-bg ontop">`);
      _push(ssrRenderComponent(_component_ProjectFinanceLabsHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectFinanceLabsTopContent, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectFinanceLabsImageColumn, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectFinanceLabsBottomContent, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectFinanceLabsBottomImage, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectFinanceLabsContent2, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ProjectFinanceLabsNextProject, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonPrivacyPolicy, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/FinanceLabs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=FinanceLabs-Cpk4UBtP.mjs.map

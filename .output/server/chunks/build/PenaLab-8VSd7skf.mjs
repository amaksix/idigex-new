import { _ as _sfc_main$3$1, a as _sfc_main$2$1, b as _sfc_main$1$1, c as _sfc_main$8 } from './Footer1-3CTnESX3.mjs';
import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useHead, _ as _export_sfc, a as useI18n, b as useLocalePath } from './server.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BfyZFAyt.mjs';
import { _ as _imports_0$1 } from './virtual_public-C_fBSvlm.mjs';
import { _ as _sfc_main$9 } from './PrivacyPolicy-BxpF1nLd.mjs';
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
        "data-background": "/imgs/works/full/Project_3_1.jpg",
        "data-overlay-dark": "9"
      }, _attrs))}><div class="container"><div class="row"><div class="col-12"><div class="caption"><h1>Pena Lab</h1></div></div></div></div></header>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/PenaLab/Header.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "TopContent",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="info mb-80 pb-20 bord-thin-bottom"><div class="row"><div class="col-md-6 col-lg-3"><div class="item mb-30"><span class="opacity-8 mb-5">${ssrInterpolate(unref(t)("all_projects.category_label", "Kategorija :"))}</span><h6>${ssrInterpolate(unref(t)("penalab.category"))}</h6></div></div><div class="col-md-6 col-lg-3"><div class="item mb-30"><span class="opacity-8 mb-5">${ssrInterpolate(unref(t)("all_projects.client_label", "Client :"))}</span><h6>Pena Lab</h6></div></div><div class="col-md-6 col-lg-3"><div class="item mb-30"><span class="opacity-8 mb-5">${ssrInterpolate(unref(t)("all_projects.year_label", "Gads:"))}</span><h6>2025</h6></div></div><div class="col-md-6 col-lg-3"><div class="item"><span class="opacity-8 mb-5">${ssrInterpolate(unref(t)("all_projects.field_label", "Darb\u012Bbas sf\u0113ra:"))}</span><h6>${ssrInterpolate(unref(t)("penalab.field"))}</h6></div></div></div></div><div class="row justify-content-center"><div class="col-lg-11"><div class="row"><div class="col-lg-5"><h4 class="mb-50">01 . ${ssrInterpolate(unref(t)("penalab.task_title"))}</h4></div><div class="col-lg-7"><div class="text"><h5 class="mb-30 fw-400 line-height-40">${ssrInterpolate(unref(t)("penalab.task_description"))}</h5></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/PenaLab/TopContent.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/imgs/works/full/Project_3_2.jpg");
const _imports_1 = publicAssetsURL("/imgs/works/full/Project_3_3.jpg");
const _sfc_main$5 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "img-column" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-6"><div class="img md-mb30"><img${ssrRenderAttr("src", _imports_0)} alt=""></div></div><div class="col-lg-6"><div class="img"><img${ssrRenderAttr("src", _imports_1)} alt=""></div></div></div></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/PenaLab/ImageColumn.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$4 = {
  __name: "BottomContent",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-11"><div class="row"><div class="col-lg-5"><h4 class="mb-50">02 . ${ssrInterpolate(unref(t)("penalab.solution_title"))}</h4></div><div class="col-lg-7"><div class="text"><p class="fz-18">${ssrInterpolate(unref(t)("penalab.solution_description"))}</p></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/PenaLab/BottomContent.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const data = [
  {
    id: 1,
    image: "/imgs/works/full/Project3_2.jpg"
  },
  {
    id: 3,
    image: "/imgs/works/full/Project3_5.jpg"
  },
  {
    id: 2,
    image: "/imgs/works/full/Project3_6.jpg"
  },
  {
    id: 4,
    image: "/imgs/works/full/Project3_7.jpg"
  }
];
const _sfc_main$3 = {
  __name: "Works",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "works thecontainer ontop" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(data), (item) => {
        _push(`<div class="panel"><div class="item"><div class="img"><img${ssrRenderAttr("src", item.image)} alt=""></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/PenaLab/Works.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "Content2",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-11"><div class="row"><div class="col-lg-5"><h4 class="mb-50">03 . ${ssrInterpolate(unref(t)("penalab.result_title"))}</h4></div><div class="col-lg-7"><div class="text"><p class="fz-18">${ssrInterpolate(unref(t)("penalab.result_description"))}</p></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/PenaLab/Content2.vue");
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
        to: unref(localePath)("/projects/Palami"),
        class: "animsition-link fz-70 fw-700 stroke"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Palami`);
          } else {
            return [
              createTextVNode("Palami")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="ml-15"><img${ssrRenderAttr("src", _imports_0$1)} alt="" class="icon-img-70"></span></div></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/PenaLab/NextProject.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "PenaLab",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `Project PenaLab`,
      bodyAttrs: {
        class: "main-bg"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$3$1;
      const _component_CommonNavbar = _sfc_main$2$1;
      const _component_CommonMenu = _sfc_main$1$1;
      const _component_ProjectPenaLabHeader = _sfc_main$7;
      const _component_ProjectPenaLabTopContent = _sfc_main$6;
      const _component_ProjectPenaLabImageColumn = __nuxt_component_5;
      const _component_ProjectPenaLabBottomContent = _sfc_main$4;
      const _component_ProjectPenaLabWorks = _sfc_main$3;
      const _component_ProjectPenaLabContent2 = _sfc_main$2;
      const _component_ProjectPenaLabNextProject = _sfc_main$1;
      const _component_CommonFooter1 = _sfc_main$8;
      const _component_CommonPrivacyPolicy = _sfc_main$9;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg"><div class="main-box main-bg ontop">`);
      _push(ssrRenderComponent(_component_ProjectPenaLabHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectPenaLabTopContent, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectPenaLabImageColumn, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectPenaLabBottomContent, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectPenaLabWorks, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectPenaLabContent2, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ProjectPenaLabNextProject, null, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/PenaLab.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=PenaLab-8VSd7skf.mjs.map

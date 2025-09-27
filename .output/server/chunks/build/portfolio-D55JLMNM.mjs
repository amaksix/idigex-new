import { _ as _sfc_main$3, a as _sfc_main$2$1, b as _sfc_main$1$1, c as _sfc_main$4 } from './Footer1-Dc6O2o_6.mjs';
import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { a as useI18n, u as useHead, b as useLocalePath } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BfyZFAyt.mjs';
import { _ as _sfc_main$5 } from './PrivacyPolicy-k3lPkLIN.mjs';
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

const _sfc_main$2 = {
  __name: "Header",
  __ssrInlineRender: true,
  props: ["isCenter"],
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "portfolio-header section-padding ontop main-bg" }, _attrs))}><div class="container"><div class="row"><div class="col-12"><div class="${ssrRenderClass(`cont ${__props.isCenter ? "text-center" : ""}`)}"><h1 class="fz-80 fw-500">${ssrInterpolate(unref(t)("portfolio.title"))}</h1></div></div></div></div></header>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Portfolio/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const data = [
  {
    id: 1,
    image: "/imgs/works/full/Project_1.jpg",
    link: "/projects/ViaBon",
    title: "VIABon"
  },
  {
    id: 2,
    image: "/imgs/works/full/Project_2.jpg",
    link: "/projects/5W",
    title: "5W"
  },
  {
    id: 3,
    image: "/imgs/works/full/Project_3.jpg",
    link: "/projects/PenaLab",
    title: "Pena Lab"
  },
  {
    id: 4,
    image: "/imgs/works/full/Project_4.jpg",
    link: "/projects/Palami",
    title: "Palami"
  },
  {
    id: 5,
    image: "/imgs/works/full/Project_5.jpg",
    link: "/projects/Mullers",
    title: "M\xFCller\u2019s"
  },
  {
    id: 6,
    image: "/imgs/works/full/Project_6.jpg",
    link: "/projects/FinanceLabs",
    title: "FinanceLabs"
  }
];
const _sfc_main$1 = {
  __name: "GridClassic",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "portfolio-classic portfolio pt-50 pb-40 bord-thin-bottom" }, _attrs))}><div class="container-fluid"><div class="gallery"><div class="row lg-marg"><!--[-->`);
      ssrRenderList(unref(data), (item, index) => {
        _push(`<div class="${ssrRenderClass(`items col-${index > 1 && (index + 1) % 3 === 0 ? "12" : "md-6"}`)}"><div class="item mb-80"><div class="img"><img${ssrRenderAttr("src", item.image)} alt="">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(localePath)(item.link),
          class: "animsition-link link-overlay"
        }, null, _parent));
        _push(`</div><div class="info mt-30"><span class="mb-5">${ssrInterpolate(unref(t)(`portfolio.items.${item.id}.category`))}</span><h5>${ssrInterpolate(item.title)}</h5></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Portfolio/GridClassic.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "portfolio",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale } = useI18n();
    useHead({
      title: "IDigex - Portfolio",
      meta: [
        {
          name: "description",
          content: t("metaTags.portfolio.description")
        },
        // Open Graph Tags
        {
          property: "og:title",
          content: t("metaTags.portfolio.ogTitle")
        },
        {
          property: "og:description",
          content: t("metaTags.portfolio.description")
        },
        {
          property: "og:image",
          content: "https://www.idigex.com/public/assets/imgs/Logo_IDigex.svg"
          // Use an absolute URL
        },
        {
          property: "og:url",
          content: "https://www.idigex.com/"
        },
        // Twitter Card Tags
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:title",
          content: t("metaTags.portfolio.ogTitle")
        },
        {
          name: "twitter:description",
          content: t("metaTags.portfolio.description")
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$3;
      const _component_CommonNavbar = _sfc_main$2$1;
      const _component_CommonMenu = _sfc_main$1$1;
      const _component_PortfolioHeader = _sfc_main$2;
      const _component_PortfolioGridClassic = _sfc_main$1;
      const _component_CommonFooter1 = _sfc_main$4;
      const _component_CommonPrivacyPolicy = _sfc_main$5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<main class="main-bg">`);
      _push(ssrRenderComponent(_component_PortfolioHeader, { isCenter: true }, null, _parent));
      _push(ssrRenderComponent(_component_PortfolioGridClassic, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, { subBg: true }, null, _parent));
      _push(ssrRenderComponent(_component_CommonPrivacyPolicy, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/portfolio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=portfolio-D55JLMNM.mjs.map

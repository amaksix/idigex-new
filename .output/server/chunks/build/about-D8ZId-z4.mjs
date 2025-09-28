import { _ as _sfc_main$3, a as _sfc_main$2$1, b as _sfc_main$1$1, c as _sfc_main$4 } from './Footer1-3CTnESX3.mjs';
import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { a as useI18n, b as useLocalePath, u as useHead } from './server.mjs';
import { _ as _sfc_main$5 } from './PrivacyPolicy-BxpF1nLd.mjs';
import './nuxt-link-BfyZFAyt.mjs';
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

const _imports_0 = publicAssetsURL("/imgs/About_banner.jpg");
const _sfc_main$2 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "about-header section-padding pb-0" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-9 offset-lg-1"><div class="cont"><h6 class="sub-title mb-15">${ssrInterpolate(unref(t)("about.sub_title"))}</h6><h1 class="text-u">${ssrInterpolate(unref(t)("about.title"))}</h1></div></div></div></div><div class="img mt-80" data-overlay-dark="4"><img${ssrRenderAttr("src", _imports_0)} alt=""></div></header>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Intro",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-10"><div class="text"><span class="sub-title mb-15 opacity-8">- ${ssrInterpolate(unref(t)("about.intro.sub_title"))}</span><div class="text-reval"><h2 class="fz-50 text-u mb-30"><span class="text">${ssrInterpolate(unref(t)("about.intro.heading_part1"))}</span><span class="text">${ssrInterpolate(unref(t)("about.intro.heading_part2"))}</span></h2></div><p>${ssrInterpolate(unref(t)("about.intro.paragraph1"))}</p><br><p>${ssrInterpolate(unref(t)("about.intro.paragraph2"))}</p></div></div></div><div class="row"><div class="col-lg-10 offset-lg-1"><div class="row mt-80"><div class="col-md-4 sm-mb30"><ul class="list rest"><li class="fz-18 mb-15"><span class="mr-10">+</span> ${ssrInterpolate(unref(t)("about.intro.feature1"))}</li><li class="fz-18 mb-15">${ssrInterpolate(unref(t)("about.intro.feature2"))}</li></ul></div><div class="col-md-4 sm-mb30"><ul class="list rest"><li class="fz-18 mb-15"><span class="mr-10">+</span> ${ssrInterpolate(unref(t)("about.intro.feature3"))}</li><li class="fz-18 mb-15">${ssrInterpolate(unref(t)("about.intro.feature4"))}</li></ul></div><div class="col-md-4"><ul class="list rest"><li class="fz-18 mb-15"><span class="mr-10">+</span> ${ssrInterpolate(unref(t)("about.intro.feature5"))}</li><li class="fz-18 mb-15">${ssrInterpolate(unref(t)("about.intro.feature6"))}</li></ul></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/Intro.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    useHead({
      title: "IDigex - Par Mums",
      meta: [
        {
          name: "description",
          content: t("metaTags.about.description")
        },
        // Open Graph Tags
        {
          property: "og:title",
          content: t("metaTags.about.ogTitle")
        },
        {
          property: "og:description",
          content: t("metaTags.about.description")
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
          content: t("metaTags.about.ogTitle")
        },
        {
          name: "twitter:description",
          content: t("metaTags.about.description")
        }
      ],
      bodyAttrs: {
        class: "main-bg"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$3;
      const _component_CommonNavbar = _sfc_main$2$1;
      const _component_CommonMenu = _sfc_main$1$1;
      const _component_AboutHeader = _sfc_main$2;
      const _component_AboutIntro = _sfc_main$1;
      const _component_CommonFooter1 = _sfc_main$4;
      const _component_CommonPrivacyPolicy = _sfc_main$5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="content"><main class="main-bg">`);
      _push(ssrRenderComponent(_component_AboutHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_AboutIntro, null, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-D8ZId-z4.mjs.map

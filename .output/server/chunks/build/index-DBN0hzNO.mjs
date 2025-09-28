import { _ as _sfc_main$3, a as _sfc_main$2$1, b as _sfc_main$1$1, c as _sfc_main$6 } from './Footer1-3CTnESX3.mjs';
import { _ as _sfc_main$4, a as _sfc_main$3$1, b as _sfc_main$2$2, c as _sfc_main$1$2, d as _sfc_main$5 } from './Contact-BLlOCDVB.mjs';
import { ref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { a as useI18n, u as useHead } from './server.mjs';
import { _ as _sfc_main$7 } from './PrivacyPolicy-BxpF1nLd.mjs';
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

const _sfc_main$2 = {
  __name: "Brief",
  __ssrInlineRender: true,
  setup(__props) {
    const { messages, locale } = useI18n();
    const briefTitle = ref("");
    const briefItems = ref([]);
    const processData = () => {
      var _a, _b;
      const messagesByLocale = (_a = messages.value) == null ? void 0 : _a[locale.value];
      if (!messagesByLocale || !((_b = messagesByLocale.home) == null ? void 0 : _b.brief)) {
        briefTitle.value = "";
        briefItems.value = [];
        return;
      }
      const briefData = messagesByLocale.home.brief;
      briefTitle.value = briefData.title || "";
      const items = briefData.items || [];
      if (!Array.isArray(items)) {
        briefItems.value = [];
        return;
      }
      briefItems.value = items.map((item) => ({
        // Based on the simplified title path, assume item properties are also strings
        // OR, if the items array contains deeply nested objects, you need to check the JSON.
        // Let's assume the CMS structure is only applied to the array's root elements (briefData.items),
        // but the item properties themselves are just strings in the array:
        // If your JSON looks like: items: [{ numb: '01', title: 'Strategy' }, ...]
        numb: item.numb || "",
        title: item.title || "",
        content: item.content || "",
        icon: item.icon || ""
        /* // IF the CMS structure is nested *inside* the items (e.g., item.title: { body: { static: ... } })
        // You MUST revert to the long path:
        numb: item.numb?.body?.static || '',
        title: item.title?.body?.static || '', 
        content: item.content?.body?.static || '',
        icon: item.icon?.body?.static || '',
        */
      }));
    };
    watch([messages, locale], processData, { immediate: true, deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "feat section-padding" }, _attrs))}><div class="container"><div class="sec-head pb-20 bord-thin-bottom mb-80"><div class="d-flex align-items-center"><div><h3 class="f-bold text-u">${ssrInterpolate(briefTitle.value)}</h3></div></div></div><div class="row"><!--[-->`);
      ssrRenderList(briefItems.value, (item, index) => {
        _push(`<div class="col-lg-3 col-md-6 items"><div class="item"><span class="numb">${ssrInterpolate(item.numb)}</span><div class="icon-img-50"><img${ssrRenderAttr("src", item.icon)} alt=""></div><h6>${ssrInterpolate(item.title)}</h6><p>${ssrInterpolate(item.content)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Brief.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "FAQ",
  __ssrInlineRender: true,
  setup(__props) {
    const { messages, locale } = useI18n();
    const faqItems = ref([]);
    const processData = () => {
      var _a, _b;
      const messagesByLocale = (_a = messages.value) == null ? void 0 : _a[locale.value];
      if (!messagesByLocale || !((_b = messagesByLocale.home) == null ? void 0 : _b.faq)) {
        faqItems.value = [];
        return;
      }
      const items = messagesByLocale.home.faq || [];
      if (!Array.isArray(items)) {
        faqItems.value = [];
        return;
      }
      faqItems.value = items.map((item) => {
        var _a2, _b2, _c, _d;
        return {
          id: item.id,
          // Use the long CMS path with fallbacks, as originally suspected,
          // combined with a direct property access if the structure is flatter.
          // Based on the working debug, we should use the simplest working path:
          // Use the safest possible access:
          title: ((_b2 = (_a2 = item.title) == null ? void 0 : _a2.body) == null ? void 0 : _b2.static) || item.title || "",
          content: ((_d = (_c = item.content) == null ? void 0 : _c.body) == null ? void 0 : _d.static) || item.content || ""
        };
      });
    };
    watch([messages, locale], processData, { immediate: true, deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "intro section-padding pb-0" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-4"><div class="sec-head"><h6 class="sub-title fz-20 md-mb50">FAQ</h6></div></div><div class="col-12 col-lg-7 offset-lg-1"><div class="cont"><div class="accordion bord"><!--[-->`);
      ssrRenderList(faqItems.value, (item, index) => {
        _push(`<div class="item mb-20 wow fadeInUp"${ssrRenderAttr("data-wow-delay", `${(index * 0.2 + 0.1).toFixed(1)}s`)}><div class="title"><h4 style="${ssrRenderStyle({ "max-width": "85%" })}">${ssrInterpolate(item.title)}</h4><span class="ico"></span></div><div class="accordion-info"><p>${ssrInterpolate(item.content)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/FAQ.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale } = useI18n();
    useHead({
      title: "IDigex",
      meta: [
        {
          name: "description",
          content: t("metaTags.home.description")
        },
        // Open Graph Tags
        {
          property: "og:title",
          content: t("metaTags.home.ogTitle")
        },
        {
          property: "og:description",
          content: t("metaTags.home.description")
        },
        {
          property: "og:image",
          content: "https://www.idigex.com/public/imgs/Logo_IDigex.svg"
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
          content: t("metaTags.home.ogTitle")
        },
        {
          name: "twitter:description",
          content: t("metaTags.home.description")
        }
      ],
      bodyAttrs: {
        class: "main-bg"
      },
      link: [
        {
          rel: "stylesheet",
          href: "/css/base.css"
        }
      ],
      script: [
        { src: "/js/charming.min.js" },
        { src: "/js/TweenMax.min.js" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$3;
      const _component_CommonNavbar = _sfc_main$2$1;
      const _component_CommonMenu = _sfc_main$1$1;
      const _component_CreativeAgencyHeader = _sfc_main$4;
      const _component_CreativeAgencyAbout = _sfc_main$3$1;
      const _component_CreativeAgencyServices = _sfc_main$2$2;
      const _component_CreativeAgencyWorks = _sfc_main$1$2;
      const _component_CreativeAgencyBrief = _sfc_main$2;
      const _component_CreativeAgencyFAQ = _sfc_main$1;
      const _component_CreativeAgencyContact = _sfc_main$5;
      const _component_CommonFooter1 = _sfc_main$6;
      const _component_CommonPrivacyPolicy = _sfc_main$7;
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
      _push(ssrRenderComponent(_component_CreativeAgencyBrief, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyFAQ, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CreativeAgencyContact, null, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DBN0hzNO.mjs.map

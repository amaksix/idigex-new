import { mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, toDisplayString, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { a as useI18n, b as useLocalePath } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BfyZFAyt.mjs';

const _imports_0 = publicAssetsURL("/imgs/Main banner-min.jpg");
const _sfc_main$4 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "crev-header" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-12"><div class="caption text-center"><h1 class="f-xbold"><span class="f-ultra-light d-block">${ssrInterpolate(unref(t)("home.header.header01"))}</span> ${ssrInterpolate(unref(t)("home.header.header02"))}</h1></div></div></div></div><div class="img mt-50"><img${ssrRenderAttr("src", _imports_0)} alt=""></div></header>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "about section-padding" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-11"><span class="sub-title bord mb-30">${ssrInterpolate(unref(t)("home.about.sub_title"))}</span><h3 class="text-u text-indent ls1">${ssrInterpolate(unref(t)("home.about.heading"))}</h3></div><div class="col-lg-7 offset-lg-5"><div class="text mt-50"><p>${ssrInterpolate(unref(t)("home.about.paragraph"))}</p></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/About.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
publicAssetsURL("/js/charming.min.js");
const data$1 = [
  {
    id: 1,
    key: "websites",
    subtitle: "/01",
    link: "/services/websites",
    img: "/imgs/services/Services_1.jpg",
    readMoreLink: "/services/websites"
  },
  {
    id: 2,
    key: "branding",
    subtitle: "/02",
    link: "/services/branding",
    img: "/imgs/services/Services_2.jpg",
    readMoreLink: "/services/branding"
  },
  {
    id: 3,
    key: "logos",
    subtitle: "/03",
    link: "/services/logo",
    img: "/imgs/services/Services_3.jpg",
    readMoreLink: "/services/logo"
  },
  {
    id: 4,
    key: "advertising_materials",
    subtitle: "/04",
    link: "/services/advertising_materials",
    img: "/imgs/services/Services_4.jpg",
    readMoreLink: "/services/advertising_materials"
  }
];
const _sfc_main$2 = {
  __name: "Services",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "blog-list section-padding" }, _attrs))}><div class="container"><div class="sec-head mb-80"><div class="d-flex align-items-center justify-end"><div><span class="sub-title mb-15 opacity-8">- ${ssrInterpolate(unref(t)("home.services.section.sub_title"))}</span><h3 class="text-u f-bold fz-50">${ssrInterpolate(unref(t)("home.services.section.title"))} <span class="f-ultra-light">${ssrInterpolate(unref(t)("home.services.section.title_light"))}</span></h3></div></div></div><!--[-->`);
      ssrRenderList(unref(data$1), (item, index) => {
        _push(`<div class="item block wow fadeInUp"${ssrRenderAttr("data-wow-delay", `${index * 0.2 + 0.2}s`)} data-fx="3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(localePath)(item.link),
          class: "block__link animsition-link",
          "data-img": item.img
        }, null, _parent));
        _push(`<div class="row"><div class="col-lg-6 cont"><div class="info"><span class="tag">${ssrInterpolate(unref(t)(`home.services.${item.key}.tag`))}</span><span class="date">${ssrInterpolate(item.subtitle)}</span></div><h3 class="text-u">${ssrInterpolate(unref(t)(`home.services.${item.key}.title`))}</h3></div><div class="col-lg-3 offset-lg-3 d-flex align-items-center justify-end"><div class="ml-auto">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(localePath)(item.readMoreLink),
          class: "more mt-15 animsition-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(unref(t)("home.services.section.read_more"))} <svg width="18" height="18" viewBox="0 0 18 18" fill="none"${_scopeId}><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"${_scopeId}></path></svg></span>`);
            } else {
              return [
                createVNode("span", null, [
                  createTextVNode(toDisplayString(unref(t)("home.services.section.read_more")) + " ", 1),
                  (openBlock(), createBlock("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 18 18",
                    fill: "none"
                  }, [
                    createVNode("path", {
                      d: "M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z",
                      fill: "currentColor"
                    })
                  ]))
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Services.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const data = [
  {
    id: 1,
    image: "/imgs/works/full/Project_1.jpg",
    title: "VIABon",
    categoryKeys: [
      "branding",
      "website"
    ],
    link: "/projects/ViaBon",
    valign: true,
    col: 4
  },
  {
    id: 2,
    image: "/imgs/works/full/Project_2.jpg",
    title: "5W",
    categoryKeys: [
      "branding",
      "website"
    ],
    link: "/projects/5W",
    offset: true,
    col: 6
  },
  {
    id: 3,
    image: "/imgs/works/full/Project_3.jpg",
    title: "Pena Lab",
    categoryKeys: [
      "branding"
    ],
    link: "/projects/PenaLab",
    offset: true,
    col: 8
  },
  {
    id: 4,
    image: "/imgs/works/full/Project_4.jpg",
    title: "Palami",
    categoryKeys: [
      "branding",
      "website"
    ],
    link: "/projects/Palami",
    col: 6
  },
  {
    id: 5,
    image: "/imgs/works/full/Project_5.jpg",
    title: "M\xFCller\u2019s",
    categoryKeys: [
      "branding"
    ],
    link: "/projects/Mullers",
    offset: true,
    col: 4
  }
];
const _sfc_main$1 = {
  __name: "Works",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "work section-padding bg-gray text-dark" }, _attrs))}><div class="marquee-head"><div class="container-fluid rest"><div class="row"><div class="col-12"><div class="main-marq"><div class="slide-har st1"><div class="box non-strok"><!--[-->`);
      ssrRenderList(new Array(5).fill(), (_, i) => {
        _push(`<div class="item"><h2>${ssrInterpolate(unref(t)("home.projects.marquee_title"))}</h2></div>`);
      });
      _push(`<!--]--></div><div class="box non-strok"><!--[-->`);
      ssrRenderList(new Array(5).fill(), (_, i) => {
        _push(`<div class="item"><h2>${ssrInterpolate(unref(t)("home.projects.marquee_title"))}</h2></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div></div><div class="container"><div class="row gallery-img"><!--[-->`);
      ssrRenderList(unref(data), (item) => {
        _push(`<div class="${ssrRenderClass(`col-lg-${item.col} ${item.valign ? "valign" : ""} ${item.offset ? "offset-lg-2" : ""}`)}"><div class="item"><div class="img"><img${ssrRenderAttr("src", item.image)} alt=""></div><div class="info d-flex align-items-center mt-20"><div><h5 class="fz-20">${ssrInterpolate(item.title)}</h5></div><div class="ml-auto"><span class="text-u fz-13">${ssrInterpolate(item.categoryKeys.map((key) => unref(t)(`home.projects.categories.${key}`)).join(", "))}</span></div></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(localePath)(item.link),
          class: "link-overlay animsition-link"
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div><div class="mt-100"><div class="d-flex justify-content-center align-items-center"><span class="sub-title ls1 bord">${ssrInterpolate(unref(t)("home.projects.all_projects"))}</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/portfolio"),
        class: "arrow ml-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="18" height="18" viewBox="0 0 18 18" fill="none"${_scopeId}><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 18 18",
                fill: "none"
              }, [
                createVNode("path", {
                  d: "M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z",
                  fill: "currentColor"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Works.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "call-action section-padding bord-thin-bottom" }, _attrs))}><div class="contact-container"><div class="container"><div class="row justify-content-center"><div class="col-lg-12"><div class="text-center"><div class="mb-30"><span class="sub-title bord">${ssrInterpolate(unref(t)("home.contact.sub_title"))}</span></div><h2 class="fz-70 f-bold text-u">${ssrInterpolate(unref(t)("home.contact.heading_part1"))} <span class="d-block f-ultra-light">${ssrInterpolate(unref(t)("home.contact.heading_part2"))}</span> ${ssrInterpolate(unref(t)("home.contact.heading_part3"))}</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/contact"),
        class: "butn-circle animsition-link colorbg mt-30"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(unref(t)("home.contact.button"))}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(t)("home.contact.button")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$4 as _, _sfc_main$3 as a, _sfc_main$2 as b, _sfc_main$1 as c, _sfc_main as d };
//# sourceMappingURL=Contact-BLlOCDVB.mjs.map

import { mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-BfyZFAyt.mjs';
import { a as useI18n, b as useLocalePath, d as useSwitchLocalePath } from './server.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';

const _sfc_main$3 = {
  __name: "Loader",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "loader-wrap" }, _attrs))}><svg viewBox="0 0 1000 1000" preserveAspectRatio="none"><path id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path></svg><div class="loader-wrap-heading"><span><h2 class="load-text"><span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span></h2></span></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/Loader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/imgs/Logo_IDigex.svg");
const _sfc_main$2 = {
  __name: "Navbar",
  __ssrInlineRender: true,
  props: ["borderBottom"],
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "navi",
        class: ["topnav blur", { "bord-thin-bottom": __props.borderBottom }]
      }, _attrs))}><div class="container"><div class="${ssrRenderClass(`logo icon-img-${__props.borderBottom ? "100" : "90"}`)}">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt=""${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: ""
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="menu-icon cursor-pointer"><span class="text"><span class="word">Menu</span></span><span class="icon"><i></i><i></i></span></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/Navbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Menu",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocalePath();
    const switchLocalePath = useSwitchLocalePath();
    const closeMenu = () => {
      (void 0).querySelector(".hamenu").classList.remove("open");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hamenu valign" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-8"><div class="menu-links"><ul class="main-menu rest"><li><div class="o-hidden">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/"),
        class: "link animsition-link",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nm"${_scopeId}>01.</span>${ssrInterpolate(unref(t)("menu.home"))}`);
          } else {
            return [
              createVNode("span", { class: "nm" }, "01."),
              createTextVNode(toDisplayString(unref(t)("menu.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li><div class="o-hidden">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/about"),
        class: "link animsition-link",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nm"${_scopeId}>02.</span>${ssrInterpolate(unref(t)("menu.about"))}`);
          } else {
            return [
              createVNode("span", { class: "nm" }, "02."),
              createTextVNode(toDisplayString(unref(t)("menu.about")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li><div class="o-hidden">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/portfolio"),
        class: "link animsition-link",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nm"${_scopeId}>03.</span>${ssrInterpolate(unref(t)("menu.projects"))}`);
          } else {
            return [
              createVNode("span", { class: "nm" }, "03."),
              createTextVNode(toDisplayString(unref(t)("menu.projects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li><div class="o-hidden"><span class="link dmenu"><span class="nm">04.</span>${ssrInterpolate(unref(t)("menu.services"))}</span></div><div class="sub-menu"><ul class="rest"><li><div class="o-hidden"><span class="sub-link back"><i class="pe-7s-angle-left"></i> ${ssrInterpolate(unref(t)("menu.back"))}</span></div></li></ul><div class="row"><div class="col-md-6"><ul class="rest"><li><div class="o-hidden">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/services/websites"),
        class: "sub-link animsition-link",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("menu.websites"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("menu.websites")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li><div class="o-hidden">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/services/branding"),
        class: "sub-link animsition-link",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("menu.branding"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("menu.branding")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li><div class="o-hidden">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/services/logo"),
        class: "sub-link animsition-link",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("menu.logos"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("menu.logos")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li><div class="o-hidden">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/services/advertising_materials"),
        class: "sub-link animsition-link",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("menu.advertising_materials"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("menu.advertising_materials")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li></ul></div></div></div></li><li><div class="o-hidden">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/contact"),
        class: "link animsition-link",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nm"${_scopeId}>05.</span>${ssrInterpolate(unref(t)("menu.contacts"))}`);
          } else {
            return [
              createVNode("span", { class: "nm" }, "05."),
              createTextVNode(toDisplayString(unref(t)("menu.contacts")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li></ul></div></div><div class="col-lg-4 valign"><div class="cont-info"><div class="item mb-50"><h6 class="text-u fw-600 mb-20">${ssrInterpolate(_ctx.$t("menu.languages"))}</h6><ul class="rest social-text d-flex fz-13"><li class="mr-20">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(switchLocalePath)("en"),
        class: "hover-this"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="hover-anim"${_scopeId}>English</span>`);
          } else {
            return [
              createVNode("span", { class: "hover-anim" }, "English")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="mr-20">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(switchLocalePath)("lv"),
        class: "hover-this"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="hover-anim"${_scopeId}>Latvie\u0161u</span>`);
          } else {
            return [
              createVNode("span", { class: "hover-anim" }, "Latvie\u0161u")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="mr-20">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(switchLocalePath)("ru"),
        class: "hover-this"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="hover-anim"${_scopeId}>\u0420\u0443\u0441\u0441\u043A\u0438\u0439</span>`);
          } else {
            return [
              createVNode("span", { class: "hover-anim" }, "\u0420\u0443\u0441\u0441\u043A\u0438\u0439")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="item mb-50 mb-hide"><h6 class="text-u fw-600 mb-20">${ssrInterpolate(_ctx.$t("menu.contact_info"))}</h6><p class="fw-400 fz-18">idigexlv@gmail.com</p></div><div class="bottom mb-hide"><h6 class="text-u fw-600 mb-20">${ssrInterpolate(_ctx.$t("menu.social_media"))}</h6><ul class="rest social-text d-flex fz-13"><li class="mr-20"><a href="https://www.facebook.com/profile.php?id=61578923682378" target="_blank" rel="noopener noreferrer" class="hover-this"><span class="hover-anim">Facebook</span></a></li><li class="mr-20"><a href="https://www.instagram.com/idigexlv/" target="_blank" rel="noopener noreferrer" class="hover-this"><span class="hover-anim">Instagram</span></a></li><li class="mr-20"><a href=" https://pin.it/3JJQ5bqAX" target="_blank" rel="noopener noreferrer" class="hover-this"><span class="hover-anim">Pinterest</span></a></li></ul></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/Menu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Footer1",
  __ssrInlineRender: true,
  props: {
    subBg: Boolean
  },
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocalePath();
    const cookie = ref(false);
    function checkcookie() {
      try {
        if (!localStorage.getItem("cookieConsent")) {
          cookie.value = true;
        }
      } catch (e) {
        console.error("localStorage error:", e);
        cookie.value = true;
      }
    }
    checkcookie();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><footer class="${ssrRenderClass({ "sub-bg": __props.subBg })}"><div class="footer-container"><div class="container pb-80 pt-80 ontop"><div class="row"><div class="col-lg-6"><div class="eml"><h6 class="sub-title opacity-8">${ssrInterpolate(unref(t)("footer.contact_text"))}</h6><h2 class="underline fz-60"><a href="mailto:idigexlv@gmail.com">idigexlv@gmail.com</a></h2></div></div></div><div class="row mt-80"><div class="col-lg-2"><div class="logo"><img${ssrRenderAttr("src", _imports_0)} alt="Logo"></div></div><div class="col-lg-6"><div class="column"><h6 class="sub-title mb-30">${ssrInterpolate(unref(t)("footer.social_title"))}</h6><ul class="rest"><li class="hover-this cursor-pointer"><a href="https://www.facebook.com/profile.php?id=61578923682378" target="_blank" rel="noopener noreferrer"><span class="hover-anim">Facebook</span></a></li><li class="hover-this cursor-pointer"><a href="https://www.instagram.com/idigexlv/" target="_blank" rel="noopener noreferrer"><span class="hover-anim">Instagram</span></a></li><li class="hover-this cursor-pointer"><a href="https://pin.it/3JJQ5bqAX" target="_blank" rel="noopener noreferrer"><span class="hover-anim">Pinterest</span></a></li></ul></div></div><div class="col-lg-4"><div class="column"><h6 class="sub-title mb-30">${ssrInterpolate(unref(t)("footer.nav_title"))}</h6><ul class="rest"><li class="hover-this cursor-pointer">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("menu.home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("menu.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="hover-this cursor-pointer">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/about")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("menu.about"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("menu.about")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="hover-this cursor-pointer">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/portfolio")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("menu.projects"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("menu.projects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="hover-this cursor-pointer">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/contact")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("menu.contacts"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("menu.contacts")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div></div></div><div class="container bord pt-30 pb-30 bord-thin-top"><div class="row"><div class="col-lg-6"><div class="links"><ul class="rest"><li><div class="menu-icon cursor-pointer">${ssrInterpolate(unref(t)("footer.privacy"))}</div></li><li><div class="menu-icon cursor-pointer">${ssrInterpolate(unref(t)("footer.cookie_settings"))}</div></li></ul></div></div></div></div></div></footer>`);
      if (unref(cookie)) {
        _push(`<div class="cookie-banner"><div class="close-icon-container cursor-pointer"><span class="close-icon"><i></i><i></i></span></div><p class="fw-400 fz-14">${ssrInterpolate(unref(t)("footer.cookie_text"))}</p><div class="col-lg-8 d-flex align-items-center justify-end" style="${ssrRenderStyle({ "color": "#141414" })}"><a class="cursor-pointer"><div class="more mt-15 animsition-link cookie-button"><span>${ssrInterpolate(unref(t)("footer.cookie_accept"))} <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"></path></svg></span></div></a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/Footer1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$3 as _, _sfc_main$2 as a, _sfc_main$1 as b, _sfc_main as c };
//# sourceMappingURL=Footer1-Dc6O2o_6.mjs.map

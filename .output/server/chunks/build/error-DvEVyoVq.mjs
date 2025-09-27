import { _ as __nuxt_component_0 } from './nuxt-link-BfyZFAyt.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  props: {
    error: {
      type: Object,
      default: () => ({ statusCode: 500, message: "Oops!" })
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "error-page" }, _attrs))} data-v-39d1650a>`);
  if ($props.error.statusCode === 404) {
    _push(`<h1 data-v-39d1650a>404 - Page Not Found</h1>`);
  } else {
    _push(`<h1 data-v-39d1650a>${ssrInterpolate($props.error.statusCode)} - Something Went Wrong</h1>`);
  }
  _push(`<p data-v-39d1650a>${ssrInterpolate($props.error.message)}</p>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Go back`);
      } else {
        return [
          createTextVNode("Go back")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-39d1650a"]]);

export { error as default };
//# sourceMappingURL=error-DvEVyoVq.mjs.map

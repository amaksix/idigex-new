<template>
  <div class="hamenu valign">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="menu-links">
            <ul class="main-menu rest">
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/')" class="link animsition-link" >
                    <span class="nm">01.</span>{{ t('menu.home') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/about')" class="link animsition-link" ><span class="nm">02.</span>{{ t('menu.about') }}</NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/portfolio')" class="link animsition-link" ><span class="nm">03.</span>{{ t('menu.projects') }}</NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <span class="link dmenu" @click="handleOpenDMenu"><span class="nm">04.</span>{{ t('menu.services') }} </span>
                </div>
                <div class="sub-menu">
                  <ul class="rest">
                    <li>
                      <div class="o-hidden">
                        <span class="sub-link back" @click="handleCloseDMenu"><i class="pe-7s-angle-left"></i> {{ t('menu.back') }}</span>
                      </div>
                    </li>
                  </ul>
                  <div class="row">
                    <div class="col-md-6">
                      <ul class="rest">
                        <li>
                          <div class="o-hidden">
                            <NuxtLink :to="localePath('/services/websites')" class="sub-link animsition-link" >{{ t('menu.websites') }}</NuxtLink>
                          </div>
                        </li>
                        <li>
                          <div class="o-hidden">
                            <NuxtLink :to="localePath('/services/branding')" class="sub-link animsition-link" >{{ t('menu.branding') }}</NuxtLink>
                          </div>
                        </li>
                        <li>
                          <div class="o-hidden">
                            <NuxtLink :to="localePath('/services/logo')" class="sub-link animsition-link" >{{ t('menu.logos') }}</NuxtLink>
                          </div>
                        </li>
                        <li>
                          <div class="o-hidden">
                            <NuxtLink :to="localePath('/services/advertising_materials')" class="sub-link animsition-link" >{{ t('menu.advertising_materials') }}</NuxtLink>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/contact')" class="link animsition-link" ><span class="nm">05.</span>{{ t('menu.contacts') }}</NuxtLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 valign">
          <div class="cont-info">
           <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">{{ $t('menu.languages') }}</h6>
              <ul class="rest social-text d-flex fz-13">
                <li class="mr-20">
                   <NuxtLink :to="switchLocalePath('en')" class="hover-this"><span class="hover-anim">English</span></NuxtLink>
                </li>
                <li class="mr-20">
                  <NuxtLink :to="switchLocalePath('lv')" class="hover-this"><span class="hover-anim">Latviešu</span></NuxtLink>
                </li>
                <li class="mr-20">
                  <NuxtLink :to="switchLocalePath('ru')" class="hover-this"><span class="hover-anim">Русский</span></NuxtLink>
                </li>
              </ul>
            </div>
            <div class="item mb-50 mb-hide">
              <h6 class="text-u fw-600 mb-20">{{ $t('menu.contact_info') }}</h6>
              <p class="fw-400 fz-18">idigexlv@gmail.com</p>
            </div>
            <div class="bottom mb-hide">
              <h6 class="text-u fw-600 mb-20">{{ $t('menu.social_media') }}</h6>
              <ul class="rest social-text d-flex fz-13">
                <li class="mr-20">
                  <a href="https://www.facebook.com/profile.php?id=61578923682378" target="_blank" rel="noopener noreferrer" class="hover-this"><span class="hover-anim">Facebook</span></a>
                </li>
                <li class="mr-20">
                  <a href="https://www.instagram.com/idigexlv/" target="_blank" rel="noopener noreferrer" class="hover-this"><span class="hover-anim">Instagram</span></a>
                </li>
                <li class="mr-20">
                  <a href=" https://pin.it/3JJQ5bqAX" target="_blank" rel="noopener noreferrer" class="hover-this"><span class="hover-anim">Pinterest</span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// Import both the t() function via useI18n AND the localePath function via useLocalePath

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const closeMenu = () => {
  document.querySelector('.hamenu').classList.remove("open");
};

const handleMouseEnter = (event) => {
  Object.values(event.currentTarget.parentElement.children).forEach(el => el.style.opacity = "0.5");
  event.currentTarget.style.opacity = "1";
};

const handleMouseLeave = (event) => {
  Object.values(event.currentTarget.parentElement.children).forEach(el => el.style.opacity = "1");
};

const handleOpenDMenu = (event) => {
  document.querySelector(".main-menu").classList.add("gosub");
  event.currentTarget.parentElement.parentElement.querySelector(".sub-menu").classList.add("sub-open");
};

const handleCloseDMenu = () => {
  document.querySelector(".main-menu").classList.remove("gosub");
  document.querySelector(".main-menu .sub-menu").classList.remove("sub-open");
};
</script>

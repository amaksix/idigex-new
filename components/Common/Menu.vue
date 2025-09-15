<template>
  <div class="hamenu valign">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="menu-links">
            <ul class="main-menu rest">
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                   <a href="/" class="link animsition-link" @click="closeMenu"><span class="nm">01.</span>Sākums </a>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/about" class="link animsition-link" @click="closeMenu"><span class="nm">02.</span>Par Mums</a>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/portfolio" class="link animsition-link" @click="closeMenu"><span class="nm">03.</span>Projekti</a>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <span class="link dmenu" @click="handleOpenDMenu"><span class="nm">04.</span>Pakalpojumi </span>
                </div>
                <div class="sub-menu">
                  <ul class="rest">
                    <li>
                      <div class="o-hidden">
                        <span class="sub-link back" @click="handleCloseDMenu"><i class="pe-7s-angle-left"></i> Atpakaļ</span>
                      </div>
                    </li>
                  </ul>
                  <div class="row">
                    <div class="col-md-6">
                      <ul class="rest">
                        <li>
                          <div class="o-hidden">
                            <a href="/services/websites" class="sub-link animsition-link" @click="closeMenu">Mājaslapas</a>
                          </div>
                        </li>
                        <li>
                          <div class="o-hidden">
                            <a href="/services/branding" class="sub-link animsition-link" @click="closeMenu">Brendings</a>
                          </div>
                        </li>
                        <li>
                          <div class="o-hidden">
                            <a href="/services/logo" class="sub-link animsition-link" @click="closeMenu">Logotipi</a>
                          </div>
                        </li>
                        <li>
                          <div class="o-hidden">
                            <a href="/services/advertising_materials" class="sub-link animsition-link" @click="closeMenu">Reklāmas materiāli</a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/contact" class="link animsition-link" @click="closeMenu"><span
                      class="nm">05.</span>Kontakti</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 valign">
          <div class="cont-info">
            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">Kontaktinformācija</h6>
              <p class="fw-400 fz-18">idigexlv@gmail.com</p>
            </div>
            <div class="bottom">
              <h6 class="text-u fw-600 mb-20">Sociālie tīkli</h6>
              <ul class="rest social-text d-flex fz-13">
                <li class="mr-20">
                  <a href="/#0" class="hover-this"><span class="hover-anim">Facebook</span></a>
                </li>
                <li class="mr-20">
                  <a href="/#0" class="hover-this"><span class="hover-anim">Instagram</span></a>
                </li>
                <li class="mr-20">
                  <a href="/#0" class="hover-this"><span class="hover-anim">Pinterest</span></a>
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

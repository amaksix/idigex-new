<template>
  <section class="contact section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="full-width">
            <div class="sec-head text-center mb-80">
              <span class="sub-title mb-15 opacity-8">- Contact Us</span>
              <h3 class="text-u fz-50">Get In Touch.</h3>
            </div>
            <form id="contact-form" method="post" action="contact.php">
              <div class="messages"></div>
              <div class="controls row">
                <div class="col-lg-6">
                  <div class="form-group mb-30">
                    <input id="form_name" type="text" name="name" placeholder="Name" required="required" />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group mb-30">
                    <input id="form_email" type="email" name="email" placeholder="Email" required="required" />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <textarea id="form_message" name="message" placeholder="Message" rows="4"
                      required="required"></textarea>
                  </div>
                  <div class="text-center">
                    <div class="mt-30 hover-this cursor-pointer">
                      <button type="submit" class="hover-anim">
                        <span class="text">Let's Talk</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

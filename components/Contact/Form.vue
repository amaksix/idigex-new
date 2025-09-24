<template>
  <section class="contact section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="full-width">
            <div class="sec-head text-center mb-80">
              <h3 class="text-u fz-50">{{ t('contact.title') }}</h3>
            </div>

            <!-- Contact Form -->
            <form @submit.prevent="sendEmail">
              <div class="messages"></div>
              <div class="controls row">
                <div class="col-lg-6">
                  <div class="form-group mb-30">
                    <input
                      v-model="form.name"
                      id="form_name"
                      type="text"
                      name="name"
                      :placeholder="t('contact.form.name')"
                      required
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group mb-30">
                    <input
                      v-model="form.email"
                      id="form_email"
                      type="email"
                      name="email"
                      :placeholder="t('contact.form.email')"
                      required
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <textarea
                      v-model="form.message"
                      id="form_message"
                      name="message"
                      :placeholder="t('contact.form.message')"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <div class="text-center">
                    <div class="mt-30 hover-this cursor-pointer">
                      <button type="submit" v-if="notSending">
                        <span class="hover-anim">
                          <span class="text">{{ t('contact.form.button') }}</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <!-- Success message -->
            <div v-if="success" id="mail-message" class="pop-up-message">
              <h6>{{ t('contact.messages.success') }}</h6>
              <div class="close-icon-container" @click="success = false">
                <span class="close-icon">
                  <i></i>
                  <i></i>
                </span>
              </div>
            </div>

            <!-- Error message -->
            <div v-if="error" class="pop-up-message">
              <h6>{{ t('contact.messages.error') }}</h6>
              <div class="close-icon-container" @click="error = false">
                <span class="close-icon">
                  <i></i>
                  <i></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const form = ref({
  name: "",
  email: "",
  message: "",
});

const success = ref(false);
const error = ref(false);
const notSending = ref(true);

onMounted(() => {
  if (window.emailjs) {
    emailjs.init("16i6i3kCCpv42rYJv");
  }
});

const sendEmail = async () => {
  success.value = false;
  error.value = false;
  notSending.value = false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.value.name || !form.value.email || !form.value.message) {
    alert("Name, email, and message must not be empty."); // <-- this can also be localized if you want
    return;
  }

  if (!emailRegex.test(form.value.email)) {
    alert("Please enter a valid email address."); // <-- localizable too
    return;
  }

  try {
    await emailjs.send("service_71sjyhe", "template_a9w2hln", {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
    });

    success.value = true;
    form.value.name = "";
    form.value.email = "";
    form.value.message = "";
  } catch (err) {
    console.error(err);
    error.value = true;
  }
  notSending.value = true;
};
</script>

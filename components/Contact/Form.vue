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

const { t } = useI18n();

const form = ref({
  name: "",
  email: "",
  message: "",
});

const success = ref(false);
const error = ref(false);
const notSending = ref(true);

 const appScriptUrl = 'https://script.google.com/macros/s/AKfycbwQ1YKkGwKDL15chyWxO2x7UvlkNveVOAw7kBWVsWTXrFdWhlLyYebanJNJIynaigkDWA/exec'; 
const sendEmail = async () => {
    
    success.value = false;
    error.value = false;
    notSending.value = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 2. Client-Side Validation (Remains the same)
    if (!form.value.name || !form.value.email || !form.value.message) {
        alert("Name, email, and message must not be empty.");
        notSending.value = true;
        return;
    }

    if (!emailRegex.test(form.value.email)) {
        alert("Please enter a valid email address.");
        notSending.value = true;
        return;
    }

    // 3. Prepare the data for the Google Apps Script
    // The Apps Script 'doPost' function expects form data, so we use URLSearchParams or FormData.
    const formData = new URLSearchParams();
    formData.append('name', form.value.name);
    formData.append('email', form.value.email);
    formData.append('message', form.value.message);

    try {
        // 4. Send the data to the Google Apps Script endpoint
        const response = await fetch(appScriptUrl, {
            method: 'POST',
            // Use 'body: formData' for POSTing to Apps Script. 
            // This is the equivalent of a standard form submission.
            body: formData 
        });

        const data = await response.json();

        if (data.result === 'success') {
            // 5. Success Handling
            success.value = true;
            form.value.name = "";
            form.value.email = "";
            form.value.message = "";
        } else {
            // Apps Script returned an error (e.g., could not write to sheet)
            console.error('Apps Script Error:', data.error);
            error.value = true;
        }
        
    } catch (err) {
        // 6. Network/Fetch Error Handling
        console.error('Fetch Failed:', err);
        error.value = true;
    }
    
    notSending.value = true;
};
</script>

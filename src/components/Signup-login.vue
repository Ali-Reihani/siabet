<template>
  <main class="auth-page">

    <!-- ================= HEADER ================= -->
    <header class="top-header">

      <!-- Logo -->
      <div class="logo">
        <div class="logo-icon">
          <i class="fa-solid fa-futbol"></i>
        </div>

        <span class="logo-text">
          PLAY<span>BET</span>
        </span>
      </div>

      <!-- Header Center -->
      <div class="language-switcher">
        <button
          class="language-box"
          type="button"
          aria-haspopup="listbox"
          :aria-expanded="showLanguageMenu"
          @click="showLanguageMenu = !showLanguageMenu"
        >
          <span>{{ language.toUpperCase() }}</span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>

        <div v-if="showLanguageMenu" class="language-menu" role="listbox">
          <button
            v-for="option in languages"
            :key="option.code"
            type="button"
            role="option"
            :aria-selected="language === option.code"
            @click="changeLanguage(option.code)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Header Right -->
      <div class="header-actions">

        <button class="header-action">
          <i class="fa-solid fa-gift"></i>
          <span>{{ t('Benefits') }}</span>
        </button>

        <button class="header-action">
          <i class="fa-regular fa-circle-question"></i>
          <span>{{ t('Help') }}</span>
        </button>

        <button class="theme-button">
          <i class="fa-regular fa-sun"></i>
        </button>

      </div>
    </header>


    <!-- ================= MAIN CONTENT ================= -->
    <section class="auth-content">

      <!-- ================= LEFT SIDE ================= -->
      <div class="form-side">

        <div class="form-wrapper">

          <!-- Title -->
          <div class="welcome">

            <h1>
              {{ t('Welcome to ') }}Play<span>Bet</span>
            </h1>

            <p>
              {{ t('Bet on players.') }}
              <span>{{ t('Not teams.') }}</span>
            </p>

          </div>


          <!-- Login / Signup -->
          <div class="auth-tabs">

            <button
              class="auth-tab"
              :class="{ active: activeTab === 'login' }"
              @click="activeTab = 'login'"
            >
              {{ t('Login') }}
            </button>

            <button
  class="auth-tab"
  :class="{ active: activeTab === 'signup' }"
  @click="activeTab = 'signup'"
>
  {{ t('Sign Up') }}
</button>
          </div>


          <!-- ================= SIGN UP FORM ================= -->
          <form
            v-if="activeTab === 'signup'"
            class="signup-form"
            @submit.prevent="createAccount"
          >

            <!-- Username -->
            <div class="input-group">

              <i class="fa-regular fa-user input-icon"></i>

              <input
                v-model="form.username"
                type="text"
                :placeholder="t('Username')"
              />

            </div>


            <!-- Email -->
            <div class="input-group">

              <i class="fa-regular fa-envelope input-icon"></i>

              <input
                v-model="form.email"
                type="email"
                :placeholder="t('Email')"
              />

            </div>


            <!-- Password -->
            <div class="input-group">

              <i class="fa-solid fa-lock input-icon"></i>

              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="t('Password')"
              />

              <button
                type="button"
                class="input-action"
                @click="showPassword = !showPassword"
              >
                <i
                  :class="
                    showPassword
                      ? 'fa-regular fa-eye'
                      : 'fa-regular fa-eye-slash'
                  "
                ></i>
              </button>

            </div>


            <!-- Confirm Password -->
            <div class="input-group">

              <i class="fa-solid fa-lock input-icon"></i>

              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :placeholder="t('Confirm Password')"
              />

              <button
                type="button"
                class="input-action"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <i
                  :class="
                    showConfirmPassword
                      ? 'fa-regular fa-eye'
                      : 'fa-regular fa-eye-slash'
                  "
                ></i>
              </button>

            </div>


            <!-- Country / Currency -->
            <div class="double-input">

              <!-- Country -->
              <div class="select-group">

                <i class="fa-solid fa-globe input-icon"></i>

                <select v-model="form.country">
                  <option value="" disabled>
                    {{ t('Country') }}
                  </option>

                  <option value="Germany">{{ t('Germany') }}</option>
                  <option value="Turkey">{{ t('Turkey') }}</option>
                  <option value="Iran">{{ t('Iran') }}</option>
                  <option value="United Kingdom">{{ t('United Kingdom') }}</option>
                  <option value="United States">{{ t('United States') }}</option>
                </select>

                <i class="fa-solid fa-chevron-down select-arrow"></i>

              </div>


              <!-- Currency -->
              <div class="select-group">

                <i class="fa-solid fa-dollar-sign input-icon"></i>

                <select v-model="form.currency">
                  <option value="" disabled>
                    {{ t('Currency') }}
                  </option>

                  <option>EUR</option>
                  <option>USD</option>
                  <option>TRY</option>
                </select>

                <i class="fa-solid fa-chevron-down select-arrow"></i>

              </div>

            </div>


            <!-- Referral -->
            <div class="input-group">

              <i class="fa-regular fa-gift input-icon"></i>

              <input
                v-model="form.referral"
                type="text"
                :placeholder="t('Referral Code (Optional)')"
              />

            </div>


            <!-- ================= CHECKBOXES ================= -->
            <div class="agreements">

              <label class="checkbox-row">

                <input
                  v-model="form.age"
                  type="checkbox"
                />

                <span class="custom-checkbox">
                  <i class="fa-solid fa-check"></i>
                </span>

                <span>
                  {{ t('I am over 18 years old') }}
                </span>

              </label>


              <label class="checkbox-row">

                <input
                  v-model="form.terms"
                  type="checkbox"
                />

                <span class="custom-checkbox">
                  <i class="fa-solid fa-check"></i>
                </span>

                <span>
                  {{ t('I agree to the') }}
                  <a href="#">{{ t('Terms & Conditions') }}</a>
                </span>

              </label>


              <label class="checkbox-row">

                <input
                  v-model="form.privacy"
                  type="checkbox"
                />

                <span class="custom-checkbox">
                  <i class="fa-solid fa-check"></i>
                </span>

                <span>
                  {{ t('I agree to the') }}
                  <a href="#">{{ t('Privacy Policy') }}</a>
                </span>

              </label>

            </div>


            <!-- Create Account -->
            <button
              class="create-account"
              type="submit"
            >
              {{ t('Create Account') }}
            </button>


            <!-- Divider -->
            <div class="divider">

              <span></span>

              <p>{{ t('OR') }}</p>

              <span></span>

            </div>


            <!-- Google -->
            <button
              type="button"
              class="google-button"
              @click="googleSignup"
            >

              <span class="google-icon">
                G
              </span>

              <span>
                {{ t('Sign up with Google') }}
              </span>

            </button>


            <!-- Login -->
            <div class="bottom-login">

              <span>
                {{ t('Already have an account?') }}
              </span>

              <button
                type="button"
                @click="activeTab = 'login'"
              >
                {{ t('Login') }}
              </button>

            </div>

          </form>


          <!-- ================= LOGIN ================= -->
          <form
            v-else
            class="signup-form"
            @submit.prevent="login"
          >

            <div class="input-group">

              <i class="fa-regular fa-envelope input-icon"></i>

              <input
                v-model="loginForm.email"
                type="email"
                :placeholder="t('Email')"
              />

            </div>


            <div class="input-group">

              <i class="fa-solid fa-lock input-icon"></i>

              <input
                v-model="loginForm.password"
                :type="showLoginPassword ? 'text' : 'password'"
                :placeholder="t('Password')"
              />

              <button
                type="button"
                class="input-action"
                @click="
                  showLoginPassword = !showLoginPassword
                "
              >
                <i
                  :class="
                    showLoginPassword
                      ? 'fa-regular fa-eye'
                      : 'fa-regular fa-eye-slash'
                  "
                ></i>
              </button>

            </div>


            <button
              type="submit"
              class="create-account"
            >
              {{ t('Login') }}
            </button>


            <div class="divider">

              <span></span>
              <p>{{ t('OR') }}</p>
              <span></span>

            </div>


            <button
              type="button"
              class="google-button"
            >
              <span class="google-icon">G</span>
              <span>{{ t('Continue with Google') }}</span>
            </button>


            <div class="bottom-login">

              <span>
                {{ t("Don't have an account?") }}
              </span>

              <button
                type="button"
                @click="activeTab = 'signup'"
              >
                {{ t('Sign Up') }}
              </button>

            </div>

          </form>

        </div>

      </div>


      <!-- ================= RIGHT IMAGE SIDE ================= -->
      <div class="visual-side">

        <div class="space-background">
                  <img :class="imgbackgr"  :src="backgr" alt="backgr">

        </div>

        <!-- Player -->
        <!-- <div class="player-image">
                  <img :src="player" alt="player">

        </div> -->


        <!-- Purple center line -->
        <div class="center-line"></div>


        <!-- Football -->
        <div class="football">

          <i class="fa-solid fa-futbol"></i>

        </div>


        <!-- Purple Glow -->
        <div class="ball-glow"></div>

      </div>

    </section>


    <!-- ================= MOBILE PHONE PREVIEW ================= -->
    <div class="mobile-preview">

      <div class="mobile-notch"></div>

      <div class="mobile-header">

        <div class="mobile-logo">

          <div class="logo-icon">
            <i class="fa-solid fa-futbol"></i>
          </div>

          <span>
            PLAY<span>BET</span>
          </span>

        </div>

        <i class="fa-solid fa-bars"></i>

      </div>


      <div class="mobile-content">

        <h2>
          {{ t('Welcome to ') }}Play<span>Bet</span>
        </h2>

        <p>
          {{ t('Bet on players.') }}
          <span>{{ t('Not teams.') }}</span>
        </p>


        <div class="mobile-tabs">

          <button
            :class="{ active: activeTab === 'login' }"
            @click="activeTab = 'login'"
          >
            {{ t('Login') }}
          </button>

          <button
            :class="{ active: activeTab === 'signup' }"
            @click="activeTab = 'signup'"
          >
            {{ t('Sign Up') }}
          </button>

        </div>


        <div class="mobile-field">
          <i class="fa-regular fa-user"></i>
          <span>{{ t('Username') }}</span>
        </div>

        <div class="mobile-field">
          <i class="fa-regular fa-envelope"></i>
          <span>{{ t('Email') }}</span>
        </div>

        <div class="mobile-field">
          <i class="fa-solid fa-lock"></i>
          <span>{{ t('Password') }}</span>
          <i class="fa-regular fa-eye"></i>
        </div>

        <div class="mobile-field">
          <i class="fa-solid fa-lock"></i>
          <span>{{ t('Confirm Password') }}</span>
          <i class="fa-regular fa-eye"></i>
        </div>


        <div class="mobile-double">

          <div class="mobile-field">
            <i class="fa-solid fa-globe"></i>
            <span>{{ t('Country') }}</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>

          <div class="mobile-field">
            <i class="fa-solid fa-dollar-sign"></i>
            <span>{{ t('Currency') }}</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>

        </div>


        <div class="mobile-field">
          <i class="fa-regular fa-gift"></i>
          <span>{{ t('Referral Code (Optional)') }}</span>
        </div>


        <div class="mobile-checks">

          <div>
            <span class="mini-check">
              <i class="fa-solid fa-check"></i>
            </span>
            {{ t('I am over 18 years old') }}
          </div>

          <div>
            <span class="mini-check">
              <i class="fa-solid fa-check"></i>
            </span>
            {{ t('I agree to the') }}
            <b>{{ t('Terms & Conditions') }}</b>
          </div>

          <div>
            <span class="mini-check">
              <i class="fa-solid fa-check"></i>
            </span>
            {{ t('I agree to the') }}
            <b>{{ t('Privacy Policy') }}</b>
          </div>

        </div>


        <button class="mobile-create">
          {{ t('Create Account') }}
        </button>


        <div class="mobile-divider">
          <span></span>
          {{ t('OR') }}
          <span></span>
        </div>


        <button class="mobile-google">
          <strong>G</strong>
          {{ t('Sign up with Google') }}
        </button>


        <div class="mobile-bottom">
          {{ t('Already have an account?') }}
          <span>{{ t('Login') }}</span>
        </div>

      </div>

    </div>

  </main>
</template>





<style scoped>

.space-background img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* =====================================================
   ROOT
===================================================== */

* {
  box-sizing: border-box;
}

.auth-page {
  min-height: 100vh;

  background:
    radial-gradient(
      circle at 50% 50%,
      rgba(115, 38, 255, .08),
      transparent 35%
    ),
    #020305;

  color: #fff;

  font-family:
    Inter,
    Arial,
    sans-serif;

  position: relative;

  overflow: hidden;
}


/* =====================================================
   HEADER
===================================================== */

.top-header {

  position: absolute;

  top: 18px;
  left: 18px;
  right: 18px;

  height: 72px;

  display: flex;

  align-items: center;

  z-index: 20;

  padding: 0 28px;

  border: 1px solid rgba(255,255,255,.08);

  border-radius: 20px;

  background:
    rgba(5, 8, 12, .78);

  backdrop-filter: blur(20px);

}


/* LOGO */

.logo {

  display: flex;

  align-items: center;

  gap: 10px;

  font-size: 24px;

  font-weight: 800;

  letter-spacing: -1px;

}

.logo-icon {

  width: 34px;
  height: 34px;

  border: 3px solid #8d32ff;

  border-radius: 12px;

  display: flex;

  align-items: center;
  justify-content: center;

  color: #a342ff;

  transform: rotate(30deg);

}

.logo-icon i {

  transform: rotate(-30deg);

  font-size: 15px;

}

.logo-text span {

  color: #8d35ff;

}


/* LANGUAGE */

.language-switcher {

  position: absolute;

  left: 40%;

  z-index: 25;

}

.language-box {

  height: 40px;

  padding: 0 14px;

  display: flex;

  align-items: center;

  gap: 14px;

  background: rgba(255,255,255,.025);

  border: 1px solid rgba(255,255,255,.06);

  border-radius: 11px;

  color: #ddd;

  font-size: 14px;

  cursor: pointer;

}

.language-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 140px;
  padding: 5px;
  display: grid;
  gap: 3px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 11px;
  background: #101117;
  box-shadow: 0 12px 28px rgba(0,0,0,.35);
}

.language-menu button {
  padding: 9px 10px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #ddd;
  text-align: left;
  cursor: pointer;
}

.language-menu button:hover,
.language-menu button[aria-selected="true"] {
  background: rgba(141,53,255,.18);
  color: #fff;

}

.language-box i {

  font-size: 10px;

}


/* HEADER ACTIONS */

.header-actions {

  margin-left: auto;

  display: flex;

  align-items: center;

  gap: 10px;

}

.header-action {

  border: 0;

  background: transparent;

  color: #ddd;

  padding: 10px 12px;

  display: flex;

  gap: 10px;

  align-items: center;

  font-size: 14px;

  cursor: pointer;

}

.header-action i {

  font-size: 18px;

}

.header-action:hover {

  color: #a343ff;

}

.theme-button {

  width: 42px;
  height: 42px;

  margin-left: 8px;

  border-radius: 13px;

  border: 1px solid rgba(255,255,255,.05);

  background: rgba(255,255,255,.025);

  color: #ddd;

  cursor: pointer;

  font-size: 18px;

}


/* =====================================================
   CONTENT
===================================================== */

.auth-content {

  min-height: 100vh;

  display: grid;

  grid-template-columns: 48% 52%;

}


/* =====================================================
   FORM SIDE
===================================================== */

.form-side {

  display: flex;

  align-items: center;

  justify-content: center;

  padding:

    115px

    70px

    40px;

  position: relative;

  z-index: 10;

  background:

    radial-gradient(
      circle at 50% 40%,
      rgba(20,25,30,.7),
      transparent 65%
    );

}


.form-wrapper {

  width: 100%;

  max-width: 430px;

}


/* =====================================================
   WELCOME
===================================================== */

.welcome {

  text-align: center;

  margin-bottom: 24px;

}

.welcome h1 {

  font-size: 34px;

  line-height: 1.15;

  margin: 0 0 12px;

  font-weight: 700;

  letter-spacing: -1.2px;

}

.welcome h1 span {

  color: #8f32ff;

}

.welcome p {

  margin: 0;

  color: #999;

  font-size: 16px;

}

.welcome p span {

  color: #9b3dff;

}


/* =====================================================
   TABS
===================================================== */

.auth-tabs {

  display: grid;

  grid-template-columns: 1fr 1fr;

  height: 45px;

  background: #101317;

  border: 1px solid rgba(255,255,255,.05);

  border-radius: 8px;

  overflow: hidden;

  margin-bottom: 14px;

}

.auth-tab {

  border: 0;

  color: #eee;

  background: transparent;

  font-size: 15px;

  cursor: pointer;

  transition: .25s;

}

.auth-tab:hover{
  background: linear-gradient(90deg, #9146FF 0%, #B95CFF 100%);
transition: all .25s ease;
color: white;
    
}

.auth-tab.active {

  background:

    linear-gradient(
      135deg,
      #7124dc,
      #8d2fff
    );

  box-shadow:
    0 0 25px rgba(131,45,255,.25);
transform: scale(.98);

}



/* =====================================================
   INPUT
===================================================== */

.signup-form {

  display: flex;

  flex-direction: column;

  gap: 7px;

}

.input-group {

  height: 52px;

  border-radius: 8px;

  border: 1px solid rgba(255,255,255,.06);

  background: #111519;

  display: flex;

  align-items: center;

  padding: 0 14px;

  transition: .25s;

}

.input-group:focus-within {

  border-color: rgba(145,49,255,.75);

  box-shadow:
    0 0 0 3px rgba(145,49,255,.08);

}

.input-icon {

  width: 30px;

  color: #aaa;

  font-size: 17px;

}

.input-group input {

  flex: 1;

  min-width: 0;

  height: 100%;

  border: 0;

  outline: 0;

  background: transparent;

  color: white;

  font-size: 14px;

}

.input-group input::placeholder {

  color: #999;

}

.input-action {

  border: 0;

  background: transparent;

  color: #999;

  cursor: pointer;

  font-size: 16px;

}


/* =====================================================
   SELECT
===================================================== */

.double-input {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 7px;

}

.select-group {

  height: 52px;

  position: relative;

  display: flex;

  align-items: center;

  padding: 0 14px;

  background: #111519;

  border: 1px solid rgba(255,255,255,.06);

  border-radius: 8px;

}

.select-group select {

  flex: 1;

  min-width: 0;

  height: 100%;

  border: 0;

  outline: 0;

  color: #aaa;

  background: transparent;

  appearance: none;

  font-size: 14px;

}

.select-arrow {

  color: #aaa;

  font-size: 11px;

}


/* =====================================================
   AGREEMENTS
===================================================== */

.agreements {

  display: flex;

  flex-direction: column;

  gap: 11px;

  padding: 8px 0 7px;

}

.checkbox-row {

  position: relative;

  display: flex;

  align-items: center;

  gap: 10px;

  color: #aaa;

  font-size: 13px;

  cursor: pointer;

}

.checkbox-row input {

  display: none;

}

.custom-checkbox {

  width: 19px;
  height: 19px;

  flex-shrink: 0;

  border-radius: 4px;

  background: #13161a;

  border: 1px solid #444;

  display: flex;

  align-items: center;

  justify-content: center;

  transition: .2s;

}

.checkbox-row input:checked + .custom-checkbox {

  background: #8630f4;

  border-color: #8630f4;

}

.custom-checkbox i {

  font-size: 11px;

  color: white;

  opacity: 0;

}

.checkbox-row input:checked
+ .custom-checkbox i {

  opacity: 1;

}

.checkbox-row a {

  color: #9b3dff;

  text-decoration: none;

}

.checkbox-row a:hover {

  text-decoration: underline;

}


/* =====================================================
   CREATE ACCOUNT
===================================================== */

.create-account {

  height: 49px;

  border: 0;

  border-radius: 8px;

  background:
    linear-gradient(
      135deg,
      #7024d7,
      #8e2fff
    );

  color: white;

  font-size: 15px;

  font-weight: 500;

  cursor: pointer;

  box-shadow:
    0 8px 25px rgba(122,35,230,.18);

  transition: .25s;

}

.create-account:hover {

  transform: translateY(-2px);

box-shadow:
    0 0 20px rgba(166, 61, 255, 0.45),
    0 8px 24px rgba(166, 61, 255, 0.25);  
background: linear-gradient(90deg, #9146FF 0%, #B95CFF 100%);
transition: all .25s ease;

}

.create-account:active{
  transform: scale(.98);

box-shadow:
0 0 10px rgba(166,61,255,.25);
}


/* =====================================================
   DIVIDER
===================================================== */

.divider {

  display: flex;

  align-items: center;

  gap: 12px;

  margin: 4px 0;

}

.divider span {

  height: 1px;

  flex: 1;

  background: rgba(255,255,255,.1);

}

.divider p {

  margin: 0;

  color: #999;

  font-size: 12px;

}


/* =====================================================
   GOOGLE
===================================================== */

.google-button {

  height: 50px;

  border-radius: 8px;

  border: 1px solid rgba(255,255,255,.06);

  background: #111519;

  color: #eee;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 15px;

  cursor: pointer;

  font-size: 15px;

  transition: .25s;

}

.google-button:hover {

  background: #171b20;

}

.google-icon {

  font-weight: 800;

  font-size: 20px;

  color: #4285f4;

}


/* =====================================================
   BOTTOM LOGIN
===================================================== */

.bottom-login {

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 7px;

  color: #999;

  font-size: 14px;

  padding-top: 13px;

}

.bottom-login button {

  border: 0;

  background: transparent;

  color: #9b3dff;

  cursor: pointer;

  font-size: 14px;

}


/* =====================================================
   VISUAL SIDE
===================================================== */

.visual-side {

  position: relative;

  overflow: hidden;

  background: #05070c;

}


/* space background */

.space-background {

  position: absolute;

  inset: 0;

  background:

    radial-gradient(
      circle at 65% 45%,
      rgba(79,40,160,.4),
      transparent 35%
    ),

    radial-gradient(
      circle at 90% 80%,
      rgba(108,38,180,.22),
      transparent 30%
    ),

    linear-gradient(
      120deg,
      #05070c,
      #080917 45%,
      #03040a
    );

}


/* =====================================================
   PLAYER
===================================================== */

.player-image {

  position: absolute;

  inset: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  z-index: 2;

}

.player-image img {

  width: 95%;

  height: 100%;

  object-fit: cover;

  object-position: center;

  mix-blend-mode: screen;

  opacity: .95;

}


/* =====================================================
   CENTER LINE
===================================================== */

.center-line {

  position: absolute;

  top: 0;

  bottom: 0;

  left: 0;

  width: 2px;

  background:

    linear-gradient(
      transparent,
      #9a38ff 20%,
      #a33dff 80%,
      transparent
    );

  box-shadow:

    10 10 12px #8e2dff,
    0 0 30px rgba(139,42,255,.7);

  z-index: 8;

}


/* =====================================================
   BALL
===================================================== */

.football {

  position: absolute;

  left: 110px;

  top: 48%;

  width: 92px;

  height: 92px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  z-index: 12;

  background:

    radial-gradient(
      circle,
      #f4f4f4,
      #b9b9b9
    );

  color: #15171c;

  font-size: 120px;

  box-shadow:

    0 0 15px #fff,
    0 0 35px #9d32ff,
    0 0 70px rgba(143,47,255,.9);

  animation: ballFloat 2s ease-in-out infinite;

}

/* .ball-glow {

  position: absolute;

  left: -20px;

  top: calc(48% + 15px);

  width: 60px;

  height: 60px;

  border-radius: 50%;

  background: #a234ff;

  filter: blur(30px);

  opacity: .7;

  z-index: 7;

} */


@keyframes ballFloat {

  0%,
  100% {

    transform:
      translateY(0)
      rotate(0);

  }

  50% {

    transform:
      translateY(-7px)
      rotate(8deg);

  }

}


/* =====================================================
   MOBILE PREVIEW
===================================================== */

.mobile-preview {

  position: absolute;

  z-index: 30;

  right: 13.5%;

  top: 50%;

  transform:
    translateY(-50%);

  width: 330px;

  height: 650px;

  border:

    2px solid

    #8b2eff;

  border-radius: 58px;

  background: #030507;

  box-shadow:

    0 0 15px rgba(139,46,255,.6),
    0 0 50px rgba(139,46,255,.2);

  padding: 31px 22px;

  overflow: hidden;

}


/* notch */

.mobile-notch {

  position: absolute;

  top: 9px;

  left: 50%;

  transform: translateX(-50%);

  width: 90px;

  height: 19px;

  border-radius: 20px;

  background: #000;

}


/* mobile header */

.mobile-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 32px;

}

.mobile-logo {

  display: flex;

  align-items: center;

  gap: 8px;

  font-size: 17px;

  font-weight: 800;

}

.mobile-logo .logo-icon {

  width: 24px;
  height: 24px;

  border-width: 2px;

  border-radius: 8px;

}

.mobile-logo .logo-icon i {

  font-size: 10px;

}

.mobile-logo > span > span {

  color: #9135ff;

}

.mobile-header > i {

  font-size: 21px;

}


/* mobile content */

.mobile-content {

  text-align: center;

}

.mobile-content h2 {

  font-size: 21px;

  margin: 0 0 9px;

}

.mobile-content h2 span {

  color: #9c35ff;

}

.mobile-content > p {

  color: #999;

  font-size: 12px;

  margin-bottom: 18px;

}

.mobile-content > p span {

  color: #9c35ff;

}


/* mobile tabs */

.mobile-tabs {

  display: grid;

  grid-template-columns: 1fr 1fr;

  height: 37px;

  border-radius: 7px;

  overflow: hidden;

  margin-bottom: 10px;

  background: #111519;

}

.mobile-tabs button {

  border: 0;

  background: transparent;

  color: #ddd;

  font-size: 12px;

}

.mobile-tabs button.active {

  background: #7828e5;

}


/* mobile fields */

.mobile-field {

  height: 42px;

  margin-bottom: 6px;

  border-radius: 7px;

  background: #111519;

  border: 1px solid rgba(255,255,255,.05);

  display: flex;

  align-items: center;

  gap: 9px;

  padding: 0 10px;

  text-align: left;

  color: #aaa;

  font-size: 11px;

}

.mobile-field > i:first-child {

  color: #aaa;

  width: 16px;

}

.mobile-field > i:last-child {

  margin-left: auto;

  font-size: 10px;

}

.mobile-double {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 6px;

}

.mobile-double .mobile-field {

  min-width: 0;

}


/* mobile checks */

.mobile-checks {

  display: flex;

  flex-direction: column;

  gap: 8px;

  text-align: left;

  color: #aaa;

  font-size: 10px;

  margin: 10px 0;

}

.mobile-checks > div {

  display: flex;

  align-items: center;

  gap: 7px;

}

.mini-check {

  width: 15px;
  height: 15px;

  border-radius: 4px;

  display: flex;

  align-items: center;
  justify-content: center;

  background: #8630f4;

  color: white;

  flex-shrink: 0;

}

.mini-check i {

  font-size: 8px;

}

.mobile-checks b {

  color: #9b3dff;

  font-weight: 400;

}


/* mobile create */

.mobile-create {

  width: 100%;

  height: 40px;

  border: 0;

  border-radius: 7px;

  color: white;

  background: #7828e5;

  font-size: 12px;

}
.mobile-create:hover{

}


/* mobile divider */

.mobile-divider {

  display: flex;

  align-items: center;

  gap: 8px;

  color: #999;

  font-size: 9px;

  margin: 12px 0;

}

.mobile-divider span {

  height: 1px;

  background: rgba(255,255,255,.1);

  flex: 1;

}


/* mobile google */

.mobile-google {

  width: 100%;

  height: 40px;

  border-radius: 7px;

  border: 1px solid rgba(255,255,255,.05);

  background: #111519;

  color: #eee;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 10px;

  font-size: 11px;

}

.mobile-google strong {

  color: #4285f4;

  font-size: 16px;

}


/* mobile bottom */

.mobile-bottom {

  color: #888;

  font-size: 10px;

  margin-top: 17px;

}

.mobile-bottom span {

  color: #9b3dff;

}


/* =====================================================
   1500px
===================================================== */

@media (max-width: 1500px) {

  .mobile-preview {

    right: 1.5%;

    transform:
      translateY(-50%)
      scale(.88);

    transform-origin: right center;

  }

}


/* =====================================================
   1200px
===================================================== */

@media (max-width: 1200px) {

  .form-side {

    padding-left: 35px;
    padding-right: 35px;

  }

  .mobile-preview {

    right: -35px;

    transform:
      translateY(-50%)
      scale(.76);

  }

  .header-action span {

    display: none;

  }

}


/* =====================================================
   1000px
===================================================== */

@media (max-width: 1000px) {

  .auth-content {

    grid-template-columns: 55% 45%;

  }

  .mobile-preview {

    display: none;

  }

  .visual-side {

    display: block;

  }

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 768px) {

  .auth-page {

    overflow-y: auto;

  }

  .top-header {

    position: relative;

    top: auto;
    left: auto;
    right: auto;

    margin: 12px;

    height: 60px;

    padding: 0 16px;

    border-radius: 16px;

  }

  .logo {

    font-size: 20px;

  }

  .logo-icon {

    width: 30px;
    height: 30px;

  }

  .language-switcher {

    position: relative;

    left: auto;

    margin-left: auto;

    margin-right: 10px;

  }

  .header-actions {

    display: none;

  }

  .auth-content {

    display: block;

    min-height: auto;

  }

  .visual-side {

    display: none;

  }

  .form-side {

    min-height: calc(100vh - 84px);

    padding:

      25px

      18px

      35px;

    align-items: flex-start;

  }

  .form-wrapper {

    max-width: 500px;

  }

  .welcome h1 {

    font-size: 29px;

  }

}


/* =====================================================
   SMALL MOBILE
===================================================== */

@media (max-width: 480px) {

  .form-side {

    padding-left: 14px;
    padding-right: 14px;

  }

  .welcome {

    margin-bottom: 20px;

  }

  .welcome h1 {

    font-size: 27px;

  }

  .welcome p {

    font-size: 14px;

  }

  .input-group,
  .select-group {

    height: 50px;

  }

  .double-input {

    gap: 5px;

  }

  .checkbox-row {

    font-size: 12px;

  }

  .create-account {

    height: 50px;

  }
}


/* =====================================================
   VERY SMALL
===================================================== */

@media (max-width: 360px) {

  .logo-text {

    font-size: 18px;

  }

  .welcome h1 {

    font-size: 24px;

  }

  .double-input {

    grid-template-columns: 1fr;

  }

}

</style>


<script setup>

import { ref, reactive } from "vue"
import { language, languages, setLanguage, t } from '@/i18n'
import player from '@/assets/player.jpg'



/* ================= TABS ================= */

const activeTab = ref("signup")
const showLanguageMenu = ref(false)

function changeLanguage(code) {
  setLanguage(code)
  showLanguageMenu.value = false
}


/* ================= PASSWORD ================= */

const showPassword = ref(false)

const showConfirmPassword = ref(false)

const showLoginPassword = ref(false)


/* ================= SIGN UP FORM ================= */

const form = reactive({

  username: "",

  email: "",

  password: "",

  confirmPassword: "",

  country: "",

  currency: "",

  referral: "",

  age: true,

  terms: true,

  privacy: true

})


/* ================= LOGIN ================= */

const loginForm = reactive({

  email: "",

  password: ""

})


/* ================= CREATE ACCOUNT ================= */

function createAccount() {

  if (!form.username) {
    alert(t('Please enter your username.'))
    return
  }

  if (!form.email) {
    alert(t('Please enter your email.'))
    return
  }

  if (!form.password) {
    alert(t('Please enter your password.'))
    return
  }

  if (form.password !== form.confirmPassword) {
    alert(t('Passwords do not match.'))
    return
  }

  if (!form.age || !form.terms || !form.privacy) {
    alert(t('Please accept all required agreements.'))
    return
  }

  console.log("Signup data:", form)

}


/* ================= LOGIN ================= */

function login() {

  console.log("Login:", loginForm)

}


/* ================= GOOGLE ================= */

function googleSignup() {

  console.log("Google signup")

}


import backgr from '@/assets/backgr.jpg'


</script>
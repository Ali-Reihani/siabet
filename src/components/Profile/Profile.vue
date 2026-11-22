<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/Header/AppHeader.vue'
import { language, languages, setLanguage, t } from '@/i18n'

interface AccountProfile {
  name: string
  email: string
  avatar: string
}

const PROFILE_STORAGE_KEY = 'playbet-account-profile'
const MAX_AVATAR_SIZE = 1024 * 1024
const router = useRouter()

const profileNotice = ref('')
const profileNoticeType = ref<'success' | 'error'>('success')

function readProfile(): AccountProfile {
  try {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!storedProfile) {
      return { name: '', email: '', avatar: '' }
    }

    const parsed: unknown = JSON.parse(storedProfile)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new Error('Stored profile is not an object.')
    }

    const saved = parsed as Record<string, unknown>
    return {
      name: typeof saved.name === 'string' ? saved.name : '',
      email: typeof saved.email === 'string' ? saved.email : '',
      avatar: typeof saved.avatar === 'string' ? saved.avatar : ''
    }
  } catch (error) {
    console.error('Could not load the saved account profile.', error)
    profileNoticeType.value = 'error'
    profileNotice.value = t('Could not load saved profile details.')
    return { name: '', email: '', avatar: '' }
  }
}

const profile = ref(readProfile())
const avatarInitial = computed(() => profile.value.name.trim().charAt(0).toUpperCase() || 'A')
const photoInput = ref<HTMLInputElement | null>(null)

const passwordForm = ref({
  current: '',
  next: '',
  confirmation: ''
})
const passwordNotice = ref('')

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})
const contactNotice = ref('')

function saveProfile() {
  profileNotice.value = ''

  try {
    profile.value.name = profile.value.name.trim()
    profile.value.email = profile.value.email.trim()
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile.value))
    profileNoticeType.value = 'success'
    profileNotice.value = t('Profile details saved in this browser.')
  } catch (error) {
    console.error('Could not save the account profile.', error)
    profileNoticeType.value = 'error'
    profileNotice.value = t('Could not save profile details. Check browser storage.')
  }
}

function choosePhoto() {
  photoInput.value?.click()
}

function handlePhotoSelection(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    profileNoticeType.value = 'error'
    profileNotice.value = t('Choose a valid image file.')
    input.value = ''
    return
  }

  if (file.size > MAX_AVATAR_SIZE) {
    profileNoticeType.value = 'error'
    profileNotice.value = t('Profile photos must be 1 MB or smaller.')
    input.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result !== 'string') {
      profileNoticeType.value = 'error'
      profileNotice.value = t('Could not read the selected photo.')
      return
    }

    profile.value.avatar = reader.result
    saveProfile()
    input.value = ''
  }
  reader.onerror = () => {
    console.error('Could not read the selected profile photo.', reader.error)
    profileNoticeType.value = 'error'
    profileNotice.value = t('Could not read the selected photo.')
    input.value = ''
  }
  reader.readAsDataURL(file)
}

function removePhoto() {
  profile.value.avatar = ''
  saveProfile()
}

function changeLanguage(event: Event) {
  const selectedCode = (event.target as HTMLSelectElement).value
  const selectedLanguage = languages.find(option => option.code === selectedCode)
  if (!selectedLanguage) {
    console.error('An unsupported language was selected.', selectedCode)
    return
  }

  setLanguage(selectedLanguage.code)
}

function updatePassword() {
  passwordNotice.value = ''

  if (passwordForm.value.next.length < 8) {
    passwordNotice.value = t('Password must be at least 8 characters.')
    return
  }

  if (passwordForm.value.next !== passwordForm.value.confirmation) {
    passwordNotice.value = t('Passwords do not match.')
    return
  }

  passwordNotice.value = t('Password updates require an account service. No password was changed.')
  passwordForm.value = { current: '', next: '', confirmation: '' }
}

function sendContactMessage() {
  contactNotice.value = t('Contact service is not connected. Your message has not been sent.')
}

function logout() {
  void router.push('/auth')
}

const frequentlyAskedQuestions = [
  {
    question: 'How do I update my profile?',
    answer: 'Edit your name or email above and save your profile. These changes are stored in this browser.'
  },
  {
    question: 'Can I change my password here?',
    answer: 'Password changes are unavailable until an account service is connected.'
  },
  {
    question: 'Where is my profile photo stored?',
    answer: 'Your photo is stored locally in this browser and is not uploaded to a server.'
  }
]
</script>

<template>
  <div class="account-page">
    <AppHeader page-title="Profile" />

    <main class="account-content">
      <header class="page-heading">
        <div>
          <span class="eyebrow">{{ t('ACCOUNT') }}</span>
          <h1>{{ t('Account dashboard') }}</h1>
          <p>{{ t('Manage your profile, security and preferences.') }}</p>
        </div>
        <RouterLink class="wallet-link" to="/wallet">
          <i class="fa-solid fa-wallet"></i>
          {{ t('Wallet') }}
        </RouterLink>
      </header>

      <div class="demo-notice" role="note">
        <i class="fa-solid fa-circle-info"></i>
        <span>{{ t('Profile details are saved in this browser. Authentication, password and contact services are not connected.') }}</span>
      </div>

      <div class="dashboard-grid">
        <nav class="account-nav" :aria-label="t('Account navigation')">
          <span class="nav-caption">{{ t('Account settings') }}</span>
          <a href="#profile-settings">
            <i class="fa-regular fa-user"></i>
            {{ t('Personal information') }}
          </a>
          <a href="#security-settings">
            <i class="fa-solid fa-lock"></i>
            {{ t('Security') }}
          </a>
          <a href="#language-settings">
            <i class="fa-solid fa-language"></i>
            {{ t('Language') }}
          </a>
          <a href="#faq">
            <i class="fa-regular fa-circle-question"></i>
            {{ t('FAQ') }}
          </a>
          <a href="#contact">
            <i class="fa-regular fa-envelope"></i>
            {{ t('Contact') }}
          </a>
          <button class="logout-link" type="button" @click="logout">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            {{ t('logout') }}
          </button>
        </nav>

        <div class="account-sections">
          <section id="profile-settings" class="panel">
            <header class="section-heading">
              <div>
                <span class="section-icon"><i class="fa-regular fa-user"></i></span>
                <h2>{{ t('Personal information') }}</h2>
                <p>{{ t('Update your account name, email and photo.') }}</p>
              </div>
            </header>

            <div class="avatar-editor">
              <button
                class="avatar-preview"
                type="button"
                :aria-label="t('Upload photo')"
                @click="choosePhoto"
              >
                <img v-if="profile.avatar" :src="profile.avatar" :alt="t('Profile photo')" />
                <span v-else>{{ avatarInitial }}</span>
                <span class="camera-badge"><i class="fa-solid fa-camera"></i></span>
              </button>
              <input
                ref="photoInput"
                class="visually-hidden"
                type="file"
                accept="image/*"
                :aria-label="t('Profile photo')"
                @change="handlePhotoSelection"
              />
              <div class="avatar-copy">
                <strong>{{ t('Profile photo') }}</strong>
                <p>{{ t('Choose an image up to 1 MB. It stays in this browser.') }}</p>
                <div class="avatar-actions">
                  <button class="secondary-button" type="button" @click="choosePhoto">
                    {{ t('Upload photo') }}
                  </button>
                  <button
                    v-if="profile.avatar"
                    class="text-button"
                    type="button"
                    @click="removePhoto"
                  >
                    {{ t('Remove photo') }}
                  </button>
                </div>
              </div>
            </div>

            <form class="form-grid" @submit.prevent="saveProfile">
              <label class="field">
                <span>{{ t('Display name') }}</span>
                <input
                  v-model="profile.name"
                  type="text"
                  autocomplete="name"
                  maxlength="60"
                  required
                />
              </label>
              <label class="field">
                <span>{{ t('Email') }}</span>
                <input
                  v-model="profile.email"
                  type="email"
                  autocomplete="email"
                  maxlength="254"
                  required
                />
              </label>
              <div class="form-actions">
                <button class="primary-button" type="submit">
                  {{ t('Save profile') }}
                </button>
              </div>
            </form>

            <p
              v-if="profileNotice"
              class="form-notice"
              :class="profileNoticeType"
              role="status"
              aria-live="polite"
            >
              {{ profileNotice }}
            </p>
          </section>

          <section id="security-settings" class="panel">
            <header class="section-heading">
              <div>
                <span class="section-icon"><i class="fa-solid fa-shield-halved"></i></span>
                <h2>{{ t('Change password') }}</h2>
                <p>{{ t('Update your password to keep your account secure.') }}</p>
              </div>
            </header>

            <form class="form-grid" @submit.prevent="updatePassword">
              <label class="field">
                <span>{{ t('Current password') }}</span>
                <input
                  v-model="passwordForm.current"
                  type="password"
                  autocomplete="current-password"
                  required
                />
              </label>
              <label class="field">
                <span>{{ t('New password') }}</span>
                <input
                  v-model="passwordForm.next"
                  type="password"
                  autocomplete="new-password"
                  minlength="8"
                  required
                />
              </label>
              <label class="field">
                <span>{{ t('Confirm new password') }}</span>
                <input
                  v-model="passwordForm.confirmation"
                  type="password"
                  autocomplete="new-password"
                  minlength="8"
                  required
                />
              </label>
              <div class="form-actions">
                <button class="primary-button" type="submit">
                  {{ t('Update password') }}
                </button>
              </div>
            </form>
            <p v-if="passwordNotice" class="form-notice error" role="alert">
              {{ passwordNotice }}
            </p>
          </section>

          <section id="language-settings" class="panel language-panel">
            <header class="section-heading">
              <div>
                <span class="section-icon"><i class="fa-solid fa-language"></i></span>
                <h2>{{ t('Language and region') }}</h2>
                <p>{{ t('Choose the language used across the site.') }}</p>
              </div>
            </header>
            <label class="field language-field">
              <span>{{ t('Site language') }}</span>
              <select :value="language" @change="changeLanguage">
                <option v-for="option in languages" :key="option.code" :value="option.code">
                  {{ option.label }}
                </option>
              </select>
            </label>
          </section>

          <section id="faq" class="panel">
            <header class="section-heading">
              <div>
                <span class="section-icon"><i class="fa-regular fa-circle-question"></i></span>
                <h2>{{ t('FAQ') }}</h2>
                <p>{{ t('Quick answers about your account.') }}</p>
              </div>
            </header>
            <details v-for="item in frequentlyAskedQuestions" :key="item.question" class="faq-item">
              <summary>{{ t(item.question) }}</summary>
              <p>{{ t(item.answer) }}</p>
            </details>
          </section>

          <section id="contact" class="panel">
            <header class="section-heading">
              <div>
                <span class="section-icon"><i class="fa-regular fa-envelope"></i></span>
                <h2>{{ t('Contact us') }}</h2>
                <p>{{ t('Send a message to the support team.') }}</p>
              </div>
            </header>
            <form class="form-grid" @submit.prevent="sendContactMessage">
              <label class="field">
                <span>{{ t('Your name') }}</span>
                <input v-model="contactForm.name" type="text" autocomplete="name" required />
              </label>
              <label class="field">
                <span>{{ t('Your email') }}</span>
                <input v-model="contactForm.email" type="email" autocomplete="email" required />
              </label>
              <label class="field full-width">
                <span>{{ t('Message') }}</span>
                <textarea v-model="contactForm.message" rows="4" maxlength="1000" required></textarea>
              </label>
              <div class="form-actions">
                <button class="primary-button" type="submit">
                  {{ t('Send message') }}
                </button>
              </div>
            </form>
            <p v-if="contactNotice" class="form-notice error" role="alert">
              {{ contactNotice }}
            </p>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.account-page {
  min-height: 100vh;
  background: #09090d;
  color: #f5f5f7;
}

.account-content {
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
  padding: 32px 0 64px;
}

.page-heading,
.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.page-heading {
  margin-bottom: 20px;
}

.eyebrow,
.nav-caption {
  color: #9b5cff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.page-heading h1 {
  margin: 8px 0 4px;
  font-size: 28px;
}

.page-heading p,
.section-heading p,
.avatar-copy p {
  margin: 0;
  color: #858591;
  font-size: 13px;
}

.wallet-link,
.primary-button,
.secondary-button,
.text-button,
.logout-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 10px;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease, transform .2s ease;
}

.wallet-link,
.secondary-button {
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid rgba(255,255,255,.09);
  background: #15151c;
  color: #e7e2f2;
  font-size: 12px;
}

.wallet-link:hover,
.secondary-button:hover {
  border-color: rgba(155,92,255,.55);
  background: rgba(155,92,255,.1);
}

.demo-notice {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 18px;
  padding: 12px 14px;
  border: 1px solid rgba(155,92,255,.22);
  border-radius: 10px;
  background: rgba(125,66,223,.09);
  color: #c9b5f7;
  font-size: 12px;
  line-height: 1.6;
}

.demo-notice i {
  margin-top: 2px;
  color: #ad82ff;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  align-items: start;
  gap: 16px;
}

.account-nav,
.panel {
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 14px;
  background: #101116;
}

.account-nav {
  position: sticky;
  top: 88px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 16px 10px;
}

.nav-caption {
  padding: 6px 10px 10px;
  letter-spacing: 1px;
}

.account-nav a,
.logout-link {
  justify-content: flex-start;
  min-height: 40px;
  padding: 0 10px;
  border-radius: 9px;
  background: transparent;
  color: #aaaab5;
  font-size: 12px;
  text-align: start;
}

.account-nav a {
  text-decoration: none;
}

.account-nav a:hover,
.logout-link:hover {
  background: rgba(155,92,255,.1);
  color: #fff;
}

.account-nav a i,
.logout-link i {
  width: 18px;
  color: #9b5cff;
  text-align: center;
}

.logout-link {
  margin-top: 8px;
  border-top: 1px solid rgba(255,255,255,.07);
  border-radius: 0 0 9px 9px;
  color: #ff8585;
}

.logout-link i {
  color: #ff8585;
}

.account-sections {
  display: grid;
  gap: 14px;
  min-width: 0;
}

.panel {
  min-width: 0;
  padding: 20px;
  scroll-margin-top: 88px;
}

.section-heading {
  justify-content: flex-start;
  margin-bottom: 18px;
}

.section-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  margin-bottom: 10px;
  border-radius: 10px;
  background: rgba(155,92,255,.12);
  color: #b48bff;
}

.section-heading h2 {
  margin: 0 0 5px;
  font-size: 17px;
}

.section-heading p {
  font-size: 12px;
}

.avatar-editor {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
  padding: 14px;
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 12px;
  background: #0c0d12;
}

.avatar-preview {
  position: relative;
  display: grid;
  place-items: center;
  flex: 0 0 68px;
  width: 68px;
  height: 68px;
  padding: 0;
  overflow: hidden;
  border: 2px solid rgba(155,92,255,.5);
  border-radius: 50%;
  background: linear-gradient(135deg,#8b5cf6,#6d28d9);
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-badge {
  position: absolute;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  width: 23px;
  height: 23px;
  border: 2px solid #0c0d12;
  border-radius: 50%;
  background: #9b5cff;
  font-size: 10px;
}

.avatar-copy {
  min-width: 0;
}

.avatar-copy strong {
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
}

.avatar-copy p {
  margin-bottom: 10px;
  font-size: 11px;
}

.avatar-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.secondary-button {
  min-height: 32px;
  padding: 0 11px;
  font-size: 11px;
}

.text-button {
  padding: 6px 8px;
  background: transparent;
  color: #aaaab5;
  font-size: 11px;
}

.text-button:hover {
  color: #fff;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
  color: #b8b8c2;
  font-size: 12px;
}

.field input,
.field select,
.field textarea {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 10px 12px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 9px;
  outline: none;
  background: #0b0c11;
  color: #f2f2f5;
  font: inherit;
}

.field textarea {
  min-height: 100px;
  resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: rgba(155,92,255,.7);
  box-shadow: 0 0 0 3px rgba(155,92,255,.1);
}

.field select option {
  background: #101116;
}

.form-actions {
  display: flex;
  align-items: flex-end;
  grid-column: 1 / -1;
}

.primary-button {
  min-height: 40px;
  padding: 0 16px;
  background: linear-gradient(135deg,#8b5cf6,#a855f7);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

.primary-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(139,92,246,.2);
}

.form-notice {
  margin: 12px 0 0;
  color: #75d8a1;
  font-size: 12px;
}

.form-notice.error {
  color: #ff9696;
}

.language-field {
  max-width: 360px;
}

.faq-item {
  border-top: 1px solid rgba(255,255,255,.07);
}

.faq-item summary {
  padding: 15px 2px;
  color: #e5e5eb;
  font-size: 13px;
  cursor: pointer;
}

.faq-item summary::marker {
  color: #9b5cff;
}

.faq-item p {
  margin: 0;
  padding: 0 2px 15px;
  color: #92929e;
  font-size: 12px;
  line-height: 1.7;
}

.full-width {
  grid-column: 1 / -1;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 900px) {
  .dashboard-grid {
    grid-template-columns: 190px minmax(0, 1fr);
  }
}

@media (max-width: 700px) {
  .account-content {
    width: min(100% - 28px, 620px);
    padding-top: 22px;
  }

  .dashboard-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .account-nav {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .nav-caption {
    grid-column: 1 / -1;
  }

  .logout-link {
    margin-top: 0;
    border-top: 0;
  }

  .page-heading h1 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .account-content {
    width: calc(100% - 24px);
    padding-top: 18px;
  }

  .page-heading {
    align-items: flex-start;
  }

  .page-heading h1 {
    font-size: 21px;
  }

  .wallet-link {
    min-height: 36px;
    padding: 0 10px;
    font-size: 11px;
  }

  .panel {
    padding: 15px;
  }

  .form-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .full-width,
  .form-actions {
    grid-column: auto;
  }

  .avatar-editor {
    align-items: flex-start;
    gap: 12px;
  }

  .avatar-preview {
    flex-basis: 58px;
    width: 58px;
    height: 58px;
  }
}
</style>
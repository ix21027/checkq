<template>
  <div class="place">
    <app-tab
      header="Про сайт"
      :img-src="aboutImage"
    >
      Сайт створений для підготовки до державних іспитів спеціальностей “Прикладна математика” та “Інформатика”.
      На сайті можна пройти <router-link to="/">тестування</router-link> та переглянути <router-link to="/bank">банк</router-link> питань.
    </app-tab>
    <app-tab
      header="Розробники"
      :img-src="devImage"
      left
    >
      Сайт розроблений студентами спеціальності "Прикладна математика" Донецького Національного Університету імені Василя Стуса.
      <div class="author-list">

        <app-author
          name="Главацький Сергій"
          link="https://t.me/foegit"
          link-title="@foegit"
          link-description="Telegram"
        />
        <app-author
          name="Луценко Владислав"
          link="https://t.me/fon_luchs"
          link-title="@fon_luchs"
          link-description="Telegram"
        />
        <app-author
          name="Бачу Михайло"
          link="https://t.me/Misha_Bachu"
          link-title="@Misha_Bachut"
          link-description="Telegram"
        />
      </div>
    </app-tab>
    <app-tab
      header="Вдячність"
      :img-src="mathImage"
    >
      Висловлюємо вдячність за допомогу в пошуку помилок <strong>Островській Ані</strong> та <strong>Резниченко Тетяні</strong>.
    </app-tab>
    <div class="tab-info">
    <app-tab
      header="Зворотній зв'язок"
      :img-src="contractImage"
      left
    >
      З будь-яких питань щодо сайту надсилайте лист на адресу: <a href="mailto:foegit@gmail.com">foegit@gmail.com</a>
    </app-tab>
  </div>
  </div>
</template>

<script>
import AboutTab from '@/components/About/AboutTab.vue';
import AboutAuthor from '@/components/About/AboutAuthor.vue';

import AboutImage from '@/assets/rocket.svg';
import DevelopersImage from '@/assets/dev.svg';
import MathImage from '@/assets/math.svg';
import ContractImage from '@/assets/paper-plane.svg';

export default {
  data() {
    return {
      aboutImage: AboutImage,
      devImage: DevelopersImage,
      mathImage: MathImage,
      contractImage: ContractImage,
    }
  },
  components: {
    appTab: AboutTab,
    appAuthor: AboutAuthor,
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/theme.scss';

a {
  text-decoration: none;
  color: $light-primary-color !important;
  position: relative;
  &::after {
    position: absolute;
    bottom: -4px;
    content: '';
    display: inline-block;
    width: 100%;
    border-radius: 2px;
    height: 2px;
    background: $light-primary-color;
    width: 0;
    left: 0;
    transition: width 0.4s;
  }
  &:hover::after{
      width: 100%;
    }
}

.author-list {
  display: flex;
  justify-content: center;
  flex-direction: column;
  @include tablet-landscape {
    flex-direction: row;
  }
}

.place{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  @include tablet-landscape {
      margin: 20px auto;
  }
  min-height: calc(100vh - 70px);
}
</style>

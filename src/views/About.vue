<template>
  <div class="place">
    <div class="record">
      <div class="head">
        Про сайт
      </div>
      <div class="body">
        Сайт розроблений студентами Донецького Національного Університету  імені Василя Стуса для підготовки до державних іспитів спеціальностей “Прикладна математика” та “Інформатика” 2019 року.
      </div>
    </div>
    <div class="record">
      <div class="head">
        Розробники
      </div>
      <div class="body">
        <div class="item-name">
          <div class="circle"></div>
          <div>
            Главацький Сергій - <a target="_blank" href="https://t.me/foegit">@foegit</a>
          </div>
        </div>
        <div class="item-name">
          <div class="circle"></div>
          <div>
            Луценко Владислав - <a target="_blank" href="https://t.me/fon_luchs">@fon_luchs</a>
          </div>
        </div>
        <div class="item-name">
          <div class="circle"></div>
          <div>
            Бачу Михайло - <a target="_blank" href="https://t.me/Misha_Bachu">@Misha_Bachu</a>
          </div>
        </div>
      </div>
    </div>
    <div class="record">
      <div class="head">
        Подяка
      </div>
      <div class="body">
        Висловлюємо подяку за допомогу в пошуку помилок Островській Ані та Резниченко Тетяні.
      </div>
    </div>
    <div class="record">
      <div class="head">
        Зворотній зв'язок
      </div>
      <div class="body">
        З будь-яких питань щодо сайту надсилайте лист на адресу: <a href="mailto:foegit@gmail.com">foegit@gmail.com</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/theme.scss';

a{
  text-decoration: none;
}
.place{
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 0 auto;
  margin-top: 20px;
  max-width: 900px;
  .record{
    margin-top: 10px;
    padding: 10px;
    .head{
      font-weight: bold;
    }
    .body{
      .item-name{
        display: flex;
        flex-direction: row;
        padding: 10px 0;
        .circle{
          width: 20px;
          height: 20px;
          margin: 0 10px;
          border-radius: 15px;
          background: $main-color;
        }
      }
      padding: 10px;
      padding-left: 40px;
    }
  }
  @include mobile{
    margin: 0;
    .record{
      padding: 0;
      .head{
        display: flex;
        justify-content: center;
        padding: 10px;
      }
      .body{
      padding: 0;
      }
    }
  }
}
</style>

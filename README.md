# Nuxt 3 starter template

Перед началом разработки предлагаю создать недостающие папки такие как `shared, app, entities, features, processes, widgets`.
Feature Sliced Design основан на слоях, каждого слоя свой скоуп ответственности, для лучшего понимания предлагаю пройтись по [документации](https://feature-sliced.design/)

### Кастомизация css/scss.
В папке `shared/assets/scss/` тут есть файлы стилей которые отвечают на тему на сайте и в целом ui kit
- variables лежить глобальные переменные,
- utils вспомогательные функций scss
- mixins миксины
- layout тут переменные и стили для контейнера/мобилки
- animations - стили анимаций

чтобы добавить свой ui компонент нужно будет в `type` нужно будет добавить название компонента в файле `shared/types/theme.ts` `ComponentNames` и еще есть `type` такиек как Variants и Colors их можно расширить добавив своё.
дальше просто в компоненте можешь использовать функцию `shared/utils/get-theme-classes.ts` чтобы сгенерить классов по Variant и Size, Colors. Можешь посмотреть пример в `shared/ui` и любов компонент

// Селекторы - это функции, которые достают данные из хранилища

// Достаем флаг "залогинен ли пользователь"
export const selectIsLoggedIn = state => state.auth.isLoggedIn;

// Достаем данные пользователя
export const selectUser = state => state.auth.user;

// Достаем флаг "идет ли обновление"
export const selectIsRefreshing = state => state.auth.isRefreshing;

// Достаем флаг "идет ли загрузка"
export const selectIsLoading = state => state.auth.isLoading;

// Что здесь происходит:

// Мы просто говорим: "В хранилище есть объект state

// В нем есть поле auth (наш slice)

// В auth есть isLoggedIn, user и т.д."

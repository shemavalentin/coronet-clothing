import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/category.saga";
import { UserSagas } from "./user/user.saga";

// By using a generator function
export function* rootSaga() {
  yield all([call(categoriesSaga), call(UserSagas)]);
}

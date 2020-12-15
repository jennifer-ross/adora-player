import {YANDEX_CHART} from "../Actions/const";

const initialState = {
    charts: [],
};

export default function yandexChartReducer(state = initialState, action) {
    switch (action.type) {
    case YANDEX_CHART.SET_YANDEX_CHART:
        return {...state, ...action.payload};
    case YANDEX_CHART.CLEAR_YANDEX_CHART:
        return {...state, charts: []};
    default:
        return state;
    }
}

import {YANDEX_CHART} from "../Actions/const";

const initialState = {
    chart: {},
    chartDescription: '',
    id: '',
    menu: [],
    title: '',
    type: '',
    typeForFrom: ''
};

export default function yandexChartReducer(state = initialState, action) {
    switch (action.type) {
    case YANDEX_CHART.SET_YANDEX_CHART:
        return {...state, ...action.payload};
    case YANDEX_CHART.CLEAR_YANDEX_CHART:
        return {...state, chart: {}, chartDescription: '', id: '', menu: [], title: '', type: '', typeForFrom: ''};
    default:
        return state;
    }
}

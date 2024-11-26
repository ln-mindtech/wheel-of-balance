import axios from "axios";

const apiUrl = 'https://api.mindtech.health';
// const apiUrl = 'http://api.mindtech.dvoloshyn.clients.in.ua';

let requestInstance = axios.create({
    baseURL: apiUrl,
    headers:{
        Authorization: '8a5da52ed126447d359e70c05721a8aa',
    }
});

const APIService = {
    getBalanceWheelQuestions: (params = {}) => {
        return requestInstance.get(
            apiUrl + '/balanceWheels/questions/',
            {params: params}
        );
    },
    saveBalanceWheelQuestions: (data) => {
        return requestInstance.post(
            apiUrl + '/balanceWheels/save/',
            data
        );
    },
    saveBalanceWheelAnswers: (data) => {
        return requestInstance.post(
            apiUrl + '/balanceWheels/answers/',
            data
        );
    },
    getReflections: (id_participant) => {
        return requestInstance.get(
            apiUrl + '/reflections/participant/',
            { params: {'id_participant': id_participant} }
        );
    },
    getReflectionQuestions: (id_participant, id_life_sphere) => {
        return requestInstance.get(
            apiUrl + '/reflections/questions/',
            { params: {'id_participant': id_participant, 'id_life_sphere': id_life_sphere} }
        );
    },
    getReflectionQuestionAnswer: (id_participant, id_question) => {
        return requestInstance.get(
            apiUrl + '/reflections/answers/',
            { params: {'id_participant': id_participant, 'id_question': id_question} }
        );
    },
    getParticipantByHash: (hash_participant) => {
        return requestInstance.get(
            apiUrl + '/participants/find/',
            { params: {'hash_participant': hash_participant} }
        );
    },
    getReflectionQuestionsAnswers: (id_participant) => {
        return requestInstance.get(
            apiUrl + '/reflections/answers/',
            { params: {'id_participant': id_participant, 'id_question': 0} }
        );
    },
    saveReflections: (id_participant, answers) => {
        return requestInstance.post(
            apiUrl + '/reflections/save/',
            {'id_participant': id_participant, 'answers': answers}
        );
    },
    getWheelDataByHash: (hash_participant, version = 1) => {
        return requestInstance.get(
            apiUrl + '/participants/wheel/',
            { params: {'hash_participant': hash_participant, version: version} }
        );
    },
    exportReflections: (id_participant, hash_participant, img) => {
        return requestInstance.post(
            apiUrl + '/reflections/export/',
            {'id_participant': id_participant, 'hash_participant': hash_participant, 'img': img}
        );
    },
    getFeedbackBalanceWheelQuestions: () => {
        return requestInstance.get(
            apiUrl + '/feedback/balance/wheel/questions/',
            {}
        );
    },
    saveFeedbackBalanceWheelAnswers: (id_participant, answers) => {
        return requestInstance.post(
            apiUrl + '/feedback/balance/wheel/answers/',
            {'id_participant': id_participant, 'answers': answers}
        );
    },
    createParticipant: () => {
        return requestInstance.post(
            apiUrl + '/participants/new/',
            {}
        );
    },
    saveFeedbackGeneral: (data) => {
        return requestInstance.post(
            apiUrl + '/feedback/general/',
            data
        );
    },
};

export default APIService;

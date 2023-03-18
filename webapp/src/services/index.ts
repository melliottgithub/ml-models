import { HttpClient, HttpResponse } from "./http";
import { PredictRequest, Response } from "./types";


export class RestService {

    http: HttpClient;
    baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.http =  new HttpClient({ baseURL: this.baseURL });
    }

    public async predict(params: PredictRequest) {
        return this.http.post<HttpResponse<Response>, PredictRequest>('/', params);
    }
}

const service = new RestService(process.env.REACT_APP_API || 'http://localhost:8000');

export default service;
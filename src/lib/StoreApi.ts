import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class StoreApi {
    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createOrder(orderData: any): Promise<APIResponse> {
        const response = await this.request.post('store/order', {
            data: orderData,
        });
        return response;
    }

    async getOrder(orderId: number): Promise<APIResponse> {
        const response = await this.request.get(`store/order/${orderId}`);
        return response;
    }
}

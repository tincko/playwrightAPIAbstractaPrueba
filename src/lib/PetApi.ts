import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class PetApi {
    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createPet(petData: any): Promise<APIResponse> {
        const response = await this.request.post('pet', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: petData,
        });

        if (!response.ok()) {
            console.log(`[PetApi] Falló la creación de la mascota: ${response.status()} ${response.statusText()}`);
            try {
                console.log(`[PetApi] Respuesta: ${await response.text()}`);
            } catch (e) {
                console.log(`[PetApi] No se pudo leer el texto de la respuesta: ${e}`);
            }
        }
        return response;
    }

    async getPet(petId: number): Promise<APIResponse> {
        const response = await this.request.get(`pet/${petId}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        return response;
    }

    async findPetsByStatus(status: 'available' | 'pending' | 'sold'): Promise<APIResponse> {
        const response = await this.request.get(`pet/findByStatus`, {
            params: {
                status: status,
            },
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok()) {
            try {
                console.log(`[PetApi] Falló la búsqueda de mascotas: ${response.status()} ${await response.text()}`);
            } catch (e) {
                console.log(`[PetApi] Falló la búsqueda de mascotas: ${response.status()} (No se pudo leer el cuerpo)`);
            }
        }
        return response;
    }
}

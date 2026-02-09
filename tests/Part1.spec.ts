import { test, expect } from '@playwright/test';
import { PetApi } from '../src/lib/PetApi';
import { DataGenerator } from '../src/utils/DataGenerator';

// Usar modo serial para compartir estado entre pruebas
test.describe.configure({ mode: 'serial' });

test.describe('Parte 1: crear 10 mascotas y obtener detalles de la mascota vendida', () => {
    let petApi: PetApi;
    const createdPets: any[] = [];

    test.beforeEach(async ({ request }) => {
        petApi = new PetApi(request);
    });

    test('Crear 10 mascotas (5 disponibles, 4 pendientes, 1 vendida)', async () => {
        // 5 disponibles
        for (let i = 0; i < 5; i++) {
            const petData = DataGenerator.generatePet('available');
            const response = await petApi.createPet(petData);
            expect(response.ok()).toBeTruthy();
            const body = await response.json();
            createdPets.push(body);
        }
        // 4 pendientes
        for (let i = 0; i < 4; i++) {
            const petData = DataGenerator.generatePet('pending');
            const response = await petApi.createPet(petData);
            expect(response.ok()).toBeTruthy();
            const body = await response.json();
            createdPets.push(body);
        }
        // 1 vendida
        const petData = DataGenerator.generatePet('sold');
        const response = await petApi.createPet(petData);
        if (!response.ok()) {
            console.error(`Falló la creación de la mascota: ${response.status()} ${response.statusText()}`);
            console.error(await response.text());
        }
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        createdPets.push(body);

        console.log(`Total de mascotas creadas: ${createdPets.length}`);
        expect(createdPets.length).toBe(10);
    });

    test('Obtener detalles de la mascota vendida', async () => {
        const soldPet = createdPets.find(p => p.status === 'sold');
        expect(soldPet, 'La mascota vendida debería existir').toBeDefined();

        console.log(`Obteniendo mascota vendida con ID: ${soldPet.id}`);
        const response = await petApi.getPet(soldPet.id);
        expect(response.ok()).toBeTruthy();

        const body = await response.json();
        expect(body.id).toBe(soldPet.id);
        expect(body.status).toBe('sold');
        expect(body.name).toBe(soldPet.name);
    });
});

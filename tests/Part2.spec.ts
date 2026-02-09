import { test, expect } from '@playwright/test';
import { PetApi } from '../src/lib/PetApi';
import { StoreApi } from '../src/lib/StoreApi';
import { DataGenerator } from '../src/utils/DataGenerator';

test.describe.configure({ mode: 'serial' });

test.describe('Parte 2: Listar mascotas disponibles y crear órdenes', () => {
    let petApi: PetApi;
    let storeApi: StoreApi;
    const selectedPets: any[] = [];
    const createdOrders: any[] = [];

    test.beforeEach(async ({ request }) => {
        petApi = new PetApi(request);
        storeApi = new StoreApi(request);
    });

    test('Listar mascotas disponibles y guardar 5', async () => {
        // 1. Listar mascotas disponibles
        const response = await petApi.findPetsByStatus('available');
        expect(response.ok()).toBeTruthy();

        let pets = await response.json();
        expect(Array.isArray(pets), 'La respuesta debería ser un array de mascotas').toBeTruthy();

        // Asegurar que tenemos al menos 5 mascotas válidas
        let validPets = pets.filter((p: any) => p && p.id);

        if (validPets.length < 5) {
            console.log(`Solo se encontraron ${validPets.length} mascotas válidas disponibles. Creando mascotas necesarias...`);
            const needed = 5 - validPets.length;
            for (let i = 0; i < needed; i++) {
                const petData = DataGenerator.generatePet('available');
                const createRes = await petApi.createPet(petData);
                expect(createRes.ok()).toBeTruthy();
                const newPet = await createRes.json();
                validPets.push(newPet);
            }
        }

        expect(validPets.length).toBeGreaterThanOrEqual(5);

        // 2. Guardar 5 mascotas
        selectedPets.push(...validPets.slice(0, 5));

        console.log(`Guardadas ${selectedPets.length} mascotas disponibles para ordenar.`);
        selectedPets.forEach(pet => console.log(`  - Mascota ID: ${pet.id}, Nombre: ${pet.name}`));
    });

    test('Crear una orden para cada una de las 5 mascotas', async () => {
        expect(selectedPets.length, 'Debería tener 5 mascotas seleccionadas de la prueba anterior').toBe(5);

        for (const pet of selectedPets) {
            const orderData = DataGenerator.generateOrder(pet.id);
            console.log(`Creando orden para Mascota ID: ${pet.id}`);

            const response = await storeApi.createOrder(orderData);
            expect(response.ok(), `Falló la creación de la orden para Mascota ID: ${pet.id}`).toBeTruthy();

            const orderBody = await response.json();
            expect(Number(orderBody.petId)).toBe(pet.id);
            expect(orderBody.status).toBe('placed');

            createdOrders.push(orderBody);
        }

        console.log(`Se crearon exitosamente ${createdOrders.length} órdenes.`);
    });
});

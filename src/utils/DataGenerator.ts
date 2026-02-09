import { faker } from '@faker-js/faker';

export class DataGenerator {
    static generatePet(status: 'available' | 'pending' | 'sold' = 'available') {
        return {
            id: faker.number.int({ min: 100000, max: 999999 }), // Usar rango fijo para evitar colisiones con datos por defecto
            category: {
                id: faker.number.int({ min: 1, max: 100 }),
                name: faker.animal.type(),
            },
            name: faker.animal.dog(),
            photoUrls: [faker.image.url()],
            tags: [
                {
                    id: faker.number.int({ min: 1, max: 100 }),
                    name: faker.lorem.word(),
                },
            ],
            status: status,
        };
    }

    static generateOrder(petId: number) {
        return {
            id: faker.number.int({ min: 100000, max: 999999 }),
            petId: petId,
            quantity: faker.number.int({ min: 1, max: 5 }),
            shipDate: new Date().toISOString(),
            status: 'placed',
            complete: true,
        };
    }
}

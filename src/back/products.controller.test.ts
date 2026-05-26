import {describe,expect,it,beforeEach,vi} from 'vitest'
import {ProductsController} from './products.controller'
import type {Request,Response} from 'express'

const mockRepo = {
    read: vi.fn(),
    readById: vi.fn(),
    create : vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
}

const controller = new ProductsController(mockRepo as any)

const mockRes = () =>{
    const res : Partial<Response> = {
        json: vi.fn(),
        status:vi.fn().mockReturnThis()
    }
    return res as Response
}

const next = vi.fn()

beforeEach(()=>{
    vi.clearAllMocks()
})

describe('ProductsController', () => {
    describe('getAll', () => {
        it('should return all products', async () => {
            const req = {} as Request;
            const res = mockRes();
            const fakeProducts = [{ id: '1', name: 'Product test' }];
            mockRepo.read.mockResolvedValueOnce(fakeProducts);

            await controller.getAll(req, res, next);

            expect(mockRepo.read).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({
                results: fakeProducts,
                error: '',
            });
        });

        it('should call next if there is an error', async () => {
            const req = {} as Request;
            const res = mockRes();
            mockRepo.read.mockRejectedValueOnce(new Error('Error de prueba'));

            await controller.getAll(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('getById', () => {
        it('should return a product by id', async () => {
            const req = { params: { id: '1' } } as unknown as Request;
            const res = mockRes();
            const fakeProduct = { id: '1', name: 'Product test' };
            mockRepo.readById.mockResolvedValueOnce(fakeProduct);

            await controller.getById(req, res, next);

            expect(mockRepo.readById).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith({
                results: [fakeProduct],
                error: '',
            });
        });

        it('should call next if there is an error', async () => {
            const req = { params: { id: '999' } } as unknown as Request;
            const res = mockRes();
            mockRepo.readById.mockRejectedValueOnce(new Error('No encontrado'));

            await controller.getById(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('create', () => {
        it('should create a product and return 201', async () => {
            const req = { body: { name: 'Nuevo Producto' } } as Request;
            const res = mockRes();
            const fakeProduct = { id: '2', name: 'Nuevo Producto' };
            mockRepo.create.mockResolvedValueOnce(fakeProduct);

            await controller.create(req, res, next);

            expect(mockRepo.create).toHaveBeenCalledWith({ name: 'Nuevo Producto' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                results: [fakeProduct],
                error: '',
            });
        });

        it('should call next if there is an error', async () => {
            const req = { body: { name: 'Fallo' } } as Request;
            const res = mockRes();
            mockRepo.create.mockRejectedValueOnce(new Error('Error al crear'));

            await controller.create(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('update', () => {
        it('should update a product', async () => {
            const req = { params: { id: '1' }, body: { name: 'Actualizado' } } as unknown as Request;
            const res = mockRes();
            const fakeProduct = { id: '1', name: 'Actualizado' };
            mockRepo.update.mockResolvedValueOnce(fakeProduct);

            await controller.update(req, res, next);

            expect(mockRepo.update).toHaveBeenCalledWith('1', { name: 'Actualizado' });
            expect(res.json).toHaveBeenCalledWith({
                results: [fakeProduct],
                error: '',
            });
        });

        it('should call next if there is an error', async () => {
            const req = { params: { id: '1' }, body: {} } as unknown as Request;
            const res = mockRes();
            mockRepo.update.mockRejectedValueOnce(new Error('Error al actualizar'));

            await controller.update(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('delete', () => {
        it('should delete a product', async () => {
            const req = { params: { id: '1' } } as unknown as Request;
            const res = mockRes();
             const fakeProduct = { id: '1', name: 'Eliminado' };
            mockRepo.delete.mockResolvedValueOnce(fakeProduct);

            await controller.delete(req, res, next);

            expect(mockRepo.delete).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith({
                results: [fakeProduct],
                error: '',
            });
        });

        it('should call next if there is an error', async () => {
            const req = { params: { id: '1' } } as unknown as Request;
            const res = mockRes();
            mockRepo.delete.mockRejectedValueOnce(new Error('Error al eliminar'));

            await controller.delete(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });
});
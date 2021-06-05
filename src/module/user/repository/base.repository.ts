export interface Repository<T> {
    create(entity: T);
    select(entity: number);
    update(entity: T);
    delete(id: number);
}
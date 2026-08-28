"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseReposatory = void 0;
class DatabaseReposatory {
    model;
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return this.model.create(data);
    }
    findall({ select, populate, lean }) {
        let query = this.model.find();
        if (select) {
            query = query.select(select);
        }
        if (populate) {
            query = query.populate(populate);
        }
        if (lean) {
            query = query.lean(lean);
        }
        return query;
    }
    findById({ id, select, populate, lean }) {
        let query = this.model.findById(id);
        if (select) {
            query = query.select(select);
        }
        if (populate) {
            query = query.populate(populate);
        }
        if (lean) {
            query = query.lean(lean);
        }
        return query;
    }
    findone({ filter, select, populate, lean }) {
        let query = this.model.findOne(filter);
        if (select) {
            query = query.select(select);
        }
        if (populate) {
            query = query.populate(populate);
        }
        if (lean) {
            query = query.lean(lean);
        }
        return query;
    }
    updateone({ filter, data }) {
        return this.model.updateOne(filter, data);
    }
    deleteone({ filter }) {
        return this.model.findOneAndDelete(filter);
    }
}
exports.DatabaseReposatory = DatabaseReposatory;

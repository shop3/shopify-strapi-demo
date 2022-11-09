/**
 * greeting controller
 */

import { factories } from '@strapi/strapi';
import _ from 'lodash';

export default factories.createCoreController('api::greeting.greeting', ({ strapi }) => ({
  async find(ctx) {
    // get the shop from the context
    const { shop } = ctx.state.shopify;
    // throw unauthorized if shop is not found
    if (!shop) {
      return ctx.throw(401, 'Unauthorized');
    }
    // modify the query to only return the greetings for the shop
    _.set(ctx, 'query.filters.shop', shop.id);
    // modify the query to populate all the relations
    _.set(ctx, 'query.populate', '*');
    // call the default find method
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    // get the shop from the context
    const { shop } = ctx.state.shopify;
    // throw unauthorized if shop is not found
    if (!shop) {
      return ctx.throw(401, 'Unauthorized');
    }
    // modify the query to only return the greetings for the shop
    _.set(ctx, 'query.filters.shop', shop.id);
    // modify the query to populate all the relations
    _.set(ctx, 'query.populate', '*');
    // call the default findOne method
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },

  async create(ctx) {
    // get the shop from the context
    const { shop } = ctx.state.shopify;
    // throw unauthorized if shop is not found
    if (!shop) {
      return ctx.throw(401, 'Unauthorized');
    }
    // set the shop on the body
    _.set(ctx, 'request.body.data.shop', shop.id);
    // call the default create method
    const { data, meta } = await super.create(ctx);
    return { data, meta };
  },

  async update(ctx) {
    // get the shop from the context
    const { shop } = ctx.state.shopify;
    // throw unauthorized if shop is not found
    if (!shop) {
      return ctx.throw(401, 'Unauthorized');
    }
    // set the shop on the body
    _.set(ctx, 'request.body.data.shop', shop.id);
    // call the default update method
    const { data, meta } = await super.update(ctx);
    return { data, meta };
  },

  async delete(ctx) {
    // get the shop from the context
    const { shop } = ctx.state.shopify;
    // throw unauthorized if shop is not found
    if (!shop) {
      return ctx.throw(401, 'Unauthorized');
    }
    // modify the query to only return the greetings for the shop
    _.set(ctx, 'query.filters.shop', shop.id);
    // find the greeting
    const greeting = await super.findOne(ctx);
    // throw forbidden if the greeting is not found
    if (!greeting) {
      return ctx.throw(403, 'Forbidden');
    }
    // call the default delete method
    const { data, meta } = await super.delete(ctx);
    return { data, meta };
  },
}));

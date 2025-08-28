'use strict';

/**
 * daal service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::daal.daal');
